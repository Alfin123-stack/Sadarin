import { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import DailyTips from "@/components/DailyTips";
import FeatureButtons from "@/components/FeatureButtons";
import GamblingWarningBanner from "@/components/GamblingWarningBanner";
import GamblingWarningModal from "@/components/GamblingWarningModal";
import GreetingHeader from "@/components/GreetingHeader";
import MoodCheck from "@/components/MoodCheck";
import MotivationalCard from "@/components/MotivationalCard";
import SelectedContents from "@/components/SelectedContents";
import SimpleMoodChart from "@/components/SimpleMoodChart";
import HomeSkeleton from "../../components/HomeSkeleton";

export default function HomeScreen() {
  const [showWarning, setShowWarning] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const contents = [
    {
      title: "Tarik Napas Dulu",
      description:
        "Gunakan teknik 4-7-8 untuk bantu tenangin pikiran saat lagi cemas.",
      image: {
        uri: "https://res.cloudinary.com/damvrr929/image/upload/v1749488151/meditasi_cifqsn.jpg",
      },
    },
    {
      title: "Tulis Hal Positif",
      description:
        "Catat 3 hal yang bikin kamu bersyukur hari ini, sekecil apapun itu.",
      image: {
        uri: "https://res.cloudinary.com/damvrr929/image/upload/v1749486085/journaling_h0ytlr.jpg",
      },
    },
    {
      title: "Stretching Ringan",
      description:
        "Lakuin peregangan 5 menit buat bantu tubuh dan pikiran lebih rileks.",
      image: {
        uri: "https://res.cloudinary.com/damvrr929/image/upload/v1749486640/yoga_duvjab.jpg",
      },
    },
  ];

  const tips = [
    "💡 Cobalah tarik napas dalam selama 1 menit.",
    "📓 Tulis satu hal yang kamu syukuri hari ini.",
    "🌳 Jalan kaki sebentar di luar bisa bantu suasana hati.",
    "🧘 Ambil 3 menit untuk duduk tenang dan atur napas.",
  ];

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
    // Simulasikan fetch ulang data di sini
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
