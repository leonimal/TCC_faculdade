import { describe, expect, it } from "vitest";

import { defaultReportPeriod, parseReportPeriod } from "./filters";

describe("parseReportPeriod", () => {
  const now = new Date("2026-08-25T17:00:00.000Z");

  it("usa os últimos sete dias como período padrão em São Paulo", () => {
    expect(defaultReportPeriod(now)).toEqual({
      fromDate: "2026-08-19",
      toDate: "2026-08-25",
      fromUtc: "2026-08-19T03:00:00.000Z",
      toExclusiveUtc: "2026-08-26T03:00:00.000Z",
    });
  });

  it("converte o período inclusivo informado para limites UTC", () => {
    expect(
      parseReportPeriod({ from: "2026-08-20", to: "2026-08-21" }, now),
    ).toEqual({
      success: true,
      errors: [],
      period: {
        fromDate: "2026-08-20",
        toDate: "2026-08-21",
        fromUtc: "2026-08-20T03:00:00.000Z",
        toExclusiveUtc: "2026-08-22T03:00:00.000Z",
      },
    });
  });

  it("rejeita datas inválidas, invertidas ou incompletas", () => {
    expect(parseReportPeriod({ from: "2026-02-30", to: "2026-03-01" }, now).success).toBe(false);
    expect(parseReportPeriod({ from: "2026-08-22", to: "2026-08-21" }, now).success).toBe(false);
    expect(parseReportPeriod({ from: "2026-08-22" }, now).success).toBe(false);
  });

  it("rejeita períodos superiores a 31 dias e parâmetros repetidos", () => {
    expect(parseReportPeriod({ from: "2026-07-01", to: "2026-08-25" }, now).success).toBe(false);
    expect(parseReportPeriod({ from: ["2026-08-20", "2026-08-21"], to: "2026-08-25" }, now).success).toBe(false);
  });
});
