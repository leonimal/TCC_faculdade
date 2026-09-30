import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";

import { loadReportSnapshot, type ReportSnapshot } from "@/lib/reports/data";
import { parseReportPeriod, parseReportTimeQuality, parseReportValueFormat, type ReportSearchParams, type ReportTimeQuality, type ReportValueFormat } from "@/lib/reports/filters";
import type { MetricReportSummary } from "@/lib/reports/repository";
import { listClassrooms, type Classroom } from "@/lib/classrooms/repository";
import { classroomCodeSchema } from "@/lib/classrooms/schema";
import { isDatabaseConfigured } from "@/lib/db";
import { requireUser } from "@/lib/user-auth";

import styles from "./reports-filter.module.css";

export const metadata: Metadata = {
  title: "Relatórios | Monitoramento Ambiental IoT",
  description: "Resumo descritivo e histórico das medições ambientais.",
};

const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

type ReportsPageProps = { searchParams: Promise<ReportSearchParams> };

export default async function ReportsPage({ searchParams }: ReportsPageProps) {
  await requireUser("/reports");
  await connection();
  const resolvedSearchParams = await searchParams;
  const parsedPeriod = parseReportPeriod(resolvedSearchParams);
  const roomValue = resolvedSearchParams.room;
  const timeQuality = parseReportTimeQuality(resolvedSearchParams.time);
  const valueFormat = parseReportValueFormat(resolvedSearchParams.values);
  const roomCode = typeof roomValue === "string" && classroomCodeSchema.safeParse(roomValue).success ? roomValue : undefined;
  const classrooms = isDatabaseConfigured() ? await listClassrooms().catch(() => []) : [];
  const snapshot = parsedPeriod.success ? await loadReportSnapshot(parsedPeriod.period, roomCode, timeQuality) : null;
  const selectedRoomCode = roomCode ?? (snapshot?.state === "ready" ? snapshot.device.code : undefined);
  const formValues = parsedPeriod.success
    ? { fromDate: parsedPeriod.period.fromDate, toDate: parsedPeriod.period.toDate }
    : parsedPeriod.formValues;

  return (
    <div className="reports-shell min-h-screen">
      <div aria-hidden="true" className="reports-ruler fixed inset-y-0 left-[7%]" />
      <main className="relative mx-auto w-full max-w-[1440px] px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
        <header className="reports-header">
          <div className="flex items-start gap-4">
            <span className="station-mark" aria-hidden="true"><ReportIcon /></span>
            <div>
              <p className="eyebrow">TCC · sistema IoT · leitura descritiva</p>
              <h1 className="reports-title">Caderno de<span> observação</span></h1>
              <p className="reports-subtitle">Consulte as medições armazenadas de uma janela temporal delimitada.</p>
            </div>
          </div>
          {selectedRoomCode ? <Link href={`/?room=${encodeURIComponent(selectedRoomCode)}`} className="quiet-link">Monitoramento em tempo real <ArrowIcon /></Link> : null}
        </header>

        <ReportFilter fromDate={formValues.fromDate} toDate={formValues.toDate} classrooms={classrooms} roomCode={selectedRoomCode} timeQuality={timeQuality} errors={parsedPeriod.success ? [] : parsedPeriod.errors} />

        {parsedPeriod.success && snapshot ? snapshot.state === "ready" ? <ReportContent snapshot={snapshot} valueFormat={valueFormat} /> : <ReportUnavailable snapshot={snapshot} /> : null}

        <footer className="reports-footer">Estatísticas descritivas · sem classificação normativa do ambiente</footer>
      </main>
    </div>
  );
}

