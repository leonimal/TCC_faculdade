"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function LoginForm({ returnTo }: { returnTo: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setLoading(true);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.get("email"), password: form.get("password") }) });
      if (!response.ok) { setError("E-mail ou senha inválidos."); return; }
      router.replace(returnTo); router.refresh();
    } catch { setError("Não foi possível entrar agora. Tente novamente."); } finally { setLoading(false); }
  }
  return <form action="/api/auth/login" method="post" onSubmit={submit} className="mt-8 grid gap-5"><input name="returnTo" type="hidden" value={returnTo} /><label className="grid gap-2 text-sm font-semibold">E-mail<input name="email" type="email" autoComplete="username" required className="border border-[var(--line)] bg-white/70 px-3 py-3 font-normal" /></label><label className="grid gap-2 text-sm font-semibold">Senha<input name="password" type="password" autoComplete="current-password" required className="border border-[var(--line)] bg-white/70 px-3 py-3 font-normal" /></label>{error ? <p className="text-sm text-red-700" role="alert">{error}</p> : null}<button className="border border-[var(--ink)] bg-[var(--ink)] px-4 py-3 text-sm font-bold text-white disabled:opacity-60" disabled={loading}>{loading ? "Entrando…" : "Entrar no sistema"}</button></form>;
}
