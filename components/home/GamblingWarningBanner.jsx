import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function GamblingWarningBanner() {
  const router = useRouter();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => router.push("/noGambling")}
      className="flex-row items-start justify-between bg-[#C0E6BA] rounded-2xl px-5 py-4 mb-4 shadow-md">
      <View className="flex-1">
        <Text
          className="text-[#013237] font-semibold text-base"
          style={{ fontFamily: "Poppins-SemiBold" }}>
          Waspadai Bahaya Judi Online
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/noGambling")}
          className="mt-2 flex-row items-center">
          <Text
            className="text-[#4CA771] text-sm mr-1"
            style={{ fontFamily: "Poppins-Medium" }}>
            Pelajari lebih lanjut
          </Text>
          <Ionicons name="arrow-forward-circle" size={18} color="#4CA771" />
        </TouchableOpacity>
      </View>

      <Ionicons
        name="shield-checkmark"
        size={32}
        color="#4CA771"
        className="ml-3 mt-1"
      />
    </TouchableOpacity>
  );
}
