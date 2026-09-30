import { afterEach, describe, expect, it } from "vitest";

import { authenticateAdmin, authenticateNode } from "../node-auth";
import {
  decodeMeasurementCursor,
  encodeMeasurementCursor,
  parseMeasurementQuery,
} from "./query";
import type {
  IngestionRecord,
  IngestionResult,
  MeasurementRepository,
} from "./repository";
import { measurementPayloadSchema, type MeasurementPayload } from "./schema";
import { ingestMeasurement } from "./service";

function validPayload(): MeasurementPayload {
  return {
    schema_version: 1,
    measurement: {
      measurement_id: "550e8400-e29b-41d4-a716-446655440000",
      device_id: "classroom-node-01",
      boot_id: "0b7149d5-f0bc-4b3f-aa9d-2c1ab722d218",
      sequence_number: 1234,
      run_id: null,
      configuration_version: 1,
      measured_at: "2026-08-24T22:15:30.125Z",
      device_uptime_ms: 987654,
      time_sync_status: "SYNCED",
      readings: {
        temperature_c: { value: 24.31, status: "VALID" },
        relative_humidity_pct: { value: 52.7, status: "VALID" },
        illuminance_lx: { value: 487.2, status: "VALID" },
      },
    },
    delivery: {
      mode: "ONLINE",
      sent_at: "2026-08-24T22:15:30.300Z",
      queue_depth_before_send: 0,
      queue_capacity: 256,
      dropped_total: 0,
    },
  };
}

class MemoryMeasurementRepository implements MeasurementRepository {
  private readonly records = new Map<
    string,
    { hash: string; firstReceivedAt: Date }
  >();

  async ingest(record: IngestionRecord): Promise<IngestionResult> {
    const id = record.payload.measurement.measurement_id;
    const existing = this.records.get(id);

    if (!existing) {
      this.records.set(id, {
        hash: record.payloadHash,
        firstReceivedAt: record.receivedAt,
      });
      return { outcome: "STORED", firstReceivedAt: record.receivedAt };
    }

    return {
      outcome:
        existing.hash === record.payloadHash
          ? "ALREADY_STORED"
          : "INTEGRITY_CONFLICT",
      firstReceivedAt: existing.firstReceivedAt,
    };
  }
}

afterEach(() => {
  delete process.env.NODE_API_KEY;
  delete process.env.ADMIN_API_KEY;
});

describe("measurementPayloadSchema", () => {
  it("aceita o payload válido definido no contrato", () => {
    expect(measurementPayloadSchema.safeParse(validPayload()).success).toBe(true);
  });

  it("rejeita valor ausente quando a leitura é válida", () => {
    const payload = validPayload();
    payload.measurement.readings.temperature_c.value = null;

    const result = measurementPayloadSchema.safeParse(payload);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ message: "required_when_valid" }),
        ]),
      );
    }
  });

  it("rejeita timestamp quando o relógio está marcado como não sincronizado", () => {
    const payload = validPayload();
    payload.measurement.time_sync_status = "UNSYNCED";

    const result = measurementPayloadSchema.safeParse(payload);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ message: "must_be_null_when_unsynced" }),
        ]),
      );
    }
  });
});

describe("ingestMeasurement", () => {
  it("armazena a primeira entrega e confirma o reenvio idêntico", async () => {
    const repository = new MemoryMeasurementRepository();
    const receivedAt = new Date("2026-08-24T22:15:31.000Z");
    const first = await ingestMeasurement(
      repository,
      validPayload(),
      "request-1",
      receivedAt,
    );
    const replayedPayload = validPayload();
    replayedPayload.delivery.mode = "REPLAYED";
    replayedPayload.delivery.queue_depth_before_send = 12;
    const replay = await ingestMeasurement(
      repository,
      replayedPayload,
      "request-2",
      new Date("2026-08-24T22:16:00.000Z"),
    );

    expect(first).toEqual({ outcome: "STORED", firstReceivedAt: receivedAt });
    expect(replay).toEqual({
      outcome: "ALREADY_STORED",
      firstReceivedAt: receivedAt,
    });
  });

  it("detecta conflito quando o conteúdo imutável muda", async () => {
    const repository = new MemoryMeasurementRepository();
    await ingestMeasurement(repository, validPayload(), "request-1");
    const changedPayload = validPayload();
    changedPayload.measurement.readings.temperature_c.value = 25.31;

    const conflict = await ingestMeasurement(
      repository,
      changedPayload,
      "request-2",
    );

    expect(conflict.outcome).toBe("INTEGRITY_CONFLICT");
  });
});

