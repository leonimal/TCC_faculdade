import { createHash } from "node:crypto";
import { mkdir, writeFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import mysql from "../../software/web/node_modules/mysql2/promise.js";

const runIds = (process.env.FORMAL_RUN_IDS ?? [
  "98d1dd84-49ae-41c5-aa46-28ba98f7fd78",
  "4719d5b0-9425-4de0-a57c-5f5a39bd80ec",
  "00e0ee37-26e8-40a9-838f-fc1751c0129a",
].join(","))
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(process.env.FORMAL_RAW_OUTPUT ?? resolve(scriptDirectory, "../dados-brutos/sessoes-formais-2026-10-19-a-21.json"));

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL e obrigatoria.");
if (runIds.length !== 3) throw new Error("FORMAL_RUN_IDS deve identificar exatamente tres sessoes.");

async function ensureNewFile(path) {
  try {
    await access(path);
    throw new Error(`O arquivo bruto ja existe e nao sera sobrescrito: ${path}`);
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
}

function asIso(value) {
  return value instanceof Date ? value.toISOString() : value;
}

function normalize(value) {
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return value.map(normalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, normalize(item)]));
  }
  return value;
}

const placeholders = runIds.map(() => "?").join(", ");
const connection = await mysql.createConnection({ uri: process.env.DATABASE_URL, timezone: "Z" });

try {
  await ensureNewFile(outputPath);
  const [runs] = await connection.execute(
    `SELECT r.id, d.public_id AS device_id, r.run_type, r.status,
            r.planned_start, r.planned_end, r.actual_start, r.actual_end,
            c.version AS configuration_version, c.sampling_interval_seconds
       FROM experimental_runs r
       JOIN devices d ON d.id = r.device_id
       JOIN sampling_configurations c ON c.id = r.configuration_id
      WHERE r.id IN (${placeholders})
      ORDER BY r.actual_start`,
    runIds,
  );
  if (runs.length !== runIds.length) throw new Error("Uma ou mais sessoes formais nao foram encontradas.");
  if (runs.some((run) => run.status !== "COMPLETED" || !run.actual_start || !run.actual_end)) {
    throw new Error("Todas as sessoes devem estar COMPLETED e possuir janela efetiva.");
  }

  const [measurements] = await connection.execute(
    `SELECT m.measurement_id, m.run_id, d.public_id AS device_id, m.boot_id, m.sequence_number,
            m.configuration_version, m.measured_at, m.device_uptime_ms, m.time_sync_status,
            m.temperature_c, m.temperature_status, m.relative_humidity_pct, m.humidity_status,
            m.illuminance_lx, m.illuminance_status, m.payload_hash, m.raw_payload, m.first_received_at
       FROM measurements m
       JOIN devices d ON d.id = m.device_id
      WHERE m.run_id IN (${placeholders})
      ORDER BY m.run_id, m.measured_at IS NULL, m.measured_at, m.first_received_at, m.measurement_id`,
    runIds,
  );
  const measurementIds = measurements.map((measurement) => measurement.measurement_id);
  const measurementPlaceholders = measurementIds.map(() => "?").join(", ");
  const [flags] = measurementIds.length
    ? await connection.execute(
      `SELECT measurement_id, flag, reason, created_by, created_at
         FROM measurement_flags WHERE measurement_id IN (${measurementPlaceholders})
         ORDER BY measurement_id, flag`,
      measurementIds,
    )
    : [[]];
  const [attempts] = measurementIds.length
    ? await connection.execute(
      `SELECT claimed_measurement_id, received_at, delivery_mode, sent_at,
              queue_depth_before_send, queue_capacity, dropped_total,
              payload_hash, outcome, http_status, request_id
         FROM ingestion_attempts
        WHERE claimed_measurement_id IN (${measurementPlaceholders})
        ORDER BY claimed_measurement_id, received_at, id`,
      measurementIds,
    )
    : [[]];
  const [telemetry] = await connection.execute(
    `SELECT r.id AS run_id, s.observed_at, s.received_at, s.firmware_version,
            s.connection_status, s.queue_depth, s.queue_capacity, s.dropped_total,
            s.last_confirmed_at, s.time_sync_status, s.details
       FROM device_status_reports s
       JOIN experimental_runs r ON r.device_id = s.device_id
      WHERE r.id IN (${placeholders})
        AND s.received_at >= r.actual_start AND s.received_at <= r.actual_end
      ORDER BY r.id, s.received_at`,
    runIds,
  );

  const source = {
    schema_version: 1,
    export_type: "formal_runs_database_snapshot",
    exported_at: new Date().toISOString(),
    source: "MySQL local; consultas somente leitura",
    run_ids: runIds,
    runs: runs.map(normalize),
    measurements: measurements.map(normalize),
    measurement_flags: flags.map(normalize),
    ingestion_attempts: attempts.map(normalize),
    telemetry: telemetry.map(normalize),
  };
  const body = `${JSON.stringify(source, null, 2)}\n`;
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, body, { encoding: "utf8", flag: "wx" });
  console.log(JSON.stringify({
    raw_file: outputPath,
    sha256: createHash("sha256").update(body).digest("hex"),
    runs: runs.length,
    measurements: measurements.length,
    attempts: attempts.length,
    telemetry: telemetry.length,
  }, null, 2));
} finally {
  await connection.end();
}
