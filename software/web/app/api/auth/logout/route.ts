import { NextResponse } from "next/server";

import { sessionCookieName } from "@/lib/user-auth";
import { deleteSession } from "@/lib/users/repository";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const token = request.headers.get("cookie")?.split(";").map((item) => item.trim()).find((item) => item.startsWith(`${sessionCookieName}=`))?.slice(sessionCookieName.length + 1);
  if (token) await deleteSession(token).catch(() => undefined);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(sessionCookieName, "", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 0 });
  return response;
}
