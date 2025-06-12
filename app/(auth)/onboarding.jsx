import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OnboardingData from "../../constants/onboardingData";

import DotIndicator from "../../components/DotIndicator";
import OnboardingCard from "../../components/OnboardingCard";
import PrimaryButton from "../../components/PrimaryButton";

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    slideAnim.setValue(50);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentIndex, fadeAnim, slideAnim]);

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < OnboardingData.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.push("/(auth)/signin");
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#EAF9E7" }}
      edges={["bottom"]}>
      <View className="flex-1" style={{ backgroundColor: "#EAF9E7" }}>
        <FlatList
          data={OnboardingData}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={flatListRef}
          scrollEventThrottle={16}
          onScroll={handleScroll}
          renderItem={({ item }) => (
            <OnboardingCard
              item={item}
              fadeAnim={fadeAnim}
              slideAnim={slideAnim}
            />
          )}
        />

        {/* Dot Indicator */}
        <DotIndicator
          total={OnboardingData.length}
          currentIndex={currentIndex}
        />

        {/* CTA Button */}
        <View className="px-8 pb-10">
          <PrimaryButton
            title={
              currentIndex === OnboardingData.length - 1
                ? "Masuk & Mulai Sadarin"
                : "Selanjutnya"
            }
            onPress={handleNext}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
