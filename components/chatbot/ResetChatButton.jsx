import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

export default function ResetChatButton({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center self-end mb-2 px-4 py-1 rounded-full bg-white border border-[#4CA771]">
      <Feather name="rotate-ccw" size={16} color="#4CA771" />
      <Text className="ml-2 text-[#4CA771] font-[Poppins-Medium] text-sm">
        Reset Chat
      </Text>
    </TouchableOpacity>
  );
}
