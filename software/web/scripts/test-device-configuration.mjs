import mysql from "mysql2/promise";

const baseUrl = process.env.TEST_API_BASE_URL ?? "http://127.0.0.1:3100";
const nodeApiKey = process.env.NODE_API_KEY?.trim();
const adminApiKey = process.env.ADMIN_API_KEY?.trim();
const databaseUrl = process.env.DATABASE_URL?.trim();
const deviceId = "classroom-node-01";
const integrationRunId = "00000000-0000-4000-8000-000000000009";

if (!nodeApiKey || !adminApiKey || !databaseUrl) {
  throw new Error(
    "NODE_API_KEY, ADMIN_API_KEY e DATABASE_URL são obrigatórias.",
  );
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function getConfiguration(token = nodeApiKey) {
  const response = await fetch(
    `${baseUrl}/api/v1/devices/${deviceId}/configuration`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return { status: response.status, body: await response.json() };
}

async function patchConfiguration(body, token = adminApiKey) {
  const response = await fetch(
    `${baseUrl}/api/v1/devices/${deviceId}/configuration`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );
  return { status: response.status, body: await response.json() };
}

async function acknowledgeConfiguration(body, token = nodeApiKey) {
  const response = await fetch(
    `${baseUrl}/api/v1/devices/${deviceId}/configuration-ack`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );
  return { status: response.status, body: await response.json() };
}

const connection = await mysql.createConnection({ uri: databaseUrl, timezone: "Z" });

async function cleanup() {
  await connection.execute("DELETE FROM experimental_runs WHERE id = ?", [
    integrationRunId,
  ]);
  await connection.execute(
    "DELETE FROM sampling_configurations WHERE requested_by = 'integration-test'",
  );
  await connection.execute(
    `UPDATE sampling_configurations c
      INNER JOIN devices d ON d.id = c.device_id
        SET c.status = 'APPLIED',
            c.acknowledged_at = COALESCE(c.acknowledged_at, CURRENT_TIMESTAMP(3)),
            c.rejection_reason = NULL
      WHERE d.public_id = ? AND c.requested_by = 'development-seed'`,
    [deviceId],
  );
}

try {
  await cleanup();

  const initial = await getConfiguration();
  assert(
    initial.status === 200 &&
      initial.body.configuration?.status === "APPLIED" &&
      initial.body.configuration?.sampling_interval_seconds === 60,
    `Configuração inicial inesperada: ${JSON.stringify(initial)}`,
  );
  const initialVersion = initial.body.configuration.version;

  const unauthorized = await patchConfiguration(
    { sampling_interval_seconds: 30, requested_by: "integration-test" },
    "credencial-incorreta",
  );
  assert(
    unauthorized.status === 401,
    `Autorização inesperada: ${JSON.stringify(unauthorized)}`,
  );

  const invalid = await patchConfiguration({
    sampling_interval_seconds: 9,
    requested_by: "integration-test",
  });
  assert(
    invalid.status === 422 && invalid.body.error?.code === "VALIDATION_ERROR",
    `Validação inesperada: ${JSON.stringify(invalid)}`,
  );

  const created = await patchConfiguration({
    sampling_interval_seconds: 30,
    requested_by: "integration-test",
  });
  assert(
    created.status === 201 &&
      created.body.previous_applied_version === initialVersion &&
      created.body.configuration?.version === initialVersion + 1 &&
      created.body.configuration?.sampling_interval_seconds === 30 &&
      created.body.configuration?.status === "PENDING",
    `Criação inesperada: ${JSON.stringify(created)}`,
  );

  const pending = await getConfiguration();
  assert(
    pending.status === 200 &&
      pending.body.configuration?.version === initialVersion + 1 &&
      pending.body.configuration?.status === "PENDING",
    `Consulta pendente inesperada: ${JSON.stringify(pending)}`,
  );

  const unauthorizedAck = await acknowledgeConfiguration(
    { version: initialVersion + 1, status: "APPLIED" },
    "credencial-incorreta",
  );
  assert(
    unauthorizedAck.status === 401,
    `Autorização do ACK inesperada: ${JSON.stringify(unauthorizedAck)}`,
  );

  const invalidAck = await acknowledgeConfiguration({
    version: initialVersion + 1,
    status: "REJECTED",
  });
  assert(
    invalidAck.status === 422 &&
      invalidAck.body.error?.code === "VALIDATION_ERROR",
    `Validação do ACK inesperada: ${JSON.stringify(invalidAck)}`,
  );

  const applied = await acknowledgeConfiguration({
    version: initialVersion + 1,
    status: "APPLIED",
  });
  assert(
    applied.status === 200 &&
      applied.body.acknowledgement_status === "RECORDED" &&
      applied.body.configuration?.status === "APPLIED" &&
      applied.body.configuration?.acknowledged_at,
    `Confirmação APPLIED inesperada: ${JSON.stringify(applied)}`,
  );

  const repeatedApplied = await acknowledgeConfiguration({
    version: initialVersion + 1,
    status: "APPLIED",
  });
  assert(
    repeatedApplied.status === 200 &&
      repeatedApplied.body.acknowledgement_status === "ALREADY_RECORDED",
    `Idempotência APPLIED inesperada: ${JSON.stringify(repeatedApplied)}`,
  );

  const rejectedCandidate = await patchConfiguration({
    sampling_interval_seconds: 45,
    requested_by: "integration-test",
  });
  const rejectedVersion = rejectedCandidate.body.configuration?.version;
  assert(
    rejectedCandidate.status === 201 && rejectedVersion === initialVersion + 2,
    `Configuração para rejeição inesperada: ${JSON.stringify(rejectedCandidate)}`,
  );

  const rejected = await acknowledgeConfiguration({
    version: rejectedVersion,
    status: "REJECTED",
    rejection_reason: "Falha simulada ao persistir o intervalo.",
  });
  assert(
    rejected.status === 200 &&
      rejected.body.acknowledgement_status === "RECORDED" &&
      rejected.body.configuration?.status === "REJECTED" &&
      rejected.body.configuration?.rejection_reason ===
        "Falha simulada ao persistir o intervalo.",
    `Confirmação REJECTED inesperada: ${JSON.stringify(rejected)}`,
  );

  const repeatedRejected = await acknowledgeConfiguration({
    version: rejectedVersion,
    status: "REJECTED",
    rejection_reason: "Falha simulada ao persistir o intervalo.",
  });
  assert(
    repeatedRejected.status === 200 &&
      repeatedRejected.body.acknowledgement_status === "ALREADY_RECORDED",
    `Idempotência REJECTED inesperada: ${JSON.stringify(repeatedRejected)}`,
  );

  const conflictingAck = await acknowledgeConfiguration({
    version: rejectedVersion,
    status: "APPLIED",
  });
  assert(
    conflictingAck.status === 409 &&
      conflictingAck.body.error?.code === "ACK_CONFLICT",
    `Conflito de ACK inesperado: ${JSON.stringify(conflictingAck)}`,
  );

  const supersededCandidate = await patchConfiguration({
    sampling_interval_seconds: 90,
    requested_by: "integration-test",
  });
  const supersededVersion = supersededCandidate.body.configuration?.version;
  const activeCandidate = await patchConfiguration({
    sampling_interval_seconds: 120,
    requested_by: "integration-test",
  });
  const activeCandidateVersion = activeCandidate.body.configuration?.version;
  assert(
    supersededCandidate.status === 201 && activeCandidate.status === 201,
    "Não foi possível preparar as versões pendente e substituída.",
  );

  const supersededAck = await acknowledgeConfiguration({
    version: supersededVersion,
    status: "APPLIED",
  });
  assert(
    supersededAck.status === 409 &&
      supersededAck.body.error?.code === "CONFIGURATION_SUPERSEDED",
    `ACK de versão substituída inesperado: ${JSON.stringify(supersededAck)}`,
  );

  const [referenceRows] = await connection.execute(
    `SELECT d.id AS device_id, c.id AS configuration_id
       FROM devices d
       INNER JOIN sampling_configurations c ON c.device_id = d.id
      WHERE d.public_id = ? AND c.version = ?`,
    [deviceId, initialVersion],
  );
  await connection.execute(
    `INSERT INTO experimental_runs (
      id, device_id, configuration_id, run_type, status
    ) VALUES (?, ?, ?, 'FUNCTIONAL_TEST', 'ACTIVE')`,
    [
      integrationRunId,
      referenceRows[0].device_id,
      referenceRows[0].configuration_id,
    ],
  );

  const locked = await patchConfiguration({
    sampling_interval_seconds: 45,
    requested_by: "integration-test",
  });
  assert(
    locked.status === 409 && locked.body.error?.code === "ACTIVE_RUN_LOCK",
    `Bloqueio de execução inesperado: ${JSON.stringify(locked)}`,
  );

  const lockedAck = await acknowledgeConfiguration({
    version: activeCandidateVersion,
    status: "APPLIED",
  });
  assert(
    lockedAck.status === 409 && lockedAck.body.error?.code === "ACTIVE_RUN_LOCK",
    `Bloqueio do ACK durante execução inesperado: ${JSON.stringify(lockedAck)}`,
  );

  console.log("PASS GET configuração aplicada");
  console.log("PASS 401 PATCH sem credencial administrativa válida");
  console.log("PASS 422 intervalo fora de 10–300 s");
  console.log("PASS 201 nova versão PENDING");
  console.log("PASS GET devolve a versão PENDING mais recente");
  console.log("PASS 401 ACK sem credencial do nó válida");
  console.log("PASS 422 REJECTED sem motivo");
  console.log("PASS APPLIED e repetição idempotente");
  console.log("PASS REJECTED e repetição idempotente");
  console.log("PASS 409 para ACK conflitante e versão SUPERSEDED");
  console.log("PASS 409 bloqueio durante execução ativa");
  console.log("PASS 409 bloqueio de APPLIED durante execução ativa");
} finally {
  await cleanup();
  await connection.end();
}
