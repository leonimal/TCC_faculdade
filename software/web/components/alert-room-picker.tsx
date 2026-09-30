"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ClassroomOption = { code: string; name: string };

export function AlertRoomPicker({ classrooms, initialCodes }: { classrooms: ClassroomOption[]; initialCodes: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCodes, setSelectedCodes] = useState<string[]>(initialCodes);
  const pickerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    searchRef.current?.focus();
    const closeWhenOutside = (event: MouseEvent) => { if (!pickerRef.current?.contains(event.target as Node)) setIsOpen(false); };
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setIsOpen(false); };
    document.addEventListener("mousedown", closeWhenOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => { document.removeEventListener("mousedown", closeWhenOutside); document.removeEventListener("keydown", closeOnEscape); };
  }, [isOpen]);

  const visibleClassrooms = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
    return normalizedQuery ? classrooms.filter((classroom) => `${classroom.code} ${classroom.name}`.toLocaleLowerCase("pt-BR").includes(normalizedQuery)) : classrooms;
  }, [classrooms, query]);
  const selectionLabel = selectedCodes.length === 0 ? `Todas as ${classrooms.length} salas` : selectedCodes.length === 1 ? "1 sala selecionada" : `${selectedCodes.length} salas selecionadas`;
  const toggle = (code: string) => setSelectedCodes((codes) => codes.includes(code) ? codes.filter((item) => item !== code) : [...codes, code]);

  return <div ref={pickerRef} className="alert-room-picker">{!isOpen ? selectedCodes.map((code) => <input key={code} type="hidden" name="room" value={code} />) : null}<button type="button" className="alert-room-picker__trigger" aria-expanded={isOpen} aria-controls="alert-room-picker-panel" onClick={() => setIsOpen((open) => !open)}><span><small>Salas</small><strong>{selectionLabel}</strong></span><ChevronIcon /></button>{isOpen ? <section id="alert-room-picker-panel" className="alert-room-picker__panel" aria-label="Selecionar salas para consultar"><div className="alert-room-picker__head"><div><p>Selecionar salas</p><small>Marque uma ou mais. Sem seleção, a consulta considera todas.</small></div><button type="button" aria-label="Fechar seleção de salas" onClick={() => setIsOpen(false)}><CloseIcon /></button></div><input ref={searchRef} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por código ou nome" aria-label="Buscar sala" /><div className="alert-room-picker__actions"><button type="button" onClick={() => setSelectedCodes(classrooms.map((classroom) => classroom.code))}>Selecionar todas</button><button type="button" onClick={() => setSelectedCodes([])}>Limpar seleção</button></div><div className="alert-room-picker__options">{visibleClassrooms.length === 0 ? <p>Nenhuma sala encontrada.</p> : visibleClassrooms.map((classroom) => <label key={classroom.code}><input type="checkbox" name="room" value={classroom.code} checked={selectedCodes.includes(classroom.code)} onChange={() => toggle(classroom.code)} /><span><strong>{classroom.code}</strong><small>{classroom.name}</small></span></label>)}</div></section> : null}</div>;
}

function ChevronIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m7 10 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function CloseIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" /></svg>; }
