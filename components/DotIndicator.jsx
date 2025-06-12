// components/DotIndicator.js
import { View } from "react-native";

export default function DotIndicator({ total, currentIndex }) {
  return (
    <View className="flex-row justify-center gap-2 my-4">
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          className={`w-3 h-3 rounded-full ${
            index === currentIndex ? "bg-[#4CA771]" : "bg-gray-300"
          }`}
        />
      ))}
    </View>
  );
}