function ReportFilter({ fromDate, toDate, classrooms, roomCode, timeQuality, errors }: { fromDate: string; toDate: string; classrooms: Classroom[]; roomCode?: string; timeQuality: ReportTimeQuality; errors: string[] }) {
  return (
    <section className="report-filter" aria-labelledby="period-filter-title">
      <div className="report-filter__intro">
        <p className="eyebrow">Janela de consulta</p>
        <h2 id="period-filter-title">Delimite o que será descrito</h2>
        <p>O período é inclusivo no fuso America/São_Paulo e limitado a 31 dias.</p>
      </div>
      <form action="/reports" method="get" className={`period-ribbon ${styles.ribbon}`}>
        <div className={styles.primary}>
          <label>
            <span>Início</span>
            <input type="date" name="from" defaultValue={fromDate} required />
          </label>
          <span className="period-ribbon__line" aria-hidden="true"><span /></span>
          <label>
            <span>Fim</span>
            <input type="date" name="to" defaultValue={toDate} required />
          </label>
          <label className={`period-ribbon__room ${styles.room}`}>
            <span>Sala</span>
            <select name="room" defaultValue={roomCode ?? ""} required disabled={classrooms.length === 0}>
              <option value="" disabled>Selecione uma sala</option>
              {classrooms.map((classroom) => <option key={classroom.code} value={classroom.code}>{classroom.code} · {classroom.name}</option>)}
            </select>
          </label>
        </div>
        <button type="submit">Ler período <ArrowIcon /></button>
        <label className={styles.time}><span>Horário da leitura</span><select name="time" defaultValue={timeQuality}><option value="SYNCHRONIZED">Somente com data e hora</option><option value="UNSYNCHRONIZED">Somente sem data e hora</option><option value="ALL">Todas as leituras</option></select></label>
      </form>
      {errors.length > 0 ? <div role="alert" className="report-filter__error">{errors.join(" ")}</div> : null}
    </section>
  );
}

function ReportContent({ snapshot, valueFormat }: { snapshot: Extract<ReportSnapshot, { state: "ready" }>; valueFormat: ReportValueFormat }) {
  const exportAvailable = snapshot.summary.totalMeasurements <= 5000;

  return (
    <>
      <section className="report-context" aria-label="Contexto do relatório">
        <div><p className="eyebrow">Sala consultada</p><h2>{snapshot.device.name}</h2><p className="font-mono">Nó {snapshot.device.publicId ?? "sem associação atual"}</p></div>
        {exportAvailable ? <form action="/reports/export" method="get" className="report-export-controls">
          <input type="hidden" name="room" value={snapshot.device.code} />
          <input type="hidden" name="from" value={snapshot.period.fromDate} />
          <input type="hidden" name="to" value={snapshot.period.toDate} />
          <input type="hidden" name="time" value={snapshot.timeQuality} />
          <label><span>Valores no CSV</span><select name="values" defaultValue={valueFormat}><option value="DISPLAY">Conforme o Caderno</option><option value="RAW">Valores brutos</option></select></label>
          <button type="submit" className="export-link">Exportar CSV <DownloadIcon /></button>
        </form> : <p className="report-limit">Reduza o período para exportar no máximo 5.000 registros por arquivo.</p>}
      </section>

      <section className="report-count-grid" aria-label="Contagens do período">
        <SummaryCount label="Medições armazenadas" value={snapshot.summary.totalMeasurements} tone="ink" />
        <SummaryCount label="Temporalmente sincronizadas" value={snapshot.summary.synchronizedTotal} tone="moisture" />
        <SummaryCount label="Com sinalização adicional" value={snapshot.summary.flaggedTotal} tone="light" />
      </section>

      {snapshot.summary.unsynchronizedReceivedTotal > 0 ? <aside className="report-method-note" role="status"><InfoIcon /><p><strong>{snapshot.summary.unsynchronizedReceivedTotal.toLocaleString("pt-BR")} leitura(s)</strong> foram recebidas pelo servidor nesta janela sem horário confiável do nó. {snapshot.timeQuality === "SYNCHRONIZED" ? "Elas não entram neste recorte." : "O filtro escolhido permite consultá-las separadamente."}</p></aside> : null}

      <section aria-labelledby="metric-summary-title" className="report-metric-section">
        <div className="section-heading">
          <div><p className="eyebrow">Leituras válidas</p><h2 id="metric-summary-title">Resumo das variáveis</h2></div>
          <p>Mínimo, média e máximo observados no período selecionado.</p>
        </div>
        <div className="report-metric-grid">
          <MetricSummaryCard metric="temperature_c" label="Temperatura do ar" unit="°C" summary={snapshot.summary.temperature} digits={1} />
          <MetricSummaryCard metric="relative_humidity_pct" label="Umidade relativa" unit="% UR" summary={snapshot.summary.humidity} digits={1} />
          <MetricSummaryCard metric="illuminance_lx" label="Iluminância" unit="lx" summary={snapshot.summary.illuminance} digits={0} />
        </div>
      </section>

      <MeasurementTable measurements={snapshot.measurements} total={snapshot.summary.totalMeasurements} />

      <aside className="report-method-note"><InfoIcon /><p>Este relatório descreve os valores observados e seus estados técnicos. Os alertas locais possuem uma página própria e não classificam a sala como adequada, confortável ou em conformidade com norma.</p></aside>
    </>
  );
}

