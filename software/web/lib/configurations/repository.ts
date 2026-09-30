import "server-only";

import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";

import { getDatabasePool } from "@/lib/db";

import type {
  ConfigurationAcknowledgement,
  ConfigurationPatch,
} from "./schema";

export type ConfigurationStatus =
  | "PENDING"
  | "APPLIED"
  | "REJECTED"
  | "SUPERSEDED";

export type DeviceConfiguration = {
  version: number;
  samplingIntervalSeconds: number;
  status: ConfigurationStatus;
  requestedBy: string;
  requestedAt: Date;
  acknowledgedAt: Date | null;
  rejectionReason: string | null;
};

type DeviceRow = RowDataPacket & { id: number };
type ConfigurationRow = RowDataPacket & {
  version: number;
  sampling_interval_seconds: number;
  status: ConfigurationStatus;
  requested_by: string;
  requested_at: Date;
  acknowledged_at: Date | null;
  rejection_reason: string | null;
};
type ConfigurationWithIdRow = ConfigurationRow & { id: number };

export class DeviceNotFoundError extends Error {}
export class ActiveExperimentalRunError extends Error {}
export class ConfigurationNotFoundError extends Error {}
export class ConfigurationSupersededError extends Error {}
export class ConfigurationAcknowledgementConflictError extends Error {}

function toConfiguration(row: ConfigurationRow): DeviceConfiguration {
  return {
    version: Number(row.version),
    samplingIntervalSeconds: Number(row.sampling_interval_seconds),
    status: row.status,
    requestedBy: row.requested_by,
    requestedAt: row.requested_at,
    acknowledgedAt: row.acknowledged_at,
    rejectionReason: row.rejection_reason,
  };
}

export async function getLatestDeviceConfiguration(
  devicePublicId: string,
): Promise<DeviceConfiguration | null> {
  const [rows] = await getDatabasePool().execute<ConfigurationRow[]>(
    `SELECT
      c.version,
      c.sampling_interval_seconds,
      c.status,
      c.requested_by,
      c.requested_at,
      c.acknowledged_at,
      c.rejection_reason
    FROM sampling_configurations c
    INNER JOIN devices d ON d.id = c.device_id
    WHERE d.public_id = ?
      AND d.active = TRUE
      AND c.status IN ('PENDING', 'APPLIED')
    ORDER BY c.version DESC
    LIMIT 1`,
    [devicePublicId],
  );

  return rows[0] ? toConfiguration(rows[0]) : null;
}

