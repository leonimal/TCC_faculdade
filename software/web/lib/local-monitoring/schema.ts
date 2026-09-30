import { z } from "zod";

const variableSchema = z.enum([
  "TEMPERATURE_C",
  "RELATIVE_HUMIDITY_PCT",
  "ILLUMINANCE_LX",
]);

const textSchema = (maximum: number) =>
  z
    .string()
    .trim()
    .min(1)
    .max(maximum)
    .regex(/^[\p{L}\p{N} .,:;()/_@+-]+$/u, "invalid_text");

const ruleSchema = z
  .object({
    variable: variableSchema,
    lower_limit: z.number().finite().min(-1000).max(1_000_000),
    upper_limit: z.number().finite().min(-1000).max(1_000_000),
  })
  .strict()
  .refine((rule) => rule.lower_limit < rule.upper_limit, {
    message: "lower_limit_must_be_less_than_upper_limit",
    path: ["upper_limit"],
  });

export const localMonitoringProfilePatchSchema = z
  .object({
    enabled: z.boolean(),
    requested_by: textSchema(120),
    justification: textSchema(500),
    source_reference: textSchema(500).nullable().optional(),
    rules: z.array(ruleSchema).max(3).optional(),
  })
  .strict()
  .superRefine((profile, context) => {
    const rules = profile.rules ?? [];

    if (profile.enabled && rules.length === 0) {
      context.addIssue({
        code: "custom",
        message: "rules_required_when_enabled",
        path: ["rules"],
      });
    }

    if (!profile.enabled && rules.length > 0) {
      context.addIssue({
        code: "custom",
        message: "rules_must_be_empty_when_disabled",
        path: ["rules"],
      });
    }

    const variables = rules.map((rule) => rule.variable);
    if (new Set(variables).size !== variables.length) {
      context.addIssue({
        code: "custom",
        message: "variables_must_be_unique",
        path: ["rules"],
      });
    }
  });

export type LocalMonitoringProfilePatch = z.infer<
  typeof localMonitoringProfilePatchSchema
>;
export type LocalMonitoringVariable = z.infer<typeof variableSchema>;
