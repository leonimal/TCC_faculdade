import mysql from "mysql2/promise";

const runId = process.env.FORMAL_RUN_ID;
if (!runId) throw new Error("Defina FORMAL_RUN_ID com o UUID da sessão formal ativa.");
const connection = await mysql.createConnection({ uri: process.env.DATABASE_URL, timezone: "Z" });

try {
  await connection.beginTransaction();
  const [runRows] = await connection.execute(
    "SELECT id, status, planned_start, actual_start FROM experimental_runs WHERE id = ? FOR UPDATE",
    [runId],
  );
  const run = runRows[0];
  if (!run || run.status !== "ACTIVE") throw new Error("A execução ativa não foi encontrada.");

  const [measurementRows] = await connection.execute(
    `SELECT measurement_id, measured_at, first_received_at
       FROM measurements
      WHERE run_id = ?
        AND time_sync_status = 'SYNCED'
        AND measured_at >= ?
      ORDER BY measured_at, first_received_at
      LIMIT 1`,
    [runId, run.planned_start],
  );
  const firstMeasurement = measurementRows[0];
  if (!firstMeasurement) throw new Error("Ainda não há medição sincronizada posterior à ativação.");

  if (!run.actual_start) {
    await connection.execute(
      "UPDATE experimental_runs SET actual_start = ? WHERE id = ? AND actual_start IS NULL",
      [firstMeasurement.measured_at, runId],
    );
  }
  const [updatedRows] = await connection.execute(
    "SELECT id, status, planned_start, planned_end, actual_start FROM experimental_runs WHERE id = ?",
    [runId],
  );
  const [preStartRows] = await connection.execute(
    `SELECT COUNT(*) AS total
       FROM measurements
      WHERE run_id = ? AND (measured_at IS NULL OR measured_at < ?)`,
    [runId, updatedRows[0].actual_start],
  );
  await connection.commit();
  console.log(JSON.stringify({
    run: updatedRows[0],
    first_measurement: firstMeasurement,
    pre_start_records: Number(preStartRows[0].total),
  }, null, 2));
} catch (error) {
  await connection.rollback();
  throw error;
} finally {
  await connection.end();
}
