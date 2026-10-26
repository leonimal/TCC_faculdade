import mysql from "mysql2/promise";

const deviceId = "classroom-node-physical-01";
const connection = await mysql.createConnection({ uri: process.env.DATABASE_URL, timezone: "Z" });

try {
  const [configuration] = await connection.execute(
    `SELECT c.version, c.sampling_interval_seconds, c.status, c.acknowledged_at
       FROM sampling_configurations c
       INNER JOIN devices d ON d.id = c.device_id
      WHERE d.public_id = ?
      ORDER BY c.version DESC
      LIMIT 1`,
    [deviceId],
  );
  const [status] = await connection.execute(
    `SELECT s.received_at, s.firmware_version, s.connection_status,
            s.queue_depth, s.queue_capacity, s.dropped_total,
            s.time_sync_status, s.last_confirmed_at
       FROM device_status_reports s
       INNER JOIN devices d ON d.id = s.device_id
      WHERE d.public_id = ?
      ORDER BY s.received_at DESC
      LIMIT 1`,
    [deviceId],
  );
  const [activeRun] = await connection.execute(
    `SELECT r.id, r.status, r.actual_start
       FROM experimental_runs r
       INNER JOIN devices d ON d.id = r.device_id
      WHERE d.public_id = ? AND r.status = 'ACTIVE'
      LIMIT 1`,
    [deviceId],
  );

  console.log(JSON.stringify({
    device_id: deviceId,
    configuration: configuration[0] ?? null,
    latest_status: status[0] ?? null,
    active_run: activeRun[0] ?? null,
  }, null, 2));
} finally {
  await connection.end();
}
