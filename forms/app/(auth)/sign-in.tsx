import { useLogin } from "@/hooks/use-auth";
import { LoginData } from "@/types/auth.type";
import { Alert, Text } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/auth.schema";
import { Link } from "expo-router";
import { Button, ScreenView, TextInput } from "@/components/common";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useEffect } from "react";
import { notify } from "react-native-notificated";

export default function SignInScreen() {
  const { error, isPending, isError, mutate: login } = useLogin();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isError && error) {
      // Alert.alert("Sign In Failed", error);
      notify("error", {
        params: {
          description: error,
          title: "Authentication Failure",
          style: {
            titleSize: 20,
            titleColor: "#FF0000",
            descriptionSize: 15,
            accentColor: "#FF0000",
            borderType: "accent",
            defaultIconType: "no-icon",
          },
        },
      });
    }
  }, [isError, error]);

  const onSubmit = handleSubmit((data) => {
    login(data);
  });

  return (
    <>
      <ScreenView className="flex-1 gap-6 px-4 py-16 ">
        <View className="flex gap-2">
          <View className="items-center">
            <View className="items-center justify-center w-24 h-24 rounded-full bg-primary/10">
              <Ionicons
                name="person-circle-outline"
                size={80}
                color="#6366f1"
              />
            </View>
          </View>
          <Text className="text-3xl font-bold tracking-wider text-center font-body text-text-base">
            Welcome Back!
          </Text>
          <Text className="text-base text-center text-text-base font-body">
            Please sign in to continue to our form builder app. We are excited
            to have you back and look forward to helping you create amazing
            forms effortlessly.
          </Text>
        </View>

        <View className="flex gap-6 mt-4">
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  error={errors.email?.message ?? undefined}
                  label="Email Address"
                  placeholder="Enter your email"
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  error={errors.password?.message ?? undefined}
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                />
              </>
            )}
          />
          <View className="flex gap-3 mt-2">
            <Button
              isLoading={isPending}
              isDisabled={isPending}
              onPress={onSubmit}
              loadingText="Signing in..."
              size="lg"
            >
              Sign In
            </Button>
            <Text className="text-sm font-normal text-center text-text-muted">
              Don't have an account?{" "}
              <Link
                href={"/sign-up"}
                replace
                className="font-normal text-text-base"
              >
                Sign Up
              </Link>
            </Text>
          </View>
        </View>
      </ScreenView>
    </>
  );
}
