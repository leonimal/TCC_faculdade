import mysql from "mysql2/promise";

import { dashboardDemoValues } from "./dashboard-demo-values.mjs";

const baseUrl = (process.env.TEST_API_BASE_URL ?? "http://127.0.0.1:3100").replace(
  /\/+$/,
  "",
);
const nodeApiKey = process.env.NODE_API_KEY?.trim();
const databaseUrl = process.env.DATABASE_URL?.trim();
const deviceId = "classroom-node-01";
const intervalMs = Number(process.env.DASHBOARD_DEMO_INTERVAL_MS ?? "6000");
const bootId = crypto.randomUUID();
const demoRunId = crypto.randomUUID();
const firmwareVersion = `dashboard-demo-${demoRunId.slice(0, 8)}`;
const measurementIds = [];
let stopRequested = false;

if (!nodeApiKey || !databaseUrl) {
  throw new Error("NODE_API_KEY e DATABASE_URL são obrigatórias em .env.local.");
}

if (!Number.isInteger(intervalMs) || intervalMs < 1000 || intervalMs > 60_000) {
  throw new Error(
    "DASHBOARD_DEMO_INTERVAL_MS deve ser um inteiro entre 1000 e 60000.",
  );
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function requestStop(signal) {
  if (!stopRequested) {
    stopRequested = true;
    process.stdin.removeAllListeners("data");
    process.stdin.pause();
    console.log(`\n${signal} recebido. Encerrando e removendo os dados da demonstração...`);
  }
}

process.on("SIGINT", () => requestStop("Ctrl+C"));
process.on("SIGTERM", () => requestStop("SIGTERM"));

if (process.stdin.isTTY) {
  process.stdin.setEncoding("utf8");
  process.stdin.resume();
  process.stdin.on("data", () => requestStop("Enter"));
}

async function interruptibleDelay(durationMs) {
  const deadline = Date.now() + durationMs;

  while (!stopRequested && Date.now() < deadline) {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.min(250, deadline - Date.now())),
    );
  }
}

