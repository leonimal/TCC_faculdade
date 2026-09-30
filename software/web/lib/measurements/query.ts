import { z } from "zod";

import { utcTimestampSchema, type ValidationDetail } from "./schema";

const deviceIdSchema = z
  .string()
  .min(1)
  .max(64)
  .regex(/^[A-Za-z0-9._-]+$/, "invalid_device_id");

const cursorSchema = z
  .object({
    measuredAt: utcTimestampSchema.nullable(),
    bootId: z.string().uuid(),
    sequenceNumber: z.number().int().nonnegative().safe(),
    measurementId: z.string().uuid(),
  })
  .strict();

export type MeasurementCursor = z.infer<typeof cursorSchema>;

export type MeasurementQuery = {
  deviceId?: string;
  classroomCode?: string;
  runId?: string;
  from?: string;
  to?: string;
  timeQuality?: "SYNCHRONIZED" | "UNSYNCHRONIZED" | "ALL";
  cursor?: MeasurementCursor;
  limit: number;
};

type QueryParseResult =
  | { success: true; data: MeasurementQuery }
  | { success: false; details: ValidationDetail[] };

const allowedParameters = new Set([
  "device_id",
  "classroom_code",
  "run_id",
  "from",
  "to",
  "cursor",
  "limit",
]);

export function encodeMeasurementCursor(cursor: MeasurementCursor): string {
  return Buffer.from(JSON.stringify(cursor), "utf8").toString("base64url");
}

export function decodeMeasurementCursor(value: string): MeasurementCursor | null {
  try {
    const decoded = JSON.parse(Buffer.from(value, "base64url").toString("utf8"));
    const parsed = cursorSchema.safeParse(decoded);
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export function parseMeasurementQuery(url: URL): QueryParseResult {
  const details: ValidationDetail[] = [];

  for (const key of new Set(url.searchParams.keys())) {
    if (!allowedParameters.has(key)) {
      details.push({ field: key, reason: "unknown_parameter" });
    }
    if (url.searchParams.getAll(key).length > 1) {
      details.push({ field: key, reason: "duplicate_parameter" });
    }
  }

  const deviceId = url.searchParams.get("device_id") ?? undefined;
  const classroomCode = url.searchParams.get("classroom_code") ?? undefined;
  const runId = url.searchParams.get("run_id") ?? undefined;
  const from = url.searchParams.get("from") ?? undefined;
  const to = url.searchParams.get("to") ?? undefined;
  const cursorValue = url.searchParams.get("cursor") ?? undefined;
  const limitValue = url.searchParams.get("limit") ?? "100";

  if (deviceId && !deviceIdSchema.safeParse(deviceId).success) {
    details.push({ field: "device_id", reason: "invalid_device_id" });
  }
  if (classroomCode && !deviceIdSchema.safeParse(classroomCode).success) {
    details.push({ field: "classroom_code", reason: "invalid_classroom_code" });
  }
  if (runId && !z.string().uuid().safeParse(runId).success) {
    details.push({ field: "run_id", reason: "invalid_uuid" });
  }
  if (from && !utcTimestampSchema.safeParse(from).success) {
    details.push({ field: "from", reason: "invalid_utc_timestamp" });
  }
  if (to && !utcTimestampSchema.safeParse(to).success) {
    details.push({ field: "to", reason: "invalid_utc_timestamp" });
  }
  if (from && to && Date.parse(from) >= Date.parse(to)) {
    details.push({ field: "to", reason: "must_be_after_from" });
  }

  const limit = /^\d+$/.test(limitValue) ? Number(limitValue) : Number.NaN;
  if (!Number.isInteger(limit) || limit < 1 || limit > 1000) {
    details.push({ field: "limit", reason: "must_be_integer_between_1_and_1000" });
  }

  const cursor = cursorValue ? decodeMeasurementCursor(cursorValue) : undefined;
  if (cursorValue && !cursor) {
    details.push({ field: "cursor", reason: "invalid_cursor" });
  }

  if (details.length > 0) {
    return { success: false, details };
  }

  return {
    success: true,
    data: { deviceId, classroomCode, runId, from, to, cursor: cursor ?? undefined, limit },
  };
}
