import { redirect } from "next/navigation";

import { LoginForm } from "@/components/login-form";
import { getCurrentUser } from "@/lib/user-auth";

export const metadata = { title: "Entrar | Monitoramento Ambiental IoT" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ returnTo?: string }> }) {
  if (await getCurrentUser()) redirect("/");
  const requested = (await searchParams).returnTo;
  const returnTo = requested?.startsWith("/") && !requested.startsWith("//") ? requested : "/";
  return <main className="dashboard-shell min-h-screen px-5 py-10"><section className="mx-auto max-w-md border border-[var(--line)] bg-[var(--paper)] p-7 shadow-sm"><p className="eyebrow">Monitoramento ambiental · acesso restrito</p><h1 className="dashboard-title mt-3">Entrar no<span> sistema</span></h1><p className="mt-5 text-sm leading-6 text-[var(--ink-muted)]">Use uma conta cadastrada pela administração para consultar as informações da estação.</p><LoginForm returnTo={returnTo} /></section></main>;
}
