import { Feather } from "@expo/vector-icons";
import { TextInput, TouchableOpacity, View } from "react-native";

export default function ChatInput({
  inputText,
  onChangeText,
  onSend,
  selectedSuggestion,
  isProcessing,
  hasSent,
}) {
  const canSend = selectedSuggestion && !isProcessing && !hasSent;

  return (
    <View className="flex-row items-end px-4 py-3 bg-white rounded-3xl shadow-lg border border-[#D6EAD3]">
      <View className="flex-1 pr-3">
        <TextInput
          value={inputText}
          onChangeText={onChangeText}
          placeholder="Tulis pertanyaan atau pilih saran..."
          placeholderTextColor="#9E9E9E"
          multiline
          numberOfLines={3}
          editable={!isProcessing && !hasSent}
          className="text-sm font-[Poppins-Regular] text-[#333] leading-5"
          style={{ maxHeight: 100 }}
        />
      </View>
      <TouchableOpacity
        onPress={onSend}
        disabled={!canSend}
        className={`p-3 rounded-full ${
          canSend ? "bg-[#4CA771]" : "bg-[#A8D3BA]"
        } shadow-md`}>
        <Feather name="send" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
