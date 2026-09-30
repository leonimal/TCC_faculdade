import { z } from "zod";

export const deviceIdSchema = z
  .string()
  .min(1)
  .max(64)
  .regex(/^[A-Za-z0-9._-]+$/, "invalid_device_id");

export const configurationPatchSchema = z
  .object({
    sampling_interval_seconds: z.number().int().min(10).max(300),
    requested_by: z
      .string()
      .min(1)
      .max(120)
      .regex(/^[\p{L}\p{N} ._@-]+$/u, "invalid_requested_by"),
  })
  .strict();

export const configurationAcknowledgementSchema = z
  .object({
    version: z.number().int().min(1).max(4_294_967_295),
    status: z.enum(["APPLIED", "REJECTED"]),
    rejection_reason: z.string().trim().min(1).max(500).nullable().optional(),
  })
  .strict()
  .superRefine((acknowledgement, context) => {
    if (
      acknowledgement.status === "REJECTED" &&
      !acknowledgement.rejection_reason
    ) {
      context.addIssue({
        code: "custom",
        message: "required_when_rejected",
        path: ["rejection_reason"],
      });
    }

    if (
      acknowledgement.status === "APPLIED" &&
      acknowledgement.rejection_reason != null
    ) {
      context.addIssue({
        code: "custom",
        message: "must_be_null_when_applied",
        path: ["rejection_reason"],
      });
    }
  });

export type ConfigurationPatch = z.infer<typeof configurationPatchSchema>;
export type ConfigurationAcknowledgement = z.infer<
  typeof configurationAcknowledgementSchema
>;
