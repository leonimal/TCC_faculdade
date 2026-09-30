import { createHash } from "node:crypto";

import type { MeasurementPayload } from "./schema";

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(canonicalize);
  }

  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, nestedValue]) => [key, canonicalize(nestedValue)]),
    );
  }

  return value;
}

export function immutableMeasurementHash(payload: MeasurementPayload): string {
  const canonicalContent = JSON.stringify(
    canonicalize({
      schema_version: payload.schema_version,
      measurement: payload.measurement,
    }),
  );

  return createHash("sha256").update(canonicalContent).digest("hex");
}
