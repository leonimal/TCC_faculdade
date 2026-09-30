import { describe, expect, it } from "vitest";

import {
  nearestRankPercentile,
  summarizeLatencies,
} from "./latency-statistics.mjs";

describe("nearestRankPercentile", () => {
  it("calcula P95 pelo método do posto mais próximo", () => {
    const samples = Array.from({ length: 100 }, (_, index) => index + 1);

    expect(nearestRankPercentile(samples, 95)).toBe(95);
  });

  it("não altera a ordem original das amostras", () => {
    const samples = [30, 10, 20];

    expect(nearestRankPercentile(samples, 50)).toBe(20);
    expect(samples).toEqual([30, 10, 20]);
  });

  it("rejeita conjuntos vazios e valores inválidos", () => {
    expect(() => nearestRankPercentile([], 95)).toThrow();
    expect(() => nearestRankPercentile([10, -1], 95)).toThrow();
    expect(() => nearestRankPercentile([10], 0)).toThrow();
  });
});

describe("summarizeLatencies", () => {
  it("resume quantidade, extremos, média, P50 e P95", () => {
    expect(summarizeLatencies([4, 1, 3, 2])).toEqual({
      count: 4,
      minimum_ms: 1,
      mean_ms: 2.5,
      p50_ms: 2,
      p95_ms: 4,
      maximum_ms: 4,
    });
  });
});
