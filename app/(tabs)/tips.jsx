import { useEffect, useRef, useState } from "react";
import { Animated, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AnimatedTipContent from "../../components/AnimatedTipContent";
import PrimaryButton from "../../components/PrimaryButton";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import tips from "../../constants/tips";

export default function TipScreen() {
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const nextTip = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 30,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIndex((prev) => (prev + 1) % tips.length);
      translateY.setValue(-30);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const currentTip = tips[index];

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#EAF9E7" }}
      edges={["bottom"]}>
      <View
        className="flex-1 px-6 pt-14"
        style={{ backgroundColor: "#EAF9E7" }}>
        <ScreenHeader
          onBack="/(tabs)/home"
          title="Tips Harian"
          iconColor="#4CA771"
          bgColor="#FFFFFF"
          className="mb-8"
        />

        {isLoading ? (
          <Spinner />
        ) : (
          <AnimatedTipContent
            fadeAnim={fadeAnim}
            translateY={translateY}
            tip={currentTip}
            image={currentTip.image}
          />
        )}

        <PrimaryButton
          title="Lihat tips lainnya"
          onPress={nextTip}
          containerClassName="mx-6 mb-10"
          textClassName="text-white text-base font-psemibold"
        />
      </View>
    </SafeAreaView>
  );
}
