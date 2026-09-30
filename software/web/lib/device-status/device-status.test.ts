import { describe, expect, it } from "vitest";

import {
  deviceStatusPayloadSchema,
  hasQueueWarning,
  queueOccupancyPercent,
} from "./schema";

const validPayload = {
  observed_at: "2026-08-24T22:30:00.000Z",
  firmware_version: "0.1.0-dev",
  connection_status: "ONLINE" as const,
  queue_depth: 0,
  queue_capacity: 256 as const,
  dropped_total: 0,
  last_confirmed_at: "2026-08-24T22:29:59.000Z",
  time_sync_status: "SYNCED" as const,
  details: { reset_reason: "POWER_ON" },
};

describe("deviceStatusPayloadSchema", () => {
  it("aceita um relatório operacional sincronizado", () => {
    expect(deviceStatusPayloadSchema.safeParse(validPayload).success).toBe(true);
  });

  it("aceita relatório não sincronizado sem observed_at", () => {
    expect(
      deviceStatusPayloadSchema.safeParse({
        ...validPayload,
        observed_at: null,
        last_confirmed_at: null,
        time_sync_status: "UNSYNCED",
      }).success,
    ).toBe(true);
  });

  it("rejeita timestamp incompatível com o estado do relógio", () => {
    expect(
      deviceStatusPayloadSchema.safeParse({
        ...validPayload,
        observed_at: null,
      }).success,
    ).toBe(false);
    expect(
      deviceStatusPayloadSchema.safeParse({
        ...validPayload,
        time_sync_status: "UNSYNCED",
      }).success,
    ).toBe(false);
  });

  it("rejeita capacidade diferente de 256 e profundidade fora do limite", () => {
    expect(
      deviceStatusPayloadSchema.safeParse({
        ...validPayload,
        queue_capacity: 128,
      }).success,
    ).toBe(false);
    expect(
      deviceStatusPayloadSchema.safeParse({
        ...validPayload,
        queue_depth: 257,
      }).success,
    ).toBe(false);
  });

  it("rejeita confirmação posterior à observação e campos extras", () => {
    expect(
      deviceStatusPayloadSchema.safeParse({
        ...validPayload,
        last_confirmed_at: "2026-08-24T22:31:00.000Z",
        unexpected: true,
      }).success,
    ).toBe(false);
  });
});

describe("indicadores da fila", () => {
  it("ativa advertência a partir de 205 registros", () => {
    expect(hasQueueWarning(204)).toBe(false);
    expect(hasQueueWarning(205)).toBe(true);
    expect(hasQueueWarning(256)).toBe(true);
  });

  it("calcula a ocupação percentual com duas casas", () => {
    expect(queueOccupancyPercent(0)).toBe(0);
    expect(queueOccupancyPercent(205)).toBe(80.08);
    expect(queueOccupancyPercent(256)).toBe(100);
  });
});
