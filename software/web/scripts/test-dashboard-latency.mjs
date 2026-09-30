import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import mysql from "mysql2/promise";

import { summarizeLatencies } from "./latency-statistics.mjs";

const baseUrl = process.env.TEST_API_BASE_URL ?? "http://127.0.0.1:3100";
const nodeApiKey = process.env.NODE_API_KEY?.trim();
const adminApiKey = process.env.ADMIN_API_KEY?.trim();
const databaseUrl = process.env.DATABASE_URL?.trim();
const deviceId = "classroom-node-01";
const requestedSamples = Number(
  process.env.DASHBOARD_LATENCY_SAMPLES ?? "100",
);
const criterionLimitMs = 10_000;
const runId = crypto.randomUUID();
const bootId = crypto.randomUUID();
const measurementIds = Array.from(
  { length: requestedSamples },
  () => crypto.randomUUID(),
);

if (!nodeApiKey || !adminApiKey || !databaseUrl) {
  throw new Error(
    "NODE_API_KEY, ADMIN_API_KEY e DATABASE_URL são obrigatórias.",
  );
}

if (
  !Number.isInteger(requestedSamples) ||
  requestedSamples < 20 ||
  requestedSamples > 1000
) {
  throw new Error(
    "DASHBOARD_LATENCY_SAMPLES deve ser um inteiro entre 20 e 1000.",
  );
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function postMeasurement(payload) {
  const response = await fetch(`${baseUrl}/api/v1/measurements`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${nodeApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
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
        temperature_c: { value: temperature, status: "VALID" },
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

function readingMarker(html, metric, value, measuredAt) {
  const articlePattern = new RegExp(
    `<article[^>]*data-metric="${metric}"[^>]*>`,
  );
  const articleTag = html.match(articlePattern)?.[0];

  return (
    articleTag?.includes(`data-reading-value="${value}"`) &&
    articleTag.includes(`data-reading-at="${measuredAt}"`)
  );
}

const connection = await mysql.createConnection({
  uri: databaseUrl,
  timezone: "Z",
});

const placeholders = measurementIds.map(() => "?").join(", ");

async function cleanup() {
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
}

let cleanupSucceeded = false;
let report;

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
    "O ensaio não pode ser executado durante uma coleta ativa.",
  );

  await cleanup();

  const [versionRows] = await connection.execute(
    "SELECT VERSION() AS mysql_version",
  );
  const packageJson = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );
  const samples = [];

  for (let index = 0; index < requestedSamples; index += 1) {
    const sequenceNumber = index + 1;
    const measuredAtMs = Date.now();
    const measuredAt = new Date(measuredAtMs).toISOString();
    const temperature = Number((20 + sequenceNumber / 1000).toFixed(3));
    const humidity = Number((40 + sequenceNumber / 1000).toFixed(3));
    const illuminance = 1000 + sequenceNumber;
    const payload = measurementPayload({
      measurementId: measurementIds[index],
      sequenceNumber,
      measuredAt,
      temperature,
      humidity,
      illuminance,
    });

    const stored = await postMeasurement(payload);
    const apiResponseMs = Date.now() - measuredAtMs;
    assert(
      stored.status === 201 && stored.body.ingestion_status === "STORED",
      `Amostra ${sequenceNumber}: persistência inesperada ${JSON.stringify(stored)}.`,
    );

    const pageResponse = await fetch(
      `${baseUrl}/?latency_sample=${sequenceNumber}&run_id=${runId}`,
      { headers: { "Cache-Control": "no-cache" } },
    );
    const html = await pageResponse.text();
    const dashboardResponseMs = Date.now() - measuredAtMs;

    assert(
      pageResponse.status === 200,
      `Amostra ${sequenceNumber}: dashboard retornou ${pageResponse.status}.`,
    );
    assert(
      readingMarker(html, "temperature_c", temperature, measuredAt) &&
        readingMarker(html, "relative_humidity_pct", humidity, measuredAt) &&
        readingMarker(html, "illuminance_lx", illuminance, measuredAt),
      `Amostra ${sequenceNumber}: o dashboard não exibiu integralmente a leitura mais recente.`,
    );
    assert(!html.includes(nodeApiKey), "NODE_API_KEY foi exposta no HTML.");
    assert(!html.includes(adminApiKey), "ADMIN_API_KEY foi exposta no HTML.");

    samples.push({
      sequence_number: sequenceNumber,
      measurement_id: measurementIds[index],
      measured_at: measuredAt,
      api_response_ms: apiResponseMs,
      dashboard_response_ms: dashboardResponseMs,
    });

    if (sequenceNumber % 10 === 0 || sequenceNumber === requestedSamples) {
      console.log(`Progresso: ${sequenceNumber}/${requestedSamples} amostras`);
    }
  }

  const apiSummary = summarizeLatencies(
    samples.map((sample) => sample.api_response_ms),
  );
  const dashboardSummary = summarizeLatencies(
    samples.map((sample) => sample.dashboard_response_ms),
  );

  report = {
    schema_version: 1,
    test_id: "T007",
    run_id: runId,
    generated_at: new Date().toISOString(),
    environment: {
      nature: "controlled_local_development_test",
      physical_firmware: false,
      browser_auto_refresh_observed: false,
      node_version: process.version,
      next_version: packageJson.dependencies.next,
      mysql_version: versionRows[0].mysql_version,
      base_url: baseUrl,
    },
    methodology: {
      scope: "supporting_local_requested_render_benchmark",
      requested_samples: requestedSamples,
      completed_samples: samples.length,
      latency_start: "measured_at assigned immediately before HTTP POST",
      latency_end: "complete server-rendered dashboard HTML response requested immediately after the API response",
      browser_auto_refresh_included: false,
      percentile_method: "nearest-rank",
      criterion_limit_ms: criterionLimitMs,
    },
    results: {
      consistency_rate_pct: 100,
      api_response: apiSummary,
      reading_to_requested_dashboard_response: dashboardSummary,
      requested_render_p95_within_t007_limit:
        dashboardSummary.p95_ms <= criterionLimitMs,
    },
    samples,
  };
} finally {
  try {
    await cleanup();

    const [remainingMeasurements] = await connection.execute(
      `SELECT COUNT(*) AS total FROM measurements WHERE measurement_id IN (${placeholders})`,
      measurementIds,
    );
    const [remainingAttempts] = await connection.execute(
      `SELECT COUNT(*) AS total FROM ingestion_attempts WHERE claimed_measurement_id IN (${placeholders})`,
      measurementIds,
    );

    cleanupSucceeded =
      Number(remainingMeasurements[0].total) === 0 &&
      Number(remainingAttempts[0].total) === 0;
  } finally {
    await connection.end();
  }
}

assert(cleanupSucceeded, "A limpeza dos dados temporários do ensaio falhou.");
assert(report, "O relatório do ensaio não foi produzido.");

report.cleanup = {
  temporary_measurements_remaining: 0,
  temporary_ingestion_attempts_remaining: 0,
  succeeded: true,
};

const resultsDirectory = path.join(process.cwd(), "test-results");
const resultFilename = `dashboard-latency-${report.generated_at.replaceAll(":", "-")}.json`;
const resultPath = path.join(resultsDirectory, resultFilename);
await mkdir(resultsDirectory, { recursive: true });
await writeFile(resultPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

console.log("PASS consistência: 100% das leituras conferidas no dashboard");
console.log(
  `PASS resposta renderizada solicitada: P50 ${report.results.reading_to_requested_dashboard_response.p50_ms} ms · ` +
    `P95 ${report.results.reading_to_requested_dashboard_response.p95_ms} ms · ` +
    `máximo ${report.results.reading_to_requested_dashboard_response.maximum_ms} ms`,
);
console.log("PASS limpeza: nenhum dado temporário permaneceu no MySQL");
console.log(`Evidência JSON: ${path.relative(process.cwd(), resultPath)}`);

assert(
  report.results.requested_render_p95_within_t007_limit,
  `P95 da resposta renderizada solicitada acima do limite de ${criterionLimitMs} ms.`,
);
