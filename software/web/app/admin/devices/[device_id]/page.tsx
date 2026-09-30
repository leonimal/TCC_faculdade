import Link from "next/link";
import { notFound } from "next/navigation";

import { DeviceEditorForm } from "@/components/device-editor-form";
import { getDevice } from "@/lib/devices/repository";
import { devicePublicIdSchema } from "@/lib/devices/schema";
import { requireAdmin } from "@/lib/user-auth";

export const metadata = { title: "Editar no | Monitoramento Ambiental IoT" };

export default async function DeviceEditorPage({ params }: { params: Promise<{ device_id: string }> }) {
  await requireAdmin("/devices");
  const { device_id } = await params;
  const parsed = devicePublicIdSchema.safeParse(device_id);
  if (!parsed.success) notFound();
  const device = await getDevice(parsed.data).catch(() => null);
  if (!device) notFound();

  return <div className="admin-shell min-h-screen"><div aria-hidden="true" className="admin-ruler fixed inset-y-0 left-[7%]" /><main className="relative mx-auto w-full max-w-[1180px] px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10"><header className="admin-header"><div className="flex items-start gap-4"><span className="station-mark station-mark--quiet" aria-hidden="true"><DeviceIcon /></span><div><p className="eyebrow">Administracao local · instrumentacao</p><h1 className="admin-title">Editar<span> no</span></h1><p className="admin-subtitle">Atualize o nome ou a disponibilidade sem alterar o Device ID gravado no ESP32.</p></div></div><Link href="/devices" className="quiet-link">Retornar a consulta</Link></header><DeviceEditorForm device={device} /><footer className="admin-footer">Desativar o no interrompe novas medicoes; os registros ja armazenados permanecem preservados.</footer></main></div>;
}

function DeviceIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="5" y="5" width="14" height="14" rx="2" /><path d="M9 9h6v6H9zM2 9h3M2 15h3M19 9h3M19 15h3M9 2v3M15 2v3M9 19v3M15 19v3" strokeLinecap="round" /></svg>; }
