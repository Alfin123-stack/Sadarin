// components/home/FeatureButtons.tsx
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function FeatureButtons() {
  const router = useRouter();

  const buttons = [
    { label: "Bantuan\nChat", icon: "chatbubble-ellipses", route: "/chatbot" },
    { label: "Tips\nHarian", icon: "bookmark", route: "/tips" },
    { label: "Tonton\nVideo", icon: "videocam", route: "/reels" },
    { label: "Baca\nArtikel", icon: "document-text", route: "/articles" },
  ];

  return (
    <>
      <View className="mb-2">
        <Text className="text-[#013237] font-pbold text-lg mb-2">
          Jelajahi Fitur
        </Text>
      </View>
      <View className="flex-row flex-wrap justify-between">
        {buttons.map((btn, i) => (
          <TouchableOpacity
            key={i}
            activeOpacity={0.8}
            onPress={() => router.push(btn.route)}
            className="w-[48%] bg-white rounded-2xl p-3 mb-4 flex-row items-center shadow-sm">
            <View className="bg-[#C0E6BA] rounded-full p-2.5 mr-3">
              <Ionicons name={btn.icon} size={20} color="#013237" />
            </View>
            <Text className="text-[#013237] font-psemibold text-sm">
              {btn.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}
