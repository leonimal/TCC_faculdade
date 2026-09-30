import { z } from "zod";

const readingStatusSchema = z.enum([
  "VALID",
  "READ_ERROR",
  "CRC_ERROR",
  "OUT_OF_RANGE",
]);

export const utcTimestampSchema = z
  .string()
  .regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
    "invalid_utc_timestamp",
  )
  .refine((value) => !Number.isNaN(Date.parse(value)), "invalid_timestamp");

function readingSchema(minimum: number, maximum: number) {
  return z
    .object({
      value: z.number().finite().nullable(),
      status: readingStatusSchema,
    })
    .strict()
    .superRefine((reading, context) => {
      if (reading.status === "VALID") {
        if (reading.value === null) {
          context.addIssue({
            code: "custom",
            message: "required_when_valid",
            path: ["value"],
          });
        } else if (reading.value < minimum || reading.value > maximum) {
          context.addIssue({
            code: "custom",
            message: "outside_physical_range",
            path: ["value"],
          });
        }
      } else if (reading.value !== null) {
        context.addIssue({
          code: "custom",
          message: "must_be_null_when_invalid",
          path: ["value"],
        });
      }
    });
}

export const measurementPayloadSchema = z
  .object({
    schema_version: z.literal(1),
    measurement: z
      .object({
        measurement_id: z.string().uuid(),
        device_id: z
          .string()
          .min(1)
          .max(64)
          .regex(/^[A-Za-z0-9._-]+$/, "invalid_device_id"),
        boot_id: z.string().uuid(),
        sequence_number: z.number().int().nonnegative().safe(),
        run_id: z.string().uuid().nullable(),
        configuration_version: z.number().int().positive().safe(),
        measured_at: utcTimestampSchema.nullable(),
        device_uptime_ms: z.number().int().nonnegative().safe(),
        time_sync_status: z.enum(["SYNCED", "UNSYNCED"]),
        readings: z
          .object({
            temperature_c: readingSchema(-40, 125),
            relative_humidity_pct: readingSchema(0, 100),
            illuminance_lx: readingSchema(0, 140_000),
          })
          .strict(),
      })
      .strict()
      .superRefine((measurement, context) => {
        if (
          measurement.time_sync_status === "SYNCED" &&
          measurement.measured_at === null
        ) {
          context.addIssue({
            code: "custom",
            message: "required_when_synced",
            path: ["measured_at"],
          });
        }

        if (
          measurement.time_sync_status === "UNSYNCED" &&
          measurement.measured_at !== null
        ) {
          context.addIssue({
            code: "custom",
            message: "must_be_null_when_unsynced",
            path: ["measured_at"],
          });
        }
      }),
    delivery: z
      .object({
        mode: z.enum(["ONLINE", "REPLAYED"]),
        sent_at: utcTimestampSchema.nullable(),
        queue_depth_before_send: z.number().int().min(0).max(256),
        queue_capacity: z.literal(256),
        dropped_total: z.number().int().nonnegative().safe(),
      })
      .strict(),
  })
  .strict();

export type MeasurementPayload = z.infer<typeof measurementPayloadSchema>;

export type ValidationDetail = {
  field: string;
  reason: string;
};

export function validationDetails(error: z.ZodError): ValidationDetail[] {
  return error.issues.map((issue) => ({
    field: issue.path.join("."),
    reason: issue.message,
  }));
}
