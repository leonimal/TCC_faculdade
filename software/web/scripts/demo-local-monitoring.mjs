import mysql from "mysql2/promise";

const baseUrl = (process.env.TEST_API_BASE_URL ?? "http://127.0.0.1:3100").replace(/\/+$/, "");
const nodeApiKey = process.env.NODE_API_KEY?.trim();
const adminApiKey = process.env.ADMIN_API_KEY?.trim();
const databaseUrl = process.env.DATABASE_URL?.trim();
const deviceId = "classroom-node-01";
const intervalMs = Number(process.env.LOCAL_MONITORING_DEMO_INTERVAL_MS ?? "6000");
const requestedBy = "local-monitoring-manual-demo";
const bootId = crypto.randomUUID();
const demoRunId = crypto.randomUUID();
const firmwareVersion = `local-monitoring-demo-${demoRunId.slice(0, 8)}`;
const measurementIds = [];
let stopRequested = false;
let stdinWasRaw = false;
let temporaryProfileCreated = false;

const demoCycle = [
  { temperature: 19.2, humidity: 48, illuminance: 420, queueDepth: 0 },
  { temperature: 22.4, humidity: 38, illuminance: 510, queueDepth: 8 },
  { temperature: 24.1, humidity: 51, illuminance: 910, queueDepth: 24 },
  { temperature: 28.7, humidity: 62, illuminance: 240, queueDepth: 210 },
  { temperature: 23.3, humidity: 52, illuminance: 650, queueDepth: 70 },
  { temperature: 20, humidity: 40, illuminance: 300, queueDepth: 0 },
];

if (!nodeApiKey || !adminApiKey || !databaseUrl) {
  throw new Error("NODE_API_KEY, ADMIN_API_KEY e DATABASE_URL são obrigatórias em .env.local.");
}
if (!Number.isInteger(intervalMs) || intervalMs < 1000 || intervalMs > 60_000) {
  throw new Error("LOCAL_MONITORING_DEMO_INTERVAL_MS deve ser um inteiro entre 1000 e 60000.");
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function requestStop(signal) {
  if (stopRequested) return;
  stopRequested = true;
  if (process.stdin.isTTY && stdinWasRaw) process.stdin.setRawMode(false);
  process.stdin.removeAllListeners("data");
  process.stdin.pause();
  console.log(`\n${signal}. Encerrando e removendo apenas os dados desta demonstração...`);
}

process.on("SIGINT", () => requestStop("Ctrl+C recebido"));
process.on("SIGTERM", () => requestStop("SIGTERM recebido"));

if (process.stdin.isTTY) {
  process.stdin.setEncoding("utf8");
  if (typeof process.stdin.setRawMode === "function") {
    process.stdin.setRawMode(true);
    stdinWasRaw = true;
  }
  process.stdin.resume();
  process.stdin.on("data", (key) => {
    if (key === "\u0003") requestStop("Ctrl+C recebido");
    if (key.toLowerCase().includes("m")) requestStop("Tecla M pressionada");
  });
}

async function delay() {
  const until = Date.now() + intervalMs;
  while (!stopRequested && Date.now() < until) {
    await new Promise((resolve) => setTimeout(resolve, Math.min(250, until - Date.now())));
  }
}

async function requestJson(path, { method = "GET", token, body } = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const text = await response.text();
  try {
    return { status: response.status, body: JSON.parse(text) };
  } catch {
    return { status: response.status, body: text };
  }
}

async function deleteMeasurements(connection, ids) {
  if (ids.length === 0) return;
  const placeholders = ids.map(() => "?").join(", ");
  await connection.execute(`DELETE FROM local_monitoring_occurrences WHERE measurement_id IN (${placeholders})`, ids);
  await connection.execute(`DELETE FROM measurement_flags WHERE measurement_id IN (${placeholders})`, ids);
  await connection.execute(`DELETE FROM ingestion_attempts WHERE claimed_measurement_id IN (${placeholders})`, ids);
  await connection.execute(`DELETE FROM measurements WHERE measurement_id IN (${placeholders})`, ids);
}

async function cleanupProfiles(connection) {
  await connection.execute(
    "DELETE o FROM local_monitoring_occurrences o INNER JOIN local_monitoring_profiles p ON p.id = o.profile_id WHERE p.requested_by = ?",
    [requestedBy],
  );
  await connection.execute(
    "DELETE r FROM local_monitoring_rules r INNER JOIN local_monitoring_profiles p ON p.id = r.profile_id WHERE p.requested_by = ?",
    [requestedBy],
  );
  await connection.execute("DELETE FROM local_monitoring_profiles WHERE requested_by = ?", [requestedBy]);
}

async function cleanupStaleDemos(connection) {
  const [staleRows] = await connection.execute(
    `SELECT DISTINCT
       firmware_version,
       JSON_UNQUOTE(JSON_EXTRACT(details, '$.boot_id')) AS boot_id
     FROM device_status_reports
     WHERE JSON_UNQUOTE(JSON_EXTRACT(details, '$.source')) = 'local-monitoring-manual-demo'`,
  );
  let removedMeasurements = 0;

  for (const staleRow of staleRows) {
    const staleBootId = staleRow.boot_id;
    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        staleBootId ?? "",
      )
    ) {
      continue;
    }

    const [staleMeasurementRows] = await connection.execute(
      "SELECT measurement_id FROM measurements WHERE boot_id = ?",
      [staleBootId],
    );
    const staleMeasurementIds = staleMeasurementRows.map((row) => row.measurement_id);
    await deleteMeasurements(connection, staleMeasurementIds);
    await connection.execute(
      "DELETE FROM device_status_reports WHERE firmware_version = ?",
      [staleRow.firmware_version],
    );
    removedMeasurements += staleMeasurementIds.length;
  }

  await cleanupProfiles(connection);

  if (staleRows.length > 0) {
    console.log(
      `Recuperação automática: ${removedMeasurements} medição(ões) de demonstração anterior removida(s).`,
    );
  }
}

