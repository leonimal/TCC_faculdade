import { z } from "zod";

export const loginSchema = z.object({ email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()), password: z.string().min(8).max(200) });
export const userCreateSchema = z.object({
  email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
  display_name: z.string().trim().min(2).max(120),
  password: z.string().min(12).max(200),
  role: z.enum(["ADMIN", "VIEWER"]),
});

export const userUpdateSchema = z.object({
  display_name: z.string().trim().min(2).max(120),
  role: z.enum(["ADMIN", "VIEWER"]),
  active: z.boolean(),
  password: z.string().max(200).optional(),
}).superRefine((value, context) => {
  if (value.password && value.password.length < 12) {
    context.addIssue({ code: "custom", path: ["password"], message: "A senha deve ter pelo menos 12 caracteres." });
  }
});
