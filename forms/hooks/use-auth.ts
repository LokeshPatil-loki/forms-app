import { authApi } from "@/lib/api/endpoints/auth";
import { useAuthStore } from "@/stores/auth-store";
import { LoginData, SignUpData } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { AxiosError } from "axios";
import { ApiError } from "@/types/auth";
import { notify } from "react-native-notificated";
import { AuthResponse } from "@/types/api/auth-response";
import { ApiResponse } from "@/types/api/api-response";

export function useSignUp() {
  const setAuth = useAuthStore((state) => state.setAuth);
  return useMutation<ApiResponse<AuthResponse>, ApiError, SignUpData>({
    mutationFn: async (data: SignUpData) => {
      try {
        const response = await authApi.signUp(data);
        notify("success", {
          params: {
            // description: "",
            title: response.message,
            style: {
              titleSize: 20,
              descriptionSize: 15,
              borderType: "accent",
            },
          },
        });
        return response;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw error.response?.data;
        }
        throw "An unexpected error occurred";
      }
    },
    onSuccess: (response: ApiResponse<AuthResponse>) => {
      setAuth(response.data.user, response.data.token);
      router.replace("/(auth)/sign-in");
    },
  });
}

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);
  return useMutation<ApiResponse<AuthResponse>, string, LoginData>({
    mutationFn: async (data: LoginData) => {
      try {
        const response = await authApi.login(data);
        return response;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw (
            error.response?.data?.errors?.[0]?.message ||
            "An error occurred during sign in"
          );
        }
        throw "An unexpected error occurred";
      }
    },
    onSuccess: (response) => {
      setAuth(response.data.user, response.data.token);
      router.push("/(app)");
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  return () => {
    clearAuth();
    queryClient.clear();
    router.replace("/sign-in");
  };
}
