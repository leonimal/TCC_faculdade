import { randomUUID } from "node:crypto";

import {
  acknowledgeDeviceConfiguration,
  ActiveExperimentalRunError,
  ConfigurationAcknowledgementConflictError,
  ConfigurationNotFoundError,
  ConfigurationSupersededError,
  DeviceNotFoundError,
  type DeviceConfiguration,
} from "@/lib/configurations/repository";
import {
  configurationAcknowledgementSchema,
  deviceIdSchema,
} from "@/lib/configurations/schema";
import { isDatabaseConfigured } from "@/lib/db";
import { authenticateNode } from "@/lib/node-auth";

export const runtime = "nodejs";

type RouteParameters = {
  params: Promise<{ device_id: string }>;
};

type ErrorDetail = { field: string; reason: string };

function errorResponse(
  status: number,
  code: string,
  message: string,
  requestId: string,
  details: ErrorDetail[] = [],
): Response {
  return Response.json(
    { error: { code, message, details, request_id: requestId } },
    { headers: { "Cache-Control": "no-store" }, status },
  );
}

function configurationResponse(configuration: DeviceConfiguration) {
  return {
    version: configuration.version,
    sampling_interval_seconds: configuration.samplingIntervalSeconds,
    status: configuration.status,
    requested_by: configuration.requestedBy,
    requested_at: configuration.requestedAt.toISOString(),
    acknowledged_at: configuration.acknowledgedAt?.toISOString() ?? null,
    rejection_reason: configuration.rejectionReason,
  };
}

export async function POST(
  request: Request,
  parameters: RouteParameters,
): Promise<Response> {
  const requestId = randomUUID();
  const authentication = authenticateNode(request);

  if (authentication === "not_configured") {
    return errorResponse(
      503,
      "NODE_AUTH_NOT_CONFIGURED",
      "A autenticação do nó não está configurada.",
      requestId,
    );
  }
  if (authentication === "invalid") {
    return errorResponse(
      401,
      "UNAUTHORIZED",
      "Credencial do nó ausente ou inválida.",
      requestId,
    );
  }

  const { device_id: deviceId } = await parameters.params;
  if (!deviceIdSchema.safeParse(deviceId).success) {
    return errorResponse(
      422,
      "VALIDATION_ERROR",
      "Identificador do dispositivo inválido.",
      requestId,
      [{ field: "device_id", reason: "invalid_device_id" }],
    );
  }
  if (!isDatabaseConfigured()) {
    return errorResponse(
      503,
      "DATABASE_NOT_CONFIGURED",
      "O banco de dados não está configurado.",
      requestId,
    );
  }

  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.startsWith("application/json")) {
    return errorResponse(
      415,
      "UNSUPPORTED_MEDIA_TYPE",
      "O conteúdo deve ser enviado como application/json.",
      requestId,
    );
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > 4096) {
      return errorResponse(
        413,
        "PAYLOAD_TOO_LARGE",
        "O payload excede o limite permitido.",
        requestId,
      );
    }
    body = JSON.parse(rawBody);
  } catch {
    return errorResponse(
      422,
      "VALIDATION_ERROR",
      "Payload JSON inválido.",
      requestId,
      [{ field: "", reason: "invalid_json" }],
    );
  }

  const parsed = configurationAcknowledgementSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(
      422,
      "VALIDATION_ERROR",
      "Confirmação de configuração inválida.",
      requestId,
      parsed.error.issues.map((issue) => ({
        field: issue.path.join("."),
        reason: issue.message,
      })),
    );
  }

  try {
    const result = await acknowledgeDeviceConfiguration(deviceId, parsed.data);
    return Response.json(
      {
        device_id: deviceId,
        acknowledgement_status: result.acknowledgementStatus,
        configuration: configurationResponse(result.configuration),
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    if (error instanceof DeviceNotFoundError) {
      return errorResponse(
        404,
        "DEVICE_NOT_FOUND",
        "Dispositivo não encontrado ou inativo.",
        requestId,
      );
    }
    if (error instanceof ConfigurationNotFoundError) {
      return errorResponse(
        404,
        "CONFIGURATION_NOT_FOUND",
        "Versão da configuração não encontrada.",
        requestId,
      );
    }
    if (error instanceof ConfigurationSupersededError) {
      return errorResponse(
        409,
        "CONFIGURATION_SUPERSEDED",
        "A configuração já foi substituída por uma versão mais recente.",
        requestId,
      );
    }
    if (error instanceof ConfigurationAcknowledgementConflictError) {
      return errorResponse(
        409,
        "ACK_CONFLICT",
        "A configuração já possui uma confirmação diferente.",
        requestId,
      );
    }
    if (error instanceof ActiveExperimentalRunError) {
      return errorResponse(
        409,
        "ACTIVE_RUN_LOCK",
        "Uma nova configuração não pode ser aplicada durante uma execução ativa.",
        requestId,
      );
    }

    return errorResponse(
      503,
      "CONFIGURATION_UNAVAILABLE",
      "Não foi possível registrar a confirmação neste momento.",
      requestId,
    );
  }
}
