import mysql from "mysql2/promise";

const runId = process.env.FORMAL_RUN_ID;
const deviceId = "classroom-node-physical-01";
if (!runId) throw new Error("Defina FORMAL_RUN_ID com o UUID da nova sessão formal.");
const connection = await mysql.createConnection({ uri: process.env.DATABASE_URL, timezone: "Z" });

try {
  await connection.beginTransaction();

  const [deviceRows] = await connection.execute(
    "SELECT id FROM devices WHERE public_id = ? AND active = TRUE FOR UPDATE",
    [deviceId],
  );
  if (!deviceRows[0]) throw new Error("Nó físico ativo não encontrado.");

  const [activeRuns] = await connection.execute(
    "SELECT id FROM experimental_runs WHERE device_id = ? AND status = 'ACTIVE' FOR UPDATE",
    [deviceRows[0].id],
  );
  if (activeRuns[0]) throw new Error(`Já existe uma execução ativa: ${activeRuns[0].id}.`);

  const [configurationRows] = await connection.execute(
    `SELECT id, version, sampling_interval_seconds
       FROM sampling_configurations
      WHERE device_id = ? AND status = 'APPLIED'
      ORDER BY version DESC
      LIMIT 1
      FOR UPDATE`,
    [deviceRows[0].id],
  );
  const configuration = configurationRows[0];
  if (!configuration || Number(configuration.sampling_interval_seconds) !== 60) {
    throw new Error("A configuração aplicada de 60 s não está disponível.");
  }

  await connection.execute(
    `INSERT INTO experimental_runs (
       id, device_id, configuration_id, run_type, status, planned_start, planned_end
     ) VALUES (?, ?, ?, 'MAIN', 'ACTIVE', UTC_TIMESTAMP(3), DATE_ADD(UTC_TIMESTAMP(3), INTERVAL 8 HOUR))`,
    [runId, deviceRows[0].id, configuration.id],
  );
  const [runRows] = await connection.execute(
    `SELECT id, status, planned_start, planned_end
       FROM experimental_runs WHERE id = ?`,
    [runId],
  );
  await connection.commit();
  console.log(JSON.stringify({ run: runRows[0], configuration }, null, 2));
} catch (error) {
  await connection.rollback();
  throw error;
} finally {
  await connection.end();
}
