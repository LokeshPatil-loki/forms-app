import React, { useState } from "react";
import {
  Text,
  TextInput as _TextInput,
  TextInputProps as _TextInputProps,
  View,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface TextInputProps extends _TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  inputWrapperClassName?: string;
  inputClassName?: string;
  type?: "text" | "password";
}

export const TextInput = ({
  label,
  error,
  helperText,
  required = false,
  containerClassName = "",
  labelClassName = "",
  inputWrapperClassName = "",
  inputClassName = "",
  type = "text",
  ...textInputProps
}: TextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const renderPasswordIcon = () => (
    <Pressable onPress={togglePassword} className="ml-2">
      <MaterialIcons
        name={showPassword ? "visibility" : "visibility-off"}
        size={24}
        color="#7f84a6"
      />
    </Pressable>
  );

  return (
    <View className={`${containerClassName}`}>
      {label && (
        <Text
          className={`mb-2 text-lg font-medium text-text-base ${labelClassName}`}
        >
          {label}
          {required && <Text className="text-error"> *</Text>}
        </Text>
      )}
      <View
        className={`flex-row items-center px-4 py-4 rounded-md bg-fill-muted
          ${error ? "border border-error" : ""} 
          ${inputWrapperClassName}`}
      >
        <_TextInput
          className={`flex-1 text-text-base placeholder:text-text-muted text-lg font-normal  font-body ${inputClassName}`}
          secureTextEntry={type === "password" && !showPassword}
          {...textInputProps}
        />
        {type === "password" && renderPasswordIcon()}
      </View>
      {(error || helperText) && (
        <Text
          className={`mt-1 text-sm ${error ? "text-error" : "text-text-muted"}`}
        >
          {error || helperText}
        </Text>
      )}
    </View>
  );
};
