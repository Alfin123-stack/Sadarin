// components/OnboardingCard.js
import { Animated, Dimensions, View } from "react-native";
const { width } = Dimensions.get("window");

export default function OnboardingCard({ item, fadeAnim, slideAnim }) {
  return (
    <View
      className="items-center px-8 justify-center"
      style={{ width, backgroundColor: "#EAF9E7" }}>
      <Animated.Image
        source={item.image}
        style={{
          width: 280,
          height: 280,
          transform: [{ translateY: slideAnim }],
        }}
        resizeMode="contain"
      />
      <Animated.Text
        className="text-center text-2xl font-psemibold mt-8"
        style={{
          color: "#013237",
          transform: [{ translateY: slideAnim }],
        }}>
        {item.title}
      </Animated.Text>
      <Animated.Text
        className="text-center text-base font-pregular mt-4"
        style={{
          color: "#4C5B50",
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}>
        {item.description}
      </Animated.Text>
    </View>
  );
}
