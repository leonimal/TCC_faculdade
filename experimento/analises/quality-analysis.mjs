const readingFailurePriority = ["CRC_ERROR", "READ_ERROR", "OUT_OF_RANGE"];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function parseInstant(value, field) {
  const instant = value instanceof Date ? new Date(value) : new Date(value);
  assert(!Number.isNaN(instant.getTime()), `${field} deve ser um instante válido.`);
  return instant;
}

function percentage(numerator, denominator) {
  return denominator === 0 ? 0 : (numerator / denominator) * 100;
}

function nearestRank(values, percentile) {
  if (values.length === 0) {
    return null;
  }
  const sorted = [...values].sort((left, right) => left - right);
  return sorted[Math.ceil(percentile * sorted.length) - 1];
}

function readingFailure(measurement) {
  const statuses = Object.values(measurement.readings ?? {}).map(
    (reading) => reading.status,
  );
  return readingFailurePriority.find((status) => statuses.includes(status)) ?? null;
}

function manualExclusion(measurement) {
  const exclusion = (measurement.flags ?? []).find(
    (flag) => flag.flag === "MANUAL_EXCLUSION",
  );
  if (!exclusion) {
    return null;
  }
  assert(exclusion.reason?.trim(), "MANUAL_EXCLUSION exige motivo.");
  assert(exclusion.created_by?.trim(), "MANUAL_EXCLUSION exige autor.");
  parseInstant(exclusion.created_at, "MANUAL_EXCLUSION.created_at");
  return exclusion;
}

function assignSlot(measuredAtMs, startMs, intervalMs, expectedCount) {
  const slotIndex = Math.round((measuredAtMs - startMs) / intervalMs);
  return slotIndex >= 0 && slotIndex < expectedCount ? slotIndex : null;
}

function largestConsecutiveSequence(indices) {
  let largest = 0;
  let current = 0;
  let previous = null;
  for (const index of indices) {
    current = previous !== null && index === previous + 1 ? current + 1 : 1;
    largest = Math.max(largest, current);
    previous = index;
  }
  return largest;
}

