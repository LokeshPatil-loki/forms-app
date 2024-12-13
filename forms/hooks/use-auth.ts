import { authApi } from "@/lib/api/endpoints/auth";
import { useAuthStore } from "@/stores/auth-store";
import { AuthResponse, LoginData, SignUpData } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSignUp() {
  const setAuth = useAuthStore((state) => state.setAuth);
  return useMutation({
    mutationFn: (data: SignUpData) => authApi.signUp(data),
    onSuccess: (response: AuthResponse) => {
      setAuth(response.data.user, response.data.token);
    },
  });
}

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);
  return useMutation({
    mutationFn: (data: LoginData) => authApi.login(data),
    onSuccess: (response: AuthResponse) => {
      setAuth(response.data.user, response.data.token);
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
