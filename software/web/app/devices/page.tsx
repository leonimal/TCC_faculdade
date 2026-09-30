import Link from "next/link";
import { connection } from "next/server";

import { isDatabaseConfigured } from "@/lib/db";
import { listDevices } from "@/lib/devices/repository";
import { requireUser } from "@/lib/user-auth";

export const metadata = { title: "Consulta de nós | Monitoramento Ambiental IoT" };

export default async function DevicesPage() {
  await requireUser("/devices");
  await connection();
  const devices = isDatabaseConfigured() ? await listDevices().catch(() => null) : null;

  return <div className="dashboard-shell min-h-screen"><div aria-hidden="true" className="dashboard-ruler fixed inset-y-0 left-[7%]" />
    <main className="relative mx-auto w-full max-w-[1120px] px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
      <header className="dashboard-header"><div className="flex items-start gap-4"><span className="station-mark" aria-hidden="true"><DeviceIcon /></span><div><p className="eyebrow">Monitoramento ambiental · instrumentação</p><h1 className="dashboard-title">Consulta de<span> nós</span></h1><p className="dashboard-subtitle">Consulte os dispositivos reconhecidos pelo sistema e a sala atualmente associada a cada um.</p></div></div><Link href="/admin/devices" className="quiet-link">Cadastrar nó</Link></header>
      {!devices ? <section className="report-unavailable mt-10"><p className="eyebrow">Estado seguro</p><h2>Não foi possível consultar os nós agora</h2><p>Verifique a conexão com o banco antes de tentar novamente.</p></section> : devices.length === 0 ? <section className="report-unavailable mt-10"><p className="eyebrow">Nenhum nó cadastrado</p><h2>Comece pelo dispositivo</h2><p>Cadastre o identificador do ESP32 antes de gravá-lo no firmware. Esse cadastro não cria medições nem resultados experimentais.</p><Link href="/admin/devices" className="quiet-link mt-6">Cadastrar primeiro nó</Link></section> : <section className="mt-10 grid gap-px border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2" aria-label="Nós cadastrados">{devices.map((device) => <article key={device.publicId} className="bg-[var(--paper)] p-6"><p className="eyebrow">{device.active ? "Nó ativo" : "Nó inativo"}</p><h2 className="mt-2 font-mono text-xl font-bold tracking-tight">{device.publicId}</h2><p className="mt-2 min-h-10 text-sm text-[var(--ink-muted)]">{device.name}</p><dl className="mt-7 border-t border-[var(--line)] pt-4 text-sm"><div className="flex justify-between gap-4"><dt className="text-[var(--ink-muted)]">Sala associada</dt><dd className="text-right font-medium">{device.classroomCode ? `${device.classroomCode} · ${device.classroomName}` : "Sem sala associada"}</dd></div><div className="mt-2 flex justify-between gap-4"><dt className="text-[var(--ink-muted)]">Firmware</dt><dd className="font-mono text-xs">TCC_DEVICE_ID correspondente</dd></div></dl><Link href={`/admin/devices/${encodeURIComponent(device.publicId)}`} className="quiet-link mt-6">Editar nó</Link></article>)}</section>}
    </main></div>;
}

function DeviceIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="5" y="5" width="14" height="14" rx="2" /><path d="M9 9h6v6H9zM2 9h3M2 15h3M19 9h3M19 15h3M9 2v3M15 2v3M9 19v3M15 19v3" strokeLinecap="round" /></svg>; }
