import { randomUUID } from "node:crypto";

import { isDatabaseConfigured } from "@/lib/db";
import { ClassroomDeviceNotFoundError, ClassroomNotFoundError, updateClassroom } from "@/lib/classrooms/repository";
import { classroomCodeSchema, classroomUpdateSchema } from "@/lib/classrooms/schema";
import { isAdminRequest } from "@/lib/user-auth";

export const runtime = "nodejs";

function unauthorized(requestId: string) {
  return Response.json(
    { error: { code: "UNAUTHORIZED", message: "Acesso restrito a administradores autenticados.", request_id: requestId } },
    { status: 401 },
  );
}

export async function PATCH(request: Request, context: { params: Promise<{ classroom_code: string }> }) {
  const requestId = randomUUID();
  if (!(await isAdminRequest(request))) return unauthorized(requestId);
  if (!isDatabaseConfigured()) return Response.json({ error: { code: "DATABASE_NOT_CONFIGURED", request_id: requestId } }, { status: 503 });

  const { classroom_code } = await context.params;
  const code = classroomCodeSchema.safeParse(classroom_code);
  const parsed = classroomUpdateSchema.safeParse(await request.json().catch(() => null));
  if (!code.success || !parsed.success) {
    return Response.json({ error: { code: "VALIDATION_ERROR", message: "Revise os dados da sala.", request_id: requestId } }, { status: 422 });
  }

  try {
    return Response.json({ classroom: await updateClassroom(code.data, parsed.data) }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof ClassroomNotFoundError) return Response.json({ error: { code: "CLASSROOM_NOT_FOUND", request_id: requestId } }, { status: 404 });
    if (error instanceof ClassroomDeviceNotFoundError) return Response.json({ error: { code: "DEVICE_NOT_FOUND", message: "O no informado nao esta cadastrado ou nao pode receber uma nova associacao.", request_id: requestId } }, { status: 422 });
    return Response.json({ error: { code: "CLASSROOM_UPDATE_UNAVAILABLE", request_id: requestId } }, { status: 503 });
  }
}
