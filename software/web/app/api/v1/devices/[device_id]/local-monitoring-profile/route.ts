import { randomUUID } from "node:crypto";

import { deviceIdSchema } from "@/lib/configurations/schema";
import { isDatabaseConfigured } from "@/lib/db";
import {
  createLocalMonitoringProfile,
  getLatestLocalMonitoringProfile,
  LocalMonitoringActiveExperimentalRunError,
  LocalMonitoringDeviceNotFoundError,
  type LocalMonitoringProfile,
} from "@/lib/local-monitoring/repository";
import { localMonitoringProfilePatchSchema } from "@/lib/local-monitoring/schema";
import { isAdminRequest } from "@/lib/user-auth";

export const runtime = "nodejs";

type RouteParameters = { params: Promise<{ device_id: string }> };
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

function profileResponse(profile: LocalMonitoringProfile) {
  return {
    version: profile.version,
    enabled: profile.status === "ENABLED",
    status: profile.status,
    requested_by: profile.requestedBy,
    justification: profile.justification,
    source_reference: profile.sourceReference,
    effective_at: profile.effectiveAt.toISOString(),
    rules: profile.rules.map((rule) => ({
      variable: rule.variable,
      lower_limit: rule.lowerLimit,
      upper_limit: rule.upperLimit,
    })),
  };
}

async function validDeviceId(parameters: RouteParameters): Promise<string | null> {
  const { device_id: deviceId } = await parameters.params;
  return deviceIdSchema.safeParse(deviceId).success ? deviceId : null;
}

export async function GET(
  request: Request,
  parameters: RouteParameters,
): Promise<Response> {
  const requestId = randomUUID();
  if (!(await isAdminRequest(request))) return errorResponse(403, "FORBIDDEN", "Acesso restrito a administradores.", requestId);
  const deviceId = await validDeviceId(parameters);
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
    const profile = await getLatestLocalMonitoringProfile(deviceId);
    return Response.json(
      { device_id: deviceId, profile: profile ? profileResponse(profile) : null },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return errorResponse(
      503,
      "LOCAL_MONITORING_UNAVAILABLE",
      "Não foi possível consultar as faixas locais neste momento.",
      requestId,
    );
  }
}

export async function PATCH(
  request: Request,
  parameters: RouteParameters,
): Promise<Response> {
  const requestId = randomUUID();
  if (!(await isAdminRequest(request))) return errorResponse(403, "FORBIDDEN", "Acesso restrito a administradores.", requestId);
  const deviceId = await validDeviceId(parameters);
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
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
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
      return errorResponse(413, "PAYLOAD_TOO_LARGE", "O payload excede o limite permitido.", requestId);
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

  const parsed = localMonitoringProfilePatchSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(
      422,
      "VALIDATION_ERROR",
      "Faixa local inválida.",
      requestId,
      parsed.error.issues.map((issue) => ({
        field: issue.path.join("."),
        reason: issue.message,
      })),
    );
  }

  try {
    const profile = await createLocalMonitoringProfile(deviceId, parsed.data);
    return Response.json(
      { device_id: deviceId, profile: profileResponse(profile) },
      { headers: { "Cache-Control": "no-store" }, status: 201 },
    );
  } catch (error) {
    if (error instanceof LocalMonitoringDeviceNotFoundError) {
      return errorResponse(404, "DEVICE_NOT_FOUND", "Dispositivo não encontrado ou inativo.", requestId);
    }
    if (error instanceof LocalMonitoringActiveExperimentalRunError) {
      return errorResponse(
        409,
        "ACTIVE_RUN_LOCK",
        "As faixas locais não podem ser alteradas durante uma execução experimental ativa.",
        requestId,
      );
    }
    return errorResponse(
      503,
      "LOCAL_MONITORING_UNAVAILABLE",
      "Não foi possível registrar as faixas locais neste momento.",
      requestId,
    );
  }
}
