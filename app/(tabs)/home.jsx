import { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import DailyTips from "@/components/home/DailyTips";
import FeatureButtons from "@/components/home/FeatureButtons";
import GamblingWarningBanner from "@/components/home/GamblingWarningBanner";
import GamblingWarningModal from "@/components/home/GamblingWarningModal";
import GreetingHeader from "@/components/home/GreetingHeader";
import MoodCheck from "@/components/home/MoodCheck";
import MotivationalCard from "@/components/home/MotivationalCard";
import SelectedContents from "@/components/home/SelectedContents";
import SimpleMoodChart from "@/components/home/SimpleMoodChart";
import HomeSkeleton from "../../components/home/HomeSkeleton";
import { contents, tips } from "../../constants/relaxationTips";

export default function HomeScreen() {
  const [showWarning, setShowWarning] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    if (!showWarning) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showWarning]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#EAF9E7" }}
      edges={["bottom"]}>
      {showWarning ? (
        <>
          <GamblingWarningModal onClose={() => setShowWarning(false)} />
          <HomeSkeleton />
        </>
      ) : isLoading ? (
        <HomeSkeleton />
      ) : (
        <ScrollView
          className="flex-1 bg-[#EAF9E7] px-6 pt-14 pb-6"
          contentContainerStyle={{ paddingBottom: 100 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#4CA771"]}
              tintColor="#4CA771"
            />
          }>
          <GreetingHeader />
          <GamblingWarningBanner />
          <MotivationalCard />
          <MoodCheck />
          <View className="mb-2">
            <FeatureButtons />
          </View>
          <SelectedContents contents={contents} />
          <DailyTips tips={tips} />
          <SimpleMoodChart />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
