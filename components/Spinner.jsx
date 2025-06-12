import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";

export default function Spinner() {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spin = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spin.start();

    return () => spin.stop();
  }, [rotateAnim]);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginTop: 24 }}>
        <Text style={styles.icon}>🌿</Text>
        <Text style={styles.text}>Memuat, harap tunggu...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#EAF9E7",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  spinner: {
    width: 48,
    height: 48,
    borderWidth: 5,
    borderColor: "#4CA771",
    borderTopColor: "transparent",
    borderBottomColor: "#4CA771",
    borderRadius: 24,
  },
  icon: {
    fontSize: 48,
    color: "#4CA771",
  },
  text: {
    fontSize: 16,
    color: "#013237",
    fontWeight: "600",
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    marginTop: 8,
  },
});
