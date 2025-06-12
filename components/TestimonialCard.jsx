import { Text, View } from "react-native";

export default function TestimonialCard({ name, quote, width }) {
  return (
    <View
      className="bg-white p-5 rounded-2xl mr-4"
      style={{
        width,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
      }}>
      <Text className="text-[#4CA771] font-psemibold mb-1">{name}</Text>
      <Text className="text-[#4CA771] text-3xl leading-none mb-2">“</Text>
      <Text className="text-[#03282B] font-pregular text-base">{quote}</Text>
    </View>
  );
}
