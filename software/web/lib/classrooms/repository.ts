import "server-only";

import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";

import { getDatabasePool } from "@/lib/db";

import type { ClassroomCreate, ClassroomUpdate } from "./schema";

type ClassroomRow = RowDataPacket & {
  id: number;
  code: string;
  name: string;
  building: string | null;
  floor: string | null;
  device_public_id: string | null;
  device_name: string | null;
  installation_position: string | null;
  installation_height_cm: number | null;
  responsible: string | null;
  notes: string | null;
  last_measurement_at: Date | null;
};

export type Classroom = {
  code: string;
  name: string;
  building: string | null;
  floor: string | null;
  devicePublicId: string | null;
  deviceName: string | null;
  installationPosition: string | null;
  installationHeightCm: number | null;
  responsible: string | null;
  notes: string | null;
  lastMeasurementAt: string | null;
};

export type ClassroomDevice = Omit<Classroom, "devicePublicId" | "deviceName"> & { publicId: string; deviceName: string };

export class ClassroomNotFoundError extends Error {}
export class ClassroomCodeConflictError extends Error {}
export class ClassroomDeviceNotFoundError extends Error {}

function toClassroom(row: ClassroomRow): Classroom {
  return {
    code: row.code,
    name: row.name,
    building: row.building,
    floor: row.floor,
    devicePublicId: row.device_public_id,
    deviceName: row.device_name,
    installationPosition: row.installation_position,
    installationHeightCm: row.installation_height_cm,
    responsible: row.responsible,
    notes: row.notes,
    lastMeasurementAt: row.last_measurement_at?.toISOString() ?? null,
  };
}

const classroomSelect = `SELECT c.id, c.code, c.name, c.building, c.floor,
  d.public_id AS device_public_id, d.name AS device_name,
  a.installation_position, a.installation_height_cm, a.responsible, a.notes,
  (SELECT MAX(m.measured_at) FROM measurements m WHERE m.classroom_id = c.id) AS last_measurement_at
  FROM classrooms c
  LEFT JOIN device_classroom_assignments a ON a.classroom_id = c.id AND a.unassigned_at IS NULL
  LEFT JOIN devices d ON d.id = a.device_id`;

export async function listClassrooms(): Promise<Classroom[]> {
  const [rows] = await getDatabasePool().execute<ClassroomRow[]>(`${classroomSelect}
    WHERE c.active = TRUE ORDER BY c.code ASC`);
  return rows.map(toClassroom);
}

export async function getClassroom(code: string): Promise<Classroom | null> {
  const [rows] = await getDatabasePool().execute<ClassroomRow[]>(`${classroomSelect}
    WHERE c.code = ? AND c.active = TRUE LIMIT 1`, [code]);
  return rows[0] ? toClassroom(rows[0]) : null;
}

export async function getClassroomDevice(code: string): Promise<ClassroomDevice | null> {
  const classroom = await getClassroom(code);
  return classroom?.devicePublicId && classroom.deviceName ? { ...classroom, publicId: classroom.devicePublicId, deviceName: classroom.deviceName } : null;
}

export async function getClassroomDeviceForDevice(devicePublicId: string): Promise<ClassroomDevice | null> {
  const [rows] = await getDatabasePool().execute<ClassroomRow[]>(`${classroomSelect}
    WHERE d.public_id = ? AND c.active = TRUE LIMIT 1`, [devicePublicId]);
  const classroom = rows[0] ? toClassroom(rows[0]) : null;
  return classroom?.devicePublicId && classroom.deviceName ? { ...classroom, publicId: classroom.devicePublicId, deviceName: classroom.deviceName } : null;
}

