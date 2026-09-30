import { NextResponse } from "next/server";

import { isDatabaseConfigured } from "@/lib/db";
import { isAdminRequest } from "@/lib/user-auth";
import { hashPassword } from "@/lib/users/password";
import { LastActiveAdminError, UserNotFoundError, updateApplicationUser } from "@/lib/users/repository";
import { userUpdateSchema } from "@/lib/users/schema";

export const runtime = "nodejs";

function denied() {
  return NextResponse.json({ error: { code: "FORBIDDEN", message: "Acesso restrito a administradores." } }, { status: 403 });
}

export async function PATCH(request: Request, context: { params: Promise<{ user_id: string }> }) {
  if (!(await isAdminRequest(request))) return denied();
  if (!isDatabaseConfigured()) return NextResponse.json({ error: { code: "DATABASE_NOT_CONFIGURED" } }, { status: 503 });

  const { user_id } = await context.params;
  const id = Number(user_id);
  const parsed = userUpdateSchema.safeParse(await request.json().catch(() => null));
  if (!Number.isSafeInteger(id) || id <= 0 || !parsed.success) {
    return NextResponse.json({ error: { code: "VALIDATION_ERROR", message: "Revise os dados do usuário." } }, { status: 422 });
  }

  try {
    const password = parsed.data.password?.trim();
    const user = await updateApplicationUser(id, {
      displayName: parsed.data.display_name,
      role: parsed.data.role,
      active: parsed.data.active,
      passwordHash: password ? await hashPassword(password) : undefined,
    });
    return NextResponse.json({ user }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof UserNotFoundError) return NextResponse.json({ error: { code: "USER_NOT_FOUND", message: "Usuário não encontrado." } }, { status: 404 });
    if (error instanceof LastActiveAdminError) return NextResponse.json({ error: { code: "LAST_ACTIVE_ADMIN", message: "Mantenha ao menos um administrador ativo no sistema." } }, { status: 409 });
    return NextResponse.json({ error: { code: "USER_UPDATE_UNAVAILABLE", message: "Não foi possível atualizar o usuário." } }, { status: 503 });
  }
}
