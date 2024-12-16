import { View, Text, TouchableOpacity } from "react-native";
import { ScreenView, FormCard } from "@/components/common";
import { useGetMyForms } from "@/hooks/use-form";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { BlurView } from "expo-blur";
import { color } from "@cloudinary/url-gen/qualifiers/background";
import { colors } from "@/utils/colors";
console.log(colors.accent.rgb);

export default function AllFormsScreen() {
  const { data: formsData, isLoading, error } = useGetMyForms();

  return (
    <ScreenView className="flex-1">
      <BlurView
        intensity={50}
        className="px-4 py-6"
        style={{ backgroundColor: "rgba(var(--color-fill-rgb), 0.8)" }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            <TouchableOpacity
              onPress={() => router.back()}
              className="p-2 -ml-2 rounded-full active:bg-accent/10"
            >
              <MaterialIcons
                name="arrow-back-ios-new"
                size={24}
                color="var(--color-accent)"
              />
            </TouchableOpacity>
            <View className="ml-2">
              <Text className="text-2xl font-bold text-text-base font-display">
                All Forms
              </Text>
              <Text className="text-sm text-text-muted">
                {formsData?.data.forms.length || 0} forms in total
              </Text>
            </View>
          </View>

          <TouchableOpacity
            // onPress={() => router.push("/forms/new")}
            className="px-4 py-2 rounded-full bg-accent active:bg-accent-hover"
          >
            <View className="flex-row items-center">
              <MaterialIcons
                name="add"
                size={20}
                color={colors.textInverted.rgb}
              />
              <Text className="ml-1 text-sm font-medium text-text-inverted">
                New Form
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </BlurView>

      <View className="flex-1 px-4">
        {isLoading ? (
          <View className="items-center justify-center flex-1">
            <View className="p-4 rounded-full bg-accent/10">
              <MaterialIcons
                name="hourglass-empty"
                size={32}
                color="var(--color-accent)"
                className="animate-spin"
              />
            </View>
            <Text className="mt-4 text-text-muted">Loading your forms...</Text>
          </View>
        ) : error ? (
          <View className="items-center justify-center flex-1">
            <View className="p-4 rounded-full bg-status-error/10">
              <MaterialIcons
                name="error-outline"
                size={48}
                color="var(--color-status-error)"
              />
            </View>
            <Text className="mt-4 text-lg font-medium text-text-base">
              Oops! Something went wrong
            </Text>
            <Text className="mt-2 text-text-muted">
              Error loading forms. Please try again.
            </Text>
            <TouchableOpacity
              className="flex-row items-center px-4 py-2 mt-4 rounded-full bg-accent active:bg-accent-hover"
              onPress={() => router.reload()}
            >
              <MaterialIcons
                name="refresh"
                size={20}
                color="var(--color-text-inverted)"
              />
              <Text className="ml-2 font-medium text-text-inverted">
                Try Again
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="py-4">
            {formsData?.data.forms.length === 0 ? (
              <View className="items-center justify-center flex-1 mt-12">
                <View className="p-6 rounded-full bg-accent/10">
                  <MaterialIcons
                    name="note-add"
                    size={48}
                    color="var(--color-accent)"
                  />
                </View>
                <Text className="mt-4 text-xl font-medium text-text-base font-display">
                  No Forms Yet
                </Text>
                <Text className="mt-2 text-sm text-center text-text-muted max-w-[280px]">
                  Create your first form to start collecting responses
                </Text>
                <TouchableOpacity
                  // onPress={() => router.push("/forms/new")}
                  className="px-4 py-2 mt-6 rounded-full bg-accent active:bg-accent-hover"
                >
                  <View className="flex-row items-center">
                    <MaterialIcons
                      name="add"
                      size={20}
                      color="var(--color-text-inverted)"
                    />
                    <Text className="ml-1 font-medium text-text-inverted">
                      Create First Form
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View className="py-4">
                {formsData?.data.forms.map((form) => (
                  <FormCard key={form.id} form={form} />
                ))}
              </View>
            )}
          </View>
        )}
      </View>
    </ScreenView>
  );
}
