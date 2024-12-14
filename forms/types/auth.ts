import { loginSchema } from "@/schemas/auth";

import { signUpSchema } from "@/schemas/auth";
import { z } from "zod";
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  createdForms: string[];
}

export type SignUpData = z.infer<typeof signUpSchema>;
export type LoginData = z.infer<typeof loginSchema>;

export interface ApiError {
  errors: Array<{
    message: string;
    success: boolean;
  }>;
}
