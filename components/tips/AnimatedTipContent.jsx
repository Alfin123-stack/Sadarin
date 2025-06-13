import { Animated, Image, Text } from "react-native";

export default function AnimatedTipContent({
  fadeAnim,
  translateY,
  tip,
  image,
  title,
}) {
  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY }],
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}>
      <Image
        source={require("../../assets/onboarding1.jpg")}
        className="w-72 h-72 mb-6 rounded-2xl"
        resizeMode="cover"
      />
      <Text className="text-xl font-pbold text-center mb-2 text-[#013237]">
        {tip.title}
      </Text>
      <Text
        className="text-base text-center font-pregular px-6 leading-7"
        style={{ color: "#013237" }}>
        {tip.description}
      </Text>
    </Animated.View>
  );
}
