import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";

import { useColorScheme } from "@/hooks/theme/useColorScheme";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/api/query-client";
import { useAuthStore } from "@/stores/auth-store";
import * as SecureStorage from "expo-secure-store";
import { View } from "react-native";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isAuthenticated, user, token } = useAuthStore();
  // console.log({ user, token, isAuthenticated });

  console.log(SecureStorage.getItem("auth-storage"));

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Inter: require("../assets/fonts/Inter-Regular.otf"),
    InterBold: require("../assets/fonts/Inter-Bold.otf"),
    InterSemiBold: require("../assets/fonts/Inter-SemiBold.otf"),
    InterMedium: require("../assets/fonts/Inter-Medium.otf"),
    InterBlack: require("../assets/fonts/Inter-Black.otf"),
    Roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <View className="w-screen h-screen p-4 bg-fill light">
          <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen
              name="index"
              options={{ headerShown: false }}
              redirect={false}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </View>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
