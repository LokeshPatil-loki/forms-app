import { useAuthStore } from "@/stores/auth-store";
import { Redirect, Stack } from "expo-router";

export default function AppLayout() {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return <Redirect href={"/sign-in"} />;
  }
  return <Stack />;
}
