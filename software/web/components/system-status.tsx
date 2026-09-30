import type { DashboardConfiguration, DashboardDeliverySummary, DashboardDeviceStatus } from "@/lib/dashboard/repository";

type SystemStatusProps = { status: DashboardDeviceStatus | null; delivery: DashboardDeliverySummary; configuration: DashboardConfiguration | null; };
const dateFormatter = new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" });
const formatTimestamp = (value: string | null) => value ? dateFormatter.format(new Date(value)) : "Não informado";

export function SystemStatus({ status, delivery, configuration }: SystemStatusProps) {
  const occupancy = status?.queueOccupancyPercent ?? 0;
  return (
    <section className="system-status">
      <div className="system-status__head"><div><p>Telemetria operacional</p><h2>Estado informado pelo nó</h2></div><span className={`connection-pill ${status?.connectionStatus === "ONLINE" ? "connection-pill--online" : ""}`}>{status ? `${status.connectionStatus} informado` : "Sem relatório"}</span></div>
      <div className="queue-meter">
        <div className="queue-meter__labels"><div><p>Fila persistente</p><strong>{status ? `${status.queueDepth} / ${status.queueCapacity}` : "— / 256"}</strong></div><span className={status?.queueWarning ? "queue-meter__warning" : ""}>{status ? `${occupancy.toLocaleString("pt-BR")}%` : "Sem dados"}</span></div>
        <div className="queue-meter__track"><div className={status?.queueWarning ? "queue-meter__fill queue-meter__fill--warning" : "queue-meter__fill"} style={{ width: `${Math.min(occupancy, 100)}%` }} /></div>
        {status?.queueWarning ? <p className="queue-meter__notice">Advertência: a fila atingiu pelo menos 80% da capacidade.</p> : null}
      </div>
      <dl className="status-details">
        <StatusItem label="Entregas confirmadas" value={delivery.confirmedTotal.toLocaleString("pt-BR")} />
        <StatusItem label="Tentativas rejeitadas" value={delivery.rejectedTotal.toLocaleString("pt-BR")} />
        <StatusItem label="Perdas contabilizadas" value={(status?.droppedTotal ?? 0).toLocaleString("pt-BR")} />
        <StatusItem label="Última confirmação" value={formatTimestamp(status?.lastConfirmedAt ?? null)} />
        <StatusItem label="Relógio do nó" value={status?.timeSyncStatus ?? "Não informado"} />
        <StatusItem label="Firmware" value={status?.firmwareVersion ?? "Não informado"} />
        <StatusItem label="Intervalo configurado" value={configuration ? `${configuration.samplingIntervalSeconds} s · v${configuration.version} · ${configuration.status === "PENDING" ? "pendente" : "aplicado"}` : "Não informado"} />
        <StatusItem label="Relatório recebido" value={formatTimestamp(status?.receivedAt ?? null)} />
      </dl>
    </section>
  );
}

function StatusItem({ label, value }: { label: string; value: string }) { return <div><dt>{label}</dt><dd>{value}</dd></div>; }
