import Link from "next/link";
import { connection } from "next/server";

import { listClassrooms } from "@/lib/classrooms/repository";
import { isDatabaseConfigured } from "@/lib/db";
import { requireUser } from "@/lib/user-auth";

export const metadata = { title: "Consulta de salas | Monitoramento Ambiental IoT" };

export default async function RoomsPage() {
  await requireUser("/rooms");
  await connection();
  const classrooms = isDatabaseConfigured() ? await listClassrooms().catch(() => null) : null;
  return <div className="dashboard-shell min-h-screen"><div aria-hidden="true" className="dashboard-ruler fixed inset-y-0 left-[7%]" />
    <main className="relative mx-auto w-full max-w-[1120px] px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
      <header className="dashboard-header"><div className="flex items-start gap-4"><span className="station-mark" aria-hidden="true"><RoomsIcon /></span><div><p className="eyebrow">Monitoramento ambiental · salas</p><h1 className="dashboard-title">Consulta de<span> salas</span></h1><p className="dashboard-subtitle">Abra uma sala para consultar somente as leituras, alertas locais e histórico associados a ela.</p></div></div><Link href="/admin/classrooms" className="quiet-link">Cadastrar sala</Link></header>
      {!classrooms ? <section className="report-unavailable mt-10"><p className="eyebrow">Estado seguro</p><h2>Não foi possível abrir as salas agora</h2><p>Verifique a conexão com o banco antes de tentar novamente.</p></section> : classrooms.length === 0 ? <section className="report-unavailable mt-10"><p className="eyebrow">Nenhuma sala cadastrada</p><h2>Comece pelo local de monitoramento</h2><p>Cadastre uma sala e, quando disponível, associe um nó ativo. O cadastro não cria medições nem resultados experimentais.</p><Link href="/admin/classrooms" className="quiet-link mt-6">Cadastrar primeira sala</Link></section> : <section className="mt-10 grid gap-px border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2" aria-label="Salas cadastradas">{classrooms.map((room) => <article key={room.code} className="bg-[var(--paper)] p-6"><p className="eyebrow">{room.code}</p><h2 className="mt-2 text-2xl font-bold tracking-tight">{room.name}</h2><p className="mt-2 min-h-10 text-sm text-[var(--ink-muted)]">{[room.building, room.floor].filter(Boolean).join(" · ") || "Local complementar não informado"}</p><dl className="mt-7 border-t border-[var(--line)] pt-4 text-sm"><div className="flex justify-between gap-4"><dt className="text-[var(--ink-muted)]">Nó associado</dt><dd className="font-mono text-xs">{room.devicePublicId ?? "Sem nó associado"}</dd></div><div className="mt-2 flex justify-between gap-4"><dt className="text-[var(--ink-muted)]">Última leitura</dt><dd>{room.lastMeasurementAt ? new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short" }).format(new Date(room.lastMeasurementAt)) : "Ainda não registrada"}</dd></div></dl><div className="mt-6 flex flex-wrap gap-3"><Link href={`/admin/classrooms/${encodeURIComponent(room.code)}`} className="quiet-link">Editar sala</Link>{room.devicePublicId ? <Link href={`/rooms/${encodeURIComponent(room.code)}`} className="quiet-link">Abrir sala</Link> : <p className="self-center text-xs text-[var(--ink-muted)]">Associe um nó para visualizar dados desta sala.</p>}</div></article>)}</section>}
    </main></div>;
}

function RoomsIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M14 9h4a2 2 0 0 1 2 2v10M8 7h2M8 11h2M8 15h2" strokeLinecap="round" /></svg>; }
