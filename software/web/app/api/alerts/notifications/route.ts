import { isDatabaseConfigured } from "@/lib/db";
import { clearAlertNotifications, listUnreadAlertNotifications } from "@/lib/alert-notifications/repository";
import { getRequestUser } from "@/lib/user-auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const user = await getRequestUser(request);
  if (!user) return Response.json({ error: "unauthorized" }, { status: 401 });
  if (!isDatabaseConfigured()) return Response.json({ total: 0, notifications: [] });
  try {
    return Response.json(await listUnreadAlertNotifications(user.id));
  } catch (error) {
    console.error("Falha ao consultar notificações de alerta", error);
    return Response.json({ error: "notifications_unavailable" }, { status: 503 });
  }
}

export async function POST(request: Request): Promise<Response> {
  const user = await getRequestUser(request);
  if (!user) return Response.json({ error: "unauthorized" }, { status: 401 });
  if (!isDatabaseConfigured()) return Response.json({ error: "database_not_configured" }, { status: 503 });
  try {
    await clearAlertNotifications(user.id);
    return Response.json({ cleared: true });
  } catch (error) {
    console.error("Falha ao limpar notificações de alerta", error);
    return Response.json({ error: "notifications_unavailable" }, { status: 503 });
  }
}
