import { AuthResponse, LoginData, SignUpData } from "@/types/auth";
import { apiClient } from "../client";

export const authApi = {
  signUp: async (data: SignUpData) => {
    const response = await apiClient.post<AuthResponse>("/auth/sign-up", data);
    return response.data;
  },

  login: async (data: LoginData) => {
    const response = await apiClient.post<AuthResponse>("/auth/login", data);
    return response.data;
  },
};
