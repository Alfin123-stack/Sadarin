import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, Dimensions, Text } from "react-native";

export default function Toast({
  message,
  visible,
  onHide,
  iconName = "check-circle",
  bgColor = "#D4F5D4",
  iconColor = "#4CA771",
  duration = 1800, // durasi visible toast
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(duration),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (onHide) onHide();
      });
    }
  }, [visible, duration,fadeAnim, onHide]);

  if (!visible) return null;

  return (
    <Animated.View
      style={{
        position: "absolute",
        bottom: 50,
        left: (Dimensions.get("window").width - 280) / 2,
        width: 280,
        opacity: fadeAnim,
        backgroundColor: bgColor,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 28,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.35,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 5 },
        elevation: 6,
        zIndex: 9999,
      }}>
      <MaterialIcons
        name={iconName}
        size={22}
        color={iconColor}
        style={{ marginRight: 12 }}
      />
      <Text
        style={{
          color: "black",
          fontSize: 15,
          fontFamily: "Poppins-Regular",
          textAlign: "left",
          flexShrink: 1,
        }}>
        {message}
      </Text>
    </Animated.View>
  );
}
