import "server-only";

import type {
  PoolConnection,
  ResultSetHeader,
  RowDataPacket,
} from "mysql2/promise";

import { getDatabasePool } from "@/lib/db";
import type { MeasurementPayload } from "@/lib/measurements/schema";

import type {
  LocalMonitoringProfilePatch,
  LocalMonitoringVariable,
} from "./schema";
import { classifyLocalReading } from "./logic";

export type LocalMonitoringProfileStatus =
  | "ENABLED"
  | "DISABLED"
  | "SUPERSEDED";

export type LocalMonitoringRule = {
  variable: LocalMonitoringVariable;
  lowerLimit: number;
  upperLimit: number;
};

export type LocalMonitoringProfile = {
  version: number;
  status: LocalMonitoringProfileStatus;
  requestedBy: string;
  justification: string;
  sourceReference: string | null;
  effectiveAt: Date;
  rules: LocalMonitoringRule[];
};

export type LocalMonitoringOccurrence = {
  id: number;
  classroomCode: string;
  classroomName: string;
  measurementId: string;
  profileVersion: number;
  variable: LocalMonitoringVariable;
  direction: "BELOW" | "ABOVE";
  observedValue: number;
  lowerLimit: number;
  upperLimit: number;
  occurredAt: Date;
};

type DeviceRow = RowDataPacket & { id: number };
type ProfileRow = RowDataPacket & {
  id: number;
  version: number;
  status: LocalMonitoringProfileStatus;
  requested_by: string;
  justification: string;
  source_reference: string | null;
  effective_at: Date;
};
type RuleRow = RowDataPacket & {
  id: number;
  variable: LocalMonitoringVariable;
  lower_limit: string | number;
  upper_limit: string | number;
};
type OccurrenceRow = RowDataPacket & {
  id: number;
  classroom_code: string;
  classroom_name: string;
  measurement_id: string;
  profile_version: number;
  variable: LocalMonitoringVariable;
  direction: "BELOW" | "ABOVE";
  observed_value: string | number;
  lower_limit: string | number;
  upper_limit: string | number;
  occurred_at: Date;
};

export class LocalMonitoringDeviceNotFoundError extends Error {}
export class LocalMonitoringActiveExperimentalRunError extends Error {}

function toRule(row: RuleRow): LocalMonitoringRule {
  return {
    variable: row.variable,
    lowerLimit: Number(row.lower_limit),
    upperLimit: Number(row.upper_limit),
  };
}

async function getRulesForProfile(profileId: number): Promise<LocalMonitoringRule[]> {
  const [rows] = await getDatabasePool().execute<RuleRow[]>(
    `SELECT variable, lower_limit, upper_limit
       FROM local_monitoring_rules
      WHERE profile_id = ?
      ORDER BY FIELD(variable, 'TEMPERATURE_C', 'RELATIVE_HUMIDITY_PCT', 'ILLUMINANCE_LX')`,
    [profileId],
  );
  return rows.map(toRule);
}

async function toProfile(profile: ProfileRow): Promise<LocalMonitoringProfile> {
  return {
    version: Number(profile.version),
    status: profile.status,
    requestedBy: profile.requested_by,
    justification: profile.justification,
    sourceReference: profile.source_reference,
    effectiveAt: profile.effective_at,
    rules: await getRulesForProfile(profile.id),
  };
}

export async function getLatestLocalMonitoringProfile(
  devicePublicId: string,
): Promise<LocalMonitoringProfile | null> {
  const [rows] = await getDatabasePool().execute<ProfileRow[]>(
    `SELECT p.id, p.version, p.status, p.requested_by, p.justification,
            p.source_reference, p.effective_at
       FROM local_monitoring_profiles p
       INNER JOIN devices d ON d.id = p.device_id
      WHERE d.public_id = ? AND d.active = TRUE AND p.status <> 'SUPERSEDED'
      ORDER BY p.version DESC
      LIMIT 1`,
    [devicePublicId],
  );
  return rows[0] ? toProfile(rows[0]) : null;
}

