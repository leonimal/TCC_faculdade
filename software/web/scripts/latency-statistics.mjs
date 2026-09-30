function validateSamples(samples) {
  if (!Array.isArray(samples) || samples.length === 0) {
    throw new Error("Ao menos uma amostra de latência é obrigatória.");
  }

  if (
    samples.some(
      (sample) => !Number.isFinite(sample) || sample < 0,
    )
  ) {
    throw new Error("As amostras de latência devem ser números finitos e não negativos.");
  }
}

export function nearestRankPercentile(samples, percentile) {
  validateSamples(samples);

  if (!Number.isFinite(percentile) || percentile <= 0 || percentile > 100) {
    throw new Error("O percentil deve estar no intervalo (0, 100].");
  }

  const sorted = [...samples].sort((left, right) => left - right);
  const rank = Math.ceil((percentile / 100) * sorted.length);
  return sorted[rank - 1];
}

export function summarizeLatencies(samples) {
  validateSamples(samples);

  const sorted = [...samples].sort((left, right) => left - right);
  const total = sorted.reduce((sum, sample) => sum + sample, 0);

  return {
    count: sorted.length,
    minimum_ms: sorted[0],
    mean_ms: Number((total / sorted.length).toFixed(2)),
    p50_ms: nearestRankPercentile(sorted, 50),
    p95_ms: nearestRankPercentile(sorted, 95),
    maximum_ms: sorted.at(-1),
  };
}
