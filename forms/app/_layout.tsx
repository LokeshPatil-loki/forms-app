import { useFonts } from "expo-font";
import { router, Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Add this import
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_800ExtraBold,
} from "@expo-google-fonts/poppins";
import {
  JetBrainsMono_400Regular,
  JetBrainsMono_700Bold,
} from "@expo-google-fonts/jetbrains-mono";

import {
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { useColorScheme } from "@/hooks/theme/useColorScheme";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/api/query-client";
import { View } from "react-native";
import { createNotifications } from "react-native-notificated";
import * as Linking from "expo-linking";

import * as SecureStorage from "expo-secure-store";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { NotificationsProvider } = createNotifications({
    isNotch: true,
    notificationWidth: 500,
  });

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_800ExtraBold,
    Inter_900Black,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    JetBrainsMono_400Regular,
    JetBrainsMono_700Bold,
    Roboto_100Thin,
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      const { hostname, pathname } = new URL(event.url);

      // Check if the link is from your domain
      if (hostname === "form-rosy-one.vercel.app") {
        const match = pathname.match(/^\/forms\/([^/]+)$/);
        if (match) {
          const formId = match[1];
          // Navigate to the form response page
          router.push(`/forms/${formId}/response`);
        }
      }
    };

    // Add event listener
    const subscription = Linking.addEventListener("url", handleDeepLink);

    // Check initial link if app was opened from a link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    // Cleanup
    return () => {
      subscription.remove();
    };
  }, []);

  if (!fontsLoaded) {
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
