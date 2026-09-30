"use client";

import { useState, type FormEvent } from "react";

import { DeviceAssignmentPicker, type AssignableDevice } from "@/components/device-assignment-picker";

type Classroom = {
  code: string; name: string; building: string | null; floor: string | null;
  devicePublicId: string | null; installationPosition: string | null;
  installationHeightCm: number | null; responsible: string | null; notes: string | null;
};
type ApiResponse = { classroom?: Classroom; error?: { message?: string } };

export function ClassroomEditorForm({ classroom, devices }: { classroom: Classroom; devices: AssignableDevice[] }) {
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(""); setNotice("");
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? "").trim(),
      building: String(form.get("building") ?? "").trim() || null,
      floor: String(form.get("floor") ?? "").trim() || null,
      device_id: String(form.get("device_id") ?? "").trim() || null,
      installation_position: String(form.get("installation_position") ?? "").trim() || null,
      installation_height_cm: form.get("installation_height_cm") ? Number(form.get("installation_height_cm")) : null,
      responsible: String(form.get("responsible") ?? "").trim() || null,
      notes: String(form.get("notes") ?? "").trim() || null,
    };
    setIsSaving(true);
    try {
      const response = await fetch(`/api/v1/classrooms/${encodeURIComponent(classroom.code)}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({})) as ApiResponse;
      if (!response.ok || !data.classroom) { setError(data.error?.message ?? "Não foi possível salvar as alterações da sala."); return; }
      setNotice(`Sala ${data.classroom.code} atualizada.`);
    } catch { setError("Não foi possível alcançar a aplicação. Nenhuma alteração foi confirmada."); }
    finally { setIsSaving(false); }
  }

  return <form onSubmit={submit} className="mx-auto mt-10 grid max-w-4xl gap-px border border-[var(--line)] bg-[var(--line)] md:grid-cols-2">
    <section className="bg-[var(--paper)] p-6">
      <p className="eyebrow">Identificação da sala</p><h2 className="mt-2 text-2xl font-bold tracking-tight">Atualize o local</h2><p className="mt-3 text-sm leading-6 text-[var(--ink-muted)]">O código identifica a sala nos registros históricos e não pode ser alterado.</p>
      <div className="mt-7 grid gap-4">
        <label className="grid gap-1 text-sm font-semibold">Código da sala<input value={classroom.code} readOnly aria-readonly="true" className="border border-[var(--line)] bg-black/5 px-3 py-2 font-mono text-sm font-normal text-[var(--ink-muted)]" /></label>
        <label className="grid gap-1 text-sm font-semibold">Nome visível<input name="name" required maxLength={120} defaultValue={classroom.name} className="border border-[var(--line)] bg-white/40 px-3 py-2 font-normal" /></label>
        <div className="grid grid-cols-2 gap-3"><label className="grid gap-1 text-sm font-semibold">Bloco<input name="building" maxLength={120} defaultValue={classroom.building ?? ""} className="border border-[var(--line)] bg-white/40 px-3 py-2 font-normal" /></label><label className="grid gap-1 text-sm font-semibold">Piso<input name="floor" maxLength={64} defaultValue={classroom.floor ?? ""} className="border border-[var(--line)] bg-white/40 px-3 py-2 font-normal" /></label></div>
      </div>
    </section>
    <section className="bg-[var(--paper)] p-6">
      <p className="eyebrow">Associação atual</p><h2 className="mt-2 text-2xl font-bold tracking-tight">Nó instalado</h2><p className="mt-3 text-sm leading-6 text-[var(--ink-muted)]">Trocar o identificador encerra a associação anterior e inicia outra. Deixe vazio para desassociar o nó.</p>
      <div className="mt-7 grid gap-4">
        <label className="grid gap-1 text-sm font-semibold">Nó para esta sala<DeviceAssignmentPicker devices={devices} currentClassroomCode={classroom.code} defaultDeviceId={classroom.devicePublicId} /></label>
        <label className="grid gap-1 text-sm font-semibold">Posição de instalação<input name="installation_position" maxLength={500} defaultValue={classroom.installationPosition ?? ""} className="border border-[var(--line)] bg-white/40 px-3 py-2 font-normal" /></label>
        <div className="grid grid-cols-2 gap-3"><label className="grid gap-1 text-sm font-semibold">Altura (cm)<input name="installation_height_cm" type="number" min="0" max="1000" step="0.01" defaultValue={classroom.installationHeightCm ?? ""} className="border border-[var(--line)] bg-white/40 px-3 py-2 font-normal" /></label><label className="grid gap-1 text-sm font-semibold">Responsável<input name="responsible" maxLength={120} defaultValue={classroom.responsible ?? ""} className="border border-[var(--line)] bg-white/40 px-3 py-2 font-normal" /></label></div>
        <label className="grid gap-1 text-sm font-semibold">Observação<textarea name="notes" maxLength={1000} rows={2} defaultValue={classroom.notes ?? ""} className="border border-[var(--line)] bg-white/40 px-3 py-2 font-normal" /></label>
      </div>
    </section>
    <section className="bg-[var(--ink)] p-6 text-[var(--paper)] md:col-span-2"><div className="flex justify-end"><button type="submit" disabled={isSaving} className="border border-white/40 px-5 py-2 text-sm font-bold disabled:opacity-60">{isSaving ? "Salvando…" : "Salvar alterações"}</button></div>{error ? <p role="alert" className="mt-4 text-sm text-red-200">{error}</p> : null}{notice ? <p role="status" className="mt-4 text-sm text-emerald-200">{notice}</p> : null}</section>
  </form>;
}
