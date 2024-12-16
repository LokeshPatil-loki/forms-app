import { colors } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import * as ExpoImagePicker from "expo-image-picker";
import { useState } from "react";
import { uploadToCloudinary } from "@/utils/cloudinary";

interface ImagePickerProps {
  onPress: () => void;
  url: string;
}

export const ImagePicker = ({ onPress, url }: ImagePickerProps) => {
  const [imageUrl, setImageUrl] = useState(url);
  const hanldeImageUpload = async () => {
    try {
      setImageUrl("");
      const result = await ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 2],
        quality: 1,
      });

      if (result.canceled) {
        setImageUrl(url);
        return;
      }
      console.log(result.assets[0].uri);
      const response = await uploadToCloudinary(result.assets[0].uri);
      console.log(response);
      if (response) {
        setImageUrl(response?.url);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Pressable onPress={hanldeImageUpload} className="">
      <Text className="mb-2 font-light text-text-muted">
        Tap to select a image
      </Text>
      {imageUrl && imageUrl.length > 0 ? (
        <Image className="border border-text-muted h-36" src={imageUrl} />
      ) : (
        <View className="flex items-center justify-center border-2 border-dashed rounded-md h-36 border-border-muted">
          <Ionicons
            name="image-outline"
            color={colors.textMuted.rgb}
            size={40}
          />
          <Text className="text-lg text-text-muted">Upload a Image</Text>
        </View>
      )}
    </Pressable>
  );
};
