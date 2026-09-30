import test from "node:test";
import assert from "node:assert/strict";

import { analyzeExperimentalRun } from "./quality-analysis.mjs";

const run = {
  id: "controlled-run",
  start: "2026-08-25T21:45:00.000Z",
  end: "2026-08-25T21:50:00.000Z",
  sampling_interval_seconds: 60,
  configuration_version: 1,
};

function measurement({
  id,
  at,
  configurationVersion = 1,
  timeSyncStatus = "SYNCED",
  temperatureStatus = "VALID",
  flags = [],
}) {
  return {
    measurement_id: id,
    measured_at: at,
    configuration_version: configurationVersion,
    time_sync_status: timeSyncStatus,
    readings: {
      temperature_c: {
        value: temperatureStatus === "VALID" ? 23 : null,
        status: temperatureStatus,
      },
      relative_humidity_pct: { value: 52, status: "VALID" },
      illuminance_lx: { value: 500, status: "VALID" },
    },
    flags,
  };
}

test("reconcilia falhas, duplicata, lacunas e exclusão sem imputação", () => {
  const measurements = [
    measurement({ id: "m0", at: "2026-08-25T21:45:00.000Z" }),
    measurement({ id: "m0", at: "2026-08-25T21:45:00.000Z" }),
    measurement({
      id: "m1",
      at: "2026-08-25T21:46:00.000Z",
      temperatureStatus: "READ_ERROR",
    }),
    measurement({ id: "m3", at: "2026-08-25T21:48:00.000Z" }),
    measurement({
      id: "m4",
      at: "2026-08-25T21:49:00.000Z",
      flags: [
        {
          flag: "MANUAL_EXCLUSION",
          reason: "obstrução documentada no ensaio controlado",
          created_by: "quality-test",
          created_at: "2026-08-25T22:00:00.000Z",
        },
      ],
    }),
    measurement({
      id: "outside",
      at: "2026-08-25T21:50:00.000Z",
    }),
    measurement({
      id: "config",
      at: "2026-08-25T21:47:00.000Z",
      configurationVersion: 2,
    }),
    measurement({
      id: "unsynced",
      at: null,
      timeSyncStatus: "UNSYNCED",
    }),
  ];
  const before = structuredClone(measurements);
  const result = analyzeExperimentalRun({
    run,
    measurements,
    ingestionAttempts: [{ outcome: "ALREADY_STORED" }],
  });

  assert.deepEqual(measurements, before, "a entrada bruta não pode ser alterada");
  assert.equal(result.metrics.expected_slots, 5);
  assert.equal(result.metrics.occupied_storage_slots, 4);
  assert.equal(result.metrics.valid_environmental_slots, 2);
  assert.equal(result.metrics.missing_valid_slots, 3);
  assert.equal(result.metrics.storage_completeness_pct, 80);
  assert.equal(result.metrics.valid_slot_completeness_pct, 40);
  assert.equal(result.metrics.regularity_error_p95_seconds, 60);
  assert.equal(result.metrics.largest_missing_sequence, 2);
  assert.equal(result.metrics.duplicate_input_records, 1);
  assert.equal(result.metrics.duplicate_ingestion_attempts, 1);
  assert.equal(result.reconciliation.identity_holds, true);
  assert.deepEqual(result.reconciliation.primary_classification_counts, {
    VALID: 2,
    READ_ERROR: 1,
    MANUAL_EXCLUSION: 1,
    OUTSIDE_WINDOW: 1,
    CONFIG_MISMATCH: 1,
    TIME_UNSYNC: 1,
  });
  assert.deepEqual(
    result.missing_slots.map((slot) => slot.slot_index),
    [1, 2, 4],
  );
  assert(result.missing_slots.every((slot) => slot.readings === null));
  assert.equal(result.methodology.imputation, "none");
});

test("exige auditoria completa para exclusão manual", () => {
  assert.throws(
    () =>
      analyzeExperimentalRun({
        run,
        measurements: [
          measurement({
            id: "invalid-exclusion",
            at: "2026-08-25T21:45:00.000Z",
            flags: [{ flag: "MANUAL_EXCLUSION", reason: "", created_by: "x" }],
          }),
        ],
      }),
    /exige motivo/,
  );
});

test("usa janela semiaberta e inclui a posição inicial da grade", () => {
  const result = analyzeExperimentalRun({
    run: {
      ...run,
      end: "2026-08-25T21:50:30.000Z",
    },
    measurements: [],
  });

  assert.equal(result.metrics.expected_slots, 6);
  assert.equal(result.metrics.missing_valid_slots, 6);
  assert.equal(result.metrics.largest_missing_sequence, 6);
});
