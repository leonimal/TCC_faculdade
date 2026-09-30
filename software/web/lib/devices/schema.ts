import { z } from "zod";

export const devicePublicIdSchema = z
  .string()
  .trim()
  .min(3)
  .max(64)
  .regex(/^[A-Za-z0-9._-]+$/, "invalid_device_id");

export const deviceCreateSchema = z.object({
  public_id: devicePublicIdSchema,
  name: z.string().trim().min(1).max(120),
}).strict();

export const deviceUpdateSchema = z.object({
  name: z.string().trim().min(1).max(120),
  active: z.boolean(),
}).strict();

export type DeviceCreate = z.infer<typeof deviceCreateSchema>;
export type DeviceUpdate = z.infer<typeof deviceUpdateSchema>;
