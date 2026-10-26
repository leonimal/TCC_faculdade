import mysql from "mysql2/promise";

const runId = process.env.FORMAL_RUN_ID;
if (!runId) throw new Error("Defina FORMAL_RUN_ID com o UUID da sessão formal ativa.");
const connection = await mysql.createConnection({ uri: process.env.DATABASE_URL, timezone: "Z" });

try {
  await connection.beginTransaction();
  const [result] = await connection.execute(
    `UPDATE experimental_runs
        SET status = 'COMPLETED', actual_end = UTC_TIMESTAMP(3)
      WHERE id = ? AND status = 'ACTIVE' AND actual_start IS NOT NULL`,
    [runId],
  );
  if (result.affectedRows !== 1) throw new Error("A execução ativa não foi encontrada para encerramento.");

  const [runRows] = await connection.execute(
    `SELECT id, status, actual_start, actual_end,
            TIMESTAMPDIFF(SECOND, actual_start, actual_end) AS elapsed_seconds
       FROM experimental_runs WHERE id = ?`,
    [runId],
  );
  await connection.commit();
  console.log(JSON.stringify({ run: runRows[0] }, null, 2));
} catch (error) {
  await connection.rollback();
  throw error;
} finally {
  await connection.end();
}
