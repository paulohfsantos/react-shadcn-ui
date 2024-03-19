import { z } from "zod"

export const registerFormSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
})
.superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ["confirmPassword"],
    });
  }
});

export type RegisterFormSchema = z.infer<typeof registerFormSchema>
