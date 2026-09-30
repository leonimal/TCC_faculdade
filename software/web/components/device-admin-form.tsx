"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

type Device = { publicId: string; name: string; active: boolean; classroomCode: string | null; classroomName: string | null };
type ApiResponse = { device?: Device; devices?: Device[]; error?: { message?: string } };

export function DeviceAdminForm() {
  const [devices, setDevices] = useState<Device[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  async function loadDevices() {
    setError(""); setNotice(""); setIsLoading(true);
    try {
      const response = await fetch("/api/v1/devices");
      const data = await response.json().catch(() => ({})) as ApiResponse;
      if (!response.ok || !data.devices) { setDevices(null); setError(data.error?.message ?? "Não foi possível consultar os nós agora."); return; }
      setDevices(data.devices);
    } catch { setDevices(null); setError("Não foi possível alcançar a aplicação. Nenhuma consulta foi confirmada."); }
    finally { setIsLoading(false); }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setNotice("");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = { public_id: String(form.get("public_id") ?? "").trim(), name: String(form.get("name") ?? "").trim() };
    setIsSaving(true);
    try {
      const response = await fetch("/api/v1/devices", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json().catch(() => ({})) as ApiResponse;
      if (!response.ok || !data.device) { setError(data.error?.message ?? "Não foi possível cadastrar o nó."); return; }
      formElement.reset();
      setDevices((current) => current ? [...current, data.device!].sort((a, b) => a.publicId.localeCompare(b.publicId)) : [data.device!]);
      setNotice(`Nó ${data.device.publicId} cadastrado. Grave este mesmo identificador na programação do ESP32 e associe-o a uma sala quando for instalado.`);
    } catch { setError("Não foi possível alcançar a aplicação. Nenhum cadastro foi confirmado."); }
    finally { setIsSaving(false); }
  }

  return <div className="mt-10 grid max-w-4xl gap-px border border-[var(--line)] bg-[var(--line)]">
    <form onSubmit={submit} className="grid gap-px bg-[var(--line)] md:grid-cols-[1.1fr_.9fr]">
      <section className="bg-[var(--paper)] p-6"><p className="eyebrow">Identidade do dispositivo</p><h2 className="mt-2 text-2xl font-bold tracking-tight">Cadastre o nó</h2><p className="mt-3 text-sm leading-6 text-[var(--ink-muted)]">O identificador deve ser único e idêntico ao valor de <code className="font-mono text-xs">TCC_DEVICE_ID</code> gravado no firmware.</p><div className="mt-7 grid gap-4"><label className="grid gap-1 text-sm font-semibold">Identificador do nó<input name="public_id" required minLength={3} maxLength={64} pattern="[A-Za-z0-9._-]+" placeholder="Ex.: classroom-node-02" className="border border-[var(--line)] bg-white/40 px-3 py-2 font-mono text-sm font-normal" /></label><label className="grid gap-1 text-sm font-semibold">Nome visível<input name="name" required maxLength={120} placeholder="Ex.: Nó reserva ESP32" className="border border-[var(--line)] bg-white/40 px-3 py-2 font-normal" /></label></div></section>
      <aside className="bg-[var(--ink)] p-6 text-[var(--paper)]"><p className="eyebrow !text-[#a8b7ae]">Sequência de uso</p><ol className="mt-5 grid gap-4 text-sm leading-5 text-[#dce5dc]"><li><strong className="mr-2 font-mono text-[var(--light)]">01</strong>Cadastre o identificador.</li><li><strong className="mr-2 font-mono text-[var(--light)]">02</strong>Grave o mesmo valor no ESP32.</li><li><strong className="mr-2 font-mono text-[var(--light)]">03</strong><Link href="/admin/classrooms" className="underline decoration-white/40 underline-offset-4">Associe-o a uma sala</Link> ao instalar.</li></ol><p className="mt-7 border-t border-white/20 pt-4 text-xs leading-5 text-[#c7d0c8]">A sala não é gravada no firmware. Uma transferência futura é feita apenas no sistema e preserva o histórico.</p></aside>
      <section className="bg-[var(--ink)] p-6 text-[var(--paper)] md:col-span-2"><div className="flex justify-end"><button type="submit" disabled={isSaving} className="border border-white/40 px-5 py-2 text-sm font-bold disabled:opacity-60">{isSaving ? "Cadastrando…" : "Cadastrar nó"}</button></div></section>
    </form>
    <section className="bg-[var(--paper)] p-6" aria-labelledby="registered-devices-title">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--line)] pb-5"><div><p className="eyebrow">Inventário</p><h2 id="registered-devices-title" className="mt-2 text-2xl font-bold tracking-tight">Nós cadastrados</h2></div><button type="button" onClick={loadDevices} disabled={isLoading} className="quiet-link disabled:opacity-60">{isLoading ? "Consultando…" : "Consultar nós"}</button></div>
      {devices === null ? <p className="mt-5 text-sm leading-6 text-[var(--ink-muted)]">Consulte os nós cadastrados usando sua sessão de administrador.</p> : devices.length === 0 ? <p className="mt-5 text-sm leading-6 text-[var(--ink-muted)]">Nenhum nó cadastrado. Cadastre o primeiro identificador antes de gravar o firmware.</p> : <ul className="mt-5 divide-y divide-[var(--line)]">{devices.map((device) => <li key={device.publicId} className="flex flex-wrap items-center justify-between gap-3 py-4"><div><strong className="font-mono text-sm">{device.publicId}</strong><span className="ml-3 text-sm text-[var(--ink-muted)]">{device.name}</span></div><span className="border border-[var(--line)] bg-white/35 px-2 py-1 text-xs">{device.classroomCode ? `${device.classroomCode} · ${device.classroomName}` : "Sem sala associada"}</span></li>)}</ul>}
    </section>
    {error ? <p role="alert" className="border border-[#c47a6b] bg-[#f5d8d0] px-6 py-4 text-sm text-[#762d20]">{error}</p> : null}
    {notice ? <p role="status" className="border border-[#7ca889] bg-[#d9ebdd] px-6 py-4 text-sm text-[#28593a]">{notice}</p> : null}
  </div>;
}
