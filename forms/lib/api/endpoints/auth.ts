import { LoginData, SignUpData } from "@/types/auth";
import { apiClient } from "../client";
import { ApiResponse } from "@/types/api/api-response";
import { AuthResponse } from "@/types/api/auth-response";

export const authApi = {
  signUp: async (data: SignUpData) => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      "/auth/sign-up",
      data
    );
    return response.data;
  },

  login: async (data: LoginData) => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      "/auth/login",
      data
    );
    return response.data;
  },
};
