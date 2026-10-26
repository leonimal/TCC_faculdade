import mysql from "mysql2/promise";

const runId = "98d1dd84-49ae-41c5-aa46-28ba98f7fd78";
const connection = await mysql.createConnection({ uri: process.env.DATABASE_URL, timezone: "Z" });

try {
  const [run] = await connection.execute(
    `SELECT status, actual_start, planned_start, planned_end,
            TIMESTAMPDIFF(SECOND, actual_start, UTC_TIMESTAMP(3)) AS elapsed_seconds
       FROM experimental_runs WHERE id = ?`,
    [runId],
  );
  const [summary] = await connection.execute(
    `SELECT COUNT(*) AS total,
            SUM(time_sync_status = 'SYNCED') AS synced,
            SUM(time_sync_status = 'UNSYNCED') AS unsynced,
            MIN(first_received_at) AS first_received_at,
            MAX(first_received_at) AS last_received_at
       FROM measurements WHERE run_id = ?`,
    [runId],
  );
  const [afterEnd] = await connection.execute(
    `SELECT measurement_id, measured_at, first_received_at, time_sync_status
       FROM measurements
      WHERE run_id = ?
        AND first_received_at > (SELECT actual_end FROM experimental_runs WHERE id = ?)
      ORDER BY first_received_at`,
    [runId, runId],
  );
  console.log(JSON.stringify({ run: run[0] ?? null, summary: summary[0] ?? null, after_end: afterEnd }, null, 2));
} finally {
  await connection.end();
}
