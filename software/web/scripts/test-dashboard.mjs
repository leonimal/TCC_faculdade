import mysql from "mysql2/promise";

const baseUrl = process.env.TEST_API_BASE_URL ?? "http://127.0.0.1:3100";
const nodeApiKey = process.env.NODE_API_KEY?.trim();
const adminApiKey = process.env.ADMIN_API_KEY?.trim();
const databaseUrl = process.env.DATABASE_URL?.trim();
const deviceId = "classroom-node-01";
const bootId = crypto.randomUUID();
const measurementIds = [
  crypto.randomUUID(),
  crypto.randomUUID(),
  crypto.randomUUID(),
];
const firmwareVersion = `dashboard-test-${crypto.randomUUID().slice(0, 8)}`;

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

function saoPauloDateKey(value) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(value);
  const part = (type) => parts.find((item) => item.type === type)?.value;

  return `${part("year")}-${part("month")}-${part("day")}`;
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

  return { status: response.status, body: await response.json() };
}

function measurementPayload({
  measurementId,
  sequenceNumber,
  measuredAt,
  temperature,
  humidity,
  illuminance,
}) {
  return {
    schema_version: 1,
    measurement: {
      measurement_id: measurementId,
      device_id: deviceId,
      boot_id: bootId,
      sequence_number: sequenceNumber,
      run_id: null,
      configuration_version: 1,
      measured_at: measuredAt,
      device_uptime_ms: sequenceNumber * 1000,
      time_sync_status: "SYNCED",
      readings: {
        temperature_c:
          temperature === null
            ? { value: null, status: "READ_ERROR" }
            : { value: temperature, status: "VALID" },
        relative_humidity_pct: { value: humidity, status: "VALID" },
        illuminance_lx: { value: illuminance, status: "VALID" },
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
}

const preparationStartedAtMs = Date.now();
const historyPayloads = [
  measurementPayload({
    measurementId: measurementIds[0],
    sequenceNumber: 1,
    measuredAt: new Date(preparationStartedAtMs - 120_000).toISOString(),
    temperature: 23.1,
    humidity: 51.2,
    illuminance: 601.2,
  }),
  measurementPayload({
    measurementId: measurementIds[1],
    sequenceNumber: 2,
    measuredAt: new Date(preparationStartedAtMs - 60_000).toISOString(),
    temperature: null,
    humidity: 52.4,
    illuminance: 640.4,
  }),
];

const connection = await mysql.createConnection({
  uri: databaseUrl,
  timezone: "Z",
});

async function cleanup() {
  const placeholders = measurementIds.map(() => "?").join(", ");
  await connection.execute(
    `DELETE FROM measurement_flags WHERE measurement_id IN (${placeholders})`,
    measurementIds,
  );
  await connection.execute(
    `DELETE FROM ingestion_attempts WHERE claimed_measurement_id IN (${placeholders})`,
    measurementIds,
  );
  await connection.execute(
    `DELETE FROM measurements WHERE measurement_id IN (${placeholders})`,
    measurementIds,
  );
  await connection.execute(
    "DELETE FROM device_status_reports WHERE firmware_version = ?",
    [firmwareVersion],
  );
}

try {
  const [activeRunRows] = await connection.execute(
    `SELECT COUNT(*) AS total
     FROM experimental_runs r
     INNER JOIN devices d ON d.id = r.device_id
     WHERE d.public_id = ? AND r.status = 'ACTIVE'`,
    [deviceId],
  );
  assert(
    Number(activeRunRows[0].total) === 0,
    "O teste não pode ser executado durante uma coleta ativa.",
  );

  await cleanup();

  for (const payload of historyPayloads) {
    const stored = await postJson("/api/v1/measurements", payload);
    assert(
      stored.status === 201 && stored.body.ingestion_status === "STORED",
      `Persistência da medição inesperada: ${JSON.stringify(stored)}`,
    );
  }

  const statusObservedAtMs = Date.now();
  const statusPayload = {
    observed_at: new Date(statusObservedAtMs).toISOString(),
    firmware_version: firmwareVersion,
    connection_status: "ONLINE",
    queue_depth: 12,
    queue_capacity: 256,
    dropped_total: 2,
    last_confirmed_at: new Date(statusObservedAtMs - 1000).toISOString(),
    time_sync_status: "SYNCED",
    details: { source: "dashboard-integration-test" },
  };
  const storedStatus = await postJson(
    `/api/v1/devices/${deviceId}/status`,
    statusPayload,
  );
  assert(
    storedStatus.status === 201 && storedStatus.body.status_report_id,
    `Persistência do estado inesperada: ${JSON.stringify(storedStatus)}`,
  );

  const latestMeasuredAtMs = Date.now();
  const latestPayload = measurementPayload({
    measurementId: measurementIds[2],
    sequenceNumber: 3,
    measuredAt: new Date(latestMeasuredAtMs).toISOString(),
    temperature: 23.45,
    humidity: 54.6,
    illuminance: 678.9,
  });
  const storedLatest = await postJson("/api/v1/measurements", latestPayload);
  assert(
    storedLatest.status === 201 &&
      storedLatest.body.ingestion_status === "STORED",
    `Persistência da medição mais recente inesperada: ${JSON.stringify(storedLatest)}`,
  );

  const [measurementRows] = await connection.execute(
    `SELECT
       temperature_c,
       relative_humidity_pct,
       illuminance_lx,
       time_sync_status
     FROM measurements
     WHERE measurement_id = ?`,
    [measurementIds[2]],
  );
  assert(
    measurementRows.length === 1 &&
      Number(measurementRows[0].temperature_c) === 23.45 &&
      Number(measurementRows[0].relative_humidity_pct) === 54.6 &&
      Number(measurementRows[0].illuminance_lx) === 678.9 &&
      measurementRows[0].time_sync_status === "SYNCED",
    `Medição de referência inconsistente: ${JSON.stringify(measurementRows[0])}`,
  );

  const pageResponse = await fetch(`${baseUrl}/`, {
    headers: { "Cache-Control": "no-cache" },
  });
  const html = await pageResponse.text();
  const displayLatencyMs = Date.now() - latestMeasuredAtMs;

  assert(pageResponse.status === 200, `Dashboard retornou ${pageResponse.status}.`);
  assert(html.includes("23,5"), "Temperatura mais recente não foi renderizada.");
  assert(html.includes("54,6"), "Umidade mais recente não foi renderizada.");
  assert(html.includes("679"), "Iluminância mais recente não foi renderizada.");
  assert(html.includes("2 válidas"), "A lacuna de temperatura não foi preservada.");
  assert(html.includes("3 válidas"), "O histórico das demais variáveis está incompleto.");
  assert(html.includes("12 / 256"), "A ocupação da fila não foi renderizada.");
  assert(html.includes("ONLINE informado"), "O estado de conexão não foi renderizado.");
  assert(html.includes(firmwareVersion), "A versão temporária do firmware não foi renderizada.");
  assert(!html.includes(nodeApiKey), "NODE_API_KEY foi exposta no HTML.");
  assert(!html.includes(adminApiKey), "ADMIN_API_KEY foi exposta no HTML.");
  assert(displayLatencyMs <= 10_000, `Latência da amostra acima de 10 s: ${displayLatencyMs} ms.`);

  const reportDate = saoPauloDateKey(new Date(latestMeasuredAtMs));
  const reportQuery = `room=DEV-01&from=${reportDate}&to=${reportDate}`;
  const reportResponse = await fetch(`${baseUrl}/reports?${reportQuery}`, {
    headers: { "Cache-Control": "no-cache" },
  });
  const reportHtml = await reportResponse.text();

  assert(reportResponse.status === 200, `Relatório retornou ${reportResponse.status}.`);
  assert(
    reportHtml.includes('data-report-metric="temperature_c"'),
    "Resumo de temperatura não foi renderizado no relatório.",
  );
  assert(reportHtml.includes("Exportar CSV"), "Exportação CSV não foi oferecida.");
  assert(
    reportHtml.includes(measurementIds[1]) && reportHtml.includes("READ_ERROR"),
    "Falha controlada não foi preservada no histórico do relatório.",
  );
  assert(
    reportHtml.includes("não classificam a sala"),
    "Limitação normativa não foi apresentada no relatório.",
  );
  assert(!reportHtml.includes(nodeApiKey), "NODE_API_KEY foi exposta no relatório.");
  assert(!reportHtml.includes(adminApiKey), "ADMIN_API_KEY foi exposta no relatório.");

  const csvResponse = await fetch(`${baseUrl}/reports/export?${reportQuery}`, {
    headers: { "Cache-Control": "no-cache" },
  });
  const csv = await csvResponse.text();

  assert(csvResponse.status === 200, `Exportação CSV retornou ${csvResponse.status}.`);
  assert(
    csvResponse.headers.get("content-type")?.startsWith("text/csv"),
    "Exportação não declarou conteúdo CSV.",
  );
  for (const measurementId of measurementIds) {
    assert(csv.includes(measurementId), `Medição ${measurementId} ausente do CSV.`);
  }
  assert(csv.includes("READ_ERROR"), "Estado READ_ERROR ausente do CSV.");

  const invalidExportResponse = await fetch(
    `${baseUrl}/reports/export?from=${reportDate}&to=2026-01-01`,
  );
  assert(
    invalidExportResponse.status === 400,
    `Exportação com período invertido retornou ${invalidExportResponse.status}.`,
  );

  console.log("PASS API: três medições controladas armazenadas");
  console.log("PASS MySQL: valores de referência íntegros");
  console.log("PASS dashboard: últimos valores e unidades renderizados");
  console.log("PASS dashboard: histórico preserva a lacuna de temperatura");
  console.log("PASS dashboard: estado operacional e fila renderizados");
  console.log("PASS segurança: credenciais ausentes do HTML");
  console.log("PASS relatórios: resumo, histórico e limitação normativa renderizados");
  console.log("PASS relatórios: CSV íntegro e período inválido rejeitado");
  console.log(`PASS latência da amostra leitura–dashboard: ${displayLatencyMs} ms`);
} finally {
  let cleanupSucceeded = false;

  try {
    await cleanup();

    const placeholders = measurementIds.map(() => "?").join(", ");
    const [remainingMeasurements] = await connection.execute(
      `SELECT COUNT(*) AS total FROM measurements WHERE measurement_id IN (${placeholders})`,
      measurementIds,
    );
    const [remainingAttempts] = await connection.execute(
      `SELECT COUNT(*) AS total FROM ingestion_attempts WHERE claimed_measurement_id IN (${placeholders})`,
      measurementIds,
    );
    const [remainingStatuses] = await connection.execute(
      "SELECT COUNT(*) AS total FROM device_status_reports WHERE firmware_version = ?",
      [firmwareVersion],
    );

    cleanupSucceeded =
      Number(remainingMeasurements[0].total) === 0 &&
      Number(remainingAttempts[0].total) === 0 &&
      Number(remainingStatuses[0].total) === 0;
  } finally {
    await connection.end();
  }

  if (!cleanupSucceeded) {
    throw new Error("A limpeza dos dados temporários do dashboard falhou.");
  }

  console.log("PASS limpeza: nenhum dado temporário permaneceu no MySQL");
}
