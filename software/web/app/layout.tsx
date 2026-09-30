import type { Metadata } from "next";
import "./globals.css";
import { NavigationDrawer } from "@/components/navigation-drawer";
import { getCurrentUser } from "@/lib/user-auth";

export const metadata: Metadata = {
  title: "Monitoramento Ambiental IoT",
  description: "Sistema acadêmico para monitoramento ambiental em salas de aula.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getCurrentUser();
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body data-user-role={user?.role ?? "ANONYMOUS"} className="min-h-full flex flex-col"><style>{`body[data-user-role="VIEWER"] a[href^="/admin/"] { display: none; } .navigation-toggle--hidden { visibility: hidden; }`}</style><NavigationDrawer user={user ? { displayName: user.displayName, role: user.role } : null} />{children}</body>
    </html>
  );
}
