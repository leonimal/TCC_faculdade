import "server-only";

import type { RowDataPacket } from "mysql2/promise";

import { getDatabasePool } from "@/lib/db";
import {
  listMeasurements,
  type MeasurementView,
} from "@/lib/measurements/query-repository";
import {
  decodeMeasurementCursor,
  type MeasurementCursor,
} from "@/lib/measurements/query";

import type { ReportPeriod, ReportTimeQuality } from "./filters";

export const REPORT_TABLE_LIMIT = 200;
export const REPORT_EXPORT_LIMIT = 5000;

type SummaryRow = RowDataPacket & {
  total_measurements: string | number;
  synchronized_total: string | number;
  unsynchronized_received_total: string | number;
  flagged_total: string | number;
  temperature_valid_total: string | number;
  temperature_invalid_total: string | number;
  temperature_minimum: string | null;
  temperature_average: string | null;
  temperature_maximum: string | null;
  humidity_valid_total: string | number;
  humidity_invalid_total: string | number;
  humidity_minimum: string | null;
  humidity_average: string | null;
  humidity_maximum: string | null;
  illuminance_valid_total: string | number;
  illuminance_invalid_total: string | number;
  illuminance_minimum: string | null;
  illuminance_average: string | null;
  illuminance_maximum: string | null;
};

export type MetricReportSummary = {
  validTotal: number;
  invalidTotal: number;
  minimum: number | null;
  average: number | null;
  maximum: number | null;
};

export type ReportSummary = {
  totalMeasurements: number;
  synchronizedTotal: number;
  unsynchronizedReceivedTotal: number;
  flaggedTotal: number;
  temperature: MetricReportSummary;
  humidity: MetricReportSummary;
  illuminance: MetricReportSummary;
};

function nullableNumber(value: string | null): number | null {
  return value === null ? null : Number(value);
}

function metricSummary(
  validTotal: string | number,
  invalidTotal: string | number,
  minimum: string | null,
  average: string | null,
  maximum: string | null,
): MetricReportSummary {
  return {
    validTotal: Number(validTotal),
    invalidTotal: Number(invalidTotal),
    minimum: nullableNumber(minimum),
    average: nullableNumber(average),
    maximum: nullableNumber(maximum),
  };
}

