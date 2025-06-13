import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function ScreenHeader({
  title,
  showTitle = true,
  iconColor = "#4CA771",
  bgColor = "#FFFFFF",
  shadow = true,
  onBack,
  className = "",
}) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) return router.push(onBack);
    router.back();
  };

  return (
    <View className={`flex-row items-center gap-4 ${className}`}>
      <TouchableOpacity
        onPress={handleBack}
        className={`w-10 h-10 rounded-full items-center justify-center ${
          shadow ? "shadow-md" : ""
        }`}
        style={{ backgroundColor: bgColor }}>
        <Ionicons name="arrow-back" size={22} color={iconColor} />
      </TouchableOpacity>
      {showTitle && (
        <Text
          className="text-xl font-psemibold"
          style={{ color: "#000" }} // ✅ Tambah warna hitam eksplisit
        >
          {title}
        </Text>
      )}
    </View>
  );
}
