import { Ionicons } from "@expo/vector-icons";
import { TextInput, TouchableOpacity, View } from "react-native";

export default function ChatInputBar({ message, setMessage, onSend }) {
  return (
    <View className="absolute bottom-4 left-6 right-6 flex-row items-center bg-white rounded-full px-4 py-3 shadow-md">
      <TextInput
        placeholder="Tulis pesan di sini..."
        value={message}
        onChangeText={setMessage}
        className="flex-1 text-[#013237] font-pregular"
        multiline
        style={{ maxHeight: 100 }}
      />
      <TouchableOpacity
        onPress={onSend}
        className="bg-[#4CA771] p-4 rounded-full ml-3">
        <Ionicons name="send" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
