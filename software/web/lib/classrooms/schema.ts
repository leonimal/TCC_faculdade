import { z } from "zod";

export const classroomCodeSchema = z.string().trim().min(1).max(64).regex(/^[A-Za-z0-9._-]+$/, "invalid_classroom_code");

export const classroomCreateSchema = z.object({
  code: classroomCodeSchema,
  name: z.string().trim().min(1).max(120),
  building: z.string().trim().max(120).nullable().optional(),
  floor: z.string().trim().max(64).nullable().optional(),
  device_id: z.string().trim().min(1).max(64).regex(/^[A-Za-z0-9._-]+$/, "invalid_device_id").nullable().optional(),
  installation_position: z.string().trim().max(500).nullable().optional(),
  installation_height_cm: z.number().finite().min(0).max(1000).nullable().optional(),
  responsible: z.string().trim().max(120).nullable().optional(),
  notes: z.string().trim().max(1000).nullable().optional(),
}).strict();

export const classroomUpdateSchema = z.object({
  name: z.string().trim().min(1).max(120),
  building: z.string().trim().max(120).nullable(),
  floor: z.string().trim().max(64).nullable(),
  device_id: z.string().trim().min(1).max(64).regex(/^[A-Za-z0-9._-]+$/, "invalid_device_id").nullable(),
  installation_position: z.string().trim().max(500).nullable(),
  installation_height_cm: z.number().finite().min(0).max(1000).nullable(),
  responsible: z.string().trim().max(120).nullable(),
  notes: z.string().trim().max(1000).nullable(),
}).strict();

export type ClassroomCreate = z.infer<typeof classroomCreateSchema>;
export type ClassroomUpdate = z.infer<typeof classroomUpdateSchema>;
