import "server-only";

import type { RowDataPacket } from "mysql2/promise";

import { getDatabasePool } from "@/lib/db";
import {
  hasQueueWarning,
  queueOccupancyPercent,
} from "@/lib/device-status/schema";

type DeviceRow = RowDataPacket & {
  public_id: string;
  name: string;
};

type StatusRow = RowDataPacket & {
  observed_at: Date | null;
  received_at: Date;
  firmware_version: string;
  connection_status: "ONLINE" | "OFFLINE";
  queue_depth: number;
  queue_capacity: number;
  dropped_total: string | number;
  last_confirmed_at: Date | null;
  time_sync_status: "SYNCED" | "UNSYNCED";
};

type DeliverySummaryRow = RowDataPacket & {
  confirmed_total: string | number;
  rejected_total: string | number;
};

type ConfigurationRow = RowDataPacket & {
  version: number;
  sampling_interval_seconds: number;
  status: "PENDING" | "APPLIED" | "REJECTED" | "SUPERSEDED";
};

export type DashboardDevice = {
  publicId: string;
  name: string;
};

export type DashboardDeviceStatus = {
  observedAt: string | null;
  receivedAt: string;
  firmwareVersion: string;
  connectionStatus: "ONLINE" | "OFFLINE";
  queueDepth: number;
  queueCapacity: number;
  queueOccupancyPercent: number;
  queueWarning: boolean;
  droppedTotal: number;
  lastConfirmedAt: string | null;
  timeSyncStatus: "SYNCED" | "UNSYNCED";
};

export type DashboardDeliverySummary = {
  confirmedTotal: number;
  rejectedTotal: number;
};

export type DashboardConfiguration = {
  version: number;
  samplingIntervalSeconds: number;
  status: "PENDING" | "APPLIED" | "REJECTED" | "SUPERSEDED";
};

export async function getPrimaryDashboardDevice(): Promise<DashboardDevice | null> {
  const [rows] = await getDatabasePool().execute<DeviceRow[]>(
    `SELECT d.public_id, d.name
     FROM devices d
     LEFT JOIN (
       SELECT device_id, MAX(first_received_at) AS last_measurement_at
       FROM measurements
       GROUP BY device_id
     ) m ON m.device_id = d.id
     LEFT JOIN (
       SELECT device_id, MAX(received_at) AS last_status_at
       FROM device_status_reports
       GROUP BY device_id
     ) s ON s.device_id = d.id
     WHERE d.active = TRUE
     ORDER BY GREATEST(
       COALESCE(m.last_measurement_at, '1000-01-01 00:00:00'),
       COALESCE(s.last_status_at, '1000-01-01 00:00:00'),
       d.created_at
     ) DESC, d.id ASC
     LIMIT 1`,
  );

  const device = rows[0];
  return device ? { publicId: device.public_id, name: device.name } : null;
}

export async function getLatestDeviceStatus(
  devicePublicId: string,
): Promise<DashboardDeviceStatus | null> {
  const [rows] = await getDatabasePool().execute<StatusRow[]>(
    `SELECT
       s.observed_at,
       s.received_at,
       s.firmware_version,
       s.connection_status,
       s.queue_depth,
       s.queue_capacity,
       s.dropped_total,
       s.last_confirmed_at,
       s.time_sync_status
     FROM device_status_reports s
     INNER JOIN devices d ON d.id = s.device_id
     WHERE d.public_id = ? AND d.active = TRUE
     ORDER BY s.received_at DESC, s.id DESC
     LIMIT 1`,
    [devicePublicId],
  );

  const status = rows[0];
  if (!status) {
    return null;
  }

  const queueDepth = Number(status.queue_depth);
  return {
    observedAt: status.observed_at?.toISOString() ?? null,
    receivedAt: status.received_at.toISOString(),
    firmwareVersion: status.firmware_version,
    connectionStatus: status.connection_status,
    queueDepth,
    queueCapacity: Number(status.queue_capacity),
    queueOccupancyPercent: queueOccupancyPercent(queueDepth),
    queueWarning: hasQueueWarning(queueDepth),
    droppedTotal: Number(status.dropped_total),
    lastConfirmedAt: status.last_confirmed_at?.toISOString() ?? null,
    timeSyncStatus: status.time_sync_status,
  };
}

export async function getDeliverySummary(
  devicePublicId: string,
): Promise<DashboardDeliverySummary> {
  const [rows] = await getDatabasePool().execute<DeliverySummaryRow[]>(
    `SELECT
       COALESCE(SUM(a.outcome IN ('STORED', 'ALREADY_STORED')), 0) AS confirmed_total,
       COALESCE(SUM(a.outcome IN ('REJECTED', 'INTEGRITY_CONFLICT', 'SERVER_ERROR')), 0) AS rejected_total
     FROM ingestion_attempts a
     INNER JOIN devices d ON d.id = a.device_id
     WHERE d.public_id = ?`,
    [devicePublicId],
  );

  return {
    confirmedTotal: Number(rows[0]?.confirmed_total ?? 0),
    rejectedTotal: Number(rows[0]?.rejected_total ?? 0),
  };
}

export async function getCurrentConfiguration(
  devicePublicId: string,
): Promise<DashboardConfiguration | null> {
  const [rows] = await getDatabasePool().execute<ConfigurationRow[]>(
    `SELECT c.version, c.sampling_interval_seconds, c.status
     FROM sampling_configurations c
     INNER JOIN devices d ON d.id = c.device_id
     WHERE d.public_id = ? AND c.status IN ('PENDING', 'APPLIED')
     ORDER BY (c.status = 'PENDING') DESC, c.version DESC
     LIMIT 1`,
    [devicePublicId],
  );

  const configuration = rows[0];
  return configuration
    ? {
        version: Number(configuration.version),
        samplingIntervalSeconds: Number(
          configuration.sampling_interval_seconds,
        ),
        status: configuration.status,
      }
    : null;
}
