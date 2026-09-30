import { describe, expect, it } from "vitest";

import type { MeasurementView } from "@/lib/measurements/query-repository";

import { measurementsToCsv } from "./presentation";

describe("measurementsToCsv", () => {
  it("gera CSV UTF-8 com valores formatados como o Caderno e preserva estados", () => {
    const measurement: MeasurementView = {
      measurement_id: "0b7149d5-f0bc-4b3f-aa9d-2c1ab722d218",
      device_id: "classroom-node-01",
      boot_id: "87bddbc7-b37f-4d8c-bb0f-3f4b3854078c",
      sequence_number: 1,
      run_id: null,
      configuration_version: 1,
      measured_at: "2026-08-25T17:00:00.000Z",
      device_uptime_ms: 1000,
      time_sync_status: "SYNCED",
      readings: {
        temperature_c: { value: 23.45, status: "VALID" },
        relative_humidity_pct: { value: null, status: "READ_ERROR" },
        illuminance_lx: { value: 678.9, status: "VALID" },
      },
      first_received_at: "2026-08-25T17:00:00.050Z",
      has_flags: false,
    };

    const csv = measurementsToCsv([measurement]);
    expect(csv.startsWith("\uFEFFmeasurement_id;device_id")).toBe(true);
    expect(csv).toContain(";23,5;VALID;;READ_ERROR;679;VALID;");
    expect(csv).toContain(";SYNCED;");
  });

  it("preserva os valores crus quando solicitado", () => {
    const measurement: MeasurementView = {
      measurement_id: "0b7149d5-f0bc-4b3f-aa9d-2c1ab722d218", device_id: "classroom-node-01", boot_id: "87bddbc7-b37f-4d8c-8b0f-3f4b3854078c", run_id: null,
      sequence_number: 1, configuration_version: 1, measured_at: "2026-08-25T17:00:00.000Z", device_uptime_ms: 1000, time_sync_status: "SYNCED", first_received_at: "2026-08-25T17:00:00.050Z", has_flags: false,
      readings: { temperature_c: { value: 23.45, status: "VALID" }, relative_humidity_pct: { value: 42.76, status: "VALID" }, illuminance_lx: { value: 678.9, status: "VALID" } },
    };

    expect(measurementsToCsv([measurement], "RAW")).toContain(";23.45;VALID;42.76;VALID;678.9;VALID;");
  });
});
