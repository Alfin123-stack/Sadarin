import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { motivationalQuotes } from "../../constants/motivationalQuotes";



export default function MotivationalCard() {
  const [quote, setQuote] = useState(motivationalQuotes[0]);

  useEffect(() => {
    // Menampilkan motivasi secara acak setiap kali komponen dimuat
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[randomIndex]);

  }, []);

  return (
    <View className="bg-[#4CA771] rounded-2xl p-5 mb-6 shadow-md">
      <Text className="text-white text-lg font-pbold mb-2">
        &quot;{quote.title}&quot;
      </Text>
      <Text className="text-white text-sm font-pregular">{quote.subtitle}</Text>
    </View>
  );
}
