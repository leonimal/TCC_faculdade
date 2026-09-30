import "server-only";

import type { ResultSetHeader, RowDataPacket } from "mysql2";

import { getDatabasePool } from "@/lib/db";
import type { LocalMonitoringVariable } from "@/lib/local-monitoring/schema";

export type AlertNotification = {
  id: number;
  classroomCode: string;
  classroomName: string;
  variable: LocalMonitoringVariable;
  direction: "BELOW" | "ABOVE";
  occurredAt: string;
};

type NotificationRow = RowDataPacket & {
  id: number;
  classroom_code: string;
  classroom_name: string;
  variable: LocalMonitoringVariable;
  direction: "BELOW" | "ABOVE";
  occurred_at: Date;
};

type CountRow = RowDataPacket & { total: number };

const unreadCondition = "o.recorded_at > COALESCE(s.last_cleared_at, '1970-01-01 00:00:00.000')";

export async function listUnreadAlertNotifications(userId: number, limit = 20): Promise<{ total: number; notifications: AlertNotification[] }> {
  const pool = getDatabasePool();
  const [countRows] = await pool.execute<CountRow[]>(
    `SELECT COUNT(*) AS total
       FROM local_monitoring_occurrences o
       INNER JOIN classrooms c ON c.id = o.classroom_id AND c.active = TRUE
       LEFT JOIN user_alert_notification_states s ON s.user_id = ?
      WHERE ${unreadCondition}`,
    [userId],
  );
  const [rows] = await pool.execute<NotificationRow[]>(
    `SELECT o.id, c.code AS classroom_code, c.name AS classroom_name, o.variable, o.direction, o.occurred_at
       FROM local_monitoring_occurrences o
       INNER JOIN classrooms c ON c.id = o.classroom_id AND c.active = TRUE
       LEFT JOIN user_alert_notification_states s ON s.user_id = ?
      WHERE ${unreadCondition}
      ORDER BY o.recorded_at DESC, o.id DESC
      LIMIT ?`,
    [userId, limit],
  );
  return {
    total: Number(countRows[0]?.total ?? 0),
    notifications: rows.map((row) => ({
      id: Number(row.id), classroomCode: row.classroom_code, classroomName: row.classroom_name,
      variable: row.variable, direction: row.direction, occurredAt: row.occurred_at.toISOString(),
    })),
  };
}

export async function clearAlertNotifications(userId: number): Promise<void> {
  await getDatabasePool().execute<ResultSetHeader>(
    `INSERT INTO user_alert_notification_states (user_id, last_cleared_at)
     VALUES (?, CURRENT_TIMESTAMP(3))
     ON DUPLICATE KEY UPDATE last_cleared_at = CURRENT_TIMESTAMP(3)`,
    [userId],
  );
}
