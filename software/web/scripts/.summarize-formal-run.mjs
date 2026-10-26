import mysql from "mysql2/promise";

const runId = process.env.FORMAL_RUN_ID;
if (!runId) throw new Error("Defina FORMAL_RUN_ID com o UUID da sessão formal a resumir.");
const percentile = (values, p) => {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.ceil(sorted.length * p) - 1];
};
const connection = await mysql.createConnection({ uri: process.env.DATABASE_URL, timezone: "Z" });

try {
  const [runRows] = await connection.execute(
    `SELECT actual_start, actual_end,
            TIMESTAMPDIFF(SECOND, actual_start, actual_end) AS elapsed_seconds
       FROM experimental_runs WHERE id = ?`,
    [runId],
  );
  const run = runRows[0];
  const [rows] = await connection.execute(
    `SELECT measured_at, first_received_at, time_sync_status,
            temperature_status, humidity_status, illuminance_status
       FROM measurements
      WHERE run_id = ? AND measured_at >= ? AND measured_at < ?
      ORDER BY measured_at`,
    [runId, run.actual_start, run.actual_end],
  );
  const timestamps = rows.map((row) => new Date(row.measured_at).getTime());
  const intervalErrors = timestamps.slice(1).map((time, index) => Math.abs(time - timestamps[index] - 60_000) / 1_000);
  const apiLatencies = rows.map((row) => (new Date(row.first_received_at).getTime() - new Date(row.measured_at).getTime()) / 1_000);
  const expected = Math.ceil(Number(run.elapsed_seconds) / 60);
  const fullyValid = rows.filter((row) => row.time_sync_status === "SYNCED" && row.temperature_status === "VALID" && row.humidity_status === "VALID" && row.illuminance_status === "VALID").length;
  console.log(JSON.stringify({
    elapsed_seconds: Number(run.elapsed_seconds),
    expected_records: expected,
    stored_records: rows.length,
    completeness_pct: Number((rows.length / expected * 100).toFixed(3)),
    synchronized_pct: Number((rows.filter((row) => row.time_sync_status === "SYNCED").length / rows.length * 100).toFixed(3)),
    fully_valid_records: fullyValid,
    interval_error_p95_seconds: percentile(intervalErrors, 0.95),
    api_latency_p95_seconds: percentile(apiLatencies, 0.95),
  }, null, 2));
} finally {
  await connection.end();
}
