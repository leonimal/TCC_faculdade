"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navigationItems = [
  { href: "/", label: "Monitoramento em tempo real", detail: "Acompanhe uma sala agora", icon: StationIcon },
  { href: "/rooms", label: "Consulta de salas", detail: "Escolha uma sala para consultar", icon: StationIcon },
  { href: "/devices", label: "Consulta de nós", detail: "Veja os dispositivos cadastrados", icon: DeviceIcon },
  { href: "/reports", label: "Caderno de observação", detail: "Medições e histórico", icon: ReportIcon },
  { href: "/alerts", label: "Central de alertas", detail: "Faixas locais registradas", icon: AlertIcon },
  { href: "/admin/local-monitoring", label: "Faixas de acompanhamento", detail: "Configuração administrativa", icon: SlidersIcon },
] as const;

export function NavigationDrawer({ user }: { user: { displayName: string; role: "ADMIN" | "VIEWER" } | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const closeDrawer = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  if (pathname === "/login") return null;

  return (
    <>
      <div className={`global-actions${isOpen ? " global-actions--drawer-open" : ""}`}>
        {user ? <AlertNotifications /> : null}
        <button
          ref={triggerRef}
          type="button"
          className={`navigation-toggle${isOpen ? " navigation-toggle--hidden" : ""}`}
          aria-label={isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
          aria-expanded={isOpen}
          aria-controls="site-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          <MenuIcon />
          <span>Menu</span>
        </button>
      </div>

      <div className={`navigation-layer${isOpen ? " navigation-layer--open" : ""}`} aria-hidden={!isOpen}>
        <button type="button" className="navigation-scrim" tabIndex={isOpen ? 0 : -1} aria-label="Fechar menu" onClick={closeDrawer} />
        <aside id="site-navigation" className="navigation-drawer" role="dialog" aria-modal="true" aria-label="Navegação principal">
          <div className="navigation-drawer__head">
            <div>
              <p className="eyebrow">Monitoramento ambiental</p>
              <h2>Mapa da estação</h2>
            </div>
            <button ref={closeRef} type="button" className="navigation-close" aria-label="Fechar menu de navegação" onClick={closeDrawer}>
              <CloseIcon />
            </button>
          </div>

          <nav aria-label="Páginas do sistema">
            <ul className="navigation-list">
              {[...navigationItems.filter(({ href }) => user?.role === "ADMIN" || !href.startsWith("/admin/")), ...(user?.role === "ADMIN" ? [{ href: "/users", label: "Consulta de usuários", detail: "Contas e permissões", icon: DeviceIcon }] : [])].map(({ href, label, detail, icon: Icon }) => {
                const isCurrent = pathname === href;
                return <li key={href}>
                  <Link href={href} className={`navigation-link${isCurrent ? " navigation-link--current" : ""}`} aria-current={isCurrent ? "page" : undefined} onClick={closeDrawer}>
                    <span className="navigation-link__icon"><Icon /></span>
                    <span><strong>{label}</strong><small>{detail}</small></span>
                    <ArrowIcon />
                  </Link>
                </li>;
              })}
            </ul>
          </nav>

          {user ? <button type="button" className="quiet-link mx-6 mt-4 self-start" onClick={async () => { await fetch("/api/auth/logout", { method: "POST" }); router.push("/login"); router.refresh(); }}>Sair da conta</button> : <Link href="/login" className="quiet-link mx-6 mt-4 self-start" onClick={closeDrawer}>Entrar</Link>}

          <p className="navigation-drawer__footer">Protótipo acadêmico · UNIP Araçatuba</p>
        </aside>
      </div>
    </>
  );
}

type Notification = { id: number; classroomCode: string; classroomName: string; variable: "TEMPERATURE_C" | "RELATIVE_HUMIDITY_PCT" | "ILLUMINANCE_LX"; direction: "BELOW" | "ABOVE"; occurredAt: string };

const variableLabels = {
  TEMPERATURE_C: "Temperatura do ar",
  RELATIVE_HUMIDITY_PCT: "Umidade relativa",
  ILLUMINANCE_LX: "Iluminância",
} as const;

function AlertNotifications() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadNotifications = async () => {
    try {
      const response = await fetch("/api/alerts/notifications", { cache: "no-store" });
      if (!response.ok) return;
      const payload = await response.json() as { total: number; notifications: Notification[] };
      setTotal(payload.total);
      setNotifications(payload.notifications);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadNotifications();
    const interval = window.setInterval(() => void loadNotifications(), 20_000);
    return () => window.clearInterval(interval);
  }, []);

  const clearNotifications = async () => {
    const response = await fetch("/api/alerts/notifications", { method: "POST" });
    if (!response.ok) return;
    setNotifications([]);
    setTotal(0);
  };

  const hasUnread = total > 0;
  return <div className="alert-notifications">
    <button type="button" className={`alert-notification-toggle${hasUnread ? " alert-notification-toggle--unread" : ""}`} aria-label={hasUnread ? `${total} alerta(s) novo(s)` : "Nenhum alerta novo"} aria-expanded={isOpen} aria-controls="alert-notifications-panel" onClick={() => setIsOpen((open) => !open)}>
      <AlertIcon />
      {hasUnread ? <span aria-hidden="true" className="alert-notification-badge">{total > 99 ? "99+" : total}</span> : null}
    </button>
    {isOpen ? <section id="alert-notifications-panel" className="alert-notifications-panel" aria-label="Notificações de alertas locais">
      <header><div><p className="eyebrow">Atenção necessária</p><h2>Novos alertas</h2></div><button type="button" aria-label="Fechar notificações" onClick={() => setIsOpen(false)}><CloseIcon /></button></header>
      {loading ? <p className="alert-notifications-status">Consultando alertas…</p> : hasUnread ? <><div className="alert-notifications-list">{notifications.map((notification) => <Link key={notification.id} href={`/alerts?room=${encodeURIComponent(notification.classroomCode)}`} onClick={() => setIsOpen(false)}><strong>{notification.classroomCode} · {notification.classroomName}</strong><span>{variableLabels[notification.variable]} {notification.direction === "ABOVE" ? "acima" : "abaixo"} da faixa local</span></Link>)}</div>{total > notifications.length ? <p className="alert-notifications-status">Exibindo os {notifications.length} mais recentes de {total} alertas.</p> : null}<button type="button" className="alert-notifications-clear" onClick={() => void clearNotifications()}>Limpar notificações</button></> : <p className="alert-notifications-status">Não há alertas novos. As ocorrências históricas permanecem na Central de alertas.</p>}
    </section> : null}
  </div>;
}

function MenuIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" /></svg>; }
function CloseIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" /></svg>; }
function ArrowIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h13M14 7l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function StationIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4.9 9a10 10 0 0 1 14.2 0M7.8 12a6 6 0 0 1 8.4 0M10.6 15a2 2 0 0 1 2.8 0" strokeLinecap="round" /><circle cx="12" cy="18" r="1" fill="currentColor" stroke="none" /></svg>; }
function ReportIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M7 3.5h8l3 3V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" /><path d="M15 3.5V7h3M9 11h6M9 15h6" strokeLinecap="round" /></svg>; }
function AlertIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 4 3.8 19h16.4L12 4Z" /><path d="M12 9v5M12 17h.01" strokeLinecap="round" /></svg>; }
function SlidersIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 7h16M4 17h16M8 4v6M16 14v6" /><circle cx="8" cy="7" r="2" /><circle cx="16" cy="17" r="2" /></svg>; }
function DeviceIcon() { return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="5" y="5" width="14" height="14" rx="2" /><path d="M9 9h6v6H9zM2 9h3M2 15h3M19 9h3M19 15h3M9 2v3M15 2v3M9 19v3M15 19v3" strokeLinecap="round" /></svg>; }
