import { Text, TouchableOpacity, View } from "react-native";

export default function PromptSuggestionList({
  suggestions,
  onPressSuggestion,
}) {
  return (
    <View className="flex-row flex-wrap gap-2 mt-4">
      {suggestions.map((item, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => onPressSuggestion(item)}
          className="bg-white px-4 py-2 rounded-full shadow-sm"
          activeOpacity={0.7}>
          <Text className="text-[#4CA771] font-pregular">{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
