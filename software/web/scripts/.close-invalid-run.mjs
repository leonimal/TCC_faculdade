import mysql from "mysql2/promise";

const runId = "98d1dd84-49ae-41c5-aa46-28ba98f7fd78";
const reason = "Sessão encerrou com 6 de 555 medições sem sincronização temporal (98,92%), abaixo do mínimo de 99% definido no protocolo.";
const connection = await mysql.createConnection({ uri: process.env.DATABASE_URL, timezone: "Z" });

try {
  const [result] = await connection.execute(
    `UPDATE experimental_runs
        SET status = 'INVALIDATED', actual_end = UTC_TIMESTAMP(3), invalidation_reason = ?
      WHERE id = ? AND status = 'ACTIVE'`,
    [reason, runId],
  );
  if (result.affectedRows !== 1) throw new Error("A execução ativa não foi encontrada.");
  console.log(JSON.stringify({ run_id: runId, status: "INVALIDATED", reason }));
} finally {
  await connection.end();
}
