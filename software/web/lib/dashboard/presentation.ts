import type { MeasurementView } from "@/lib/measurements/query-repository";

export type MetricKey =
  | "temperature_c"
  | "relative_humidity_pct"
  | "illuminance_lx";

export type LatestReading = {
  value: number;
  measuredAt: string | null;
  receivedAt: string;
};

export type ChartPoint = {
  timestamp: number;
  value: number | null;
};

export type ChartGeometry = {
  segments: string[];
  minValue: number;
  maxValue: number;
  validPointCount: number;
};

export function getLatestValidReading(
  measurements: MeasurementView[],
  metric: MetricKey,
): LatestReading | null {
  for (const measurement of measurements) {
    const reading = measurement.readings[metric];
    if (reading.status === "VALID" && reading.value !== null) {
      return {
        value: reading.value,
        measuredAt: measurement.measured_at,
        receivedAt: measurement.first_received_at,
      };
    }
  }

  return null;
}

export function getMetricChartPoints(
  measurements: MeasurementView[],
  metric: MetricKey,
): ChartPoint[] {
  return measurements
    .filter((measurement) => measurement.measured_at !== null)
    .map((measurement) => {
      const reading = measurement.readings[metric];
      return {
        timestamp: Date.parse(measurement.measured_at as string),
        value:
          reading.status === "VALID" && reading.value !== null
            ? reading.value
            : null,
      };
    })
    .sort((left, right) => left.timestamp - right.timestamp);
}

export function buildChartGeometry(
  points: ChartPoint[],
  width = 640,
  height = 180,
  padding = 18,
): ChartGeometry | null {
  const validPoints = points.filter(
    (point): point is ChartPoint & { value: number } => point.value !== null,
  );
  if (validPoints.length === 0) {
    return null;
  }

  const values = validPoints.map((point) => point.value);
  const observedMin = Math.min(...values);
  const observedMax = Math.max(...values);
  const spread = observedMax - observedMin;
  const valuePadding =
    spread === 0 ? Math.max(Math.abs(observedMin) * 0.05, 1) : spread * 0.12;
  const minValue = observedMin - valuePadding;
  const maxValue = observedMax + valuePadding;

  const timestamps = points.map((point) => point.timestamp);
  const minTimestamp = Math.min(...timestamps);
  const maxTimestamp = Math.max(...timestamps);
  const timestampSpread = Math.max(maxTimestamp - minTimestamp, 1);
  const drawableWidth = width - padding * 2;
  const drawableHeight = height - padding * 2;

  const toCoordinate = (point: ChartPoint & { value: number }) => {
    const x =
      padding +
      ((point.timestamp - minTimestamp) / timestampSpread) * drawableWidth;
    const y =
      padding +
      ((maxValue - point.value) / (maxValue - minValue)) * drawableHeight;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  };

  const segments: string[] = [];
  let currentSegment: string[] = [];

  for (const point of points) {
    if (point.value === null) {
      if (currentSegment.length > 0) {
        segments.push(currentSegment.join(" "));
        currentSegment = [];
      }
      continue;
    }

    currentSegment.push(toCoordinate(point as ChartPoint & { value: number }));
  }

  if (currentSegment.length > 0) {
    segments.push(currentSegment.join(" "));
  }

  return {
    segments,
    minValue: observedMin,
    maxValue: observedMax,
    validPointCount: validPoints.length,
  };
}