export async function getReportSummary(
  classroomCode: string,
  period: ReportPeriod,
  timeQuality: ReportTimeQuality,
): Promise<ReportSummary> {
  const from = new Date(period.fromUtc);
  const to = new Date(period.toExclusiveUtc);
  const timeWhere = timeQuality === "SYNCHRONIZED"
    ? "m.time_sync_status = 'SYNCED' AND m.measured_at >= ? AND m.measured_at < ?"
    : timeQuality === "UNSYNCHRONIZED"
      ? "m.time_sync_status = 'UNSYNCED' AND m.first_received_at >= ? AND m.first_received_at < ?"
      : "((m.time_sync_status = 'SYNCED' AND m.measured_at >= ? AND m.measured_at < ?) OR (m.time_sync_status = 'UNSYNCED' AND m.first_received_at >= ? AND m.first_received_at < ?))";
  const timeValues = timeQuality === "ALL" ? [from, to, from, to] : [from, to];
  const [rows] = await getDatabasePool().execute<SummaryRow[]>(
    `SELECT
       COUNT(*) AS total_measurements,
       COALESCE(SUM(m.time_sync_status = 'SYNCED'), 0) AS synchronized_total,
       (
         SELECT COUNT(*)
         FROM measurements u
         INNER JOIN classrooms uc ON uc.id = u.classroom_id
         WHERE uc.code = ?
           AND u.time_sync_status = 'UNSYNCED'
           AND u.first_received_at >= ? AND u.first_received_at < ?
       ) AS unsynchronized_received_total,
       COALESCE(SUM(EXISTS(
         SELECT 1 FROM measurement_flags f WHERE f.measurement_id = m.measurement_id
       )), 0) AS flagged_total,
       COALESCE(SUM(m.temperature_status = 'VALID'), 0) AS temperature_valid_total,
       COALESCE(SUM(m.temperature_status <> 'VALID'), 0) AS temperature_invalid_total,
       MIN(CASE WHEN m.temperature_status = 'VALID' THEN m.temperature_c END) AS temperature_minimum,
       AVG(CASE WHEN m.temperature_status = 'VALID' THEN m.temperature_c END) AS temperature_average,
       MAX(CASE WHEN m.temperature_status = 'VALID' THEN m.temperature_c END) AS temperature_maximum,
       COALESCE(SUM(m.humidity_status = 'VALID'), 0) AS humidity_valid_total,
       COALESCE(SUM(m.humidity_status <> 'VALID'), 0) AS humidity_invalid_total,
       MIN(CASE WHEN m.humidity_status = 'VALID' THEN m.relative_humidity_pct END) AS humidity_minimum,
       AVG(CASE WHEN m.humidity_status = 'VALID' THEN m.relative_humidity_pct END) AS humidity_average,
       MAX(CASE WHEN m.humidity_status = 'VALID' THEN m.relative_humidity_pct END) AS humidity_maximum,
       COALESCE(SUM(m.illuminance_status = 'VALID'), 0) AS illuminance_valid_total,
       COALESCE(SUM(m.illuminance_status <> 'VALID'), 0) AS illuminance_invalid_total,
       MIN(CASE WHEN m.illuminance_status = 'VALID' THEN m.illuminance_lx END) AS illuminance_minimum,
       AVG(CASE WHEN m.illuminance_status = 'VALID' THEN m.illuminance_lx END) AS illuminance_average,
       MAX(CASE WHEN m.illuminance_status = 'VALID' THEN m.illuminance_lx END) AS illuminance_maximum
     FROM measurements m
     INNER JOIN classrooms c ON c.id = m.classroom_id
     WHERE c.code = ? AND ${timeWhere}`,
    [
      classroomCode,
      from,
      to,
      classroomCode,
      ...timeValues,
    ],
  );
  const row = rows[0];

  return {
    totalMeasurements: Number(row?.total_measurements ?? 0),
    synchronizedTotal: Number(row?.synchronized_total ?? 0),
    unsynchronizedReceivedTotal: Number(row?.unsynchronized_received_total ?? 0),
    flaggedTotal: Number(row?.flagged_total ?? 0),
    temperature: metricSummary(
      row?.temperature_valid_total ?? 0,
      row?.temperature_invalid_total ?? 0,
      row?.temperature_minimum ?? null,
      row?.temperature_average ?? null,
      row?.temperature_maximum ?? null,
    ),
    humidity: metricSummary(
      row?.humidity_valid_total ?? 0,
      row?.humidity_invalid_total ?? 0,
      row?.humidity_minimum ?? null,
      row?.humidity_average ?? null,
      row?.humidity_maximum ?? null,
    ),
    illuminance: metricSummary(
      row?.illuminance_valid_total ?? 0,
      row?.illuminance_invalid_total ?? 0,
      row?.illuminance_minimum ?? null,
      row?.illuminance_average ?? null,
      row?.illuminance_maximum ?? null,
    ),
  };
}

export async function getReportMeasurements(
  classroomCode: string,
  period: ReportPeriod,
  timeQuality: ReportTimeQuality,
  limit = REPORT_TABLE_LIMIT,
): Promise<MeasurementView[]> {
  const page = await listMeasurements({
    classroomCode,
    from: period.fromUtc,
    to: period.toExclusiveUtc,
    timeQuality,
    limit,
  });
  return page.measurements;
}

export async function getExportMeasurements(
  classroomCode: string,
  period: ReportPeriod,
  timeQuality: ReportTimeQuality,
): Promise<{ measurements: MeasurementView[]; exceededLimit: boolean }> {
  const measurements: MeasurementView[] = [];
  let cursor: MeasurementCursor | undefined;

  while (measurements.length <= REPORT_EXPORT_LIMIT) {
    const remaining = REPORT_EXPORT_LIMIT + 1 - measurements.length;
    const page = await listMeasurements({
      classroomCode,
      from: period.fromUtc,
      to: period.toExclusiveUtc,
      timeQuality,
      cursor,
      limit: Math.min(1000, remaining),
    });
    measurements.push(...page.measurements);
    const nextCursor = page.nextCursor
      ? decodeMeasurementCursor(page.nextCursor)
      : null;
    if (!nextCursor) {
      break;
    }
    cursor = nextCursor;
  }

  return {
    measurements: measurements.slice(0, REPORT_EXPORT_LIMIT),
    exceededLimit: measurements.length > REPORT_EXPORT_LIMIT,
  };
}
