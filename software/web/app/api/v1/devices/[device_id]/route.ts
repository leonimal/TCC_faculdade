import { randomUUID } from "node:crypto";

import { isDatabaseConfigured } from "@/lib/db";
import { DeviceNotFoundError, updateDevice } from "@/lib/devices/repository";
import { devicePublicIdSchema, deviceUpdateSchema } from "@/lib/devices/schema";
import { isAdminRequest } from "@/lib/user-auth";

export const runtime = "nodejs";

function unauthorized(requestId: string) {
  return Response.json(
    { error: { code: "UNAUTHORIZED", message: "Acesso restrito a administradores autenticados.", request_id: requestId } },
    { status: 401 },
  );
}

export async function PATCH(request: Request, context: { params: Promise<{ device_id: string }> }) {
  const requestId = randomUUID();
  if (!(await isAdminRequest(request))) return unauthorized(requestId);
  if (!isDatabaseConfigured()) return Response.json({ error: { code: "DATABASE_NOT_CONFIGURED", request_id: requestId } }, { status: 503 });

  const { device_id } = await context.params;
  const publicId = devicePublicIdSchema.safeParse(device_id);
  const parsed = deviceUpdateSchema.safeParse(await request.json().catch(() => null));
  if (!publicId.success || !parsed.success) {
    return Response.json({ error: { code: "VALIDATION_ERROR", message: "Revise os dados do no.", request_id: requestId } }, { status: 422 });
  }

  try {
    return Response.json({ device: await updateDevice(publicId.data, parsed.data) }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof DeviceNotFoundError) return Response.json({ error: { code: "DEVICE_NOT_FOUND", request_id: requestId } }, { status: 404 });
    return Response.json({ error: { code: "DEVICE_UPDATE_UNAVAILABLE", request_id: requestId } }, { status: 503 });
  }
}
