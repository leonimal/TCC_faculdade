import "server-only";

import type { ResultSetHeader } from "mysql2/promise";

import { getDatabasePool } from "@/lib/db";

import type { DeviceStatusPayload } from "./schema";

export class DeviceNotFoundError extends Error {}

export type StoredDeviceStatus = {
  reportId: string;
  receivedAt: Date;
};

export async function storeDeviceStatus(
  devicePublicId: string,
  status: DeviceStatusPayload,
  receivedAt: Date,
): Promise<StoredDeviceStatus> {
  const [result] = await getDatabasePool().execute<ResultSetHeader>(
    `INSERT INTO device_status_reports (
      device_id, observed_at, received_at, firmware_version,
      connection_status, queue_depth, queue_capacity, dropped_total,
      last_confirmed_at, time_sync_status, details
    )
    SELECT
      id, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    FROM devices
    WHERE public_id = ? AND active = TRUE`,
    [
      status.observed_at ? new Date(status.observed_at) : null,
      receivedAt,
      status.firmware_version,
      status.connection_status,
      status.queue_depth,
      status.queue_capacity,
      status.dropped_total,
      status.last_confirmed_at ? new Date(status.last_confirmed_at) : null,
      status.time_sync_status,
      status.details == null ? null : JSON.stringify(status.details),
      devicePublicId,
    ],
  );

  if (result.affectedRows === 0) {
    throw new DeviceNotFoundError();
  }

  return { reportId: String(result.insertId), receivedAt };
}
