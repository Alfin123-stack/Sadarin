import Ionicons from "@expo/vector-icons/Ionicons";
import { useRef } from "react";
import {
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

const { width } = Dimensions.get("window");

export default function CustomTabBar({ state, descriptors, navigation }) {
  const height = 50;
  const buttonSize = 70;
  const centerIndex = state.routes.findIndex((r) => r.name === "chatbot");
  const sideWidth = (width - buttonSize) / 2;

  // 🎯 Scale animation for chatbot button (di tengah)
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const insets = useSafeAreaInsets();

  const handleChatbotPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handleChatbotPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start(() => {
      if (state.index !== centerIndex) {
        navigation.navigate("chatbot");
      }
    });
  };

  return (
    <View
      style={{
        width,
        height: 65 + insets.bottom,
        backgroundColor: "#03282B",
        paddingBottom: insets.bottom,
      }}>
      {/* ✅ Lengkungan SVG untuk tombol tengah */}
      <Svg
        width={width}
        height={height}
        style={{ position: "absolute", bottom: 0 }}>
        <Path
          d={`M0 0
              H${sideWidth - 10}
              C${sideWidth + 5} 0, ${sideWidth + 5} 30, ${width / 2} 30
              C${sideWidth + buttonSize - 5} 30, ${
            sideWidth + buttonSize - 5
          } 0, ${sideWidth + buttonSize + 10} 0
              H${width}
              V${height}
              H0
              Z
          `}
          fill="#03282B"
        />
      </Svg>

      {/* ✅ Tombol tengah = Chatbot */}
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          position: "absolute",
          top: -30,
          left: width / 2 - 35,
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: "#94D1B5",
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 4,
          borderColor: "#C7E4C5",
          zIndex: 10,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={handleChatbotPressIn}
          onPressOut={handleChatbotPressOut}
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Ionicons name="chatbubble-ellipses-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      {/* ✅ Tab lainnya: Home & Profile */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          alignItems: "flex-end",
          height: 50,
        }}>
        {state.routes.map((route, index) => {
          if (route.name === "chatbot") return null; // chatbot ada di tengah, sudah ditampilkan

          const isFocused = state.index === index;
          const onPress = () => navigation.navigate(route.name);

          const iconMap = {
            home: {
              icon: "home-outline",
              label: "Home",
            },
            profile: {
              icon: "person-outline",
              label: "Profile",
            },
          };

          const tabInfo = iconMap[route.name];
          if (!tabInfo) return null;

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={{
                width: sideWidth / 2,
                alignItems: "center",
                justifyContent: "center",
              }}>
              <Ionicons
                name={tabInfo.icon}
                size={20}
                color={isFocused ? "#94D1B5" : "#fff"}
              />
              <Text
                style={{
                  fontSize: 11,
                  color: isFocused ? "#94D1B5" : "#fff",
                  marginTop: 2,
                  fontWeight: "500",
                }}>
                {tabInfo.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
