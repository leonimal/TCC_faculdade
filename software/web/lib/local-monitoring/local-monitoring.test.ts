import { describe, expect, it } from "vitest";

import { classifyLocalReading } from "./logic";
import { localMonitoringProfilePatchSchema } from "./schema";

const validEnabledProfile = {
  enabled: true,
  requested_by: "administrador-local",
  justification: "Faixa definida para acompanhamento operacional da sala.",
  source_reference: "Definição registrada pela administração local.",
  rules: [
    {
      variable: "TEMPERATURE_C",
      lower_limit: 20,
      upper_limit: 28,
    },
  ],
};

describe("localMonitoringProfilePatchSchema", () => {
  it("aceita uma faixa local habilitada, identificada e justificada", () => {
    expect(localMonitoringProfilePatchSchema.safeParse(validEnabledProfile).success).toBe(true);
  });

  it("exige ao menos uma faixa quando o acompanhamento está habilitado", () => {
    expect(
      localMonitoringProfilePatchSchema.safeParse({
        ...validEnabledProfile,
        rules: [],
      }).success,
    ).toBe(false);
  });

  it("impede regras ao desabilitar o acompanhamento", () => {
    expect(
      localMonitoringProfilePatchSchema.safeParse({
        ...validEnabledProfile,
        enabled: false,
      }).success,
    ).toBe(false);
    expect(
      localMonitoringProfilePatchSchema.safeParse({
        enabled: false,
        requested_by: validEnabledProfile.requested_by,
        justification: "Pausa de acompanhamento registrada.",
      }).success,
    ).toBe(true);
  });

  it("rejeita limites invertidos e uma variável repetida", () => {
    expect(
      localMonitoringProfilePatchSchema.safeParse({
        ...validEnabledProfile,
        rules: [
          {
            variable: "TEMPERATURE_C",
            lower_limit: 28,
            upper_limit: 20,
          },
        ],
      }).success,
    ).toBe(false);
    expect(
      localMonitoringProfilePatchSchema.safeParse({
        ...validEnabledProfile,
        rules: [
          validEnabledProfile.rules[0],
          validEnabledProfile.rules[0],
        ],
      }).success,
    ).toBe(false);
  });
});

describe("classifyLocalReading", () => {
  const rule = { lowerLimit: 20, upperLimit: 28 };

  it("sinaliza apenas valores válidos fora dos limites, sem sinalizar a fronteira", () => {
    expect(classifyLocalReading({ value: 19.9, status: "VALID" }, rule)).toBe("BELOW");
    expect(classifyLocalReading({ value: 20, status: "VALID" }, rule)).toBeNull();
    expect(classifyLocalReading({ value: 28, status: "VALID" }, rule)).toBeNull();
    expect(classifyLocalReading({ value: 28.1, status: "VALID" }, rule)).toBe("ABOVE");
  });

  it("ignora leituras sem valor válido", () => {
    expect(classifyLocalReading({ value: null, status: "READ_ERROR" }, rule)).toBeNull();
  });
});
