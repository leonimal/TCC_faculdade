import type { MeasurementView } from "@/lib/measurements/query-repository";
import { buildChartGeometry, getMetricChartPoints, type MetricKey } from "@/lib/dashboard/presentation";

type HistoryChartProps = { measurements: MeasurementView[]; metric: MetricKey; label: string; unit: string; color: string; };

const dateFormatter = new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });

export function HistoryChart({ measurements, metric, label, unit, color }: HistoryChartProps) {
  const points = getMetricChartPoints(measurements, metric);
  const geometry = buildChartGeometry(points);
  const firstPoint = points[0];
  const lastPoint = points.at(-1);

  return (
    <article className="history-chart">
      <div className="history-chart__head"><div><p>Histórico recente</p><h3>{label}</h3></div><span>{geometry ? `${geometry.validPointCount} válidas` : "Sem dados"}</span></div>
      {geometry ? (
        <div className="history-chart__body">
          <div className="history-chart__range"><span>{geometry.maxValue.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} {unit}</span><span>{geometry.minValue.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} {unit}</span></div>
          <svg viewBox="0 0 640 180" role="img" aria-label={`Gráfico do histórico de ${label.toLowerCase()}`} className="history-chart__svg">
            {[18, 54, 90, 126, 162].map((y) => <line key={y} x1="18" x2="622" y1={y} y2={y} className="history-chart__rule" />)}
            {geometry.segments.map((segment, index) => {
              const coordinates = segment.split(" ");
              if (coordinates.length === 1) {
                const [cx, cy] = coordinates[0].split(",");
                return <circle key={`${metric}-${index}`} cx={cx} cy={cy} r="4" fill={color} />;
              }
              return <polyline key={`${metric}-${index}`} points={segment} fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" vectorEffect="non-scaling-stroke" />;
            })}
          </svg>
          <div className="history-chart__dates"><span>{firstPoint ? dateFormatter.format(firstPoint.timestamp) : "—"}</span><span>{lastPoint ? dateFormatter.format(lastPoint.timestamp) : "—"}</span></div>
        </div>
      ) : <div className="history-chart__empty">Aguardando medições válidas e temporalmente sincronizadas.</div>}
    </article>
  );
}
