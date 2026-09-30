import { randomUUID } from "node:crypto";

import { isDatabaseConfigured } from "@/lib/db";
import { listMeasurements } from "@/lib/measurements/query-repository";
import { parseMeasurementQuery } from "@/lib/measurements/query";
import {
  MeasurementReferenceError,
  MysqlMeasurementRepository,
} from "@/lib/measurements/repository";
import { ingestMeasurement } from "@/lib/measurements/service";
import {
  measurementPayloadSchema,
  validationDetails,
  type ValidationDetail,
} from "@/lib/measurements/schema";
import { authenticateNode } from "@/lib/node-auth";
import { isAdminRequest } from "@/lib/user-auth";

export const runtime = "nodejs";

const maximumPayloadBytes = 16 * 1024;

function errorResponse(
  status: number,
  code: string,
  message: string,
  requestId: string,
  details: ValidationDetail[] = [],
  startedAt?: number,
): Response {
  return Response.json(
    { error: { code, message, details, request_id: requestId } },
    { headers: responseHeaders(startedAt), status },
  );
}

function responseHeaders(startedAt?: number): Record<string, string> {
  const headers: Record<string, string> = { "Cache-Control": "no-store" };

  if (startedAt !== undefined) {
    const durationMs = Math.max(0, performance.now() - startedAt);
    headers["Server-Timing"] = `app;dur=${durationMs.toFixed(3)}`;
  }

  return headers;
}

export async function GET(request: Request): Promise<Response> {
  const requestId = randomUUID();
  if (!(await isAdminRequest(request))) {
    return errorResponse(401, "UNAUTHORIZED", "Acesso restrito a usuários autenticados.", requestId);
  }
  if (!isDatabaseConfigured()) {
    return errorResponse(
      503,
      "DATABASE_NOT_CONFIGURED",
      "O banco de dados não está configurado.",
      requestId,
    );
  }

  const parsed = parseMeasurementQuery(new URL(request.url));
  if (!parsed.success) {
    return errorResponse(
      422,
      "VALIDATION_ERROR",
      "Parâmetros de consulta inválidos.",
      requestId,
      parsed.details,
    );
  }

  try {
    const page = await listMeasurements(parsed.data);
    return Response.json(
      {
        measurements: page.measurements,
        pagination: {
          limit: parsed.data.limit,
          next_cursor: page.nextCursor,
        },
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return errorResponse(
      503,
      "QUERY_UNAVAILABLE",
      "Não foi possível consultar as medições neste momento.",
      requestId,
    );
  }
}

export async function POST(request: Request): Promise<Response> {
  const startedAt = performance.now();
  const requestId = randomUUID();
  const authentication = authenticateNode(request);

  if (authentication === "not_configured") {
    return errorResponse(
      503,
      "NODE_AUTH_NOT_CONFIGURED",
      "A autenticação do nó não está configurada.",
      requestId,
      [],
      startedAt,
    );
  }

  if (authentication === "invalid") {
    return errorResponse(
      401,
      "UNAUTHORIZED",
      "Credencial do nó ausente ou inválida.",
      requestId,
      [],
      startedAt,
    );
  }

  if (!isDatabaseConfigured()) {
    return errorResponse(
      503,
      "DATABASE_NOT_CONFIGURED",
      "O banco de dados não está configurado.",
      requestId,
      [],
      startedAt,
    );
  }

  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.startsWith("application/json")) {
    return errorResponse(
      415,
      "UNSUPPORTED_MEDIA_TYPE",
      "O conteúdo deve ser enviado como application/json.",
      requestId,
      [],
      startedAt,
    );
  }

  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > maximumPayloadBytes) {
    return errorResponse(
      413,
      "PAYLOAD_TOO_LARGE",
      "O payload excede o limite permitido.",
      requestId,
      [],
      startedAt,
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
        [],
        startedAt,
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
      startedAt,
    );
  }

  const parsed = measurementPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(
      422,
      "VALIDATION_ERROR",
      "Payload inválido.",
      requestId,
      validationDetails(parsed.error),
      startedAt,
    );
  }

  try {
    const result = await ingestMeasurement(
      new MysqlMeasurementRepository(),
      parsed.data,
      requestId,
    );

    if (result.outcome === "INTEGRITY_CONFLICT") {
      return errorResponse(
        409,
        "INTEGRITY_CONFLICT",
        "O identificador ou a sequência já existe com conteúdo diferente.",
        requestId,
        [],
        startedAt,
      );
    }

    return Response.json(
      {
        measurement_id: parsed.data.measurement.measurement_id,
        ingestion_status: result.outcome,
        received_at: result.firstReceivedAt.toISOString(),
      },
      {
        headers: responseHeaders(startedAt),
        status: result.outcome === "STORED" ? 201 : 200,
      },
    );
  } catch (error) {
    if (error instanceof MeasurementReferenceError) {
      return errorResponse(
        422,
        "VALIDATION_ERROR",
        "A medição referencia um registro inexistente ou incompatível.",
        requestId,
        [{ field: error.field, reason: error.reason }],
        startedAt,
      );
    }

    return errorResponse(
      503,
      "INGESTION_UNAVAILABLE",
      "Não foi possível armazenar a medição neste momento.",
      requestId,
      [],
      startedAt,
    );
  }
}
