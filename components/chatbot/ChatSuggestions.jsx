import { ScrollView, Text, TouchableOpacity } from "react-native";

export default function ChatSuggestions({ suggestions, onSelect }) {
  if (!suggestions.length) return null;

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      className="mb-2 max-h-48 bg-white rounded-2xl shadow-md border border-[#E0E0E0]">
      {suggestions.map((sug, idx) => (
        <TouchableOpacity
          key={idx}
          onPress={() => onSelect(sug)}
          className="px-4 py-3 border-b border-gray-100">
          <Text className="text-sm text-[#4CA771] font-[Poppins-Regular]">
            {sug.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
