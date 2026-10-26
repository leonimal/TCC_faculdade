import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { analyzeExperimentalRun } from "./quality-analysis.mjs";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const rawPath = resolve(process.argv[2] ?? resolve(scriptDirectory, "../dados-brutos/sessoes-formais-2026-10-19-a-21.json"));
const outputDir = resolve(process.argv[3] ?? resolve(scriptDirectory, "../dados-tratados/2026-10-21-sessoes-formais-v1"));

function percentile(values, p) {
  if (!values.length) return null;
  const sorted = [...values].sort((left, right) => left - right);
  return sorted[Math.ceil(sorted.length * p) - 1];
}

function percentage(numerator, denominator) {
  return denominator === 0 ? 0 : Number((numerator / denominator * 100).toFixed(3));
}

async function ensureNewDirectory(path) {
  try {
    await access(path);
    throw new Error(`O diretorio derivado ja existe e nao sera sobrescrito: ${path}`);
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
}

function readings(measurement) {
  return {
    temperature_c: { value: measurement.temperature_c === null ? null : Number(measurement.temperature_c), status: measurement.temperature_status },
    relative_humidity_pct: { value: measurement.relative_humidity_pct === null ? null : Number(measurement.relative_humidity_pct), status: measurement.humidity_status },
    illuminance_lx: { value: measurement.illuminance_lx === null ? null : Number(measurement.illuminance_lx), status: measurement.illuminance_status },
  };
}

const rawBuffer = await readFile(rawPath);
const raw = JSON.parse(rawBuffer.toString("utf8"));
if (raw.schema_version !== 1 || !Array.isArray(raw.runs) || !Array.isArray(raw.measurements)) {
  throw new Error("Arquivo bruto incompativel com o schema esperado.");
}
await ensureNewDirectory(outputDir);
await mkdir(outputDir, { recursive: true });

const flagsByMeasurement = new Map();
for (const flag of raw.measurement_flags ?? []) {
  const list = flagsByMeasurement.get(flag.measurement_id) ?? [];
  list.push(flag);
  flagsByMeasurement.set(flag.measurement_id, list);
}
const attemptsByMeasurement = new Map();
for (const attempt of raw.ingestion_attempts ?? []) {
  const list = attemptsByMeasurement.get(attempt.claimed_measurement_id) ?? [];
  list.push(attempt);
  attemptsByMeasurement.set(attempt.claimed_measurement_id, list);
}

const sessions = raw.runs.map((run) => {
  const allMeasurements = raw.measurements.filter((measurement) => measurement.run_id === run.id);
  const domainMeasurements = allMeasurements.map((measurement) => ({
    measurement_id: measurement.measurement_id,
    measured_at: measurement.measured_at,
    configuration_version: Number(measurement.configuration_version),
    time_sync_status: measurement.time_sync_status,
    readings: readings(measurement),
    flags: flagsByMeasurement.get(measurement.measurement_id) ?? [],
  }));
  const attempts = allMeasurements.flatMap((measurement) => attemptsByMeasurement.get(measurement.measurement_id) ?? []);
  const quality = analyzeExperimentalRun({
    run: {
      id: run.id,
      start: run.actual_start,
      end: run.actual_end,
      sampling_interval_seconds: Number(run.sampling_interval_seconds),
      configuration_version: Number(run.configuration_version),
    },
    measurements: domainMeasurements,
    ingestionAttempts: attempts,
  });
  const classifications = new Map(quality.classifications.map((item) => [item.measurement_id, item]));
  const inWindow = allMeasurements.filter((measurement) => measurement.measured_at && measurement.measured_at >= run.actual_start && measurement.measured_at < run.actual_end);
  const latencies = inWindow.map((measurement) => (new Date(measurement.first_received_at) - new Date(measurement.measured_at)) / 1000);
  const fullyValid = inWindow.filter((measurement) => measurement.time_sync_status === "SYNCED" && measurement.temperature_status === "VALID" && measurement.humidity_status === "VALID" && measurement.illuminance_status === "VALID").length;
  return {
    run,
    quality,
    operational_records: allMeasurements.map((measurement) => ({
      ...measurement,
      flags: flagsByMeasurement.get(measurement.measurement_id) ?? [],
      primary_quality: classifications.get(measurement.measurement_id)?.quality_code ?? "UNCLASSIFIED",
    })),
    summary: {
      run_id: run.id,
      actual_start: run.actual_start,
      actual_end: run.actual_end,
      expected_records: quality.metrics.expected_slots,
      stored_records_in_window: inWindow.length,
      completeness_pct: quality.metrics.storage_completeness_pct,
      synchronized_pct: percentage(inWindow.filter((measurement) => measurement.time_sync_status === "SYNCED").length, inWindow.length),
      fully_valid_records: fullyValid,
      interval_error_p95_seconds: quality.metrics.regularity_error_p95_seconds,
      api_latency_p95_seconds: percentile(latencies, 0.95),
      missing_slots: quality.metrics.missing_valid_slots,
      largest_missing_sequence: quality.metrics.largest_missing_sequence,
      duplicate_ingestion_attempts: quality.metrics.duplicate_ingestion_attempts,
      unique_measurement_ids: new Set(inWindow.map((measurement) => measurement.measurement_id)).size,
    },
  };
});

const summary = {
  schema_version: 1,
  generated_at: new Date().toISOString(),
  raw_file: rawPath,
  raw_sha256: createHash("sha256").update(rawBuffer).digest("hex"),
  sessions: sessions.map((session) => session.summary),
  cumulative: {
    expected_records: sessions.reduce((sum, session) => sum + session.summary.expected_records, 0),
    stored_records_in_window: sessions.reduce((sum, session) => sum + session.summary.stored_records_in_window, 0),
    fully_valid_records: sessions.reduce((sum, session) => sum + session.summary.fully_valid_records, 0),
  },
  methodology: { imputation: "none", slot_assignment: "nearest expected instant", window: "start inclusive, end exclusive" },
};
summary.cumulative.completeness_pct = percentage(summary.cumulative.stored_records_in_window, summary.cumulative.expected_records);

const manifest = {
  schema_version: 1,
  raw_file: rawPath,
  raw_sha256: summary.raw_sha256,
  analysis_script: "experimento/analises/analyze-formal-runs.mjs",
  quality_engine: "experimento/analises/quality-analysis.mjs",
  generated_at: summary.generated_at,
  output_directory: outputDir,
};
for (const session of sessions) {
  const safeId = session.run.id;
  await writeFile(resolve(outputDir, `${safeId}-operational.json`), `${JSON.stringify(session.operational_records, null, 2)}\n`);
  await writeFile(resolve(outputDir, `${safeId}-missing-slots.json`), `${JSON.stringify(session.quality.missing_slots, null, 2)}\n`);
  await writeFile(resolve(outputDir, `${safeId}-quality.json`), `${JSON.stringify(session.quality, null, 2)}\n`);
}
await writeFile(resolve(outputDir, "summary.json"), `${JSON.stringify(summary, null, 2)}\n`);
await writeFile(resolve(outputDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
const lines = ["# Apuracao das sessoes formais", "", `- Fonte bruta: \`${rawPath}\``, `- SHA-256: \`${summary.raw_sha256}\``, "", "| Sessao | Esperados | Armazenados | Completude | Sincronizados | Validos | P95 intervalo (s) | P95 API (s) | Lacunas |", "| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |", ...summary.sessions.map((session) => `| ${session.run_id} | ${session.expected_records} | ${session.stored_records_in_window} | ${session.completeness_pct.toFixed(3)}% | ${session.synchronized_pct.toFixed(3)}% | ${session.fully_valid_records} | ${session.interval_error_p95_seconds ?? "n/a"} | ${session.api_latency_p95_seconds ?? "n/a"} | ${session.missing_slots} |`), "", `Completude acumulada: ${summary.cumulative.stored_records_in_window}/${summary.cumulative.expected_records} (${summary.cumulative.completeness_pct.toFixed(3)}%).`, "", "Nenhum valor ausente foi imputado."];
await writeFile(resolve(outputDir, "summary.md"), `${lines.join("\n")}\n`);
console.log(JSON.stringify({ output_directory: outputDir, manifest, summary }, null, 2));