async function cleanup(connection) {
  await deleteMeasurements(connection, measurementIds);
  await connection.execute("DELETE FROM device_status_reports WHERE firmware_version = ?", [firmwareVersion]);
  if (temporaryProfileCreated) {
    await cleanupProfiles(connection);
  }
}

async function assertCleanup(connection) {
  const [measurementRows] = await connection.execute(
    "SELECT COUNT(*) AS total FROM measurements WHERE boot_id = ?",
    [bootId],
  );
  const [statusRows] = await connection.execute(
    "SELECT COUNT(*) AS total FROM device_status_reports WHERE firmware_version = ?",
    [firmwareVersion],
  );
  const [profileRows] = await connection.execute(
    "SELECT COUNT(*) AS total FROM local_monitoring_profiles WHERE requested_by = ?",
    [requestedBy],
  );

  assert(
    Number(measurementRows[0].total) === 0 &&
      Number(statusRows[0].total) === 0 &&
      Number(profileRows[0].total) === 0,
    "A limpeza não removeu integralmente os dados artificiais.",
  );
}

async function assertApplicationReady() {
  const health = await requestJson("/api/v1/health?database=1");
  assert(health.status === 200, `Aplicação ou MySQL indisponível em ${baseUrl}. Inicie npm run start antes da demonstração.`);
}

function makeMeasurement(sequenceNumber, values) {
  const measurementId = crypto.randomUUID();
  measurementIds.push(measurementId);
  return {
    measurementId,
    values,
    payload: {
      schema_version: 1,
      measurement: {
        measurement_id: measurementId,
        device_id: deviceId,
        boot_id: bootId,
        sequence_number: sequenceNumber,
        run_id: null,
        configuration_version: 1,
        measured_at: new Date().toISOString(),
        device_uptime_ms: (sequenceNumber - 1) * intervalMs,
        time_sync_status: "SYNCED",
        readings: {
          temperature_c: { value: values.temperature, status: "VALID" },
          relative_humidity_pct: { value: values.humidity, status: "VALID" },
          illuminance_lx: { value: values.illuminance, status: "VALID" },
        },
      },
      delivery: {
        mode: "ONLINE",
        sent_at: new Date().toISOString(),
        queue_depth_before_send: values.queueDepth,
        queue_capacity: 256,
        dropped_total: 0,
      },
    },
  };
}

await assertApplicationReady();
const connection = await mysql.createConnection({ uri: databaseUrl, timezone: "Z" });

