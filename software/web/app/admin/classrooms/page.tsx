import { ClassroomAdminForm } from "@/components/classroom-admin-form";
import Link from "next/link";
import { listDevices } from "@/lib/devices/repository";
import { requireAdmin } from "@/lib/user-auth";

export const metadata = { title: "Cadastrar sala | Monitoramento Ambiental IoT" };

export default async function ClassroomAdminPage() {
  await requireAdmin("/admin/classrooms");
  const devices = await listDevices().catch(() => []);
  return <div className="admin-shell min-h-screen"><div aria-hidden="true" className="admin-ruler fixed inset-y-0 left-[7%]" /><main className="relative mx-auto w-full max-w-[1180px] px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10"><header className="admin-header"><div className="flex items-start gap-4"><span className="station-mark station-mark--quiet" aria-hidden="true"><RoomsIcon /></span><div><p className="eyebrow">Administração local · estrutura de monitoramento</p><h1 className="admin-title">Cadastro de<span> salas</span></h1><p className="admin-subtitle">Defina o local e vincule o nó que enviará medições para ele.</p></div></div><Link href="/rooms" className="quiet-link">Retornar à consulta</Link></header><ClassroomAdminForm devices={devices} /><footer className="admin-footer">Uma transferência encerra a associação anterior do nó; leituras e alertas já recebidos permanecem vinculados à sala original.</footer></main></div>;
}

function RoomsIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M14 9h4a2 2 0 0 1 2 2v10M8 7h2M8 11h2M8 15h2" strokeLinecap="round" /></svg>; }
