import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const ArticleSkeleton = () => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.4, { duration: 700 }), -1, true);
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const SkeletonBox = ({ className }) => (
    <Animated.View
      className={`bg-gray-300 ${className}`}
      style={animatedStyle}
    />
  );

  return (
    <View
      className="flex-row bg-white rounded-2xl p-4 mb-4"
      style={{
        shadowColor: "#4CA771",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
      }}>
      {/* Text Placeholder */}
      <View className="flex-1 pr-3 justify-center">
        <SkeletonBox className="w-24 h-3 rounded-full mb-2" />
        <SkeletonBox className="w-40 h-4 rounded-full mb-2" />
        <SkeletonBox className="w-16 h-3 rounded-full" />
      </View>

      {/* Image Placeholder */}
      <SkeletonBox className="w-20 h-20 rounded-xl" />
    </View>
  );
};

export default ArticleSkeleton;
