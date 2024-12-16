import { useSignUp } from "@/hooks/use-auth";
import { SignUpData } from "@/types/auth.type";
import { View, Text, ScrollView } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas/auth.schema";
import { Link } from "expo-router";
import { Button, ScreenView, TextInput } from "@/components/common";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { notify } from "react-native-notificated";

export default function SignUpScreen() {
  const { error, isSuccess, isPending, isError, mutate: signUp } = useSignUp();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    signUp(data);
  });

  return (
    <ScreenView className="flex-1 gap-6 px-4 pt-16 ">
      <ScrollView>
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
            Sign Up
          </Text>
          <Text className="text-base font-medium text-center text-text-base">
            Create your account
          </Text>
        </View>

        <View className="flex gap-6">
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  error={errors.firstName?.message || ""}
                  label="First Name"
                  placeholder="Enter your first name"
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  error={errors.lastName?.message || ""}
                  label="Last Name"
                  placeholder="Enter your last name"
                />
              </>
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  error={errors.email?.message || ""}
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
        </View>
        <View className="flex gap-3 mt-6">
          <Button
            isLoading={isPending}
            isDisabled={isPending}
            onPress={onSubmit}
            loadingText="Signing in..."
            size="lg"
          >
            Sign Up
          </Button>
          <Text className="text-sm font-normal text-center text-text-muted">
            <Link
              href={"/sign-in"}
              replace
              className="font-normal text-text-base"
            >
              Already have an account?
            </Link>
          </Text>
        </View>
      </ScrollView>
    </ScreenView>
  );
}
