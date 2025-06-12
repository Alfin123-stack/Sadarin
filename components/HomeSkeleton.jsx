import React from "react";
import { ScrollView, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export default function HomeSkeleton() {
  const opacity = useSharedValue(1);

  React.useEffect(() => {
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
    <View className="flex-1 bg-[#EAF9E7] px-6 pt-14 pb-6">
      {/* Header Skeleton */}
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <SkeletonBox className="w-20 h-4 rounded-full mb-2" />
          <SkeletonBox className="w-32 h-5 rounded-full" />
        </View>
        <SkeletonBox className="w-10 h-10 rounded-full" />
      </View>

      {/* Warning Banner Skeleton */}
      <SkeletonBox className="w-full h-12 rounded-full mb-4" />

      {/* Motivational Card Skeleton */}
      <SkeletonBox className="w-full h-24 rounded-2xl mb-6" />

      {/* Mood Check Skeleton */}
      <SkeletonBox className="w-full h-28 rounded-2xl mb-6" />

      {/* Feature Buttons Skeleton */}
      <View className="flex-row flex-wrap justify-between mb-6">
        {[...Array(4)].map((_, index) => (
          <SkeletonBox key={index} className="w-[48%] h-20 rounded-2xl mb-4" />
        ))}
      </View>

      {/* Selected Contents Skeleton */}
      <SkeletonBox className="w-32 h-5 rounded-full mb-2" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[...Array(2)].map((_, index) => (
          <SkeletonBox key={index} className="w-64 h-60 rounded-2xl mr-4" />
        ))}
      </ScrollView>

      {/* Daily Tips Skeleton */}
      <View className="mt-6">
        <SkeletonBox className="w-40 h-5 rounded-full mb-4" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[...Array(2)].map((_, index) => (
            <SkeletonBox key={index} className="w-64 h-24 rounded-2xl mr-4" />
          ))}
        </ScrollView>
      </View>

      {/* Mood Chart Skeleton */}
      <SkeletonBox className="w-full h-52 rounded-2xl mt-6" />
    </View>
  );
}
