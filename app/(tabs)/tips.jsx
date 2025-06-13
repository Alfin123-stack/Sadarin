import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AnimatedTipContent from "../../components/tips/AnimatedTipContent";
import PrimaryButton from "../../components/PrimaryButton";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import tips from "../../constants/tips";
import useTips from "../../hooks/useTips";

export default function TipScreen() {
  const { isLoading, currentTip, fadeAnim, translateY, nextTip } =
    useTips(tips); // gunakan hook di sini

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
