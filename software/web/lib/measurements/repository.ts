import "server-only";

import type { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";

import { getDatabasePool } from "@/lib/db";
import { recordLocalMonitoringOccurrences } from "@/lib/local-monitoring/repository";

import type { MeasurementPayload } from "./schema";

export type IngestionOutcome = "STORED" | "ALREADY_STORED" | "INTEGRITY_CONFLICT";

export type IngestionRecord = {
  payload: MeasurementPayload;
  payloadHash: string;
  requestId: string;
  receivedAt: Date;
};

export type IngestionResult = {
  outcome: IngestionOutcome;
  firstReceivedAt: Date;
};

export class MeasurementReferenceError extends Error {
  constructor(
    public readonly field: string,
    public readonly reason: string,
  ) {
    super(reason);
  }
}

export interface MeasurementRepository {
  ingest(record: IngestionRecord): Promise<IngestionResult>;
}

type DeviceRow = RowDataPacket & { id: number };
type AssignmentRow = RowDataPacket & { classroom_id: number | null };
type ExistingMeasurementRow = RowDataPacket & {
  measurement_id: string;
  payload_hash: string;
  first_received_at: Date;
};

async function recordAttempt(
  connection: PoolConnection,
  record: IngestionRecord,
  deviceId: number | null,
  outcome: IngestionOutcome,
  httpStatus: number,
): Promise<void> {
  const { measurement, delivery } = record.payload;

  await connection.execute<ResultSetHeader>(
    `INSERT INTO ingestion_attempts (
      claimed_measurement_id, device_id, received_at, delivery_mode, sent_at,
      queue_depth_before_send, queue_capacity, dropped_total, payload_hash,
      outcome, http_status, request_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      measurement.measurement_id,
      deviceId,
      record.receivedAt,
      delivery.mode,
      delivery.sent_at ? new Date(delivery.sent_at) : null,
      delivery.queue_depth_before_send,
      delivery.queue_capacity,
      delivery.dropped_total,
      record.payloadHash,
      outcome,
      httpStatus,
      record.requestId,
    ],
  );
}

async function findExisting(
  connection: PoolConnection,
  measurementId: string,
): Promise<ExistingMeasurementRow | undefined> {
  const [rows] = await connection.execute<ExistingMeasurementRow[]>(
    `SELECT measurement_id, payload_hash, first_received_at
       FROM measurements
      WHERE measurement_id = ?
      FOR UPDATE`,
    [measurementId],
  );

  return rows[0];
}

export class MysqlMeasurementRepository implements MeasurementRepository {
  async ingest(record: IngestionRecord): Promise<IngestionResult> {
    const connection = await getDatabasePool().getConnection();
    const { measurement } = record.payload;

    try {
      await connection.beginTransaction();

      const [deviceRows] = await connection.execute<DeviceRow[]>(
        "SELECT id FROM devices WHERE public_id = ? AND active = TRUE",
        [measurement.device_id],
      );
      const device = deviceRows[0];

      if (!device) {
        throw new MeasurementReferenceError(
          "measurement.device_id",
          "device_not_registered_or_inactive",
        );
      }

      const [assignmentRows] = await connection.execute<AssignmentRow[]>(
        `SELECT classroom_id FROM device_classroom_assignments
          WHERE device_id = ? AND unassigned_at IS NULL
          ORDER BY assigned_at DESC, id DESC LIMIT 1`,
        [device.id],
      );
      const classroomId = assignmentRows[0]?.classroom_id ?? null;

      const [configurationRows] = await connection.execute<RowDataPacket[]>(
        `SELECT id FROM sampling_configurations
          WHERE device_id = ? AND version = ?`,
        [device.id, measurement.configuration_version],
      );

      if (!configurationRows[0]) {
        throw new MeasurementReferenceError(
          "measurement.configuration_version",
          "configuration_not_registered",
        );
      }

      if (measurement.run_id) {
        const [runRows] = await connection.execute<RowDataPacket[]>(
          `SELECT id FROM experimental_runs
            WHERE id = ? AND device_id = ? AND configuration_id = ?`,
          [measurement.run_id, device.id, configurationRows[0].id],
        );

        if (!runRows[0]) {
          throw new MeasurementReferenceError(
            "measurement.run_id",
            "run_not_registered_for_device_and_configuration",
          );
        }
      }

      const existing = await findExisting(
        connection,
        measurement.measurement_id,
      );

      if (existing) {
        const outcome =
          existing.payload_hash === record.payloadHash
            ? "ALREADY_STORED"
            : "INTEGRITY_CONFLICT";
        await recordAttempt(
          connection,
          record,
          device.id,
          outcome,
          outcome === "ALREADY_STORED" ? 200 : 409,
        );
        await connection.commit();

        return { outcome, firstReceivedAt: existing.first_received_at };
      }

      const [sequenceRows] = await connection.execute<ExistingMeasurementRow[]>(
        `SELECT measurement_id, payload_hash, first_received_at
           FROM measurements
          WHERE device_id = ? AND boot_id = ? AND sequence_number = ?
          FOR UPDATE`,
        [device.id, measurement.boot_id, measurement.sequence_number],
      );

      if (sequenceRows[0]) {
        await recordAttempt(
          connection,
          record,
          device.id,
          "INTEGRITY_CONFLICT",
          409,
        );
        await connection.commit();

        return {
          outcome: "INTEGRITY_CONFLICT",
          firstReceivedAt: sequenceRows[0].first_received_at,
        };
      }

      const readings = measurement.readings;
      await connection.execute<ResultSetHeader>(
        `INSERT INTO measurements (
          measurement_id, device_id, classroom_id, boot_id, sequence_number, run_id,
          configuration_version, measured_at, device_uptime_ms,
          time_sync_status, temperature_c, temperature_status,
          relative_humidity_pct, humidity_status, illuminance_lx,
          illuminance_status, payload_hash, raw_payload, first_received_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          measurement.measurement_id,
          device.id,
          classroomId,
          measurement.boot_id,
          measurement.sequence_number,
          measurement.run_id,
          measurement.configuration_version,
          measurement.measured_at ? new Date(measurement.measured_at) : null,
          measurement.device_uptime_ms,
          measurement.time_sync_status,
          readings.temperature_c.value,
          readings.temperature_c.status,
          readings.relative_humidity_pct.value,
          readings.relative_humidity_pct.status,
          readings.illuminance_lx.value,
          readings.illuminance_lx.status,
          record.payloadHash,
          JSON.stringify(record.payload),
          record.receivedAt,
        ],
      );

      await recordLocalMonitoringOccurrences(connection, {
        deviceId: device.id,
        classroomId,
        measurementId: measurement.measurement_id,
        measuredAt: measurement.measured_at
          ? new Date(measurement.measured_at)
          : null,
        readings,
      });

      await recordAttempt(connection, record, device.id, "STORED", 201);
      await connection.commit();

      return { outcome: "STORED", firstReceivedAt: record.receivedAt };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}
