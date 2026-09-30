import { randomUUID } from "node:crypto";

import { isAdminRequest } from "@/lib/user-auth";
import { isDatabaseConfigured } from "@/lib/db";
import { ClassroomCodeConflictError, ClassroomDeviceNotFoundError, createClassroom, listClassrooms } from "@/lib/classrooms/repository";
import { classroomCreateSchema } from "@/lib/classrooms/schema";

export const runtime = "nodejs";

function unauthorized(requestId: string) { return Response.json({ error: { code: "UNAUTHORIZED", message: "Acesso restrito a administradores autenticados.", request_id: requestId } }, { status: 401 }); }

export async function GET(request: Request) {
  const requestId = randomUUID();
  if (!(await isAdminRequest(request))) return unauthorized(requestId);
  if (!isDatabaseConfigured()) return Response.json({ error: { code: "DATABASE_NOT_CONFIGURED", request_id: requestId } }, { status: 503 });
  try { return Response.json({ classrooms: await listClassrooms() }, { headers: { "Cache-Control": "no-store" } }); }
  catch { return Response.json({ error: { code: "CLASSROOMS_UNAVAILABLE", request_id: requestId } }, { status: 503 }); }
}

export async function POST(request: Request) {
  const requestId = randomUUID();
  if (!(await isAdminRequest(request))) return unauthorized(requestId);
  if (!isDatabaseConfigured()) return Response.json({ error: { code: "DATABASE_NOT_CONFIGURED", request_id: requestId } }, { status: 503 });
  const parsed = classroomCreateSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: { code: "VALIDATION_ERROR", message: "Revise os dados da sala.", request_id: requestId } }, { status: 422 });
  try { return Response.json({ classroom: await createClassroom(parsed.data) }, { status: 201, headers: { "Cache-Control": "no-store" } }); }
  catch (error) {
    if (error instanceof ClassroomCodeConflictError) return Response.json({ error: { code: "CLASSROOM_CODE_EXISTS", message: "Já existe uma sala com este código.", request_id: requestId } }, { status: 409 });
    if (error instanceof ClassroomDeviceNotFoundError) return Response.json({ error: { code: "DEVICE_NOT_FOUND", message: "O nó informado não está cadastrado ou ativo.", request_id: requestId } }, { status: 422 });
    return Response.json({ error: { code: "CLASSROOM_CREATE_UNAVAILABLE", request_id: requestId } }, { status: 503 });
  }
}
