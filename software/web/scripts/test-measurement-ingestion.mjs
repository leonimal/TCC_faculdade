import mysql from "mysql2/promise";

const baseUrl = process.env.TEST_API_BASE_URL ?? "http://127.0.0.1:3100";
const apiKey = process.env.NODE_API_KEY?.trim();
const adminApiKey = process.env.ADMIN_API_KEY?.trim();
const databaseUrl = process.env.DATABASE_URL?.trim();

if (!apiKey || !adminApiKey || !databaseUrl) {
  throw new Error(
    "NODE_API_KEY, ADMIN_API_KEY e DATABASE_URL são obrigatórias.",
  );
}

const measurementId = crypto.randomUUID();
const secondMeasurementId = crypto.randomUUID();
const bootId = crypto.randomUUID();
const payload = {
  schema_version: 1,
  measurement: {
    measurement_id: measurementId,
    device_id: "classroom-node-01",
    boot_id: bootId,
    sequence_number: 1,
    run_id: null,
    configuration_version: 1,
    measured_at: new Date().toISOString(),
    device_uptime_ms: 1000,
    time_sync_status: "SYNCED",
    readings: {
      temperature_c: { value: 24.31, status: "VALID" },
      relative_humidity_pct: { value: 52.7, status: "VALID" },
      illuminance_lx: { value: 487.2, status: "VALID" },
    },
  },
  delivery: {
    mode: "ONLINE",
    sent_at: new Date().toISOString(),
    queue_depth_before_send: 0,
    queue_capacity: 256,
    dropped_total: 0,
  },
};

async function post(body) {
  const response = await fetch(`${baseUrl}/api/v1/measurements`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return { status: response.status, body: await response.json() };
}

async function get(query = "", token = adminApiKey) {
  const response = await fetch(`${baseUrl}/api/v1/measurements${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return { status: response.status, body: await response.json() };
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const first = await post(payload);
assert(
  first.status === 201 && first.body.ingestion_status === "STORED",
  `Primeira entrega inesperada: ${JSON.stringify(first)}`,
);

const replayPayload = structuredClone(payload);
replayPayload.delivery.mode = "REPLAYED";
replayPayload.delivery.queue_depth_before_send = 1;
const replay = await post(replayPayload);
assert(
  replay.status === 200 && replay.body.ingestion_status === "ALREADY_STORED",
  `Reenvio inesperado: ${JSON.stringify(replay)}`,
);

const conflictPayload = structuredClone(payload);
conflictPayload.measurement.readings.temperature_c.value = 25.31;
const conflict = await post(conflictPayload);
assert(
  conflict.status === 409 && conflict.body.error?.code === "INTEGRITY_CONFLICT",
  `Conflito inesperado: ${JSON.stringify(conflict)}`,
);

const invalidPayload = structuredClone(payload);
invalidPayload.measurement.measured_at = null;
const invalid = await post(invalidPayload);
assert(
  invalid.status === 422 && invalid.body.error?.code === "VALIDATION_ERROR",
  `Validação inesperada: ${JSON.stringify(invalid)}`,
);

const secondPayload = structuredClone(payload);
secondPayload.measurement.measurement_id = secondMeasurementId;
secondPayload.measurement.sequence_number = 2;
secondPayload.measurement.measured_at = new Date(
  Date.parse(payload.measurement.measured_at) + 1,
).toISOString();
const second = await post(secondPayload);
assert(
  second.status === 201 && second.body.ingestion_status === "STORED",
  `Segunda medição inesperada: ${JSON.stringify(second)}`,
);

const unauthorizedQuery = await get("?limit=1", "credencial-incorreta");
assert(
  unauthorizedQuery.status === 401,
  `Autorização administrativa inesperada: ${JSON.stringify(unauthorizedQuery)}`,
);

const invalidQuery = await get("?limit=1001");
assert(
  invalidQuery.status === 422 &&
    invalidQuery.body.error?.code === "VALIDATION_ERROR",
  `Validação da consulta inesperada: ${JSON.stringify(invalidQuery)}`,
);

const firstPage = await get("?device_id=classroom-node-01&limit=1");
assert(
  firstPage.status === 200 &&
    firstPage.body.measurements?.length === 1 &&
    firstPage.body.measurements[0].measurement_id === secondMeasurementId &&
    firstPage.body.pagination?.next_cursor,
  `Primeira página inesperada: ${JSON.stringify(firstPage)}`,
);

const secondPage = await get(
  `?device_id=classroom-node-01&limit=1&cursor=${encodeURIComponent(firstPage.body.pagination.next_cursor)}`,
);
assert(
  secondPage.status === 200 &&
    secondPage.body.measurements?.length === 1 &&
    secondPage.body.measurements[0].measurement_id === measurementId &&
    secondPage.body.pagination?.next_cursor === null,
  `Segunda página inesperada: ${JSON.stringify(secondPage)}`,
);

const connection = await mysql.createConnection({ uri: databaseUrl, timezone: "Z" });
try {
  const [measurementRows] = await connection.execute(
    "SELECT COUNT(*) AS total FROM measurements WHERE measurement_id = ?",
    [measurementId],
  );
  const [attemptRows] = await connection.execute(
    "SELECT outcome, COUNT(*) AS total FROM ingestion_attempts WHERE claimed_measurement_id = ? GROUP BY outcome",
    [measurementId],
  );
  const attempts = Object.fromEntries(
    attemptRows.map((row) => [row.outcome, Number(row.total)]),
  );

  assert(Number(measurementRows[0].total) === 1, "A medição não é única no banco.");
  assert(attempts.STORED === 1, "A tentativa STORED não foi auditada.");
  assert(
    attempts.ALREADY_STORED === 1,
    "A tentativa ALREADY_STORED não foi auditada.",
  );
  assert(
    attempts.INTEGRITY_CONFLICT === 1,
    "A tentativa INTEGRITY_CONFLICT não foi auditada.",
  );

  console.log("PASS 201 STORED");
  console.log("PASS 200 ALREADY_STORED");
  console.log("PASS 409 INTEGRITY_CONFLICT");
  console.log("PASS 422 VALIDATION_ERROR");
  console.log("PASS 401 consulta sem credencial administrativa válida");
  console.log("PASS 422 parâmetros de consulta inválidos");
  console.log("PASS paginação por cursor e filtro device_id");
  console.log("PASS MySQL: medições únicas e tentativas auditadas");
} finally {
  await connection.execute(
    "DELETE FROM ingestion_attempts WHERE claimed_measurement_id IN (?, ?)",
    [measurementId, secondMeasurementId],
  );
  await connection.execute(
    "DELETE FROM measurements WHERE measurement_id IN (?, ?)",
    [measurementId, secondMeasurementId],
  );
  await connection.end();
}