try {
  const [configurationRows] = await connection.execute(
    `SELECT c.version
       FROM devices d
       INNER JOIN sampling_configurations c ON c.device_id = d.id
      WHERE d.public_id = ? AND d.active = TRUE
      ORDER BY (c.status = 'APPLIED') DESC, c.version DESC
      LIMIT 1`,
    [deviceId],
  );
  assert(
    configurationRows.length === 1,
    `O dispositivo ${deviceId} não possui configuração disponível. Execute npm run db:seed.`,
  );

  const [activeRunRows] = await connection.execute(
    `SELECT COUNT(*) AS total
       FROM experimental_runs r INNER JOIN devices d ON d.id = r.device_id
      WHERE d.public_id = ? AND r.status = 'ACTIVE'`,
    [deviceId],
  );
  assert(Number(activeRunRows[0].total) === 0, "Demonstração bloqueada: existe uma coleta experimental ativa.");

  await cleanupStaleDemos(connection);
  const currentProfile = await requestJson(
    `/api/v1/devices/${deviceId}/local-monitoring-profile`,
    { token: adminApiKey },
  );
  assert(currentProfile.status === 200, `Não foi possível consultar a faixa local: ${JSON.stringify(currentProfile)}`);
  const configuredProfile = currentProfile.body.profile;

  if (!configuredProfile) {
    const profile = await requestJson(
      `/api/v1/devices/${deviceId}/local-monitoring-profile`,
      {
        method: "PATCH",
        token: adminApiKey,
        body: {
          enabled: true,
          requested_by: requestedBy,
          justification: "Demonstração visual temporária; dados artificiais, sem uso normativo.",
          source_reference: "Demonstração local manual.",
          rules: [
            { variable: "TEMPERATURE_C", lower_limit: 20, upper_limit: 28 },
            { variable: "RELATIVE_HUMIDITY_PCT", lower_limit: 40, upper_limit: 60 },
            { variable: "ILLUMINANCE_LX", lower_limit: 300, upper_limit: 800 },
          ],
        },
      },
    );
    assert(profile.status === 201, `Não foi possível criar a faixa de demonstração: ${JSON.stringify(profile)}`);
    temporaryProfileCreated = true;
    console.log("Nenhuma faixa administrativa estava configurada; foi criada uma faixa temporária para esta demonstração.");
  } else {
    console.log(`Usando a faixa administrativa existente (versão ${configuredProfile.version}, ${configuredProfile.enabled ? "habilitada" : "desabilitada"}). Ela não será alterada nem removida.`);
  }

  console.log("Demonstração ao vivo de faixas locais iniciada com dados artificiais.");
  console.log(`Dashboard: ${baseUrl}/`);
  console.log(`Relatórios: ${baseUrl}/reports`);
  console.log("As páginas atualizam em até 5 segundos. Pressione M para encerrar e limpar os dados.\n");

  const configurationVersion = Number(configurationRows[0].version);

  for (let sequenceNumber = 1; !stopRequested; sequenceNumber += 1) {
    const values = demoCycle[(sequenceNumber - 1) % demoCycle.length];
    const current = makeMeasurement(sequenceNumber, values);
    current.payload.measurement.configuration_version = configurationVersion;
    const stored = await requestJson("/api/v1/measurements", {
      method: "POST",
      token: nodeApiKey,
      body: current.payload,
    });
    assert(stored.status === 201 && stored.body?.ingestion_status === "STORED", `Falha ao armazenar a leitura: ${JSON.stringify(stored)}`);

    const measuredAt = current.payload.measurement.measured_at;
    const status = await requestJson(`/api/v1/devices/${deviceId}/status`, {
      method: "POST",
      token: nodeApiKey,
      body: {
        observed_at: measuredAt,
        firmware_version: firmwareVersion,
        connection_status: "ONLINE",
        queue_depth: values.queueDepth,
        queue_capacity: 256,
        dropped_total: 0,
        last_confirmed_at: measuredAt,
        time_sync_status: "SYNCED",
        details: { source: "local-monitoring-manual-demo", demo_run_id: demoRunId, boot_id: bootId },
      },
    });
    assert(status.status === 201, `Falha ao registrar estado operacional: ${JSON.stringify(status)}`);
    console.log(
      `[${new Date().toLocaleTimeString("pt-BR")}] #${sequenceNumber} · ` +
      `${values.temperature.toFixed(1)} °C · ${values.humidity.toFixed(1)}% UR · ` +
      `${values.illuminance.toFixed(0)} lx · fila ${values.queueDepth}/256`,
    );
    await delay();
  }
} finally {
  try {
    await cleanup(connection);
    await assertCleanup(connection);
    console.log("PASS limpeza: nenhum dado da demonstração permaneceu no MySQL.");
  } finally {
    if (process.stdin.isTTY && stdinWasRaw) process.stdin.setRawMode(false);
    await connection.end();
  }
}