function SummaryCount({ label, value, tone }: { label: string; value: number; tone: "ink" | "moisture" | "light" }) {
  return <article className={`report-count report-count--${tone}`}><p>{label}</p><strong>{value.toLocaleString("pt-BR")}</strong></article>;
}

function MetricSummaryCard({ metric, label, unit, summary, digits }: { metric: string; label: string; unit: string; summary: MetricReportSummary; digits: number }) {
  const formatValue = (value: number | null) => value === null ? "—" : `${value.toLocaleString("pt-BR", { maximumFractionDigits: digits })} ${unit}`;
  return (
    <article data-report-metric={metric} className="report-metric-card">
      <div className="report-metric-card__head"><div><p>{unit}</p><h3>{label}</h3></div><span>{summary.validTotal} válidas</span></div>
      <dl>
        <div><dt>Mínimo</dt><dd>{formatValue(summary.minimum)}</dd></div>
        <div><dt>Média</dt><dd>{formatValue(summary.average)}</dd></div>
        <div><dt>Máximo</dt><dd>{formatValue(summary.maximum)}</dd></div>
      </dl>
      <p className="report-metric-card__note">{summary.invalidTotal} leitura(s) sem valor válido no período</p>
    </article>
  );
}

function MeasurementTable({ measurements, total }: { measurements: Extract<ReportSnapshot, { state: "ready" }>['measurements']; total: number }) {
  return (
    <section className="report-table-section" aria-labelledby="report-table-title">
      <div className="report-table-section__head"><div><p className="eyebrow">Registros armazenados</p><h2 id="report-table-title">Histórico do período</h2></div><p>Exibindo {measurements.length} de {total.toLocaleString("pt-BR")} · mais recentes primeiro</p></div>
      {measurements.length === 0 ? <div className="report-table-empty">Nenhuma medição corresponde ao período e ao filtro de horário selecionados.</div> : (
        <div className="overflow-x-auto">
          <table className="report-table">
            <thead><tr><th>Leitura</th><th>Temperatura</th><th>Umidade</th><th>Iluminância</th><th>Sincronização</th><th>Configuração</th></tr></thead>
            <tbody>{measurements.map((measurement) => <tr key={measurement.measurement_id}>
              <td>{measurement.measured_at ? dateTimeFormatter.format(new Date(measurement.measured_at)) : "Sem instante confiável"}<span>{measurement.measurement_id}</span></td>
              <ReadingCell reading={measurement.readings.temperature_c} unit="°C" digits={1} />
              <ReadingCell reading={measurement.readings.relative_humidity_pct} unit="% UR" digits={1} />
              <ReadingCell reading={measurement.readings.illuminance_lx} unit="lx" digits={0} />
              <td>{measurement.time_sync_status}</td><td>v{measurement.configuration_version}</td>
            </tr>)}</tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function ReadingCell({ reading, unit, digits }: { reading: { value: number | null; status: string }; unit: string; digits: number }) {
  return <td>{reading.value === null ? "—" : `${reading.value.toLocaleString("pt-BR", { maximumFractionDigits: digits })} ${unit}`}<span>{reading.status}</span></td>;
}

function ReportUnavailable({ snapshot }: { snapshot: Exclude<ReportSnapshot, { state: "ready" }> }) {
  const title = snapshot.state === "unavailable" ? "Relatório temporariamente indisponível" : snapshot.reason === "database_not_configured" ? "Conexão com o MySQL ainda não configurada" : "Nenhum dispositivo ativo cadastrado";
  return <section className="report-unavailable"><p className="eyebrow">Estado seguro</p><h2>{title}</h2><p>Nenhum valor foi estimado ou substituído por dados simulados. Verifique a conexão com o banco ou cadastre o nó antes de consultar o histórico.</p></section>;
}

function ReportIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 3.5h8l3 3V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" /><path d="M15 3.5V7h3M9 11h6M9 15h6" strokeLinecap="round" /></svg>; }
function DownloadIcon() { return <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M10 3v9M6.5 8.5 10 12l3.5-3.5M4 15.5h12" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function InfoIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 flex-none" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" strokeLinecap="round" /></svg>; }
function ArrowIcon() { return <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 10h11M11 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
