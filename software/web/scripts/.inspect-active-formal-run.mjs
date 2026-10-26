import mysql from "mysql2/promise";

const runId = process.env.FORMAL_RUN_ID;
if (!runId) throw new Error("Defina FORMAL_RUN_ID com o UUID da sessão formal ativa.");
const connection = await mysql.createConnection({ uri: process.env.DATABASE_URL, timezone: "Z" });

try {
  const [runRows] = await connection.execute(
    `SELECT id, status, actual_start, planned_end,
            UTC_TIMESTAMP(3) AS checked_at,
            TIMESTAMPDIFF(SECOND, actual_start, UTC_TIMESTAMP(3)) AS elapsed_seconds
       FROM experimental_runs WHERE id = ?`,
    [runId],
  );
  const run = runRows[0];
  if (!run) throw new Error("Execução não encontrada.");

  const [measurements] = await connection.execute(
    `SELECT COUNT(*) AS total,
            COALESCE(SUM(time_sync_status = 'SYNCED'), 0) AS synced,
            COALESCE(SUM(time_sync_status = 'UNSYNCED'), 0) AS unsynced,
            COALESCE(SUM(temperature_status = 'VALID' AND humidity_status = 'VALID' AND illuminance_status = 'VALID'), 0) AS fully_valid,
            MIN(measured_at) AS first_measured_at,
            MAX(measured_at) AS last_measured_at
       FROM measurements
      WHERE run_id = ? AND measured_at >= ? AND measured_at < UTC_TIMESTAMP(3)`,
    [runId, run.actual_start],
  );
  const [telemetry] = await connection.execute(
    `SELECT MAX(queue_depth) AS maximum_queue_depth,
            MAX(dropped_total) AS maximum_dropped_total,
            MAX(received_at) AS latest_received_at
       FROM device_status_reports s
       INNER JOIN experimental_runs r ON r.device_id = s.device_id
      WHERE r.id = ? AND s.received_at >= ?`,
    [runId, run.actual_start],
  );
  console.log(JSON.stringify({ run, measurements: measurements[0], telemetry: telemetry[0] }, null, 2));
} finally {
  await connection.end();
}
