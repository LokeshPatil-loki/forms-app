import { useAuthStore } from "@/stores/auth-store";
import { Redirect, Stack } from "expo-router";

export default function AppLayout() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="forms/all" />
      <Stack.Screen name="forms/[formId]" />
      <Stack.Screen name="forms/[formId]/response" />
      <Stack.Screen name="forms/[formId]/question/add" />
    </Stack>
  );
}
