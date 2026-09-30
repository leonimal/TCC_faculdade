import { randomUUID } from "node:crypto";

import { isDatabaseConfigured } from "@/lib/db";
import {
  ActiveExperimentalRunError,
  createDeviceConfiguration,
  DeviceNotFoundError,
  getLatestDeviceConfiguration,
  type DeviceConfiguration,
} from "@/lib/configurations/repository";
import {
  configurationPatchSchema,
  deviceIdSchema,
} from "@/lib/configurations/schema";
import { authenticateNode } from "@/lib/node-auth";
import { isAdminRequest } from "@/lib/user-auth";

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

async function validatedDeviceId(
  parameters: RouteParameters,
): Promise<string | null> {
  const { device_id: deviceId } = await parameters.params;
  return deviceIdSchema.safeParse(deviceId).success ? deviceId : null;
}

export async function GET(
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

  const deviceId = await validatedDeviceId(parameters);
  if (!deviceId) {
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

  try {
    const configuration = await getLatestDeviceConfiguration(deviceId);
    if (!configuration) {
      return errorResponse(
        404,
        "CONFIGURATION_NOT_FOUND",
        "Dispositivo ou configuração não encontrado.",
        requestId,
      );
    }

    return Response.json(
      { device_id: deviceId, configuration: configurationResponse(configuration) },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return errorResponse(
      503,
      "CONFIGURATION_UNAVAILABLE",
      "Não foi possível consultar a configuração neste momento.",
      requestId,
    );
  }
}

export async function PATCH(
  request: Request,
  parameters: RouteParameters,
): Promise<Response> {
  const requestId = randomUUID();
  if (!(await isAdminRequest(request))) {
    return errorResponse(403, "FORBIDDEN", "Acesso restrito a administradores.", requestId);
  }
  const deviceId = await validatedDeviceId(parameters);
  if (!deviceId) {
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

  const parsed = configurationPatchSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(
      422,
      "VALIDATION_ERROR",
      "Configuração inválida.",
      requestId,
      parsed.error.issues.map((issue) => ({
        field: issue.path.join("."),
        reason: issue.message,
      })),
    );
  }

  try {
    const result = await createDeviceConfiguration(deviceId, parsed.data);
    return Response.json(
      {
        device_id: deviceId,
        previous_applied_version: result.previousAppliedVersion,
        configuration: configurationResponse(result.configuration),
      },
      { headers: { "Cache-Control": "no-store" }, status: 201 },
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
    if (error instanceof ActiveExperimentalRunError) {
      return errorResponse(
        409,
        "ACTIVE_RUN_LOCK",
        "O intervalo não pode ser alterado durante uma execução ativa.",
        requestId,
      );
    }

    return errorResponse(
      503,
      "CONFIGURATION_UNAVAILABLE",
      "Não foi possível criar a configuração neste momento.",
      requestId,
    );
  }
}
