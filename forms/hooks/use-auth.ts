import { authApi } from "@/lib/api/endpoints/auth";
import { useAuthStore } from "@/stores/auth-store";
import { AuthResponse, LoginData, SignUpData } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { AxiosError } from "axios";
import { ApiError } from "@/types/auth";

export function useSignUp() {
  const setAuth = useAuthStore((state) => state.setAuth);
  return useMutation<AuthResponse, ApiError, SignUpData>({
    mutationFn: async (data: SignUpData) => {
      try {
        const response = await authApi.signUp(data);
        return response;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw error.response?.data;
        }
        throw "An unexpected error occurred";
      }
    },
    onSuccess: (response: AuthResponse) => {
      // setAuth(response.data.user, response.data.token);
      router.replace("/(auth)/sign-in");
    },
    onError(error, variables, context) {
      console.log(error, variables, context);
    },
  });
}

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);
  return useMutation<AuthResponse, string, LoginData>({
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
      router.replace("/");
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  return () => {
    clearAuth();
    queryClient.clear();
  };
}
