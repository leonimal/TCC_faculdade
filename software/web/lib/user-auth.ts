import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { isDatabaseConfigured } from "@/lib/db";
import { findSessionUser, type ApplicationUser } from "@/lib/users/repository";

export const sessionCookieName = "tcc_iot_session";

function tokenFromCookieHeader(value: string | null): string | null {
  if (!value) return null;
  return value.split(";").map((item) => item.trim()).find((item) => item.startsWith(`${sessionCookieName}=`))?.slice(sessionCookieName.length + 1) ?? null;
}

export async function getCurrentUser(): Promise<ApplicationUser | null> {
  if (!isDatabaseConfigured()) return null;
  const token = (await cookies()).get(sessionCookieName)?.value;
  return token ? findSessionUser(token).catch(() => null) : null;
}

export async function getRequestUser(request: Request): Promise<ApplicationUser | null> {
  if (!isDatabaseConfigured()) return null;
  const token = tokenFromCookieHeader(request.headers.get("cookie"));
  return token ? findSessionUser(token).catch(() => null) : null;
}

export async function requireUser(returnTo = "/"): Promise<ApplicationUser> {
  const user = await getCurrentUser();
  if (!user) redirect(`/login?returnTo=${encodeURIComponent(returnTo)}`);
  return user;
}

export async function requireAdmin(returnTo = "/"): Promise<ApplicationUser> {
  const user = await requireUser(returnTo);
  if (user.role !== "ADMIN") redirect("/");
  return user;
}

export async function isAdminRequest(request: Request): Promise<boolean> {
  return (await getRequestUser(request))?.role === "ADMIN";
}
