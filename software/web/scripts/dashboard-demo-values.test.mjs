import { describe, expect, it } from "vitest";

import { dashboardDemoValues } from "./dashboard-demo-values.mjs";

describe("dashboardDemoValues", () => {
  it("produz um ciclo determinístico de oito amostras", () => {
    expect(dashboardDemoValues(1)).toEqual({
      temperature: 22,
      humidity: 48,
      illuminance: 320,
      queueDepth: 0,
    });
    expect(dashboardDemoValues(9)).toEqual(dashboardDemoValues(1));
  });

  it("inclui uma amostra que torna visível a advertência da fila", () => {
    expect(dashboardDemoValues(5).queueDepth).toBe(210);
  });

  it.each([0, -1, 1.5, Number.NaN])("rejeita sequência inválida %s", (value) => {
    expect(() => dashboardDemoValues(value)).toThrow(TypeError);
  });
});
