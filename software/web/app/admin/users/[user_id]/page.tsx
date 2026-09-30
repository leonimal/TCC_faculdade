import Link from "next/link";
import { notFound } from "next/navigation";

import { UserEditorForm } from "@/components/user-editor-form";
import { requireAdmin } from "@/lib/user-auth";
import { findApplicationUserById } from "@/lib/users/repository";

export const metadata = { title: "Editar usuário | Monitoramento Ambiental IoT" };

export default async function UserEditorPage({ params }: { params: Promise<{ user_id: string }> }) {
  await requireAdmin("/users");
  const { user_id } = await params;
  const id = Number(user_id);
  if (!Number.isSafeInteger(id) || id <= 0) notFound();
  const user = await findApplicationUserById(id).catch(() => null);
  if (!user) notFound();

  return <div className="admin-shell min-h-screen"><div aria-hidden="true" className="admin-ruler fixed inset-y-0 left-[7%]" /><main className="relative mx-auto w-full max-w-[1180px] px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10"><header className="admin-header"><div><p className="eyebrow">Administração local · controle de acesso</p><h1 className="admin-title">Editar<span> usuário</span></h1><p className="admin-subtitle">Altere o perfil, o status ou a senha sem expor a credencial atual.</p></div><Link href="/users" className="quiet-link">Retornar à consulta</Link></header><UserEditorForm user={user} /><footer className="admin-footer">O sistema preserva pelo menos um administrador ativo para evitar perda de acesso administrativo.</footer></main></div>;
}