describe("authenticateNode", () => {
  it("falha de forma segura quando o segredo não está configurado", () => {
    const request = new Request("http://localhost/api/v1/measurements");

    expect(authenticateNode(request)).toBe("not_configured");
  });

  it("aceita somente o token Bearer configurado", () => {
    process.env.NODE_API_KEY = "segredo-de-teste";
    const validRequest = new Request("http://localhost/api/v1/measurements", {
      headers: { Authorization: "Bearer segredo-de-teste" },
    });
    const invalidRequest = new Request("http://localhost/api/v1/measurements", {
      headers: { Authorization: "Bearer incorreto" },
    });

    expect(authenticateNode(validRequest)).toBe("authenticated");
    expect(authenticateNode(invalidRequest)).toBe("invalid");
  });

  it("mantém credenciais de nó e administração separadas", () => {
    process.env.NODE_API_KEY = "segredo-do-no";
    process.env.ADMIN_API_KEY = "segredo-administrativo";
    const adminRequest = new Request("http://localhost/api/v1/measurements", {
      headers: { Authorization: "Bearer segredo-administrativo" },
    });

    expect(authenticateAdmin(adminRequest)).toBe("authenticated");
    expect(authenticateNode(adminRequest)).toBe("invalid");
  });
});

describe("parseMeasurementQuery", () => {
  it("aplica limite padrão e aceita os filtros do contrato", () => {
    const result = parseMeasurementQuery(
      new URL(
        "http://localhost/api/v1/measurements?device_id=classroom-node-01&from=2026-08-24T22%3A00%3A00.000Z&to=2026-08-24T23%3A00%3A00.000Z",
      ),
    );

    expect(result).toEqual({
      success: true,
      data: {
        deviceId: "classroom-node-01",
        classroomCode: undefined,
        runId: undefined,
        from: "2026-08-24T22:00:00.000Z",
        to: "2026-08-24T23:00:00.000Z",
        cursor: undefined,
        limit: 100,
      },
    });
  });

  it("aceita o código da sala e rejeita um código inválido", () => {
    expect(
      parseMeasurementQuery(new URL("http://localhost/api/v1/measurements?classroom_code=LAB-201")),
    ).toMatchObject({ success: true, data: { classroomCode: "LAB-201" } });

    expect(
      parseMeasurementQuery(new URL("http://localhost/api/v1/measurements?classroom_code=sala%20com%20espaço")),
    ).toMatchObject({ success: false, details: [{ field: "classroom_code", reason: "invalid_classroom_code" }] });
  });

  it("rejeita limite excessivo, intervalo invertido e parâmetro desconhecido", () => {
    const result = parseMeasurementQuery(
      new URL(
        "http://localhost/api/v1/measurements?from=2026-08-24T23%3A00%3A00.000Z&to=2026-08-24T22%3A00%3A00.000Z&limit=1001&offset=1",
      ),
    );

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.details).toEqual(
        expect.arrayContaining([
          { field: "offset", reason: "unknown_parameter" },
          { field: "to", reason: "must_be_after_from" },
          { field: "limit", reason: "must_be_integer_between_1_and_1000" },
        ]),
      );
    }
  });

  it("codifica e recupera um cursor opaco", () => {
    const cursor = {
      measuredAt: "2026-08-24T22:15:30.125Z",
      bootId: "0b7149d5-f0bc-4b3f-aa9d-2c1ab722d218",
      sequenceNumber: 1234,
      measurementId: "550e8400-e29b-41d4-a716-446655440000",
    };

    expect(decodeMeasurementCursor(encodeMeasurementCursor(cursor))).toEqual(
      cursor,
    );
    expect(decodeMeasurementCursor("cursor-invalido")).toBeNull();
  });
});