export async function createLocalMonitoringProfile(
  devicePublicId: string,
  patch: LocalMonitoringProfilePatch,
): Promise<LocalMonitoringProfile> {
  const connection = await getDatabasePool().getConnection();

  try {
    await connection.beginTransaction();
    const [deviceRows] = await connection.execute<DeviceRow[]>(
      "SELECT id FROM devices WHERE public_id = ? AND active = TRUE FOR UPDATE",
      [devicePublicId],
    );
    const device = deviceRows[0];
    if (!device) {
      throw new LocalMonitoringDeviceNotFoundError();
    }

    const [activeRuns] = await connection.execute<RowDataPacket[]>(
      `SELECT id FROM experimental_runs
        WHERE device_id = ? AND status = 'ACTIVE'
        LIMIT 1`,
      [device.id],
    );
    if (activeRuns[0]) {
      throw new LocalMonitoringActiveExperimentalRunError();
    }

    const [versionRows] = await connection.execute<ProfileRow[]>(
      `SELECT id, version, status, requested_by, justification, source_reference, effective_at
         FROM local_monitoring_profiles
        WHERE device_id = ?
        ORDER BY version DESC
        LIMIT 1
        FOR UPDATE`,
      [device.id],
    );
    const nextVersion = Number(versionRows[0]?.version ?? 0) + 1;

    await connection.execute<ResultSetHeader>(
      `UPDATE local_monitoring_profiles
          SET status = 'SUPERSEDED'
        WHERE device_id = ? AND status IN ('ENABLED', 'DISABLED')`,
      [device.id],
    );

    const [inserted] = await connection.execute<ResultSetHeader>(
      `INSERT INTO local_monitoring_profiles (
        device_id, version, status, requested_by, justification, source_reference
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        device.id,
        nextVersion,
        patch.enabled ? "ENABLED" : "DISABLED",
        patch.requested_by,
        patch.justification,
        patch.source_reference ?? null,
      ],
    );

    for (const rule of patch.rules ?? []) {
      await connection.execute<ResultSetHeader>(
        `INSERT INTO local_monitoring_rules (
          profile_id, variable, lower_limit, upper_limit
        ) VALUES (?, ?, ?, ?)`,
        [inserted.insertId, rule.variable, rule.lower_limit, rule.upper_limit],
      );
    }

    const [createdRows] = await connection.execute<ProfileRow[]>(
      `SELECT id, version, status, requested_by, justification, source_reference, effective_at
         FROM local_monitoring_profiles
        WHERE id = ?`,
      [inserted.insertId],
    );
    const created = createdRows[0];
    const rules = (patch.rules ?? []).map((rule) => ({
      variable: rule.variable,
      lowerLimit: rule.lower_limit,
      upperLimit: rule.upper_limit,
    }));

    await connection.commit();
    return {
      version: Number(created.version),
      status: created.status,
      requestedBy: created.requested_by,
      justification: created.justification,
      sourceReference: created.source_reference,
      effectiveAt: created.effective_at,
      rules,
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function recordLocalMonitoringOccurrences(
  connection: PoolConnection,
  input: {
    deviceId: number;
    classroomId: number | null;
    measurementId: string;
    measuredAt: Date | null;
    readings: MeasurementPayload["measurement"]["readings"];
  },
): Promise<void> {
  if (!input.measuredAt) {
    return;
  }

  const [profileRows] = await connection.execute<ProfileRow[]>(
    `SELECT id, version, status, requested_by, justification, source_reference, effective_at
       FROM local_monitoring_profiles
      WHERE device_id = ?
        AND status = 'ENABLED'
        AND effective_at <= ?
      ORDER BY version DESC
      LIMIT 1`,
    [input.deviceId, input.measuredAt],
  );
  const profile = profileRows[0];
  if (!profile) {
    return;
  }

  const [ruleRows] = await connection.execute<RuleRow[]>(
    `SELECT id, variable, lower_limit, upper_limit
       FROM local_monitoring_rules
      WHERE profile_id = ?`,
    [profile.id],
  );
  const readings = {
    TEMPERATURE_C: input.readings.temperature_c,
    RELATIVE_HUMIDITY_PCT: input.readings.relative_humidity_pct,
    ILLUMINANCE_LX: input.readings.illuminance_lx,
  } as const;

  for (const rule of ruleRows) {
    const reading = readings[rule.variable];
    const lowerLimit = Number(rule.lower_limit);
    const upperLimit = Number(rule.upper_limit);
    const direction = classifyLocalReading(reading, { lowerLimit, upperLimit });
    if (!direction) {
      continue;
    }

    await connection.execute<ResultSetHeader>(
      `INSERT INTO local_monitoring_occurrences (
        device_id, classroom_id, measurement_id, profile_id, profile_version, rule_id, variable,
        direction, observed_value, lower_limit, upper_limit, occurred_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE id = id`,
      [
        input.deviceId,
        input.classroomId,
        input.measurementId,
        profile.id,
        profile.version,
        rule.id,
        rule.variable,
        direction,
        reading.value,
        lowerLimit,
        upperLimit,
        input.measuredAt,
      ],
    );
  }
}

export async function listLocalMonitoringOccurrences(
  period: { fromUtc: string; toExclusiveUtc: string },
  classroomCodes?: string[],
  limit = 200,
): Promise<LocalMonitoringOccurrence[]> {
  const classroomFilter = classroomCodes?.length
    ? `AND c.code IN (${classroomCodes.map(() => "?").join(", ")})`
    : "";
  const [rows] = await getDatabasePool().execute<OccurrenceRow[]>(
    `SELECT o.id, c.code AS classroom_code, c.name AS classroom_name,
            o.measurement_id, o.profile_version, o.variable, o.direction,
            o.observed_value, o.lower_limit, o.upper_limit, o.occurred_at
       FROM local_monitoring_occurrences o
       INNER JOIN classrooms c ON c.id = o.classroom_id
      WHERE c.active = TRUE
        ${classroomFilter}
        AND o.occurred_at >= ?
        AND o.occurred_at < ?
      ORDER BY o.occurred_at DESC, o.id DESC
      LIMIT ?`,
    [...(classroomCodes?.length ? classroomCodes : []), new Date(period.fromUtc), new Date(period.toExclusiveUtc), limit],
  );
  return rows.map((row) => ({
    id: Number(row.id),
    classroomCode: row.classroom_code,
    classroomName: row.classroom_name,
    measurementId: row.measurement_id,
    profileVersion: Number(row.profile_version),
    variable: row.variable,
    direction: row.direction,
    observedValue: Number(row.observed_value),
    lowerLimit: Number(row.lower_limit),
    upperLimit: Number(row.upper_limit),
    occurredAt: row.occurred_at,
  }));
}
