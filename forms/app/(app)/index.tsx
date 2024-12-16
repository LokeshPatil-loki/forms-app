import { Image, Text, View } from "react-native";
import { Button, FormCard, Loading, ScreenView } from "@/components/common";
import { useLogout } from "@/hooks/use-auth";
import { useGetMyForms } from "@/hooks/use-form";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAuthStore } from "@/stores/auth-store";
import { BlurView } from "expo-blur";
import { Link } from "expo-router";
import * as Haptics from "expo-haptics";
import { StatsCard } from "@/components/StatsCard";
import { colors } from "@/utils/colors";

export default function HomePage() {
  const { user } = useAuthStore();
  const { data: formsData, isLoading, error } = useGetMyForms();

  const handleViewAll = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/forms/all");
  };

  return (
    <ScreenView className="flex-1">
      {/* Header Section with Blur Effect */}
      <BlurView intensity={50} className="px-4 py-6 bg-fill">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-sm font-medium text-text-muted">
              Welcome back
            </Text>
            <Text className="text-2xl font-bold text-text-base font-display">
              {user?.firstName} {user?.lastName}
            </Text>
          </View>
          <TouchableOpacity
            className="items-center justify-center w-10 h-10 rounded-full bg-fill-muted"
            // onPress={() => router.push("/profile")}
          >
            <MaterialIcons
              name="person"
              size={24}
              color="var(--color-text-muted)"
            />
          </TouchableOpacity>
        </View>
        {/* Stats Section */}
        <View className="flex-row mt-4 -mx-2">
          <StatsCard
            label="Total Forms"
            valueClassName="text-accent"
            value={formsData?.data.forms.length || 0}
          />
          <StatsCard
            label="Total Forms"
            valueClassName="text-accent"
            value={
              formsData?.data.forms.filter((f) => f.isPublished).length || 0
            }
          />
        </View>
        <Button
          leftIcon={
            <MaterialIcons
              name="add"
              size={24}
              color={colors.textInverted.rgb}
            />
          }
          className="mt-8"
        >
          Create New Form
        </Button>
      </BlurView>

      {/* Forms List Section */}
      <View className="flex-1 px-4">
        <View className="flex-row items-start justify-between py-4">
          <View>
            <Text className="text-lg font-bold font-roboto text-text-base ">
              Recent Forms
            </Text>
            <Text className="text-xs text-text-muted">
              {formsData?.data.forms.length || 0} total forms
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleViewAll}
            className="flex-row items-center px-3 py-2 rounded-full bg-accent/10 active:bg-accent/20"
          >
            <Text className="mr-1 text-sm font-medium text-accent">
              View All
            </Text>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <Loading loadingText="Loading your forms..." />
        ) : error ? (
          <View className="items-center justify-center flex-1">
            <MaterialIcons
              name="error-outline"
              size={48}
              color="var(--color-text-muted)"
            />
            <Text className="mt-2 text-text-muted">
              Error loading forms. Please try again.
            </Text>
            <Button
              variant="ghost"
              className="mt-4"
              leftIcon={
                <MaterialIcons
                  name="refresh"
                  size={20}
                  color="var(--color-accent)"
                />
              }
            >
              Retry
            </Button>
          </View>
        ) : (
          <View className="mt-2">
            {formsData?.data.forms.map((form) => (
              <FormCard key={form.id} form={form} />
            ))}
          </View>
        )}
      </View>
    </ScreenView>
  );
}
