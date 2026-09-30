"use client";

import { useState, type FormEvent } from "react";

type User = { id: number; email: string; displayName: string; role: "ADMIN" | "VIEWER"; active: boolean };
type ApiResponse = { user?: User; error?: { message?: string } };

export function UserEditorForm({ user }: { user: User }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirmation = String(form.get("passwordConfirmation") ?? "");
    if (password !== confirmation) { setError("A confirmação de senha não corresponde."); return; }
    setSaving(true);
    try {
      const response = await fetch(`/api/v1/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ display_name: form.get("display_name"), role: form.get("role"), active: form.get("active") === "on", password }),
      });
      const data = await response.json().catch(() => ({})) as ApiResponse;
      if (!response.ok || !data.user) { setError(data.error?.message ?? "Não foi possível atualizar o usuário."); return; }
      setNotice(`Usuário ${data.user.displayName} atualizado com sucesso.`);
    } catch {
      setError("Não foi possível alcançar a aplicação. Nenhuma alteração foi confirmada.");
    } finally {
      setSaving(false);
    }
  }

  return <form onSubmit={submit} className="mx-auto mt-10 grid max-w-4xl gap-px border border-[var(--line)] bg-[var(--line)] md:grid-cols-2">
    <section className="bg-[var(--paper)] p-6"><p className="eyebrow">Identificação</p><h2 className="mt-2 text-2xl font-bold tracking-tight">Edite o usuário</h2><div className="mt-7 grid gap-4"><label className="grid gap-1 text-sm font-semibold">Nome visível<input name="display_name" required minLength={2} maxLength={120} defaultValue={user.displayName} className="border border-[var(--line)] bg-white/40 px-3 py-2 font-normal" /></label><label className="grid gap-1 text-sm font-semibold">E-mail<input value={user.email} readOnly aria-readonly="true" className="border border-[var(--line)] bg-black/5 px-3 py-2 font-normal text-[var(--ink-muted)]" /></label><label className="grid gap-1 text-sm font-semibold">Perfil<select name="role" defaultValue={user.role} className="border border-[var(--line)] bg-white/40 px-3 py-2 font-normal"><option value="VIEWER">Consulta — visualiza dados</option><option value="ADMIN">Administrador — gerencia o sistema</option></select></label></div></section>
    <section className="bg-[var(--paper)] p-6"><p className="eyebrow">Acesso</p><h2 className="mt-2 text-2xl font-bold tracking-tight">Status e senha</h2><label className="mt-6 flex cursor-pointer items-start gap-3 border border-[var(--line)] p-4 text-sm leading-6"><input name="active" type="checkbox" defaultChecked={user.active} className="mt-1 size-4 accent-[var(--moss)]" /><span><strong className="block">Usuário ativo</strong>Usuários inativos não conseguem iniciar novas sessões.</span></label><div className="mt-6 grid gap-4"><label className="grid gap-1 text-sm font-semibold">Nova senha <span className="font-normal text-[var(--ink-muted)]">(opcional)</span><input name="password" type="password" minLength={12} maxLength={200} autoComplete="new-password" className="border border-[var(--line)] bg-white/40 px-3 py-2 font-normal" /></label><label className="grid gap-1 text-sm font-semibold">Confirmar nova senha<input name="passwordConfirmation" type="password" minLength={12} maxLength={200} autoComplete="new-password" className="border border-[var(--line)] bg-white/40 px-3 py-2 font-normal" /></label></div></section>
    <section className="bg-[var(--ink)] p-6 text-[var(--paper)] md:col-span-2"><button type="submit" disabled={saving} className="border border-white/40 px-5 py-2 text-sm font-bold disabled:opacity-60">{saving ? "Salvando..." : "Salvar alterações"}</button>{error ? <p role="alert" className="mt-4 text-sm text-red-200">{error}</p> : null}{notice ? <p role="status" className="mt-4 text-sm text-emerald-200">{notice}</p> : null}</section>
  </form>;
}
