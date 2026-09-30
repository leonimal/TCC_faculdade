import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";

import { loadAlertSnapshot, type AlertSnapshot } from "@/lib/alerts/data";
import { listClassrooms, type Classroom } from "@/lib/classrooms/repository";
import { classroomCodeSchema } from "@/lib/classrooms/schema";
import { isDatabaseConfigured } from "@/lib/db";
import { parseReportPeriod, type ReportSearchParams } from "@/lib/reports/filters";
import { requireUser } from "@/lib/user-auth";
import { AlertRoomPicker } from "@/components/alert-room-picker";

export const metadata: Metadata = { title: "Alertas locais | Monitoramento Ambiental IoT", description: "Histórico de alertas locais configurados pela administração." };

const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo", day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" });
const alertVariable = {
  TEMPERATURE_C: { label: "Temperatura do ar", unit: "°C", digits: 1 },
  RELATIVE_HUMIDITY_PCT: { label: "Umidade relativa", unit: "% UR", digits: 1 },
  ILLUMINANCE_LX: { label: "Iluminância", unit: "lx", digits: 0 },
} as const;
type AlertsPageProps = { searchParams: Promise<ReportSearchParams> };

function selectedClassroomCodes(value: ReportSearchParams["room"], classrooms: Classroom[]) {
  const requestedCodes = (Array.isArray(value) ? value : value ? [value] : []).filter((code) => classroomCodeSchema.safeParse(code).success);
  const registeredCodes = new Set(classrooms.map((classroom) => classroom.code));
  return [...new Set(requestedCodes)].filter((code) => registeredCodes.has(code));
}

export default async function AlertsPage({ searchParams }: AlertsPageProps) {
  await requireUser("/alerts");
  await connection();
  const resolvedSearchParams = await searchParams;
  const parsedPeriod = parseReportPeriod(resolvedSearchParams);
  const classrooms = isDatabaseConfigured() ? await listClassrooms().catch(() => []) : [];
  const roomCodes = selectedClassroomCodes(resolvedSearchParams.room, classrooms);
  const snapshot = parsedPeriod.success ? await loadAlertSnapshot(parsedPeriod.period, roomCodes.length ? roomCodes : undefined) : null;
  const formValues = parsedPeriod.success ? { fromDate: parsedPeriod.period.fromDate, toDate: parsedPeriod.period.toDate } : parsedPeriod.formValues;

  return <div className="alerts-shell min-h-screen"><div aria-hidden="true" className="alerts-ruler fixed inset-y-0 left-[7%]" /><main className="relative mx-auto w-full max-w-[1440px] px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
    <header className="alerts-header"><div className="flex items-start gap-4"><span className="alerts-mark" aria-hidden="true"><AlertIcon /></span><div><p className="eyebrow">Faixas locais · investigação administrativa</p><h1 className="alerts-title">Central de<span> alertas</span></h1><p className="alerts-subtitle">Leituras fora das faixas definidas para acompanhamento, preservadas com a regra vigente no instante da medição.</p></div></div><Link href={roomCodes.length === 1 ? `/?room=${encodeURIComponent(roomCodes[0])}` : "/"} className="quiet-link">{roomCodes.length === 1 ? "Monitorar esta sala" : "Monitoramento em tempo real"} <ArrowIcon /></Link></header>
    <AlertFilter fromDate={formValues.fromDate} toDate={formValues.toDate} classrooms={classrooms} roomCodes={roomCodes} errors={parsedPeriod.success ? [] : parsedPeriod.errors} />
    {parsedPeriod.success && snapshot ? snapshot.state === "ready" ? <AlertContent snapshot={snapshot} selectedAll={roomCodes.length === 0} /> : <AlertUnavailable snapshot={snapshot} /> : null}
    <footer className="alerts-footer">Alertas locais são definidos pela administração e não declaram conformidade normativa do ambiente.</footer>
  </main></div>;
}

