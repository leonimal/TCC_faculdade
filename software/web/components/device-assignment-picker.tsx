"use client";

import { useEffect, useRef, useState } from "react";

export type AssignableDevice = {
  publicId: string;
  name: string;
  active: boolean;
  classroomCode: string | null;
  classroomName: string | null;
};

type DeviceAssignmentPickerProps = {
  devices: AssignableDevice[];
  currentClassroomCode?: string;
  defaultDeviceId?: string | null;
};

export function DeviceAssignmentPicker({ devices, currentClassroomCode, defaultDeviceId = null }: DeviceAssignmentPickerProps) {
  const [selectedId, setSelectedId] = useState(defaultDeviceId ?? "");
  const [open, setOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const selected = devices.find((device) => device.publicId === selectedId) ?? null;

  useEffect(() => {
    function closeWhenFocusLeaves(event: FocusEvent) {
      if (!pickerRef.current?.contains(event.relatedTarget as Node | null)) setOpen(false);
    }
    const picker = pickerRef.current;
    picker?.addEventListener("focusout", closeWhenFocusLeaves);
    return () => picker?.removeEventListener("focusout", closeWhenFocusLeaves);
  }, []);

  function select(deviceId: string) { setSelectedId(deviceId); setOpen(false); }

  return <div ref={pickerRef} className="relative grid gap-2">
    <input type="hidden" name="device_id" value={selectedId} />
    <button type="button" aria-haspopup="listbox" aria-expanded={open} aria-label="Selecionar nó para esta sala" onClick={() => setOpen((value) => !value)} className="flex min-h-11 items-center justify-between gap-3 border border-[var(--line)] bg-white/40 px-3 py-2 text-left text-sm font-normal transition hover:border-[var(--moss)] focus:outline-none focus:ring-2 focus:ring-[var(--moss)]">
      <span className="min-w-0 truncate">{selected ? `${selected.name} · ${selected.publicId}` : "Nenhum nó associado"}</span><span aria-hidden="true" className="font-mono text-xs text-[var(--ink-muted)]">{open ? "−" : "+"}</span>
    </button>
    {open ? <div role="listbox" aria-label="Nós cadastrados" className="absolute z-20 top-full mt-1 max-h-72 w-full overflow-y-auto border border-[var(--line)] bg-[var(--paper)] p-1 shadow-lg">
      <button type="button" role="option" aria-selected={selectedId === ""} onClick={() => select("")} className={`w-full border px-3 py-2 text-left text-sm transition hover:border-[var(--ink)] ${selectedId === "" ? "border-[var(--ink)] bg-black/5" : "border-transparent"}`}><span className="block font-semibold">Sem nó associado</span><span className="block text-xs text-[var(--ink-muted)]">A sala permanece cadastrada sem receber novas medições.</span></button>
      {devices.map((device) => {
        const belongsHere = Boolean(currentClassroomCode && device.classroomCode === currentClassroomCode);
        const occupiedElsewhere = Boolean(device.classroomCode && !belongsHere);
        const unavailable = !device.active;
        const tone = unavailable ? "border-slate-300 bg-slate-100 text-slate-500" : occupiedElsewhere ? "border-red-200 bg-red-50 text-red-950" : "border-emerald-200 bg-emerald-50 text-emerald-950";
        const state = unavailable ? "Inativo" : occupiedElsewhere ? `Em uso em ${device.classroomCode}` : belongsHere ? "Associado a esta sala" : "Disponível";
        const detail = occupiedElsewhere ? `${device.classroomName ?? "Sala cadastrada"}. Ao salvar, a associação anterior será encerrada.` : `${device.publicId} · ${state}`;
        return <button key={device.publicId} type="button" role="option" aria-selected={selectedId === device.publicId} disabled={unavailable} onClick={() => select(device.publicId)} className={`mt-1 w-full border px-3 py-2.5 text-left transition focus:outline-none focus:ring-2 focus:ring-[var(--moss)] disabled:cursor-not-allowed disabled:opacity-70 ${tone} ${selectedId === device.publicId ? "ring-1 ring-[var(--ink)]" : "hover:brightness-95"}`}><span className="flex items-start justify-between gap-3"><span className="font-semibold">{device.name}</span><span className="shrink-0 text-xs font-bold">{state}</span></span><span className="mt-1 block font-mono text-xs opacity-80">{detail}</span></button>;
      })}
      {devices.length === 0 ? <p className="px-3 py-4 text-sm text-[var(--ink-muted)]">Nenhum nó cadastrado está disponível para seleção.</p> : null}
    </div> : null}
    <p className="text-xs leading-5 text-[var(--ink-muted)]">Verde: disponível. Vermelho: associado a outra sala; escolhê-lo transfere o vínculo ao salvar.</p>
  </div>;
}