async function postJson(path, body) {
  const response = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${nodeApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const responseText = await response.text();
  let responseBody = responseText;

  try {
    responseBody = JSON.parse(responseText);
  } catch {
    // A mensagem original ajuda a diagnosticar respostas que não sejam JSON.
  }

  return { status: response.status, body: responseBody };
}

function measurementPayload({
  measurementId,
  sequenceNumber,
  configurationVersion,
  measuredAt,
  temperature,
  humidity,
  illuminance,
  queueDepth,
}) {
  return {
    schema_version: 1,
    measurement: {
      measurement_id: measurementId,
      device_id: deviceId,
      boot_id: bootId,
      sequence_number: sequenceNumber,
      run_id: null,
      configuration_version: configurationVersion,
      measured_at: measuredAt,
      device_uptime_ms: (sequenceNumber - 1) * intervalMs,
      time_sync_status: "SYNCED",
      readings: {
        temperature_c: { value: temperature, status: "VALID" },
        relative_humidity_pct: { value: humidity, status: "VALID" },
        illuminance_lx: { value: illuminance, status: "VALID" },
      },
    },
    delivery: {
      mode: "ONLINE",
      sent_at: new Date().toISOString(),
      queue_depth_before_send: queueDepth,
      queue_capacity: 256,
      dropped_total: 0,
    },
  };
}

async function deleteMeasurements(connection, ids) {
  const chunkSize = 500;

  for (let offset = 0; offset < ids.length; offset += chunkSize) {
    const chunk = ids.slice(offset, offset + chunkSize);
    const placeholders = chunk.map(() => "?").join(", ");

    await connection.execute(
      `DELETE FROM measurement_flags WHERE measurement_id IN (${placeholders})`,
      chunk,
    );
    await connection.execute(
      `DELETE FROM ingestion_attempts WHERE claimed_measurement_id IN (${placeholders})`,
      chunk,
    );
    await connection.execute(
      `DELETE FROM measurements WHERE measurement_id IN (${placeholders})`,
      chunk,
    );
  }
}

async function cleanup(connection) {
  await deleteMeasurements(connection, measurementIds);

  await connection.execute(
    "DELETE FROM device_status_reports WHERE firmware_version = ?",
    [firmwareVersion],
  );
}

async function cleanupStaleDemos(connection) {
  const [staleRows] = await connection.execute(
    `SELECT DISTINCT
       firmware_version,
       JSON_UNQUOTE(JSON_EXTRACT(details, '$.boot_id')) AS boot_id
     FROM device_status_reports
     WHERE JSON_UNQUOTE(JSON_EXTRACT(details, '$.source')) = 'dashboard-manual-demo'`,
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
    const staleMeasurementIds = staleMeasurementRows.map(
      (row) => row.measurement_id,
    );
    await deleteMeasurements(connection, staleMeasurementIds);
    await connection.execute(
      "DELETE FROM device_status_reports WHERE firmware_version = ?",
      [staleRow.firmware_version],
    );
    removedMeasurements += staleMeasurementIds.length;
  }

  if (staleRows.length > 0) {
    console.log(
      `Recuperação automática: ${removedMeasurements} medição(ões) de demonstrações anteriores removida(s).`,
    );
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

  assert(
    Number(measurementRows[0].total) === 0 && Number(statusRows[0].total) === 0,
    "A limpeza não removeu integralmente os dados artificiais.",
  );
}

async function assertApplicationReady() {
  let response;

  try {
    response = await fetch(`${baseUrl}/api/v1/health?database=1`, {
      headers: { "Cache-Control": "no-cache" },
    });
  } catch (error) {
    throw new Error(
      `Não foi possível acessar ${baseUrl}. Inicie o servidor com npm run start antes da demonstração.`,
      { cause: error },
    );
  }

  assert(
    response.status === 200,
    `A aplicação ou o MySQL não estão prontos: health check retornou ${response.status}.`,
  );
}

await assertApplicationReady();

const connection = await mysql.createConnection({
  uri: databaseUrl,
  timezone: "Z",
});

try {
  const [deviceRows] = await connection.execute(
    `SELECT d.id, c.version
     FROM devices d
     INNER JOIN sampling_configurations c ON c.device_id = d.id
     WHERE d.public_id = ? AND d.active = TRUE
     ORDER BY (c.status = 'APPLIED') DESC, c.version DESC
     LIMIT 1`,
    [deviceId],
  );
  assert(
    deviceRows.length === 1,
    `O dispositivo ${deviceId} não possui uma configuração disponível. Execute npm run db:seed.`,
  );

  const [activeRunRows] = await connection.execute(
    `SELECT COUNT(*) AS total
     FROM experimental_runs r
     INNER JOIN devices d ON d.id = r.device_id
     WHERE d.public_id = ? AND r.status = 'ACTIVE'`,
    [deviceId],
  );
  assert(
    Number(activeRunRows[0].total) === 0,
    "A demonstração foi bloqueada porque existe uma coleta experimental ativa.",
  );

  await cleanupStaleDemos(connection);

  const configurationVersion = Number(deviceRows[0].version);
  console.log("Demonstração visual iniciada com dados artificiais e temporários.");
  console.log(`Dashboard: ${baseUrl}/`);
  console.log("A página atualiza automaticamente em até 5 segundos.");
  console.log("Pressione Enter neste terminal para encerrar e limpar os dados.\n");

  for (let sequenceNumber = 1; !stopRequested; sequenceNumber += 1) {
    const measurementId = crypto.randomUUID();
    const measuredAt = new Date().toISOString();
    const values = dashboardDemoValues(sequenceNumber);
    measurementIds.push(measurementId);

    const storedMeasurement = await postJson(
      "/api/v1/measurements",
      measurementPayload({
        measurementId,
        sequenceNumber,
        configurationVersion,
        measuredAt,
        ...values,
      }),
    );
    assert(
      storedMeasurement.status === 201 &&
        storedMeasurement.body?.ingestion_status === "STORED",
      `A API não armazenou a leitura ${sequenceNumber}: ${JSON.stringify(storedMeasurement)}.`,
    );

    const statusPayload = {
      observed_at: measuredAt,
      firmware_version: firmwareVersion,
      connection_status: "ONLINE",
      queue_depth: values.queueDepth,
      queue_capacity: 256,
      dropped_total: 0,
      last_confirmed_at: measuredAt,
      time_sync_status: "SYNCED",
      details: {
        source: "dashboard-manual-demo",
        demo_run_id: demoRunId,
        boot_id: bootId,
      },
    };
    const storedStatus = await postJson(
      `/api/v1/devices/${deviceId}/status`,
      statusPayload,
    );
    assert(
      storedStatus.status === 201 && storedStatus.body?.status_report_id,
      `A API não armazenou o estado ${sequenceNumber}: ${JSON.stringify(storedStatus)}.`,
    );

    console.log(
      `[${new Date().toLocaleTimeString("pt-BR")}] #${sequenceNumber} · ` +
        `${values.temperature.toFixed(1)} °C · ${values.humidity.toFixed(1)}% UR · ` +
        `${values.illuminance.toFixed(0)} lx · fila ${values.queueDepth}/256`,
    );

    await interruptibleDelay(intervalMs);
  }
} finally {
  try {
    await cleanup(connection);
    await assertCleanup(connection);
    console.log("PASS limpeza: nenhum dado da demonstração permaneceu no MySQL.");
  } finally {
    await connection.end();
  }
}
