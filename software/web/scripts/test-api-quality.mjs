import { mkdir, writeFile } from "node:fs/promises";
import { performance } from "node:perf_hooks";
import { resolve } from "node:path";
import { isDeepStrictEqual } from "node:util";

import mysql from "mysql2/promise";

const baseUrl = process.env.TEST_API_BASE_URL ?? "http://127.0.0.1:3100";
const nodeApiKey = process.env.NODE_API_KEY?.trim();
const databaseUrl = process.env.DATABASE_URL?.trim();
const sampleCount = Number(process.env.API_QUALITY_SAMPLES ?? 100);
const deviceId = "classroom-node-01";
const bootId = crypto.randomUUID();

if (!nodeApiKey || !databaseUrl) {
  throw new Error("NODE_API_KEY e DATABASE_URL são obrigatórias.");
}

if (!Number.isInteger(sampleCount) || sampleCount < 100 || sampleCount > 1000) {
  throw new Error("API_QUALITY_SAMPLES deve ser um inteiro entre 100 e 1000.");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function percentileNearestRank(values, percentile) {
  assert(values.length > 0, "Não há amostras para calcular o percentil.");
  const sorted = [...values].sort((left, right) => left - right);
  return sorted[Math.ceil(percentile * sorted.length) - 1];
}

function parseServerTiming(value) {
  const match = value?.match(/(?:^|,)\s*app;dur=([0-9]+(?:\.[0-9]+)?)/i);
  return match ? Number(match[1]) : null;
}

function buildPayload(index, measuredAt) {
  return {
    schema_version: 1,
    measurement: {
      measurement_id: crypto.randomUUID(),
      device_id: deviceId,
      boot_id: bootId,
      sequence_number: index + 1,
      run_id: null,
      configuration_version: 1,
      measured_at: measuredAt.toISOString(),
      device_uptime_ms: (index + 1) * 1000,
      time_sync_status: "SYNCED",
      readings: {
        temperature_c: { value: 20 + (index % 100) / 10, status: "VALID" },
        relative_humidity_pct: { value: 40 + (index % 50) / 10, status: "VALID" },
        illuminance_lx: { value: 300 + index, status: "VALID" },
      },
    },
    delivery: {
      mode: "ONLINE",
      sent_at: measuredAt.toISOString(),
      queue_depth_before_send: 0,
      queue_capacity: 256,
      dropped_total: 0,
    },
  };
}

async function post(body, options = {}) {
  const startedAt = performance.now();
  const response = await fetch(`${baseUrl}/api/v1/measurements`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${options.token ?? nodeApiKey}`,
      "Content-Type": options.contentType ?? "application/json",
    },
    body: options.rawBody ?? JSON.stringify(body),
  });
  const requestResponseMs = performance.now() - startedAt;
  const responseBody = await response.json();

  return {
    status: response.status,
    body: responseBody,
    requestResponseMs,
    internalMs: parseServerTiming(response.headers.get("server-timing")),
  };
}

function normalizeRawPayload(value) {
  return typeof value === "string" ? JSON.parse(value) : value;
}

const payloads = Array.from({ length: sampleCount }, (_, index) =>
  buildPayload(index, new Date(Date.now() - (sampleCount - index) * 1000)),
);
const measurementIds = payloads.map(
  (payload) => payload.measurement.measurement_id,
);
const connection = await mysql.createConnection({ uri: databaseUrl, timezone: "Z" });

async function cleanup() {
  await connection.execute(
    `DELETE FROM measurement_flags
      WHERE measurement_id IN (
        SELECT measurement_id FROM measurements WHERE boot_id = ?
      )`,
    [bootId],
  );
  await connection.execute(
    `DELETE FROM ingestion_attempts
      WHERE claimed_measurement_id IN (${measurementIds.map(() => "?").join(", ")})`,
    measurementIds,
  );
  await connection.execute("DELETE FROM measurements WHERE boot_id = ?", [bootId]);
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
    "O benchmark não pode ser executado durante uma coleta ativa.",
  );

  await cleanup();

  const internalLatenciesMs = [];
  const requestResponseLatenciesMs = [];
  let serverErrors = 0;

  for (const payload of payloads) {
    const result = await post(payload);
    serverErrors += result.status >= 500 ? 1 : 0;
    assert(
      result.status === 201 && result.body.ingestion_status === "STORED",
      `Resposta nominal inesperada: ${JSON.stringify(result.body)}`,
    );
    assert(result.internalMs !== null, "Cabeçalho Server-Timing ausente.");
    internalLatenciesMs.push(result.internalMs);
    requestResponseLatenciesMs.push(result.requestResponseMs);
  }

  for (const payload of payloads.slice(0, 5)) {
    const replay = structuredClone(payload);
    replay.delivery.mode = "REPLAYED";
    replay.delivery.queue_depth_before_send = 1;
    const result = await post(replay);
    serverErrors += result.status >= 500 ? 1 : 0;
    assert(
      result.status === 200 && result.body.ingestion_status === "ALREADY_STORED",
      `Reenvio idempotente inesperado: ${JSON.stringify(result.body)}`,
    );
  }

  const conflict = structuredClone(payloads[0]);
  conflict.measurement.readings.temperature_c.value += 1;
  const conflictResult = await post(conflict);
  assert(
    conflictResult.status === 409 &&
      conflictResult.body.error?.code === "INTEGRITY_CONFLICT",
    `Conflito inesperado: ${JSON.stringify(conflictResult.body)}`,
  );

  const incompleteResult = await post({ schema_version: 1 });
  const invalidTime = structuredClone(payloads[0]);
  invalidTime.measurement.measurement_id = crypto.randomUUID();
  invalidTime.measurement.sequence_number = sampleCount + 1;
  invalidTime.measurement.measured_at = null;
  const invalidTimeResult = await post(invalidTime);
  const malformedResult = await post(null, { rawBody: "{" });
  const wrongTypeResult = await post(payloads[0], { contentType: "text/plain" });
  const unauthorizedResult = await post(payloads[0], { token: "invalid-test-token" });
  const controlledErrors = [
    incompleteResult,
    invalidTimeResult,
    malformedResult,
    wrongTypeResult,
    unauthorizedResult,
  ];

  for (const result of [conflictResult, ...controlledErrors]) {
    serverErrors += result.status >= 500 ? 1 : 0;
  }
  assert(incompleteResult.status === 422, "Payload incompleto não foi rejeitado.");
  assert(invalidTimeResult.status === 422, "Timestamp inconsistente não foi rejeitado.");
  assert(malformedResult.status === 422, "JSON malformado não foi rejeitado.");
  assert(wrongTypeResult.status === 415, "Content-Type inválido não foi rejeitado.");
  assert(unauthorizedResult.status === 401, "Credencial inválida não foi rejeitada.");
  assert(serverErrors === 0, `Foram observados ${serverErrors} erros 5xx.`);

  const [rows] = await connection.execute(
    `SELECT
       measurement_id, boot_id, sequence_number, run_id,
       configuration_version, measured_at, device_uptime_ms, time_sync_status,
       temperature_c, temperature_status,
       relative_humidity_pct, humidity_status,
       illuminance_lx, illuminance_status, payload_hash, raw_payload
     FROM measurements
     WHERE boot_id = ?
     ORDER BY sequence_number`,
    [bootId],
  );
  assert(rows.length === sampleCount, `Esperadas ${sampleCount} linhas; obtidas ${rows.length}.`);
  assert(
    new Set(rows.map((row) => row.measurement_id)).size === sampleCount,
    "Foram encontrados identificadores duplicados no banco.",
  );

  for (let index = 0; index < rows.length; index += 1) {
    const row = rows[index];
    const expected = payloads[index];
    const measurement = expected.measurement;
    assert(row.measurement_id === measurement.measurement_id, "measurement_id divergente.");
    assert(row.boot_id === measurement.boot_id, "boot_id divergente.");
    assert(Number(row.sequence_number) === measurement.sequence_number, "sequência divergente.");
    assert(row.run_id === null, "run_id divergente.");
    assert(Number(row.configuration_version) === 1, "configuração divergente.");
    assert(row.measured_at.toISOString() === measurement.measured_at, "timestamp divergente.");
    assert(Number(row.device_uptime_ms) === measurement.device_uptime_ms, "uptime divergente.");
    assert(row.time_sync_status === "SYNCED", "sincronização divergente.");
    assert(Number(row.temperature_c) === measurement.readings.temperature_c.value, "temperatura divergente.");
    assert(Number(row.relative_humidity_pct) === measurement.readings.relative_humidity_pct.value, "umidade divergente.");
    assert(Number(row.illuminance_lx) === measurement.readings.illuminance_lx.value, "iluminância divergente.");
    assert(row.temperature_status === "VALID", "estado da temperatura divergente.");
    assert(row.humidity_status === "VALID", "estado da umidade divergente.");
    assert(row.illuminance_status === "VALID", "estado da iluminância divergente.");
    assert(/^[a-f0-9]{64}$/.test(row.payload_hash), "Hash persistido inválido.");
    assert(
      isDeepStrictEqual(normalizeRawPayload(row.raw_payload), expected),
      "Payload bruto persistido divergente.",
    );
  }

  const [attemptRows] = await connection.execute(
    `SELECT outcome, COUNT(*) AS total
       FROM ingestion_attempts
      WHERE claimed_measurement_id IN (${measurementIds.map(() => "?").join(", ")})
      GROUP BY outcome`,
    measurementIds,
  );
  const attempts = Object.fromEntries(
    attemptRows.map((row) => [row.outcome, Number(row.total)]),
  );
  assert(attempts.STORED === sampleCount, "Tentativas STORED não reconciliadas.");
  assert(attempts.ALREADY_STORED === 5, "Reenvios não reconciliados.");
  assert(attempts.INTEGRITY_CONFLICT === 1, "Conflito não reconciliado.");

  const internalP95Ms = percentileNearestRank(internalLatenciesMs, 0.95);
  const requestResponseP95Ms = percentileNearestRank(
    requestResponseLatenciesMs,
    0.95,
  );
  assert(
    internalP95Ms <= 500,
    `Latência interna P95 acima de 500 ms: ${internalP95Ms} ms.`,
  );

  const result = {
    generated_at: new Date().toISOString(),
    environment: "local-controlled",
    nominal_requests: sampleCount,
    additional_controlled_requests: 11,
    server_errors_5xx: serverErrors,
    api_internal_latency_ms: {
      minimum: Math.min(...internalLatenciesMs),
      average:
        internalLatenciesMs.reduce((sum, value) => sum + value, 0) /
        internalLatenciesMs.length,
      p95: internalP95Ms,
      maximum: Math.max(...internalLatenciesMs),
    },
    request_response_latency_ms: {
      p95: requestResponseP95Ms,
      maximum: Math.max(...requestResponseLatenciesMs),
    },
    database_audit: {
      expected_unique_rows: sampleCount,
      stored_unique_rows: rows.length,
      duplicate_identifiers: 0,
      fully_matching_rows: rows.length,
      ingestion_attempts: attempts,
    },
    limitations: [
      "Execução local controlada, sem firmware físico e sem rede da sala.",
      "A latência interna utiliza o cabeçalho Server-Timing do Route Handler.",
      "A latência requisição–resposta é suplementar e inclui a pilha HTTP local.",
    ],
  };
  const resultDirectory = resolve("test-results");
  await mkdir(resultDirectory, { recursive: true });
  const resultPath = resolve(
    resultDirectory,
    `api-quality-${result.generated_at.replaceAll(":", "-")}.json`,
  );
  await writeFile(resultPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");

  console.log(`PASS T005: ${sampleCount + 11} casos sem erro 5xx`);
  console.log(`PASS T005: latência interna P95 ${internalP95Ms.toFixed(3)} ms`);
  console.log(`PASS T006: ${rows.length}/${sampleCount} registros integralmente correspondentes`);
  console.log("PASS T006: zero identificador duplicado e tentativas reconciliadas");
  console.log(`EVIDÊNCIA ${resultPath}`);
} finally {
  let cleanupSucceeded = false;
  try {
    await cleanup();
    const [remainingRows] = await connection.execute(
      "SELECT COUNT(*) AS total FROM measurements WHERE boot_id = ?",
      [bootId],
    );
    cleanupSucceeded = Number(remainingRows[0].total) === 0;
  } finally {
    await connection.end();
  }

  if (!cleanupSucceeded) {
    throw new Error("A limpeza das medições temporárias falhou.");
  }
  console.log("PASS limpeza: nenhum dado do benchmark permaneceu no MySQL");
}
