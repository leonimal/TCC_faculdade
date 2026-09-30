import "server-only";

import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";

import { getDatabasePool } from "@/lib/db";

import type { DeviceCreate, DeviceUpdate } from "./schema";

type DeviceRow = RowDataPacket & {
  public_id: string;
  name: string;
  active: boolean | number;
  classroom_code: string | null;
  classroom_name: string | null;
};

export type Device = {
  publicId: string;
  name: string;
  active: boolean;
  classroomCode: string | null;
  classroomName: string | null;
};

export class DevicePublicIdConflictError extends Error {}
export class DeviceNotFoundError extends Error {}

function toDevice(row: DeviceRow): Device {
  return {
    publicId: row.public_id,
    name: row.name,
    active: Boolean(row.active),
    classroomCode: row.classroom_code,
    classroomName: row.classroom_name,
  };
}

const deviceSelect = `SELECT d.public_id, d.name, d.active,
  c.code AS classroom_code, c.name AS classroom_name
  FROM devices d
  LEFT JOIN device_classroom_assignments a ON a.device_id = d.id AND a.unassigned_at IS NULL
  LEFT JOIN classrooms c ON c.id = a.classroom_id AND c.active = TRUE`;

export async function listDevices(): Promise<Device[]> {
  const [rows] = await getDatabasePool().execute<DeviceRow[]>(`${deviceSelect} ORDER BY d.active DESC, d.public_id ASC`);
  return rows.map(toDevice);
}

export async function getDevice(publicId: string): Promise<Device | null> {
  const [rows] = await getDatabasePool().execute<DeviceRow[]>(`${deviceSelect}
    WHERE d.public_id = ? LIMIT 1`, [publicId]);
  return rows[0] ? toDevice(rows[0]) : null;
}

export async function createDevice(input: DeviceCreate): Promise<Device> {
  try {
    await getDatabasePool().execute<ResultSetHeader>(
      "INSERT INTO devices (public_id, name) VALUES (?, ?)",
      [input.public_id, input.name],
    );
  } catch (error: unknown) {
    if (typeof error === "object" && error && "code" in error && error.code === "ER_DUP_ENTRY") {
      throw new DevicePublicIdConflictError();
    }
    throw error;
  }

  return {
    publicId: input.public_id,
    name: input.name,
    active: true,
    classroomCode: null,
    classroomName: null,
  };
}

export async function updateDevice(publicId: string, input: DeviceUpdate): Promise<Device> {
  const [result] = await getDatabasePool().execute<ResultSetHeader>(
    "UPDATE devices SET name = ?, active = ? WHERE public_id = ?", [input.name, input.active, publicId],
  );
  if (result.affectedRows === 0) throw new DeviceNotFoundError();
  const device = await getDevice(publicId);
  if (!device) throw new DeviceNotFoundError();
  return device;
}
