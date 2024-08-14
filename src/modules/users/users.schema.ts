import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export type CreateUserBody = z.infer<typeof createUserSchema>;

export const signInSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  password: z.string().min(6),
});

export type SignInUserBody = z.infer<typeof signInSchema>;

export const signinResponseSchema = z.object({
  accessToken: z.string(),
});
