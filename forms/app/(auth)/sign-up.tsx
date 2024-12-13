import { useLogin, useSignUp } from "@/hooks/use-auth";
import { LoginData, SignUpData } from "@/types/auth";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, signUpSchema } from "@/schemas/auth";
import { Link } from "expo-router";

export default function SignUpScreen() {
  const {
    data,
    error,
    isPending,
    isSuccess,
    isError,
    mutate: signUp,
  } = useSignUp();

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
    <View className="justify-center flex-1 px-4">
      <Text className="mb-8 text-2xl font-bold text-center">Welcome Back</Text>

      {isError && (
        <Text className="mb-4 text-sm text-center text-red-500">
          {error.errors[0].message || "An error occurred during sign in"}
        </Text>
      )}

      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              className="p-3 mb-2 border border-gray-300 rounded-lg"
              placeholder="First Name"
              value={value}
              onChangeText={onChange}
              autoCapitalize="none"
              keyboardType="default"
            />
            {errors.firstName && (
              <Text className="mb-2 text-sm text-red-500">
                {errors.firstName.message}
              </Text>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              className="p-3 mb-2 border border-gray-300 rounded-lg"
              placeholder="First Name"
              value={value}
              onChangeText={onChange}
              autoCapitalize="none"
              keyboardType="default"
            />
            {errors.lastName && (
              <Text className="mb-2 text-sm text-red-500">
                {errors.lastName.message}
              </Text>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              className="p-3 mb-2 border border-gray-300 rounded-lg"
              placeholder="Email"
              value={value}
              onChangeText={onChange}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {errors.email && (
              <Text className="mb-2 text-sm text-red-500">
                {errors.email.message}
              </Text>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              className="p-3 mb-2 border border-gray-300 rounded-lg"
              placeholder="Password"
              value={value}
              onChangeText={onChange}
              autoCapitalize="none"
              secureTextEntry
            />
            {errors.password && (
              <Text className="mb-2 text-sm text-red-500">
                {errors.password.message}
              </Text>
            )}
          </>
        )}
      />

      <TouchableOpacity
        onPress={onSubmit}
        disabled={isPending}
        className="p-4 mb-4 bg-blue-500 rounded-lg"
      >
        <Text className="font-semibold text-center text-white">
          {isPending ? "Signing in..." : "Sign In"}
        </Text>
      </TouchableOpacity>
      {/*  */}
      <Link
        href={"/sign-in"}
        className="text-center text-gray-400 cursor-pointer"
      >
        Don't have an account?{" "}
        <Text className="font-semibold text-gray-500">Sign Up</Text>
      </Link>
    </View>
  );
}
