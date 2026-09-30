import { NextResponse } from "next/server";

import { isDatabaseConfigured } from "@/lib/db";
import { isAdminRequest } from "@/lib/user-auth";
import { hashPassword } from "@/lib/users/password";
import { createApplicationUser, listApplicationUsers } from "@/lib/users/repository";
import { userCreateSchema } from "@/lib/users/schema";

export const runtime = "nodejs";

function denied() { return NextResponse.json({ error: { code: "FORBIDDEN", message: "Acesso restrito a administradores." } }, { status: 403 }); }

export async function GET(request: Request) {
  if (!(await isAdminRequest(request))) return denied();
  if (!isDatabaseConfigured()) return NextResponse.json({ error: { code: "DATABASE_NOT_CONFIGURED" } }, { status: 503 });
  return NextResponse.json({ users: await listApplicationUsers() }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (!(await isAdminRequest(request))) return denied();
  if (!isDatabaseConfigured()) return NextResponse.json({ error: { code: "DATABASE_NOT_CONFIGURED" } }, { status: 503 });
  const parsed = userCreateSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: { code: "VALIDATION_ERROR", message: "Revise os dados e use uma senha de pelo menos 12 caracteres." } }, { status: 422 });
  try {
    const user = await createApplicationUser({ email: parsed.data.email, displayName: parsed.data.display_name, passwordHash: await hashPassword(parsed.data.password), role: parsed.data.role });
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    if ((error as { code?: string }).code === "ER_DUP_ENTRY") return NextResponse.json({ error: { code: "EMAIL_EXISTS", message: "Já existe um usuário com este e-mail." } }, { status: 409 });
    return NextResponse.json({ error: { code: "USER_CREATE_UNAVAILABLE", message: "Não foi possível cadastrar o usuário." } }, { status: 503 });
  }
}
