import type { Metadata } from "next";
import { LocalMonitoringAdminForm } from "@/components/local-monitoring-admin-form";
import { getPrimaryDashboardDevice } from "@/lib/dashboard/repository";
import { requireAdmin } from "@/lib/user-auth";

export const metadata: Metadata = {
  title: "Faixas locais | Monitoramento Ambiental IoT",
  description: "Configuração administrativa de faixas locais de acompanhamento.",
};

export default async function LocalMonitoringAdminPage() {
  await requireAdmin("/admin/local-monitoring");
  const device = await getPrimaryDashboardDevice().catch(() => null);
  return (
    <div className="admin-shell min-h-screen">
      <div aria-hidden="true" className="admin-ruler fixed inset-y-0 left-[7%]" />
      <main className="relative mx-auto w-full max-w-[1180px] px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
        <header className="admin-header">
          <div className="flex items-start gap-4">
            <span className="station-mark station-mark--quiet" aria-hidden="true"><SlidersIcon /></span>
            <div>
              <p className="eyebrow">Administração local · configuração versionada</p>
              <h1 className="admin-title">Faixas de<span> acompanhamento</span></h1>
              <p className="admin-subtitle">Defina os limites que gerarão alertas locais nas próximas leituras do nó.</p>
            </div>
          </div>
        </header>

        <section className="admin-principle" aria-label="Limite de interpretação">
          <span aria-hidden="true"><InfoIcon /></span>
          <p>Estas são faixas locais definidas pela administração. Elas registram alertas locais para investigação, sem declarar conforto, adequação ou conformidade com a NBR.</p>
        </section>

        <LocalMonitoringAdminForm deviceId={device?.publicId ?? null} deviceName={device?.name ?? null} />

        <footer className="admin-footer">Alterações criam uma nova versão e não reclassificam o histórico já registrado.</footer>
      </main>
    </div>
  );
}

function SlidersIcon() {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 7h16M4 17h16M8 4v6M16 14v6" /><circle cx="8" cy="7" r="2" /><circle cx="16" cy="17" r="2" /></svg>;
}

function InfoIcon() {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 10v6M12 7h.01" /></svg>;
}
