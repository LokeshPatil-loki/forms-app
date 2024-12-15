import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Add this import

import { useColorScheme } from "@/hooks/theme/useColorScheme";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/api/query-client";
import { View } from "react-native";
import { createNotifications } from "react-native-notificated";
import * as SecureStorage from "expo-secure-store";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { NotificationsProvider } = createNotifications({
    isNotch: true,
    notificationWidth: 500,
  });

  console.log(SecureStorage.getItem("auth-storage"));

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <View className="flex-1 w-screen h-screen light">
          <NotificationsProvider>
            <Slot />
            <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
          </NotificationsProvider>
        </View>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
