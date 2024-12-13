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

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export type SignUpData = z.infer<typeof signUpSchema>;
export type LoginData = z.infer<typeof loginSchema>;