function AlertFilter({ fromDate, toDate, classrooms, roomCodes, errors }: { fromDate: string; toDate: string; classrooms: Classroom[]; roomCodes: string[]; errors: string[] }) {
  return <section className="alert-filter" aria-labelledby="alert-filter-title"><div className="alert-filter__intro"><p className="eyebrow">Janela de alerta</p><h2 id="alert-filter-title">Observe o que exigiu atenção</h2><p>Consulte até 31 dias por vez no fuso America/São_Paulo.</p></div><form action="/alerts" method="get" className="period-ribbon period-ribbon--alerts"><label><span>Início</span><input type="date" name="from" defaultValue={fromDate} required /></label><span className="period-ribbon__line" aria-hidden="true"><span /></span><label><span>Fim</span><input type="date" name="to" defaultValue={toDate} required /></label><AlertRoomPicker key={roomCodes.join("|")} classrooms={classrooms} initialCodes={roomCodes} /><button type="submit">Aplicar filtro <ArrowIcon /></button></form>{errors.length > 0 ? <div role="alert" className="report-filter__error">{errors.join(" ")}</div> : null}</section>;
}

function AlertContent({ snapshot, selectedAll }: { snapshot: Extract<AlertSnapshot, { state: "ready" }>; selectedAll: boolean }) {
  return <><section className="alerts-context"><div><p className="eyebrow">{selectedAll ? "Salas consultadas" : "Salas selecionadas"}</p><h2>{selectedAll ? "Todas as salas cadastradas" : `${snapshot.classrooms.length} sala(s) selecionada(s)`}</h2><p className="font-mono">{snapshot.classrooms.map((classroom) => `${classroom.code} · ${classroom.name}`).join("  /  ")}</p></div><strong>{snapshot.alerts.length} alerta(s) no período</strong></section><section className="alert-table-section" aria-labelledby="alert-history-title"><div className="alert-table-section__head"><div><p className="eyebrow">Histórico rastreável</p><h2 id="alert-history-title">Alertas locais</h2></div><p>Cada linha identifica a sala e usa a faixa local vigente no momento da leitura.</p></div>{snapshot.alerts.length === 0 ? <div className="alert-table-empty">Nenhum alerta local foi registrado para as salas selecionadas neste período. Isso não classifica o ambiente quanto a conforto ou conformidade.</div> : <div className="overflow-x-auto"><table className="alert-table"><thead><tr><th>Sala</th><th>Horário</th><th>Variável</th><th>Alerta</th><th>Valor observado</th><th>Faixa local aplicada</th><th>Regra</th></tr></thead><tbody>{snapshot.alerts.map((alert) => { const definition = alertVariable[alert.variable]; const format = (value: number) => `${value.toLocaleString("pt-BR", { maximumFractionDigits: definition.digits })} ${definition.unit}`; return <tr key={alert.id} className="alert-table__row"><td><strong>{alert.classroomCode}</strong><span>{alert.classroomName}</span></td><td>{dateTimeFormatter.format(alert.occurredAt)}<span>{alert.measurementId}</span></td><td>{definition.label}</td><td><strong className="alert-direction">{alert.direction === "BELOW" ? "Abaixo da faixa local" : "Acima da faixa local"}</strong></td><td>{format(alert.observedValue)}</td><td>{format(alert.lowerLimit)} a {format(alert.upperLimit)}</td><td>Faixa local v{alert.profileVersion}</td></tr>; })}</tbody></table></div>}</section><aside className="alert-method-note"><AlertIcon /><p>Um alerta local indica somente que uma leitura válida e sincronizada ficou fora de uma faixa configurada pela administração. Ele não diagnostica causas, não automatiza ações e não certifica a sala.</p></aside></>;
}

function AlertUnavailable({ snapshot }: { snapshot: Exclude<AlertSnapshot, { state: "ready" }> }) { const reason = snapshot.state === "empty" && snapshot.reason === "database_not_configured" ? "O banco de dados ainda não está configurado." : snapshot.state === "empty" ? "Não há salas cadastradas para consultar." : "Não foi possível consultar os alertas neste momento."; return <section className="report-unavailable"><p className="eyebrow">Histórico indisponível</p><h2>{reason}</h2><p>Verifique a aplicação e o MySQL antes de tentar novamente.</p></section>; }
function AlertIcon() { return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 4 3.8 19h16.4L12 4Z" /><path d="M12 9v5M12 17h.01" /></svg>; }
function ArrowIcon() { return <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 12h13M14 7l5 5-5 5" /></svg>; }
