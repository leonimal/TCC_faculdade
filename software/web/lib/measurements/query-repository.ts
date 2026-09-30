import "server-only";

import type { RowDataPacket } from "mysql2/promise";

import { getDatabasePool } from "@/lib/db";

import {
  encodeMeasurementCursor,
  type MeasurementCursor,
  type MeasurementQuery,
} from "./query";

type MeasurementRow = RowDataPacket & {
  measurement_id: string;
  device_id: string;
  boot_id: string;
  sequence_number: number;
  run_id: string | null;
  configuration_version: number;
  measured_at: Date | null;
  device_uptime_ms: number;
  time_sync_status: "SYNCED" | "UNSYNCED";
  temperature_c: string | null;
  temperature_status: string;
  relative_humidity_pct: string | null;
  humidity_status: string;
  illuminance_lx: string | null;
  illuminance_status: string;
  first_received_at: Date;
  has_flags: number;
};

export type MeasurementView = {
  measurement_id: string;
  device_id: string;
  boot_id: string;
  sequence_number: number;
  run_id: string | null;
  configuration_version: number;
  measured_at: string | null;
  device_uptime_ms: number;
  time_sync_status: "SYNCED" | "UNSYNCED";
  readings: {
    temperature_c: { value: number | null; status: string };
    relative_humidity_pct: { value: number | null; status: string };
    illuminance_lx: { value: number | null; status: string };
  };
  first_received_at: string;
  has_flags: boolean;
};

export type MeasurementPage = {
  measurements: MeasurementView[];
  nextCursor: string | null;
};

function cursorCondition(cursor: MeasurementCursor): {
  sql: string;
  values: (string | number | Date)[];
} {
  const secondarySql = `(m.boot_id < ? OR (
    m.boot_id = ? AND (
      m.sequence_number < ? OR (
        m.sequence_number = ? AND m.measurement_id < ?
      )
    )
  ))`;
  const secondaryValues = [
    cursor.bootId,
    cursor.bootId,
    cursor.sequenceNumber,
    cursor.sequenceNumber,
    cursor.measurementId,
  ];

  if (cursor.measuredAt === null) {
    return {
      sql: `(m.measured_at IS NULL AND ${secondarySql})`,
      values: secondaryValues,
    };
  }

  const measuredAt = new Date(cursor.measuredAt);
  return {
    sql: `((m.measured_at IS NOT NULL AND (
      m.measured_at < ? OR (m.measured_at = ? AND ${secondarySql})
    )) OR m.measured_at IS NULL)`,
    values: [measuredAt, measuredAt, ...secondaryValues],
  };
}

function nullableNumber(value: string | null): number | null {
  return value === null ? null : Number(value);
}

function toView(row: MeasurementRow): MeasurementView {
  return {
    measurement_id: row.measurement_id,
    device_id: row.device_id,
    boot_id: row.boot_id,
    sequence_number: Number(row.sequence_number),
    run_id: row.run_id,
    configuration_version: Number(row.configuration_version),
    measured_at: row.measured_at?.toISOString() ?? null,
    device_uptime_ms: Number(row.device_uptime_ms),
    time_sync_status: row.time_sync_status,
    readings: {
      temperature_c: {
        value: nullableNumber(row.temperature_c),
        status: row.temperature_status,
      },
      relative_humidity_pct: {
        value: nullableNumber(row.relative_humidity_pct),
        status: row.humidity_status,
      },
      illuminance_lx: {
        value: nullableNumber(row.illuminance_lx),
        status: row.illuminance_status,
      },
    },
    first_received_at: row.first_received_at.toISOString(),
    has_flags: Boolean(row.has_flags),
  };
}

export async function listMeasurements(
  query: MeasurementQuery,
): Promise<MeasurementPage> {
  const where: string[] = [];
  const values: (string | number | Date | null)[] = [];

  if (query.deviceId) {
    where.push("d.public_id = ?");
    values.push(query.deviceId);
  }
  if (query.classroomCode) {
    where.push("c.code = ?");
    values.push(query.classroomCode);
  }
  if (query.runId) {
    where.push("m.run_id = ?");
    values.push(query.runId);
  }
  if (query.timeQuality && query.from && query.to) {
    const from = new Date(query.from);
    const to = new Date(query.to);
    if (query.timeQuality === "SYNCHRONIZED") {
      where.push("m.time_sync_status = 'SYNCED' AND m.measured_at >= ? AND m.measured_at < ?");
      values.push(from, to);
    } else if (query.timeQuality === "UNSYNCHRONIZED") {
      where.push("m.time_sync_status = 'UNSYNCED' AND m.first_received_at >= ? AND m.first_received_at < ?");
      values.push(from, to);
    } else {
      where.push("((m.time_sync_status = 'SYNCED' AND m.measured_at >= ? AND m.measured_at < ?) OR (m.time_sync_status = 'UNSYNCED' AND m.first_received_at >= ? AND m.first_received_at < ?))");
      values.push(from, to, from, to);
    }
  } else {
    if (query.from) {
      where.push("m.measured_at >= ?");
      values.push(new Date(query.from));
    }
    if (query.to) {
      where.push("m.measured_at < ?");
      values.push(new Date(query.to));
    }
  }
  if (query.cursor) {
    const condition = cursorCondition(query.cursor);
    where.push(condition.sql);
    values.push(...condition.values);
  }

  const whereSql = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";
  values.push(query.limit + 1);

  const [rows] = await getDatabasePool().execute<MeasurementRow[]>(
    `SELECT
      m.measurement_id,
      d.public_id AS device_id,
      m.boot_id,
      m.sequence_number,
      m.run_id,
      m.configuration_version,
      m.measured_at,
      m.device_uptime_ms,
      m.time_sync_status,
      m.temperature_c,
      m.temperature_status,
      m.relative_humidity_pct,
      m.humidity_status,
      m.illuminance_lx,
      m.illuminance_status,
      m.first_received_at,
      EXISTS(
        SELECT 1 FROM measurement_flags f
        WHERE f.measurement_id = m.measurement_id
      ) AS has_flags
    FROM measurements m
    INNER JOIN devices d ON d.id = m.device_id
    LEFT JOIN classrooms c ON c.id = m.classroom_id
    ${whereSql}
    ORDER BY
      m.measured_at IS NULL ASC,
      m.measured_at DESC,
      m.boot_id DESC,
      m.sequence_number DESC,
      m.measurement_id DESC
    LIMIT ?`,
    values,
  );

  const hasNextPage = rows.length > query.limit;
  const pageRows = rows.slice(0, query.limit);
  const lastRow = pageRows.at(-1);
  const nextCursor =
    hasNextPage && lastRow
      ? encodeMeasurementCursor({
          measuredAt: lastRow.measured_at?.toISOString() ?? null,
          bootId: lastRow.boot_id,
          sequenceNumber: Number(lastRow.sequence_number),
          measurementId: lastRow.measurement_id,
        })
      : null;

  return { measurements: pageRows.map(toView), nextCursor };
}
