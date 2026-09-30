"use client";

import { useState, type FormEvent } from "react";

export function UserAdminForm() {
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setNotice("");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const password = String(form.get("password") ?? "");
    const confirmation = String(form.get("passwordConfirmation") ?? "");
    if (password !== confirmation) { setError("A confirmação de senha não corresponde."); return; }
    setSaving(true);
    try {
      const response = await fetch("/api/v1/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.get("email"), display_name: form.get("display_name"), password, role: form.get("role") }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) { setError(data.error?.message ?? "Não foi possível cadastrar o usuário."); return; }
      formElement.reset(); setNotice(`Usuário ${data.user.displayName} cadastrado com sucesso.`);
    } catch { setError("Não foi possível alcançar a aplicação. Nenhum cadastro foi confirmado."); } finally { setSaving(false); }
  }
  return <form onSubmit={submit} className="mx-auto mt-10 grid max-w-4xl gap-px border border-[var(--line)] bg-[var(--line)] md:grid-cols-2"><section className="bg-[var(--paper)] p-6"><p className="eyebrow">Identificação</p><h2 className="mt-2 text-2xl font-bold tracking-tight">Cadastre o usuário</h2><div className="mt-7 grid gap-4"><label className="grid gap-1 text-sm font-semibold">Nome visível<input name="display_name" required minLength={2} maxLength={120} className="border border-[var(--line)] bg-white/40 px-3 py-2 font-normal" /></label><label className="grid gap-1 text-sm font-semibold">E-mail<input name="email" type="email" required maxLength={254} autoComplete="off" className="border border-[var(--line)] bg-white/40 px-3 py-2 font-normal" /></label><label className="grid gap-1 text-sm font-semibold">Perfil<select name="role" defaultValue="VIEWER" className="border border-[var(--line)] bg-white/40 px-3 py-2 font-normal"><option value="VIEWER">Consulta — visualiza dados</option><option value="ADMIN">Administrador — gerencia o sistema</option></select></label></div></section><section className="bg-[var(--paper)] p-6"><p className="eyebrow">Credencial inicial</p><h2 className="mt-2 text-2xl font-bold tracking-tight">Defina uma senha forte</h2><p className="mt-3 text-sm leading-6 text-[var(--ink-muted)]">A senha fica armazenada somente em forma protegida. Oriente o usuário a trocá-la quando esse recurso for disponibilizado.</p><div className="mt-7 grid gap-4"><label className="grid gap-1 text-sm font-semibold">Senha<input name="password" type="password" minLength={12} maxLength={200} required autoComplete="new-password" className="border border-[var(--line)] bg-white/40 px-3 py-2 font-normal" /></label><label className="grid gap-1 text-sm font-semibold">Confirmar senha<input name="passwordConfirmation" type="password" minLength={12} maxLength={200} required autoComplete="new-password" className="border border-[var(--line)] bg-white/40 px-3 py-2 font-normal" /></label></div></section><section className="bg-[var(--ink)] p-6 text-[var(--paper)] md:col-span-2"><button type="submit" disabled={saving} className="border border-white/40 px-5 py-2 text-sm font-bold disabled:opacity-60">{saving ? "Cadastrando…" : "Cadastrar usuário"}</button>{error ? <p role="alert" className="mt-4 text-sm text-red-200">{error}</p> : null}{notice ? <p role="status" className="mt-4 text-sm text-emerald-200">{notice}</p> : null}</section></form>;
}
