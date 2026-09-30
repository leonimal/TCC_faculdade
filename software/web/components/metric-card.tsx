import type { ReactNode } from "react";

import type { LatestReading, MetricKey } from "@/lib/dashboard/presentation";

type MetricCardProps = {
  metric: MetricKey;
  label: string;
  unit: string;
  reading: LatestReading | null;
  tone: "thermal" | "moisture" | "light";
  icon: ReactNode;
  maximumFractionDigits: number;
};

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

export function MetricCard({ metric, label, unit, reading, tone, icon, maximumFractionDigits }: MetricCardProps) {
  const timestamp = reading?.measuredAt ?? reading?.receivedAt;
  const index = metric === "temperature_c" ? "01" : metric === "relative_humidity_pct" ? "02" : "03";

  return (
    <article data-metric={metric} data-reading-value={reading?.value} data-reading-at={timestamp} className={`metric-band metric-band--${tone}`}>
      <div className="metric-band__head">
        <div><p className="metric-band__index">{index}</p><h3>{label}</h3></div>
        <span className="metric-band__icon" aria-hidden="true">{icon}</span>
      </div>
      <div className="metric-band__value">
        <span>{reading ? reading.value.toLocaleString("pt-BR", { maximumFractionDigits, minimumFractionDigits: maximumFractionDigits }) : "—"}</span>
        <small>{unit}</small>
      </div>
      <p className="metric-band__timestamp">{timestamp ? `Última leitura válida · ${dateFormatter.format(new Date(timestamp))}` : "Aguardando leitura válida"}</p>
    </article>
  );
}