export function analyzeExperimentalRun({
  run,
  measurements,
  ingestionAttempts = [],
}) {
  assert(run && typeof run === "object", "run é obrigatório.");
  assert(Array.isArray(measurements), "measurements deve ser uma lista.");
  assert(Array.isArray(ingestionAttempts), "ingestionAttempts deve ser uma lista.");
  assert(
    Number.isInteger(run.sampling_interval_seconds) &&
      run.sampling_interval_seconds > 0,
    "sampling_interval_seconds deve ser um inteiro positivo.",
  );

  const start = parseInstant(run.start, "run.start");
  const end = parseInstant(run.end, "run.end");
  const startMs = start.getTime();
  const endMs = end.getTime();
  const intervalMs = run.sampling_interval_seconds * 1000;
  assert(endMs > startMs, "run.end deve ser posterior a run.start.");

  const expectedCount = Math.ceil((endMs - startMs) / intervalMs);
  assert(expectedCount > 0, "A janela deve conter ao menos uma posição esperada.");

  const canonicalById = new Map();
  const duplicateInputRecords = [];
  for (const measurement of measurements) {
    assert(measurement.measurement_id, "Toda medição exige measurement_id.");
    if (canonicalById.has(measurement.measurement_id)) {
      duplicateInputRecords.push({
        measurement_id: measurement.measurement_id,
        quality_code: "DUPLICATE",
      });
    } else {
      canonicalById.set(measurement.measurement_id, measurement);
    }
  }

  const classifications = [];
  const storageSlots = new Map();
  const validSlots = new Map();
  const regularityCandidates = [];
  const slotCollisions = [];

  for (const measurement of canonicalById.values()) {
    const exclusion = manualExclusion(measurement);
    const measuredAt = measurement.measured_at
      ? parseInstant(measurement.measured_at, "measurement.measured_at")
      : null;
    const measuredAtMs = measuredAt?.getTime() ?? null;
    const synchronized =
      measurement.time_sync_status === "SYNCED" && measuredAtMs !== null;
    const insideWindow =
      synchronized && measuredAtMs >= startMs && measuredAtMs < endMs;
    const configurationMatches =
      measurement.configuration_version === run.configuration_version;
    const failure = readingFailure(measurement);

    let qualityCode = "VALID";
    if (!synchronized) {
      qualityCode = "TIME_UNSYNC";
    } else if (!insideWindow) {
      qualityCode = "OUTSIDE_WINDOW";
    } else if (!configurationMatches) {
      qualityCode = "CONFIG_MISMATCH";
    } else if (exclusion) {
      qualityCode = "MANUAL_EXCLUSION";
    } else if (failure) {
      qualityCode = failure;
    }

    const classification = {
      measurement_id: measurement.measurement_id,
      quality_code: qualityCode,
      measured_at: measuredAt?.toISOString() ?? null,
      manual_exclusion: exclusion
        ? {
            reason: exclusion.reason,
            created_by: exclusion.created_by,
            created_at: parseInstant(
              exclusion.created_at,
              "MANUAL_EXCLUSION.created_at",
            ).toISOString(),
          }
        : null,
    };
    classifications.push(classification);

    if (insideWindow && configurationMatches) {
      const slotIndex = assignSlot(
        measuredAtMs,
        startMs,
        intervalMs,
        expectedCount,
      );
      if (slotIndex !== null) {
        if (!storageSlots.has(slotIndex)) {
          storageSlots.set(slotIndex, measurement.measurement_id);
        }
        if (qualityCode === "VALID") {
          if (!validSlots.has(slotIndex)) {
            validSlots.set(slotIndex, measurement.measurement_id);
          } else {
            slotCollisions.push({
              slot_index: slotIndex,
              retained_measurement_id: validSlots.get(slotIndex),
              additional_measurement_id: measurement.measurement_id,
            });
          }
        }
      }
      regularityCandidates.push(measuredAtMs);
    }
  }

  regularityCandidates.sort((left, right) => left - right);
  const intervalErrorsSeconds = [];
  for (let index = 1; index < regularityCandidates.length; index += 1) {
    const observedInterval = regularityCandidates[index] - regularityCandidates[index - 1];
    intervalErrorsSeconds.push(Math.abs(observedInterval - intervalMs) / 1000);
  }

  const missingSlots = [];
  for (let slotIndex = 0; slotIndex < expectedCount; slotIndex += 1) {
    if (!validSlots.has(slotIndex)) {
      missingSlots.push({
        slot_index: slotIndex,
        expected_at: new Date(startMs + slotIndex * intervalMs).toISOString(),
        quality_code: "MISSING_SLOT",
        readings: null,
      });
    }
  }

  const primaryCounts = classifications.reduce((counts, classification) => {
    counts[classification.quality_code] =
      (counts[classification.quality_code] ?? 0) + 1;
    return counts;
  }, {});
  const primaryTotal = Object.values(primaryCounts).reduce(
    (sum, value) => sum + value,
    0,
  );
  const duplicateAttempts = ingestionAttempts.filter(
    (attempt) => attempt.outcome === "ALREADY_STORED",
  ).length;

  return {
    schema_version: 1,
    run: {
      id: run.id,
      start: start.toISOString(),
      end: end.toISOString(),
      sampling_interval_seconds: run.sampling_interval_seconds,
      configuration_version: run.configuration_version,
    },
    metrics: {
      expected_slots: expectedCount,
      occupied_storage_slots: storageSlots.size,
      valid_environmental_slots: validSlots.size,
      missing_valid_slots: missingSlots.length,
      storage_completeness_pct: percentage(storageSlots.size, expectedCount),
      valid_slot_completeness_pct: percentage(validSlots.size, expectedCount),
      synchronized_canonical_pct: percentage(
        classifications.filter((item) => item.quality_code !== "TIME_UNSYNC").length,
        classifications.length,
      ),
      regularity_error_p95_seconds: nearestRank(intervalErrorsSeconds, 0.95),
      largest_missing_sequence: largestConsecutiveSequence(
        missingSlots.map((slot) => slot.slot_index),
      ),
      duplicate_input_records: duplicateInputRecords.length,
      duplicate_ingestion_attempts: duplicateAttempts,
      slot_collisions: slotCollisions.length,
    },
    reconciliation: {
      input_records: measurements.length,
      canonical_records: canonicalById.size,
      duplicate_input_records: duplicateInputRecords.length,
      primary_classification_total: primaryTotal,
      primary_classification_counts: primaryCounts,
      identity_holds:
        measurements.length === canonicalById.size + duplicateInputRecords.length &&
        canonicalById.size === primaryTotal,
    },
    classifications,
    duplicate_input_records: duplicateInputRecords,
    missing_slots: missingSlots,
    slot_collisions: slotCollisions,
    methodology: {
      window: "start inclusive, end exclusive",
      slot_assignment: "nearest expected instant",
      imputation: "none",
      canonical_duplicate_rule: "first occurrence retained in the derived product",
    },
  };
}
