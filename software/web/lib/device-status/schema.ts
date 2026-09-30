import { z } from "zod";

import { utcTimestampSchema } from "../measurements/schema";

export const deviceStatusPayloadSchema = z
  .object({
    observed_at: utcTimestampSchema.nullable(),
    firmware_version: z
      .string()
      .min(1)
      .max(80)
      .regex(/^[A-Za-z0-9][A-Za-z0-9._+/-]*$/, "invalid_firmware_version"),
    connection_status: z.enum(["ONLINE", "OFFLINE"]),
    queue_depth: z.number().int().min(0).max(256),
    queue_capacity: z.literal(256),
    dropped_total: z.number().int().nonnegative().safe(),
    last_confirmed_at: utcTimestampSchema.nullable(),
    time_sync_status: z.enum(["SYNCED", "UNSYNCED"]),
    details: z
      .record(z.string().min(1).max(80), z.unknown())
      .nullable()
      .optional(),
  })
  .strict()
  .superRefine((status, context) => {
    if (status.time_sync_status === "SYNCED" && status.observed_at === null) {
      context.addIssue({
        code: "custom",
        message: "required_when_synced",
        path: ["observed_at"],
      });
    }

    if (status.time_sync_status === "UNSYNCED" && status.observed_at !== null) {
      context.addIssue({
        code: "custom",
        message: "must_be_null_when_unsynced",
        path: ["observed_at"],
      });
    }

    if (
      status.observed_at &&
      status.last_confirmed_at &&
      Date.parse(status.last_confirmed_at) > Date.parse(status.observed_at)
    ) {
      context.addIssue({
        code: "custom",
        message: "cannot_be_after_observed_at",
        path: ["last_confirmed_at"],
      });
    }
  });

export type DeviceStatusPayload = z.infer<typeof deviceStatusPayloadSchema>;

export function queueOccupancyPercent(queueDepth: number): number {
  return Math.round((queueDepth / 256) * 10_000) / 100;
}

export function hasQueueWarning(queueDepth: number): boolean {
  return queueDepth >= 205;
}
