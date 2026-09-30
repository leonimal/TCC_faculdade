"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { DeviceAssignmentPicker, type AssignableDevice } from "@/components/device-assignment-picker";

type ApiResponse = {
  classroom?: { code: string; name: string };
  error?: { code?: string; message?: string };
};

export function ClassroomAdminForm({ devices }: { devices: AssignableDevice[] }) {
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = {
      code: String(form.get("code") ?? "").trim(),
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
      const response = await fetch("/api/v1/classrooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({})) as ApiResponse;
      if (!response.ok || !data.classroom) {
        setError(data.error?.message ?? "Não foi possível cadastrar a sala.");
        return;
      }
      formElement.reset();
      setNotice(`Sala ${data.classroom.code} cadastrada. ${payload.device_id ? "O nó foi associado a ela." : "Associe um nó antes de receber medições."}`);
    } catch {
      setError("Não foi possível alcançar a aplicação. Nenhum cadastro foi confirmado.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="mx-auto mt-10 grid max-w-4xl gap-px border border-[var(--line)] bg-[var(--line)] md:grid-cols-2">
      <section className="bg-[var(--paper)] p-6">
        <p className="eyebrow">Identificação</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight">Cadastre a sala</h2>
        <p className="mt-3 text-sm leading-6 text-[var(--ink-muted)]">O cadastro organiza a aplicação. Ele não gera leituras ou resultados experimentais.</p>
        <div className="mt-7 grid gap-4">
          <label className="grid gap-1 text-sm font-semibold">Código da sala<input name="code" required maxLength={64} pattern="[A-Za-z0-9._-]+" placeholder="Ex.: B-203" className="border border-[var(--line)] bg-white/40 px-3 py-2 font-normal" /></label>
          <label className="grid gap-1 text-sm font-semibold">Nome visível<input name="name" required maxLength={120} placeholder="Ex.: Sala de aula B-203" className="border border-[var(--line)] bg-white/40 px-3 py-2 font-normal" /></label>
          <div className="grid grid-cols-2 gap-3">
            <label className="grid gap-1 text-sm font-semibold">Bloco<input name="building" maxLength={120} className="border border-[var(--line)] bg-white/40 px-3 py-2 font-normal" /></label>
            <label className="grid gap-1 text-sm font-semibold">Piso<input name="floor" maxLength={64} className="border border-[var(--line)] bg-white/40 px-3 py-2 font-normal" /></label>
          </div>
        </div>
      </section>
      <section className="bg-[var(--paper)] p-6">
        <p className="eyebrow">Instalação inicial</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight">Associe um nó</h2>
        <p className="mt-3 text-sm leading-6 text-[var(--ink-muted)]">Opcional agora; ao informar um nó ativo, qualquer associação ativa anterior dele é encerrada com rastreabilidade.</p>
        <p className="mt-3 text-sm text-[var(--ink-muted)]">Ainda não cadastrou o ESP32? <Link href="/admin/devices" className="font-semibold text-[var(--moss)] underline underline-offset-4">Cadastrar nó</Link>.</p>
        <div className="mt-7 grid gap-4">
          <label className="grid gap-1 text-sm font-semibold">Nó para esta sala <span className="font-normal text-[var(--ink-muted)]">opcional</span><DeviceAssignmentPicker devices={devices} /></label>
          <label className="grid gap-1 text-sm font-semibold">Posição de instalação<input name="installation_position" maxLength={500} placeholder="Ex.: parede lateral, fundo da sala" className="border border-[var(--line)] bg-white/40 px-3 py-2 font-normal" /></label>
          <div className="grid grid-cols-2 gap-3">
            <label className="grid gap-1 text-sm font-semibold">Altura (cm)<input name="installation_height_cm" type="number" min="0" max="1000" step="0.01" className="border border-[var(--line)] bg-white/40 px-3 py-2 font-normal" /></label>
            <label className="grid gap-1 text-sm font-semibold">Responsável<input name="responsible" maxLength={120} className="border border-[var(--line)] bg-white/40 px-3 py-2 font-normal" /></label>
          </div>
          <label className="grid gap-1 text-sm font-semibold">Observação<textarea name="notes" maxLength={1000} rows={2} className="border border-[var(--line)] bg-white/40 px-3 py-2 font-normal" /></label>
        </div>
      </section>
      <section className="bg-[var(--ink)] p-6 text-[var(--paper)] md:col-span-2">
        <div className="flex justify-end"><button type="submit" disabled={isSaving} className="border border-white/40 px-5 py-2 text-sm font-bold disabled:opacity-60">{isSaving ? "Cadastrando…" : "Cadastrar sala"}</button></div>
        {error ? <p role="alert" className="mt-4 text-sm text-red-200">{error}</p> : null}
        {notice ? <p role="status" className="mt-4 text-sm text-emerald-200">{notice}</p> : null}
      </section>
    </form>
  );
}
