import { authApi } from "@/lib/api/endpoints/auth.api";
import { useAuthStore } from "@/stores/auth-store";
import { LoginData, SignUpData } from "@/types/auth.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { AxiosError } from "axios";
import { ApiError } from "@/types/auth.type";
import { notify } from "react-native-notificated";
import { AuthResponse } from "@/types/api/auth-response.type";
import { ApiResponse } from "@/types/api/api-response.type";
import { handleApiError } from "@/utils/handle-api-error";

export function useSignUp() {
  const setAuth = useAuthStore((state) => state.setAuth);
  return useMutation<ApiResponse<AuthResponse>, ApiError, SignUpData>({
    mutationFn: async (data: SignUpData) =>
      handleApiError(() => authApi.signUp(data)),
    onSuccess: (response: ApiResponse<AuthResponse>) => {
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
      setAuth(response.data.user, response.data.token);
      router.replace("/(auth)/sign-in");
    },
  });
}

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);
  return useMutation<ApiResponse<AuthResponse>, string, LoginData>({
    mutationFn: async (data: LoginData) =>
      handleApiError(() => authApi.login(data)),
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
