import { Text, View } from "react-native";

export default function NoGamblingQuote() {
  return (
    <View className="px-5 pt-5 pb-2">
      <Text
        className="text-white text-2xl font-semibold text-center"
        style={{ fontFamily: "Poppins-SemiBold" }}>
        Bahaya Judi Online
      </Text>
      <Text
        className="text-[#D4E8DB] text-sm mt-2 leading-relaxed text-center"
        style={{ fontFamily: "Poppins-Regular" }}>
        Judi online dapat menyebabkan kecanduan, gangguan mental, serta kerugian
        ekonomi yang besar. Sadari risikonya dan lindungi masa depanmu.
      </Text>
    </View>
  );
}
