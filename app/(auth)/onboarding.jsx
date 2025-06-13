import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, View } from "react-native";
import useOnboarding from "../../hooks/useOnboarding";

import DotIndicator from "../../components/DotIndicator";
import OnboardingCard from "../../components/OnboardingCard";
import PrimaryButton from "../../components/PrimaryButton";

export default function OnboardingScreen() {
  const {
    currentIndex,
    flatListRef,
    fadeAnim,
    slideAnim,
    handleScroll,
    handleNext,
    onboardingData,
  } = useOnboarding();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#EAF9E7" }}
      edges={["bottom"]}>
      <View className="flex-1" style={{ backgroundColor: "#EAF9E7" }}>
        <FlatList
          data={onboardingData}
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

        <DotIndicator
          total={onboardingData.length}
          currentIndex={currentIndex}
        />

        <View className="px-8 pb-10">
          <PrimaryButton
            title={
              currentIndex === onboardingData.length - 1
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
