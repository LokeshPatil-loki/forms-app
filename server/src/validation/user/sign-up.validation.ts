import { z } from "zod";
export const SignUpSchema = z.object({
  body: z.object({
    firstName: z
      .string({ required_error: "firstName is required" })
      .min(2)
      .max(255),
    lastName: z
      .string({ required_error: "Last Name is required" })
      .min(2)
      .max(255),
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email format"),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters long")
      .regex(/[a-zA-Z]/, {
        message: "Password must include at least one letter",
      })
      .regex(/[0-9]/, { message: "Password must include at least one number" })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must include at least one special character",
      }),
  }),
});