export async function createClassroom(input: ClassroomCreate): Promise<Classroom> {
  const connection = await getDatabasePool().getConnection();
  try {
    await connection.beginTransaction();
    let classroomId: number;
    try {
      const [result] = await connection.execute<ResultSetHeader>(
        `INSERT INTO classrooms (code, name, building, floor) VALUES (?, ?, ?, ?)`,
        [input.code, input.name, input.building || null, input.floor || null],
      );
      classroomId = result.insertId;
    } catch (error: unknown) {
      if (typeof error === "object" && error && "code" in error && error.code === "ER_DUP_ENTRY") throw new ClassroomCodeConflictError();
      throw error;
    }

    if (input.device_id) {
      const [deviceRows] = await connection.execute<RowDataPacket[]>(
        "SELECT id FROM devices WHERE public_id = ? AND active = TRUE FOR UPDATE", [input.device_id],
      );
      const device = deviceRows[0];
      if (!device) throw new ClassroomDeviceNotFoundError();
      await connection.execute(`UPDATE device_classroom_assignments SET unassigned_at = CURRENT_TIMESTAMP(3)
        WHERE (device_id = ? OR classroom_id = ?) AND unassigned_at IS NULL`, [device.id, classroomId]);
      await connection.execute<ResultSetHeader>(`INSERT INTO device_classroom_assignments (
        device_id, classroom_id, installation_position, installation_height_cm, responsible, notes
      ) VALUES (?, ?, ?, ?, ?, ?)`, [device.id, classroomId, input.installation_position || null,
        input.installation_height_cm ?? null, input.responsible || null, input.notes || null]);
    }
    await connection.commit();
    return { code: input.code, name: input.name, building: input.building || null, floor: input.floor || null,
      devicePublicId: input.device_id || null, deviceName: null, installationPosition: input.installation_position || null,
      installationHeightCm: input.installation_height_cm ?? null, responsible: input.responsible || null,
      notes: input.notes || null, lastMeasurementAt: null };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally { connection.release(); }
}

export async function updateClassroom(code: string, input: ClassroomUpdate): Promise<Classroom> {
  const connection = await getDatabasePool().getConnection();
  try {
    await connection.beginTransaction();
    const [classroomRows] = await connection.execute<RowDataPacket[]>(
      "SELECT id FROM classrooms WHERE code = ? AND active = TRUE FOR UPDATE", [code],
    );
    const classroom = classroomRows[0];
    if (!classroom) throw new ClassroomNotFoundError();

    await connection.execute(
      "UPDATE classrooms SET name = ?, building = ?, floor = ? WHERE id = ?",
      [input.name, input.building, input.floor, classroom.id],
    );

    const [assignmentRows] = await connection.execute<RowDataPacket[]>(
      "SELECT id, device_id FROM device_classroom_assignments WHERE classroom_id = ? AND unassigned_at IS NULL FOR UPDATE",
      [classroom.id],
    );
    const assignment = assignmentRows[0];

    if (!input.device_id) {
      if (assignment) await connection.execute(
        "UPDATE device_classroom_assignments SET unassigned_at = CURRENT_TIMESTAMP(3) WHERE id = ?", [assignment.id],
      );
    } else {
      const [deviceRows] = await connection.execute<RowDataPacket[]>(
        "SELECT id, active FROM devices WHERE public_id = ? FOR UPDATE", [input.device_id],
      );
      const device = deviceRows[0];
      if (!device || (!device.active && assignment?.device_id !== device.id)) throw new ClassroomDeviceNotFoundError();

      if (assignment?.device_id === device.id) {
        await connection.execute(`UPDATE device_classroom_assignments
          SET installation_position = ?, installation_height_cm = ?, responsible = ?, notes = ? WHERE id = ?`,
          [input.installation_position, input.installation_height_cm, input.responsible, input.notes, assignment.id]);
      } else {
        await connection.execute(`UPDATE device_classroom_assignments SET unassigned_at = CURRENT_TIMESTAMP(3)
          WHERE (device_id = ? OR classroom_id = ?) AND unassigned_at IS NULL`, [device.id, classroom.id]);
        await connection.execute(`INSERT INTO device_classroom_assignments (
          device_id, classroom_id, installation_position, installation_height_cm, responsible, notes
        ) VALUES (?, ?, ?, ?, ?, ?)`, [device.id, classroom.id, input.installation_position,
          input.installation_height_cm, input.responsible, input.notes]);
      }
    }
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
  const classroom = await getClassroom(code);
  if (!classroom) throw new ClassroomNotFoundError();
  return classroom;
}
