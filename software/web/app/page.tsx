import { connection } from "next/server";
import Link from "next/link";

import { AutoRefresh } from "@/components/auto-refresh";
import { HistoryChart } from "@/components/history-chart";
import { LiveMonitoringRoomSelector } from "@/components/live-monitoring-room-selector";
import { listClassrooms } from "@/lib/classrooms/repository";
import { classroomCodeSchema } from "@/lib/classrooms/schema";
import { isDatabaseConfigured } from "@/lib/db";
import { MetricCard } from "@/components/metric-card";
import { SystemStatus } from "@/components/system-status";
import { loadDashboardSnapshot } from "@/lib/dashboard/data";
import { getLatestValidReading } from "@/lib/dashboard/presentation";
import { requireUser } from "@/lib/user-auth";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

type HomeProps = { searchParams: Promise<{ room?: string | string[] }> };

export default async function Home({ searchParams }: HomeProps) {
  const { room } = await searchParams;
  const requestedRoomCode = typeof room === "string" && classroomCodeSchema.safeParse(room).success ? room : undefined;
  const classrooms = isDatabaseConfigured() ? await listClassrooms().catch(() => []) : [];
  const selectedClassroom = (requestedRoomCode ? classrooms.find((classroom) => classroom.code === requestedRoomCode) : undefined)
    ?? classrooms.find((classroom) => classroom.devicePublicId)
    ?? classrooms[0];

  return <Dashboard classroomCode={selectedClassroom?.code} returnTo={selectedClassroom ? `/?room=${encodeURIComponent(selectedClassroom.code)}` : "/"} liveMonitoring classrooms={classrooms.map((classroom) => ({ code: classroom.code, name: classroom.name, hasDevice: Boolean(classroom.devicePublicId) }))} />;
}

type DashboardRoom = { code: string; name: string; hasDevice: boolean };

export async function Dashboard({
  classroomCode,
  returnTo,
  liveMonitoring = false,
  classrooms = [],
}: {
  classroomCode?: string;
  returnTo?: string;
  liveMonitoring?: boolean;
  classrooms?: DashboardRoom[];
}) {
  await requireUser(returnTo ?? (classroomCode ? `/rooms/${encodeURIComponent(classroomCode)}` : "/"));
  await connection();
  const snapshot = await loadDashboardSnapshot(classroomCode, liveMonitoring);

  return (
    <div className="dashboard-shell min-h-screen">
      <div aria-hidden="true" className="dashboard-ruler fixed inset-y-0 left-[7%]" />
      <main className="relative mx-auto w-full max-w-[1440px] px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
        <header className="dashboard-header">
          <div className="flex items-start gap-4">
            <span className="station-mark" aria-hidden="true"><SignalIcon /></span>
            <div>
              <p className="eyebrow">TCC · sistema IoT · UNIP Araçatuba</p>
              <h1 className="dashboard-title">{liveMonitoring ? "Monitoramento em" : classroomCode ? "Sala" : "Estação de"}<span>{liveMonitoring ? " tempo real" : classroomCode ? ` ${classroomCode}` : " observação ambiental"}</span></h1>
              <p className="dashboard-subtitle">{liveMonitoring ? "Acompanhe uma sala por vez; a seleção preserva o recorte das leituras e dos sinais operacionais." : classroomCode ? "Leituras e sinais operacionais exclusivos desta sala." : "Leituras ambientais e sinais operacionais da sala associada ao nó mais recente."}</p>
            </div>
          </div>
          <div className="dashboard-actions">
            {liveMonitoring ? <LiveMonitoringRoomSelector rooms={classrooms} selectedRoomCode={classroomCode} /> : null}
            <p className="refresh-stamp">Dados consultados em<time dateTime={snapshot.refreshedAt}>{dateFormatter.format(new Date(snapshot.refreshedAt))}</time></p>
            {classroomCode ? <><Link href={`/reports?room=${encodeURIComponent(classroomCode)}`} className="quiet-link">Histórico</Link><Link href={`/alerts?room=${encodeURIComponent(classroomCode)}`} className="quiet-link">Alertas</Link></> : null}
            <AutoRefresh />
          </div>
        </header>

        {snapshot.state === "ready" ? <DashboardContent snapshot={snapshot} /> : <DashboardUnavailable snapshot={snapshot} />}
      </main>
    </div>
  );
}

