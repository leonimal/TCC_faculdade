import Link from "next/link";

import { UserAdminForm } from "@/components/user-admin-form";
import { requireAdmin } from "@/lib/user-auth";

export const metadata = { title: "Cadastrar usuário | Monitoramento Ambiental IoT" };

export default async function UserAdminPage() {
  await requireAdmin("/admin/users");
  return <div className="admin-shell min-h-screen"><main className="relative mx-auto w-full max-w-[1180px] px-5 py-8 sm:px-8 lg:px-12"><header className="admin-header"><div><p className="eyebrow">Administração local · controle de acesso</p><h1 className="admin-title">Cadastro de<span> usuários</span></h1><p className="admin-subtitle">Defina a conta e o nível de acesso antes de liberar o sistema a uma pessoa.</p></div><Link href="/users" className="quiet-link">Retornar à consulta</Link></header><UserAdminForm /><footer className="admin-footer">Somente administradores podem cadastrar novas contas ou visualizar esta consulta.</footer></main></div>;
}
