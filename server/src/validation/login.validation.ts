import { z } from "zod";

export const LoginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Please enter your email" })
      .email("Invalid email id"),
    password: z.string({ required_error: "Password is required" }),
  }),
});
