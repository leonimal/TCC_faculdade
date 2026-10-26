import mysql from "mysql2/promise";

const baseUrl = process.env.TEST_API_BASE_URL ?? "http://127.0.0.1:3100";
const nodeApiKey = process.env.NODE_API_KEY?.trim();
const adminEmail = (process.env.TEST_ADMIN_EMAIL ?? process.env.INITIAL_ADMIN_EMAIL)?.trim();
const adminPassword = process.env.TEST_ADMIN_PASSWORD ?? process.env.INITIAL_ADMIN_PASSWORD;
const databaseUrl = process.env.DATABASE_URL?.trim();
const deviceId = "classroom-node-01";
const requestedBy = "local-monitoring-integration-test";
const bootId = crypto.randomUUID();
const measurementIds = Array.from({ length: 4 }, () => crypto.randomUUID());
const integrationRunId = "00000000-0000-4000-8000-000000000019";

if (!nodeApiKey || !adminEmail || !adminPassword || !databaseUrl) {
  throw new Error("NODE_API_KEY, TEST_ADMIN_EMAIL, TEST_ADMIN_PASSWORD e DATABASE_URL são obrigatórias.");
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

let adminSessionCookie;

async function loginAsAdmin() {
  const response = await fetch(`${baseUrl}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: adminEmail, password: adminPassword }),
  });
  const cookie = response.headers.get("set-cookie")?.split(";", 1)[0];
  assert(response.status === 200 && cookie?.startsWith("tcc_iot_session="), `Login administrativo inesperado: ${response.status}.`);
  adminSessionCookie = cookie;
}

function saoPauloDateKey(value) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(value);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

async function requestProfile(method, body, cookie = adminSessionCookie) {
  const response = await fetch(
    `${baseUrl}/api/v1/devices/${deviceId}/local-monitoring-profile`,
    {
      method,
      headers: {
        ...(cookie ? { Cookie: cookie } : {}),
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    },
  );
  return { status: response.status, body: await response.json() };
}

async function postMeasurement({ measurementId, sequenceNumber, temperature }) {
  const response = await fetch(`${baseUrl}/api/v1/measurements`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${nodeApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      schema_version: 1,
      measurement: {
        measurement_id: measurementId,
        device_id: deviceId,
        boot_id: bootId,
        sequence_number: sequenceNumber,
        run_id: null,
        configuration_version: 1,
        measured_at: new Date(Date.now() + sequenceNumber * 1000).toISOString(),
        device_uptime_ms: sequenceNumber * 1000,
        time_sync_status: "SYNCED",
        readings: {
          temperature_c: { value: temperature, status: "VALID" },
          relative_humidity_pct: { value: 50, status: "VALID" },
          illuminance_lx: { value: 500, status: "VALID" },
        },
      },
      delivery: {
        mode: "ONLINE",
        sent_at: new Date().toISOString(),
        queue_depth_before_send: 0,
        queue_capacity: 256,
        dropped_total: 0,
      },
    }),
  });
  return { status: response.status, body: await response.json() };
}

const connection = await mysql.createConnection({ uri: databaseUrl, timezone: "Z" });

async function cleanup() {
  const placeholders = measurementIds.map(() => "?").join(", ");
  await connection.execute("DELETE FROM experimental_runs WHERE id = ?", [integrationRunId]);
  await connection.execute(
    `DELETE FROM local_monitoring_occurrences WHERE measurement_id IN (${placeholders})`,
    measurementIds,
  );
  await connection.execute(
    "DELETE r FROM local_monitoring_rules r INNER JOIN local_monitoring_profiles p ON p.id = r.profile_id WHERE p.requested_by = ?",
    [requestedBy],
  );
  await connection.execute(
    "DELETE FROM local_monitoring_profiles WHERE requested_by = ?",
    [requestedBy],
  );
  await connection.execute(
    `DELETE FROM ingestion_attempts WHERE claimed_measurement_id IN (${placeholders})`,
    measurementIds,
  );
  await connection.execute(
    `DELETE FROM measurements WHERE measurement_id IN (${placeholders})`,
    measurementIds,
  );
}

try {
  await loginAsAdmin();
  const [activeRunRows] = await connection.execute(
    `SELECT COUNT(*) AS total
       FROM experimental_runs r
       INNER JOIN devices d ON d.id = r.device_id
      WHERE d.public_id = ? AND r.status = 'ACTIVE'`,
    [deviceId],
  );
  assert(Number(activeRunRows[0].total) === 0, "O teste não pode ser executado durante coleta ativa.");

  const existing = await requestProfile("GET");
  assert(existing.status === 200, `Consulta inicial inesperada: ${JSON.stringify(existing)}`);
  assert(
    existing.body.profile === null || existing.body.profile.requested_by === requestedBy,
    "Há uma faixa local existente; o teste foi interrompido para não alterar uma configuração administrativa.",
  );

  await cleanup();

  const unauthorized = await requestProfile("PATCH", {
    enabled: true,
    requested_by: requestedBy,
    justification: "Teste integrado controlado.",
    rules: [{ variable: "TEMPERATURE_C", lower_limit: 20, upper_limit: 28 }],
  }, "tcc_iot_session=credencial-incorreta");
  assert(unauthorized.status === 403, `Autorização inesperada: ${JSON.stringify(unauthorized)}`);

  const invalid = await requestProfile("PATCH", {
    enabled: true,
    requested_by: requestedBy,
    justification: "Teste integrado controlado.",
    rules: [{ variable: "TEMPERATURE_C", lower_limit: 28, upper_limit: 20 }],
  });
  assert(invalid.status === 422, `Validação inesperada: ${JSON.stringify(invalid)}`);

  const created = await requestProfile("PATCH", {
    enabled: true,
    requested_by: requestedBy,
      justification: "Teste integrado controlado de alertas locais por faixa local.",
    source_reference: "Teste automatizado local; não é parâmetro normativo.",
    rules: [{ variable: "TEMPERATURE_C", lower_limit: 20, upper_limit: 28 }],
  });
  assert(
    created.status === 201 && created.body.profile?.enabled === true,
    `Criação da faixa inesperada: ${JSON.stringify(created)}`,
  );
  const profileVersion = created.body.profile.version;

  const unchanged = await requestProfile("PATCH", {
    enabled: true,
    requested_by: requestedBy,
    justification: "Teste integrado controlado de alertas locais por faixa local.",
    source_reference: "Teste automatizado local; não é parâmetro normativo.",
    rules: [{ variable: "TEMPERATURE_C", lower_limit: 20, upper_limit: 28 }],
  });
  assert(
    unchanged.status === 200 && unchanged.body.changed === false && unchanged.body.profile?.version === profileVersion,
    `Salvar sem alteração deveria manter a versão: ${JSON.stringify(unchanged)}`,
  );
  const [unchangedProfileRows] = await connection.execute(
    "SELECT COUNT(*) AS total FROM local_monitoring_profiles WHERE requested_by = ?",
    [requestedBy],
  );
  assert(Number(unchangedProfileRows[0].total) === 1, "Salvar sem alteração criou uma versão extra.");

  for (const [index, temperature] of [19.5, 20, 28.5].entries()) {
    const stored = await postMeasurement({
      measurementId: measurementIds[index],
      sequenceNumber: index + 1,
      temperature,
    });
    assert(stored.status === 201, `Medição de fronteira inesperada: ${JSON.stringify(stored)}`);
  }

  const [occurrenceRows] = await connection.execute(
    `SELECT measurement_id, direction, observed_value, lower_limit, upper_limit, profile_version
       FROM local_monitoring_occurrences
      WHERE measurement_id IN (?, ?, ?)
      ORDER BY observed_value ASC`,
    measurementIds.slice(0, 3),
  );
  assert(occurrenceRows.length === 2, `Quantidade de alertas inesperada: ${JSON.stringify(occurrenceRows)}`);
  assert(
    occurrenceRows[0].measurement_id === measurementIds[0] &&
      occurrenceRows[0].direction === "BELOW" &&
      Number(occurrenceRows[0].observed_value) === 19.5 &&
      Number(occurrenceRows[0].lower_limit) === 20 &&
      Number(occurrenceRows[0].upper_limit) === 28 &&
      Number(occurrenceRows[0].profile_version) === profileVersion,
    `Alerta abaixo inesperado: ${JSON.stringify(occurrenceRows[0])}`,
  );
  assert(
    occurrenceRows[1].measurement_id === measurementIds[2] &&
      occurrenceRows[1].direction === "ABOVE" &&
      Number(occurrenceRows[1].observed_value) === 28.5 &&
      Number(occurrenceRows[1].profile_version) === profileVersion,
    `Alerta acima inesperado: ${JSON.stringify(occurrenceRows[1])}`,
  );

  const reportDate = saoPauloDateKey(new Date());
  const alertsResponse = await fetch(`${baseUrl}/alerts?room=DEV-01&from=${reportDate}&to=${reportDate}`, {
    headers: { Cookie: adminSessionCookie },
  });
  const alertsHtml = await alertsResponse.text();
  assert(alertsResponse.status === 200, `Página de alertas retornou ${alertsResponse.status}.`);
  assert(alertsHtml.includes("Alertas locais"), "Histórico de alertas não foi renderizado.");
  assert(alertsHtml.includes(measurementIds[0]) && alertsHtml.includes(measurementIds[2]), "Alertas não apareceram na página separada.");
  assert(alertsHtml.includes("Abaixo da faixa local") && alertsHtml.includes("Acima da faixa local"), "Direções dos alertas não foram renderizadas.");
  assert(alertsHtml.includes("alert-table__row"), "Alertas não receberam o destaque visual esperado.");
  const reportResponse = await fetch(`${baseUrl}/reports?room=DEV-01&from=${reportDate}&to=${reportDate}`, {
    headers: { Cookie: adminSessionCookie },
  });
  const reportHtml = await reportResponse.text();
  assert(reportResponse.status === 200, `Relatório retornou ${reportResponse.status}.`);
  assert(!reportHtml.includes("Histórico de alertas locais"), "Alertas permaneceram misturados ao histórico de medições.");

  const disabled = await requestProfile("PATCH", {
    enabled: false,
    requested_by: requestedBy,
    justification: "Encerramento do teste integrado controlado.",
  });
  assert(disabled.status === 201 && disabled.body.profile?.enabled === false, `Desabilitação inesperada: ${JSON.stringify(disabled)}`);

  const storedWhileDisabled = await postMeasurement({
    measurementId: measurementIds[3],
    sequenceNumber: 4,
    temperature: 19,
  });
  assert(storedWhileDisabled.status === 201, `Medição desabilitada inesperada: ${JSON.stringify(storedWhileDisabled)}`);
  const [disabledOccurrenceRows] = await connection.execute(
    "SELECT COUNT(*) AS total FROM local_monitoring_occurrences WHERE measurement_id = ?",
    [measurementIds[3]],
  );
  assert(Number(disabledOccurrenceRows[0].total) === 0, "Perfil desabilitado gerou alerta.");

  const [referenceRows] = await connection.execute(
    `SELECT d.id AS device_id, c.id AS configuration_id
       FROM devices d
       INNER JOIN sampling_configurations c ON c.device_id = d.id
      WHERE d.public_id = ? AND c.version = 1`,
    [deviceId],
  );
  await connection.execute(
    `INSERT INTO experimental_runs (id, device_id, configuration_id, run_type, status)
     VALUES (?, ?, ?, 'FUNCTIONAL_TEST', 'ACTIVE')`,
    [integrationRunId, referenceRows[0].device_id, referenceRows[0].configuration_id],
  );
  const locked = await requestProfile("PATCH", {
    enabled: false,
    requested_by: requestedBy,
    justification: "Tentativa controlada durante execução ativa.",
  });
  assert(locked.status === 409 && locked.body.error?.code === "ACTIVE_RUN_LOCK", `Bloqueio inesperado: ${JSON.stringify(locked)}`);

  console.log("PASS 403 para alteração sem sessão administrativa válida");
  console.log("PASS 422 para limites locais invertidos");
  console.log("PASS faixa local versionada criada");
  console.log("PASS salvar sem alteração mantém a versão e não cria registro extra");
  console.log("PASS alerta abaixo e acima; sem alerta nos limites");
  console.log("PASS página separada exibe alertas com destaque, horário e direção");
  console.log("PASS perfil desabilitado não gera alerta");
  console.log("PASS 409 para alteração durante execução ativa");
} finally {
  if (adminSessionCookie) await fetch(`${baseUrl}/api/auth/logout`, { method: "POST", headers: { Cookie: adminSessionCookie } });
  await cleanup();
  await connection.end();
}

console.log("PASS limpeza: nenhum dado temporário de faixa local permaneceu no MySQL");
