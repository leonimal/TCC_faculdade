import { randomUUID } from "node:crypto";

import { isDatabaseConfigured } from "@/lib/db";
import { DevicePublicIdConflictError, createDevice, listDevices } from "@/lib/devices/repository";
import { deviceCreateSchema } from "@/lib/devices/schema";
import { isAdminRequest } from "@/lib/user-auth";

export const runtime = "nodejs";

function unauthorized(requestId: string) {
  return Response.json(
    { error: { code: "UNAUTHORIZED", message: "Acesso restrito a administradores autenticados.", request_id: requestId } },
    { status: 401 },
  );
}

export async function GET(request: Request) {
  const requestId = randomUUID();
  if (!(await isAdminRequest(request))) return unauthorized(requestId);
  if (!isDatabaseConfigured()) return Response.json({ error: { code: "DATABASE_NOT_CONFIGURED", request_id: requestId } }, { status: 503 });

  try {
    return Response.json({ devices: await listDevices() }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: { code: "DEVICES_UNAVAILABLE", request_id: requestId } }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const requestId = randomUUID();
  if (!(await isAdminRequest(request))) return unauthorized(requestId);
  if (!isDatabaseConfigured()) return Response.json({ error: { code: "DATABASE_NOT_CONFIGURED", request_id: requestId } }, { status: 503 });

  const parsed = deviceCreateSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: { code: "VALIDATION_ERROR", message: "Revise o identificador e o nome do nó.", request_id: requestId } }, { status: 422 });
  }

  try {
    return Response.json({ device: await createDevice(parsed.data) }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof DevicePublicIdConflictError) {
      return Response.json({ error: { code: "DEVICE_ID_EXISTS", message: "Já existe um nó com este identificador.", request_id: requestId } }, { status: 409 });
    }
    return Response.json({ error: { code: "DEVICE_CREATE_UNAVAILABLE", request_id: requestId } }, { status: 503 });
  }
}
