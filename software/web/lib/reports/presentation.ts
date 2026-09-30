import type { MeasurementView } from "@/lib/measurements/query-repository";
import type { ReportValueFormat } from "@/lib/reports/filters";

const csvHeaders = [
  "measurement_id",
  "device_id",
  "measured_at_utc",
  "received_at_utc",
  "time_sync_status",
  "temperature_c",
  "temperature_status",
  "relative_humidity_pct",
  "humidity_status",
  "illuminance_lx",
  "illuminance_status",
  "configuration_version",
  "run_id",
  "has_flags",
];

function csvCell(value: string | number | boolean | null): string {
  if (value === null) {
    return "";
  }

  const text = String(value);
  return /[;"\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function formatMeasurementValue(value: number | null, digits: number, valueFormat: ReportValueFormat): number | string | null {
  if (value === null || valueFormat === "RAW") return value;
  return value.toLocaleString("pt-BR", { maximumFractionDigits: digits });
}

export function measurementsToCsv(measurements: MeasurementView[], valueFormat: ReportValueFormat = "DISPLAY"): string {
  const rows = measurements.map((measurement) => [
    measurement.measurement_id,
    measurement.device_id,
    measurement.measured_at,
    measurement.first_received_at,
    measurement.time_sync_status,
    formatMeasurementValue(measurement.readings.temperature_c.value, 1, valueFormat),
    measurement.readings.temperature_c.status,
    formatMeasurementValue(measurement.readings.relative_humidity_pct.value, 1, valueFormat),
    measurement.readings.relative_humidity_pct.status,
    formatMeasurementValue(measurement.readings.illuminance_lx.value, 0, valueFormat),
    measurement.readings.illuminance_lx.status,
    measurement.configuration_version,
    measurement.run_id,
    measurement.has_flags,
  ]);

  return `\uFEFF${[csvHeaders, ...rows]
    .map((row) => row.map(csvCell).join(";"))
    .join("\r\n")}\r\n`;
}
