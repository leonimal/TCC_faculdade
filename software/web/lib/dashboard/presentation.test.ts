import { describe, expect, it } from "vitest";

import type { MeasurementView } from "@/lib/measurements/query-repository";

import {
  buildChartGeometry,
  getLatestValidReading,
  getMetricChartPoints,
} from "./presentation";

function measurement(
  measuredAt: string,
  value: number | null,
  status = value === null ? "READ_ERROR" : "VALID",
): MeasurementView {
  return {
    measurement_id: crypto.randomUUID(),
    device_id: "classroom-node-01",
    boot_id: "0b7149d5-f0bc-4b3f-aa9d-2c1ab722d218",
    sequence_number: 1,
    run_id: null,
    configuration_version: 1,
    measured_at: measuredAt,
    device_uptime_ms: 1000,
    time_sync_status: "SYNCED",
    readings: {
      temperature_c: { value, status },
      relative_humidity_pct: { value: 50, status: "VALID" },
      illuminance_lx: { value: 400, status: "VALID" },
    },
    first_received_at: measuredAt,
    has_flags: false,
  };
}

describe("apresentação do dashboard", () => {
  it("seleciona a leitura válida mais recente sem substituir falhas", () => {
    const readings = [
      measurement("2026-08-25T22:02:00.000Z", null),
      measurement("2026-08-25T22:01:00.000Z", 24.6),
      measurement("2026-08-25T22:00:00.000Z", 24.4),
    ];

    expect(getLatestValidReading(readings, "temperature_c")?.value).toBe(24.6);
  });

  it("mantém uma lacuna no histórico quando a leitura é inválida", () => {
    const readings = [
      measurement("2026-08-25T22:02:00.000Z", 24.8),
      measurement("2026-08-25T22:01:00.000Z", null),
      measurement("2026-08-25T22:00:00.000Z", 24.4),
    ];
    const points = getMetricChartPoints(readings, "temperature_c");
    const geometry = buildChartGeometry(points);

    expect(points.map((point) => point.value)).toEqual([24.4, null, 24.8]);
    expect(geometry?.segments).toHaveLength(2);
    expect(geometry?.validPointCount).toBe(2);
  });

  it("não gera geometria quando nenhuma leitura é válida", () => {
    expect(
      buildChartGeometry([
        { timestamp: Date.parse("2026-08-25T22:00:00.000Z"), value: null },
      ]),
    ).toBeNull();
  });
});
