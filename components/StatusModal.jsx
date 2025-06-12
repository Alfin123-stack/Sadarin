import { Ionicons } from "@expo/vector-icons";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";

export default function StatusModal({
  visible,
  onClose = () => {},
  success = true,
  title = "",
  message = "",
  buttonText = "OK",
  onConfirm = () => {},
  iconSize = 64,
  imageUrl = null, // Gambar opsional
}) {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center bg-black/50 px-6">
        <View className="bg-white rounded-3xl p-6 w-full max-w-md shadow-lg items-center">
          {/* Tampilkan gambar jika ada, jika tidak ikon bawaan */}
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={{
                width: iconSize + 16,
                height: iconSize + 16,
                borderRadius: 12,
                marginBottom: 16,
              }}
              resizeMode="contain"
            />
          ) : (
            <Ionicons
              name={success ? "checkmark-circle" : "close-circle"}
              size={iconSize}
              color={success ? "#4CA771" : "#DC2626"}
              style={{ marginBottom: 16 }}
            />
          )}

          <Text
            className={`font-pbold text-lg mb-2 text-center ${
              success ? "text-[#013237]" : "text-red-600"
            }`}>
            {title}
          </Text>

          <Text className="text-[#4C5B50] font-pregular text-center mb-4">
            {message}
          </Text>

          <TouchableOpacity
            onPress={() => {
              onClose();
              onConfirm();
            }}
            className={`px-4 py-3 rounded-xl w-full ${
              success ? "bg-[#4CA771]" : "bg-red-600"
            }`}>
            <Text className="text-white font-psemibold text-center">
              {buttonText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
