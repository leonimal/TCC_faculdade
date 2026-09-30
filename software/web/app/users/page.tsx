import Link from "next/link";

import { requireAdmin } from "@/lib/user-auth";
import { listApplicationUsers } from "@/lib/users/repository";

export const metadata = { title: "Consulta de usuários | Monitoramento Ambiental IoT" };

export default async function UsersPage() {
  await requireAdmin("/users");
  const users = await listApplicationUsers().catch(() => null);
  return <div className="dashboard-shell min-h-screen"><main className="relative mx-auto w-full max-w-[1120px] px-5 py-8 sm:px-8 lg:px-12"><header className="dashboard-header"><div><p className="eyebrow">Administração local · controle de acesso</p><h1 className="dashboard-title">Consulta de<span> usuários</span></h1><p className="dashboard-subtitle">Gerencie as contas que podem acessar o sistema. Esta área é exclusiva para administradores.</p></div><Link href="/admin/users" className="quiet-link">Cadastrar usuário</Link></header>{!users ? <section className="report-unavailable mt-10"><h2>Não foi possível consultar os usuários agora</h2><p>Verifique a conexão com o banco antes de tentar novamente.</p></section> : <section className="mt-10 overflow-x-auto border border-[var(--line)] bg-[var(--paper)]"><table className="report-table"><thead><tr><th>Usuário</th><th>E-mail</th><th>Perfil</th><th>Status</th><th><span className="sr-only">Ações</span></th></tr></thead><tbody>{users.map((user) => <tr key={user.id}><td><strong>{user.displayName}</strong></td><td>{user.email}</td><td>{user.role === "ADMIN" ? "Administrador" : "Consulta"}</td><td>{user.active ? "Ativo" : "Inativo"}</td><td><Link href={`/admin/users/${user.id}`} className="quiet-link">Editar</Link></td></tr>)}</tbody></table></section>}<footer className="dashboard-footer"><p>Senhas não são exibidas nem armazenadas em texto legível.</p></footer></main></div>;
}