export async function createDeviceConfiguration(
  devicePublicId: string,
  patch: ConfigurationPatch,
): Promise<{
  configuration: DeviceConfiguration;
  previousAppliedVersion: number | null;
}> {
  const connection = await getDatabasePool().getConnection();

  try {
    await connection.beginTransaction();

    const [deviceRows] = await connection.execute<DeviceRow[]>(
      "SELECT id FROM devices WHERE public_id = ? AND active = TRUE FOR UPDATE",
      [devicePublicId],
    );
    const device = deviceRows[0];
    if (!device) {
      throw new DeviceNotFoundError();
    }

    const [activeRuns] = await connection.execute<RowDataPacket[]>(
      `SELECT id FROM experimental_runs
        WHERE device_id = ? AND status = 'ACTIVE'
        LIMIT 1`,
      [device.id],
    );
    if (activeRuns[0]) {
      throw new ActiveExperimentalRunError();
    }

    const [latestRows] = await connection.execute<ConfigurationRow[]>(
      `SELECT
        version,
        sampling_interval_seconds,
        status,
        requested_by,
        requested_at,
        acknowledged_at,
        rejection_reason
      FROM sampling_configurations
      WHERE device_id = ?
      ORDER BY version DESC
      LIMIT 1`,
      [device.id],
    );
    const nextVersion = Number(latestRows[0]?.version ?? 0) + 1;

    const [appliedRows] = await connection.execute<ConfigurationRow[]>(
      `SELECT
        version,
        sampling_interval_seconds,
        status,
        requested_by,
        requested_at,
        acknowledged_at,
        rejection_reason
      FROM sampling_configurations
      WHERE device_id = ? AND status = 'APPLIED'
      ORDER BY version DESC
      LIMIT 1`,
      [device.id],
    );

    await connection.execute<ResultSetHeader>(
      `UPDATE sampling_configurations
          SET status = 'SUPERSEDED'
        WHERE device_id = ? AND status = 'PENDING'`,
      [device.id],
    );

    await connection.execute<ResultSetHeader>(
      `INSERT INTO sampling_configurations (
        device_id, version, sampling_interval_seconds, status, requested_by
      ) VALUES (?, ?, ?, 'PENDING', ?)`,
      [
        device.id,
        nextVersion,
        patch.sampling_interval_seconds,
        patch.requested_by,
      ],
    );

    const [createdRows] = await connection.execute<ConfigurationRow[]>(
      `SELECT
        version,
        sampling_interval_seconds,
        status,
        requested_by,
        requested_at,
        acknowledged_at,
        rejection_reason
      FROM sampling_configurations
      WHERE device_id = ? AND version = ?`,
      [device.id, nextVersion],
    );

    await connection.commit();
    return {
      configuration: toConfiguration(createdRows[0]),
      previousAppliedVersion: appliedRows[0]
        ? Number(appliedRows[0].version)
        : null,
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function acknowledgeDeviceConfiguration(
  devicePublicId: string,
  acknowledgement: ConfigurationAcknowledgement,
): Promise<{
  configuration: DeviceConfiguration;
  acknowledgementStatus: "RECORDED" | "ALREADY_RECORDED";
}> {
  const connection = await getDatabasePool().getConnection();

  try {
    await connection.beginTransaction();

    const [deviceRows] = await connection.execute<DeviceRow[]>(
      "SELECT id FROM devices WHERE public_id = ? AND active = TRUE FOR UPDATE",
      [devicePublicId],
    );
    const device = deviceRows[0];
    if (!device) {
      throw new DeviceNotFoundError();
    }

    const [configurationRows] = await connection.execute<
      ConfigurationWithIdRow[]
    >(
      `SELECT
        id,
        version,
        sampling_interval_seconds,
        status,
        requested_by,
        requested_at,
        acknowledged_at,
        rejection_reason
      FROM sampling_configurations
      WHERE device_id = ? AND version = ?
      FOR UPDATE`,
      [device.id, acknowledgement.version],
    );
    const configuration = configurationRows[0];
    if (!configuration) {
      throw new ConfigurationNotFoundError();
    }
    const rejectionReason =
      acknowledgement.status === "REJECTED"
        ? (acknowledgement.rejection_reason ?? null)
        : null;

    if (configuration.status === "SUPERSEDED") {
      throw new ConfigurationSupersededError();
    }

    if (configuration.status !== "PENDING") {
      const sameRejectionReason =
        configuration.status !== "REJECTED" ||
        configuration.rejection_reason === rejectionReason;

      if (
        configuration.status === acknowledgement.status &&
        sameRejectionReason
      ) {
        await connection.commit();
        return {
          configuration: toConfiguration(configuration),
          acknowledgementStatus: "ALREADY_RECORDED",
        };
      }

      throw new ConfigurationAcknowledgementConflictError();
    }

    if (acknowledgement.status === "APPLIED") {
      const [activeRuns] = await connection.execute<RowDataPacket[]>(
        `SELECT id FROM experimental_runs
          WHERE device_id = ? AND status = 'ACTIVE'
          LIMIT 1`,
        [device.id],
      );
      if (activeRuns[0]) {
        throw new ActiveExperimentalRunError();
      }

      await connection.execute<ResultSetHeader>(
        `UPDATE sampling_configurations
            SET status = 'SUPERSEDED'
          WHERE device_id = ? AND status = 'APPLIED' AND id <> ?`,
        [device.id, configuration.id],
      );
    }

    await connection.execute<ResultSetHeader>(
      `UPDATE sampling_configurations
          SET status = ?,
              acknowledged_at = CURRENT_TIMESTAMP(3),
              rejection_reason = ?
        WHERE id = ?`,
      [
        acknowledgement.status,
        rejectionReason,
        configuration.id,
      ],
    );

    const [updatedRows] = await connection.execute<ConfigurationRow[]>(
      `SELECT
        version,
        sampling_interval_seconds,
        status,
        requested_by,
        requested_at,
        acknowledged_at,
        rejection_reason
      FROM sampling_configurations
      WHERE id = ?`,
      [configuration.id],
    );

    await connection.commit();
    return {
      configuration: toConfiguration(updatedRows[0]),
      acknowledgementStatus: "RECORDED",
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
