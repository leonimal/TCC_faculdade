"use client";

import { useState, type FormEvent } from "react";

type Device = { publicId: string; name: string; active: boolean; classroomCode: string | null; classroomName: string | null };
type ApiResponse = { device?: Device; error?: { message?: string } };

export function DeviceEditorForm({ device }: { device: Device }) {
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setNotice("");
    const form = new FormData(event.currentTarget);
    const payload = { name: String(form.get("name") ?? "").trim(), active: form.get("active") === "on" };
    setIsSaving(true);
    try {
      const response = await fetch(`/api/v1/devices/${encodeURIComponent(device.publicId)}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json().catch(() => ({})) as ApiResponse;
      if (!response.ok || !data.device) { setError(data.error?.message ?? "Não foi possível salvar as alterações do nó."); return; }
      setNotice(`Nó ${data.device.publicId} atualizado.`);
    } catch { setError("Não foi possível alcançar a aplicação. Nenhuma alteração foi confirmada."); }
    finally { setIsSaving(false); }
  }

  return <form onSubmit={submit} className="mx-auto mt-10 grid max-w-4xl gap-px border border-[var(--line)] bg-[var(--line)] md:grid-cols-[1.1fr_.9fr]">
    <section className="bg-[var(--paper)] p-6"><p className="eyebrow">Identidade do dispositivo</p><h2 className="mt-2 text-2xl font-bold tracking-tight">Atualize o nó</h2><p className="mt-3 text-sm leading-6 text-[var(--ink-muted)]">O Device ID é o valor gravado em <code className="font-mono text-xs">TCC_DEVICE_ID</code>; por isso, não pode ser alterado aqui.</p><div className="mt-7 grid gap-4"><label className="grid gap-1 text-sm font-semibold">Device ID<input value={device.publicId} readOnly aria-readonly="true" className="border border-[var(--line)] bg-black/5 px-3 py-2 font-mono text-sm font-normal text-[var(--ink-muted)]" /></label><label className="grid gap-1 text-sm font-semibold">Nome visível<input name="name" required maxLength={120} defaultValue={device.name} className="border border-[var(--line)] bg-white/40 px-3 py-2 font-normal" /></label></div></section>
    <aside className="bg-[var(--ink)] p-6 text-[var(--paper)]"><p className="eyebrow !text-[#a8b7ae]">Disponibilidade</p><h2 className="mt-2 text-2xl font-bold tracking-tight">Estado do nó</h2><label className="mt-6 flex cursor-pointer items-start gap-3 border border-white/20 p-4 text-sm leading-6"><input name="active" type="checkbox" defaultChecked={device.active} className="mt-1 size-4 accent-[var(--moss)]" /><span><strong className="block">Nó ativo</strong>Quando inativo, o sistema não aceita novas medições dele. A associação e o histórico já registrados são preservados.</span></label><p className="mt-6 border-t border-white/20 pt-4 text-xs leading-5 text-[#c7d0c8]">Sala atual: {device.classroomCode ? `${device.classroomCode} - ${device.classroomName}` : "sem sala associada"}.</p></aside>
    <section className="bg-[var(--ink)] p-6 text-[var(--paper)] md:col-span-2"><div className="flex justify-end"><button type="submit" disabled={isSaving} className="border border-white/40 px-5 py-2 text-sm font-bold disabled:opacity-60">{isSaving ? "Salvando…" : "Salvar alterações"}</button></div>{error ? <p role="alert" className="mt-4 text-sm text-red-200">{error}</p> : null}{notice ? <p role="status" className="mt-4 text-sm text-emerald-200">{notice}</p> : null}</section>
  </form>;
}
