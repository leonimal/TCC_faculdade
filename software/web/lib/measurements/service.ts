import { immutableMeasurementHash } from "./hash";
import type {
  IngestionResult,
  MeasurementRepository,
} from "./repository";
import type { MeasurementPayload } from "./schema";

export async function ingestMeasurement(
  repository: MeasurementRepository,
  payload: MeasurementPayload,
  requestId: string,
  receivedAt = new Date(),
): Promise<IngestionResult> {
  return repository.ingest({
    payload,
    payloadHash: immutableMeasurementHash(payload),
    requestId,
    receivedAt,
  });
}
