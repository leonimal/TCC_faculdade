import { describe, expect, it } from "vitest";

import {
  configurationAcknowledgementSchema,
  configurationPatchSchema,
  deviceIdSchema,
} from "./schema";

describe("configurationPatchSchema", () => {
  it.each([10, 60, 300])("aceita o intervalo limite %i", (interval) => {
    expect(
      configurationPatchSchema.safeParse({
        sampling_interval_seconds: interval,
        requested_by: "integration-test",
      }).success,
    ).toBe(true);
  });

  it.each([9, 301, 10.5])("rejeita o intervalo inválido %s", (interval) => {
    expect(
      configurationPatchSchema.safeParse({
        sampling_interval_seconds: interval,
        requested_by: "integration-test",
      }).success,
    ).toBe(false);
  });

  it("rejeita campos extras e origem vazia", () => {
    expect(
      configurationPatchSchema.safeParse({
        sampling_interval_seconds: 60,
        requested_by: "",
        unexpected: true,
      }).success,
    ).toBe(false);
  });
});

describe("deviceIdSchema", () => {
  it("aceita o identificador do nó e rejeita segmentos inseguros", () => {
    expect(deviceIdSchema.safeParse("classroom-node-01").success).toBe(true);
    expect(deviceIdSchema.safeParse("../classroom-node-01").success).toBe(false);
  });
});

describe("configurationAcknowledgementSchema", () => {
  it("aceita confirmações APPLIED e REJECTED válidas", () => {
    expect(
      configurationAcknowledgementSchema.safeParse({
        version: 2,
        status: "APPLIED",
      }).success,
    ).toBe(true);
    expect(
      configurationAcknowledgementSchema.safeParse({
        version: 3,
        status: "REJECTED",
        rejection_reason: "Falha ao persistir o intervalo.",
      }).success,
    ).toBe(true);
  });

  it("exige motivo para REJECTED e o proíbe para APPLIED", () => {
    expect(
      configurationAcknowledgementSchema.safeParse({
        version: 2,
        status: "REJECTED",
      }).success,
    ).toBe(false);
    expect(
      configurationAcknowledgementSchema.safeParse({
        version: 2,
        status: "APPLIED",
        rejection_reason: "não deveria existir",
      }).success,
    ).toBe(false);
  });

  it("rejeita versão inválida, estado desconhecido e campos extras", () => {
    expect(
      configurationAcknowledgementSchema.safeParse({
        version: 0,
        status: "UNKNOWN",
        unexpected: true,
      }).success,
    ).toBe(false);
  });
});
