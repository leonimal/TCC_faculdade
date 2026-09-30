import { randomUUID } from "node:crypto";

import { deviceIdSchema } from "@/lib/configurations/schema";
import { isDatabaseConfigured } from "@/lib/db";
import {
  DeviceNotFoundError,
  storeDeviceStatus,
} from "@/lib/device-status/repository";
import {
  deviceStatusPayloadSchema,
  hasQueueWarning,
  queueOccupancyPercent,
} from "@/lib/device-status/schema";
import { validationDetails } from "@/lib/measurements/schema";
import { authenticateNode } from "@/lib/node-auth";

export const runtime = "nodejs";

const maximumPayloadBytes = 8 * 1024;

type RouteParameters = {
  params: Promise<{ device_id: string }>;
};

function errorResponse(
  status: number,
  code: string,
  message: string,
  requestId: string,
  details: { field: string; reason: string }[] = [],
): Response {
  return Response.json(
    { error: { code, message, details, request_id: requestId } },
    { headers: { "Cache-Control": "no-store" }, status },
  );
}

export async function POST(
  request: Request,
  parameters: RouteParameters,
): Promise<Response> {
  const requestId = randomUUID();
  const receivedAt = new Date();
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

  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > maximumPayloadBytes) {
    return errorResponse(
      413,
      "PAYLOAD_TOO_LARGE",
      "O payload excede o limite permitido.",
      requestId,
    );
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > maximumPayloadBytes) {
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

  const parsed = deviceStatusPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(
      422,
      "VALIDATION_ERROR",
      "Estado operacional inválido.",
      requestId,
      validationDetails(parsed.error),
    );
  }

  try {
    const stored = await storeDeviceStatus(deviceId, parsed.data, receivedAt);
    return Response.json(
      {
        device_id: deviceId,
        status_report_id: stored.reportId,
        received_at: stored.receivedAt.toISOString(),
        queue: {
          depth: parsed.data.queue_depth,
          capacity: parsed.data.queue_capacity,
          occupancy_pct: queueOccupancyPercent(parsed.data.queue_depth),
          warning: hasQueueWarning(parsed.data.queue_depth),
        },
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

    return errorResponse(
      503,
      "STATUS_INGESTION_UNAVAILABLE",
      "Não foi possível armazenar o estado operacional neste momento.",
      requestId,
    );
  }
}
