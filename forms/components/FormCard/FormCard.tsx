import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Form } from "@/types/form.type";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useFormStore } from "@/stores/form-store";
import * as Clipboard from "expo-clipboard";
import { showAlert } from "@/utils/notify";
import { useDeleteForm } from "@/hooks/use-form";
import { colors } from "@/utils/colors";

interface FormCardProps {
  form: Form;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 0.8,
  },
});

export const FormCard = ({ form, onPress }: FormCardProps) => {
  const { setCurrentForm } = useFormStore();
  const { mutate: deleteForm, isPending } = useDeleteForm();
  console.log(isPending);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      setCurrentForm(form);
      router.push(`/(app)/forms/${form.id}/builder`);
    }
  };

  const handleShare = async () => {
    if (form.shareableLink) {
      await Clipboard.setStringAsync(form.shareableLink);
      showAlert({
        type: "success",
        title: "Link Copied!",
        description: "Shareable link copied to clipboard",
      });
    }
  };

  const handleDelete = () => {
    deleteForm(form.id);
  };

  return (
    <Pressable onPress={handlePress} style={[styles.card, styles.shadow]}>
      {form.headerImageUrl ? (
        <Image
          source={{ uri: form.headerImageUrl }}
          className="w-16 h-16 rounded-lg"
        />
      ) : (
        <View className="items-center justify-center w-16 h-16 rounded-lg bg-accent/10">
          <MaterialIcons
            name="description"
            size={24}
            color="var(--color-accent)"
          />
        </View>
      )}

      <View className="flex-1 ml-4">
        <Text className="mb-1 text-lg font-medium text-text-base">
          {form.title}
        </Text>
        {form.description && (
          <Text className="text-sm text-text-muted" numberOfLines={2}>
            {form.description}
          </Text>
        )}
        <View className="flex-row items-center mt-2">
          <MaterialIcons
            name="access-time"
            size={14}
            color="var(--color-text-muted)"
          />
          <Text className="ml-1 text-xs text-text-muted">
            {new Date(form.createdAt || "").toLocaleDateString()}
          </Text>
          <View className="w-1 h-1 mx-2 rounded-full bg-text-muted" />
          <MaterialIcons
            name="question-answer"
            size={14}
            color="var(--color-text-muted)"
          />
          <Text className="ml-1 text-xs text-text-muted">
            {form.questions.length} questions
          </Text>
        </View>
      </View>

      <View className="flex flex-col items-end gap-2">
        {form.isPublished ? (
          <>
            <View className="bg-[#DCFCE7] px-3 py-1.5 rounded-md">
              <Text className="text-xs font-medium text-[#15803D]">
                Published
              </Text>
            </View>
            <View className="flex-row gap-1">
              <Pressable
                onPress={handleShare}
                className="p-2 rounded-full active:bg-muted"
              >
                <MaterialIcons
                  name="share"
                  size={20}
                  color={colors.textMuted.rgb}
                />
              </Pressable>
              <Pressable
                onPress={handleDelete}
                className="p-2 rounded-full active:bg-status-error/10"
              >
                {!isPending ? (
                  <MaterialIcons
                    name="delete-outline"
                    size={20}
                    color={colors.error.rgb}
                  />
                ) : (
                  <Octicons
                    className="animate-spin"
                    name="x-circle"
                    size={20}
                    color={colors.error.rgb}
                  />
                )}
              </Pressable>
            </View>
          </>
        ) : (
          <>
            <View className="bg-muted px-3 py-1.5 rounded-md">
              <Text className="text-xs font-medium text-text-base">Draft</Text>
            </View>
            <Pressable
              onPress={handleDelete}
              className="p-2 rounded-full active:bg-status-error/10"
            >
              <MaterialIcons
                name="delete-outline"
                size={20}
                color={colors.error.rgb}
              />
            </Pressable>
          </>
        )}
      </View>
    </Pressable>
  );
};
