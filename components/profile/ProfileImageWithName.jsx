import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function ProfileImageWithName({
  imageUri,
  name,
  onPickImage,
  isEdit = false,
}) {
  return (
    <View className="items-center mb-8">
      <View className="relative">
        <TouchableOpacity onPress={onPickImage}>
          <View className="w-40 h-40 rounded-full bg-gray-200 overflow-hidden">
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                className="w-full h-full"
                style={{ borderRadius: 999 }}
              />
            ) : (
              <View className="flex-1 items-center justify-center h-full">
                <Text
                  className="text-gray-600"
                  style={{ fontFamily: "Poppins-Regular" }}>
                  Foto
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
        {isEdit && (
          <TouchableOpacity
            onPress={onPickImage}
            className="absolute bottom-2 right-2 bg-[#4CA771] p-2 rounded-full z-10"
            style={{
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 1 },
              shadowRadius: 2,
              elevation: 3,
            }}>
            <Ionicons name="pencil" size={14} color="white" />
          </TouchableOpacity>
        )}
      </View>
      {!isEdit && (
        <Text
          className="mt-4 text-lg text-[#013237]"
          style={{ fontFamily: "Poppins-SemiBold" }}>
          {name}
        </Text>
      )}
    </View>
  );
}
