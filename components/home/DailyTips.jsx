// components/home/DailyTips.tsx
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function DailyTips({tips}) {
  return (
    <View className="bg-white rounded-2xl p-4 shadow-md mb-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-[#013237] font-pbold text-lg">
          Saran Harian 💡
        </Text>
        <TouchableOpacity>
          <Text className="text-[#4CA771] font-psemibold text-sm">
            lainnya →
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {tips.map((tip, index) => (
          <View
            key={index}
            className="bg-[#EAF9E7] w-64 p-4 rounded-2xl mr-4 justify-center">
            <Text className="text-[#013237] font-pregular text-sm">{tip}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
