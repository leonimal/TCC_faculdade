import { NextResponse } from "next/server";

import { isDatabaseConfigured } from "@/lib/db";
import { sessionCookieName } from "@/lib/user-auth";
import { verifyPassword } from "@/lib/users/password";
import { createSession, findUserByEmail } from "@/lib/users/repository";
import { loginSchema } from "@/lib/users/schema";

export const runtime = "nodejs";

function safeReturnTo(value: FormDataEntryValue | null): string {
  const candidate = typeof value === "string" ? value : "/";
  return candidate.startsWith("/") && !candidate.startsWith("//") ? candidate : "/";
}

function requestOrigin(request: Request): string {
  const fallback = new URL(request.url);
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const protocol = request.headers.get("x-forwarded-proto") ?? fallback.protocol.replace(":", "");
  return host ? `${protocol}://${host}` : fallback.origin;
}

function loginRedirect(request: Request, path: string, error?: string): NextResponse {
  const url = new URL("/login", requestOrigin(request));
  if (path !== "/") url.searchParams.set("returnTo", path);
  if (error) url.searchParams.set("error", error);
  return NextResponse.redirect(url, 303);
}

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) return NextResponse.json({ error: "database_not_configured" }, { status: 503 });
  const isNativeForm = request.headers.get("content-type")?.includes("application/x-www-form-urlencoded") ?? false;
  const submitted = isNativeForm ? await request.formData().catch(() => null) : await request.json().catch(() => null);
  const returnTo = isNativeForm && submitted instanceof FormData ? safeReturnTo(submitted.get("returnTo")) : "/";
  const credentials = submitted instanceof FormData ? { email: submitted.get("email"), password: submitted.get("password") } : submitted;
  const parsed = loginSchema.safeParse(credentials);
  if (!parsed.success) return isNativeForm ? loginRedirect(request, returnTo, "invalid_credentials") : NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
  const user = await findUserByEmail(parsed.data.email).catch(() => null);
  if (!user || !user.active || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return isNativeForm ? loginRedirect(request, returnTo, "invalid_credentials") : NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
  }
  const token = await createSession(user.id);
  const response = isNativeForm ? NextResponse.redirect(new URL(returnTo, requestOrigin(request)), 303) : NextResponse.json({ user: { displayName: user.displayName, role: user.role } }, { headers: { "Cache-Control": "no-store" } });
  response.cookies.set(sessionCookieName, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 12, priority: "high" });
  return response;
}
