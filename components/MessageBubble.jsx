// ✅ COMPONENT: MessageBubble.js
import { Text, View } from "react-native";

export default function MessageBubble({ text, sender }) {
  const isUser = sender === "user";

  return (
    <View
      className={`max-w-[75%] mb-3 p-4 rounded-2xl shadow-md ${
        isUser
          ? "bg-[#C0E6BA] self-end rounded-br-none"
          : "bg-white self-start rounded-bl-none"
      }`}>
      <Text
        className={`text-base ${
          isUser ? "text-[#013237]" : "text-gray-700"
        } font-pregular`}>
        {text}
      </Text>
    </View>
  );
}
