import mysql from "mysql2/promise";

const baseUrl = process.env.TEST_API_BASE_URL ?? "http://127.0.0.1:3100";
const nodeApiKey = process.env.NODE_API_KEY?.trim();
const databaseUrl = process.env.DATABASE_URL?.trim();
const deviceId = "classroom-node-01";
const firmwareVersion = "integration-test-1.0.0";

if (!nodeApiKey || !databaseUrl) {
  throw new Error("NODE_API_KEY e DATABASE_URL são obrigatórias.");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function postStatus(body, token = nodeApiKey, targetDeviceId = deviceId) {
  const response = await fetch(
    `${baseUrl}/api/v1/devices/${targetDeviceId}/status`,
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

const synchronizedPayload = {
  observed_at: "2026-08-24T22:40:00.000Z",
  firmware_version: firmwareVersion,
  connection_status: "ONLINE",
  queue_depth: 205,
  queue_capacity: 256,
  dropped_total: 3,
  last_confirmed_at: "2026-08-24T22:39:30.000Z",
  time_sync_status: "SYNCED",
  details: { reset_reason: "POWER_ON", wifi_rssi_dbm: -61 },
};

const connection = await mysql.createConnection({ uri: databaseUrl, timezone: "Z" });

async function cleanup() {
  await connection.execute(
    "DELETE FROM device_status_reports WHERE firmware_version = ?",
    [firmwareVersion],
  );
}

try {
  await cleanup();

  const unauthorized = await postStatus(
    synchronizedPayload,
    "credencial-incorreta",
  );
  assert(
    unauthorized.status === 401,
    `Autorização inesperada: ${JSON.stringify(unauthorized)}`,
  );

  const invalidQueue = await postStatus({
    ...synchronizedPayload,
    queue_depth: 257,
  });
  assert(
    invalidQueue.status === 422 &&
      invalidQueue.body.error?.code === "VALIDATION_ERROR",
    `Validação da fila inesperada: ${JSON.stringify(invalidQueue)}`,
  );

  const invalidClock = await postStatus({
    ...synchronizedPayload,
    observed_at: null,
  });
  assert(
    invalidClock.status === 422 &&
      invalidClock.body.error?.details?.some(
        (detail) => detail.field === "observed_at",
      ),
    `Validação temporal inesperada: ${JSON.stringify(invalidClock)}`,
  );

  const missingDevice = await postStatus(
    synchronizedPayload,
    nodeApiKey,
    "device-not-registered",
  );
  assert(
    missingDevice.status === 404 &&
      missingDevice.body.error?.code === "DEVICE_NOT_FOUND",
    `Dispositivo inexistente inesperado: ${JSON.stringify(missingDevice)}`,
  );

  const warning = await postStatus(synchronizedPayload);
  assert(
    warning.status === 201 &&
      warning.body.status_report_id &&
      warning.body.queue?.depth === 205 &&
      warning.body.queue?.capacity === 256 &&
      warning.body.queue?.occupancy_pct === 80.08 &&
      warning.body.queue?.warning === true,
    `Persistência com advertência inesperada: ${JSON.stringify(warning)}`,
  );

  const unsynchronized = await postStatus({
    ...synchronizedPayload,
    observed_at: null,
    connection_status: "OFFLINE",
    queue_depth: 0,
    dropped_total: 0,
    last_confirmed_at: null,
    time_sync_status: "UNSYNCED",
    details: null,
  });
  assert(
    unsynchronized.status === 201 &&
      unsynchronized.body.queue?.occupancy_pct === 0 &&
      unsynchronized.body.queue?.warning === false,
    `Persistência sem sincronização inesperada: ${JSON.stringify(unsynchronized)}`,
  );

  const [rows] = await connection.execute(
    `SELECT
      observed_at, firmware_version, connection_status, queue_depth,
      queue_capacity, dropped_total, last_confirmed_at, time_sync_status, details
    FROM device_status_reports
    WHERE firmware_version = ?
    ORDER BY id`,
    [firmwareVersion],
  );
  assert(rows.length === 2, `Quantidade persistida inesperada: ${rows.length}`);
  assert(
    rows[0].queue_depth === 205 &&
      rows[0].queue_capacity === 256 &&
      rows[0].dropped_total === 3 &&
      rows[0].time_sync_status === "SYNCED" &&
      rows[0].details?.reset_reason === "POWER_ON",
    `Primeiro registro inconsistente: ${JSON.stringify(rows[0])}`,
  );
  assert(
    rows[1].observed_at === null &&
      rows[1].connection_status === "OFFLINE" &&
      rows[1].time_sync_status === "UNSYNCED" &&
      rows[1].details === null,
    `Segundo registro inconsistente: ${JSON.stringify(rows[1])}`,
  );

  console.log("PASS 401 estado sem credencial válida do nó");
  console.log("PASS 422 profundidade acima da capacidade");
  console.log("PASS 422 observed_at ausente quando SYNCED");
  console.log("PASS 404 dispositivo inexistente");
  console.log("PASS 201 fila em advertência a partir de 205/256");
  console.log("PASS 201 observação OFFLINE com relógio UNSYNCED");
  console.log("PASS MySQL: dois estados operacionais íntegros");
} finally {
  await cleanup();
  await connection.end();
}
