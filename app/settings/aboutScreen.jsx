import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View, Linking } from "react-native";

export default function AboutScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-[#EAF9E7] px-6 pt-14" contentContainerStyle={{ paddingBottom: 40 }}>
      <View className="flex-row items-center gap-4 mb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-white w-10 h-10 rounded-full items-center justify-center shadow-md">
          <Ionicons name="arrow-back" size={22} color="#4CA771" />
        </TouchableOpacity>
        <Text className="text-xl text-[#013237] font-psemibold">Tentang Aplikasi</Text>
      </View>

      <View className="bg-white rounded-2xl p-4 shadow-md space-y-4">
        <Text className="text-[#013237] text-base font-pregular leading-relaxed">
          Aplikasi ini dibuat untuk membantu remaja menjaga kesehatan mental dengan fitur seperti pelacakan suasana hati, tips harian, dan edukasi bahaya judi online.
        </Text>

        <Text className="text-[#013237] text-base font-pregular leading-relaxed">
          Dikembangkan oleh tim pengembang muda dalam rangka mendukung kesadaran dan pencegahan terhadap isu-isu kesehatan mental di era digital.
        </Text>

        <TouchableOpacity onPress={() => Linking.openURL("https://github.com/namaprojekmu")}>
          <Text className="text-[#4CA771] text-base font-psemibold">Lihat Proyek di GitHub</Text>
        </TouchableOpacity>

        <Text className="text-[#4CA771] text-sm font-pregular mt-4">Versi 1.0.0</Text>
      </View>
    </ScrollView>
  );
}