function DashboardContent({ snapshot }: { snapshot: Extract<Awaited<ReturnType<typeof loadDashboardSnapshot>>, { state: "ready" }> }) {
  const temperature = getLatestValidReading(snapshot.measurements, "temperature_c");
  const humidity = getLatestValidReading(snapshot.measurements, "relative_humidity_pct");
  const illuminance = getLatestValidReading(snapshot.measurements, "illuminance_lx");

  return (
    <>
      <section className="station-strip" aria-label="Nó em observação">
        <div><p className="eyebrow">Nó em observação</p><h2>{snapshot.device.name}</h2></div>
        <dl>
          <div><dt>Identificador</dt><dd className="font-mono">{snapshot.device.publicId}</dd></div>
          <div><dt>Janela visual</dt><dd>{snapshot.measurements.length} registros recentes</dd></div>
        </dl>
      </section>

      <section aria-labelledby="latest-title" className="mt-8">
        <div className="section-heading">
          <div><p className="eyebrow">Leitura imediata</p><h2 id="latest-title">Três variáveis, uma observação</h2></div>
          <p>Exibe apenas o valor válido mais recente de cada variável.</p>
        </div>
        <div className="metric-station-grid">
          <MetricCard metric="temperature_c" label="Temperatura do ar" unit="°C" reading={temperature} maximumFractionDigits={1} tone="thermal" icon={<TemperatureIcon />} />
          <MetricCard metric="relative_humidity_pct" label="Umidade relativa" unit="% UR" reading={humidity} maximumFractionDigits={1} tone="moisture" icon={<DropIcon />} />
          <MetricCard metric="illuminance_lx" label="Iluminância" unit="lx" reading={illuminance} maximumFractionDigits={0} tone="light" icon={<LightIcon />} />
        </div>
      </section>

      <section className="observation-layout">
        <div>
          <div className="section-heading section-heading--compact">
            <div><p className="eyebrow">Traços no tempo</p><h2>Série observada</h2></div>
            <p>Até 180 registros · lacunas não são interpoladas.</p>
          </div>
          <div className="history-grid">
            <HistoryChart measurements={snapshot.measurements} metric="temperature_c" label="Temperatura" unit="°C" color="#d75d36" />
            <HistoryChart measurements={snapshot.measurements} metric="relative_humidity_pct" label="Umidade relativa" unit="% UR" color="#267f9e" />
            <div className="md:col-span-2"><HistoryChart measurements={snapshot.measurements} metric="illuminance_lx" label="Iluminância" unit="lx" color="#bb8c00" /></div>
          </div>
        </div>
        <aside className="operations-rail">
          <div className="operations-heading"><p className="eyebrow">Integridade da estação</p><p>Separada das medidas ambientais para evitar interpretações indevidas.</p></div>
          <SystemStatus status={snapshot.status} delivery={snapshot.delivery} configuration={snapshot.configuration} />
          <section className="method-note" aria-labelledby="method-note-title">
            <span aria-hidden="true"><InfoIcon /></span>
            <div><h2 id="method-note-title">Alertas normativos inativos</h2><p>Faixas locais podem registrar alertas locais quando configuradas pela administração. O painel não classifica a sala nem declara conformidade com uma norma.</p></div>
          </section>
        </aside>
      </section>

      <footer className="dashboard-footer"><p>Protótipo acadêmico · dados ambientais e operacionais</p><p>Horários em America/São_Paulo</p></footer>
    </>
  );
}

function DashboardUnavailable({ snapshot }: { snapshot: Exclude<Awaited<ReturnType<typeof loadDashboardSnapshot>>, { state: "ready" }> }) {
  const isUnavailable = snapshot.state === "unavailable";
  const title = isUnavailable ? "Banco de dados temporariamente indisponível" : snapshot.reason === "database_not_configured" ? "Conexão com o MySQL ainda não configurada" : snapshot.reason === "no_classroom_device" ? "Esta sala ainda não tem um nó associado" : "Nenhum dispositivo ativo cadastrado";
  const description = isUnavailable ? "A interface continua disponível, mas não foi possível consultar as medições neste instante." : snapshot.reason === "database_not_configured" ? "Configure DATABASE_URL no ambiente do servidor para carregar as medições." : snapshot.reason === "no_classroom_device" ? "Associe um nó ativo a esta sala. As medições futuras serão vinculadas à sala no recebimento; o histórico anterior não é reclassificado." : "Execute o seed de desenvolvimento ou cadastre o nó antes de iniciar o monitoramento.";

  return (
    <section className="unavailable-layout">
      <article className="unavailable-panel"><span className="station-mark station-mark--quiet" aria-hidden="true"><DatabaseIcon /></span><p className="eyebrow mt-8">Estado seguro da aplicação</p><h2>{title}</h2><p>{description} Nenhuma credencial administrativa é enviada ao navegador.</p></article>
      <article className="variables-panel"><p className="eyebrow">Variáveis previstas</p><ul><li><TemperatureIcon /> Temperatura do ar</li><li><DropIcon /> Umidade relativa</li><li><LightIcon /> Iluminância</li></ul></article>
    </section>
  );
}

function SignalIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4.9 9a10 10 0 0 1 14.2 0M7.8 12a6 6 0 0 1 8.4 0M10.6 15a2 2 0 0 1 2.8 0" strokeLinecap="round" /><circle cx="12" cy="18" r="1" fill="currentColor" stroke="none" /></svg>; }
function TemperatureIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M14 14.8V5a2 2 0 1 0-4 0v9.8a4 4 0 1 0 4 0Z" /><path d="M12 8v8" strokeLinecap="round" /></svg>; }
function DropIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 3s6 6.2 6 11a6 6 0 0 1-12 0c0-4.8 6-11 6-11Z" /><path d="M9.5 15.5a3 3 0 0 0 4 1.2" strokeLinecap="round" /></svg>; }
function LightIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" /></svg>; }
function InfoIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" strokeLinecap="round" /></svg>; }
function DatabaseIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7"><ellipse cx="12" cy="5" rx="7" ry="3" /><path d="M5 5v7c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 12v7c0 1.7 3.1 3 7 3s7-1.3 7-3v-7" /></svg>; }
