import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import {
  DeviceEventEmitter,
  Dimensions,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { auth } from "../firebaseConfig"; // Sesuaikan path
import DetailedMoodChartModal from "./DetailedMoodChartModal"; // Sesuaikan path jika perlu

const screenWidth = Dimensions.get("window").width;

const getLast7Days = () => {
  const labels = [];
  const dates = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const label = date.toLocaleDateString("id-ID", { weekday: "short" }); // Sen, Sel, ...
    const dateStr = date.toISOString().split("T")[0]; // YYYY-MM-DD
    labels.push(label);
    dates.push(dateStr);
  }

  return { labels, dates };
};

export default function SimpleMoodChart() {
  const [moodData, setMoodData] = useState(Array(7).fill(0));
  const [labels, setLabels] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  const loadMoodData = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const uid = user.uid;
    const moodDataKey = `moodData-${uid}`;
    const { labels, dates } = getLast7Days();

    try {
      const stored = await AsyncStorage.getItem(moodDataKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        const moodValues = dates.map((date) => parsed[date] ?? 0);
        setMoodData(moodValues);
      } else {
        setMoodData(Array(7).fill(0));
      }
      setLabels(labels);
    } catch (e) {
      console.error("Gagal memuat data mood:", e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadMoodData();
    }, [])
  );

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(
      "moodUpdated",
      loadMoodData
    );
    return () => subscription.remove();
  }, []);

  return (
    <View className="bg-white rounded-2xl px-4 py-5 overflow-hidden">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-[#013237] font-psemibold text-base">
          Ringkasan Mood
        </Text>
        <TouchableOpacity onPress={() => setShowDetails(true)}>
          <Text className="text-[#4CA771] font-pbold text-sm">
            Lihat Detail →
          </Text>
        </TouchableOpacity>
      </View>

      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: moodData,
              color: () => "#4CA771",
              strokeWidth: 2,
            },
          ],
        }}
        fromZero
        width={screenWidth - 70}
        height={180}
        chartConfig={{
          backgroundGradientFrom: "#F4FDF1",
          backgroundGradientTo: "#F4FDF1",
          decimalPlaces: 0,
          color: () => "#4CA771",
          labelColor: () => "#013237",
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#ffffff",
            fill: "#4CA771",
          },
          propsForLabels: {
            fontSize: 10,
            fontWeight: "600",
          },
        }}
        bezier
        style={{ borderRadius: 12 }}
        contentInset={{ left: 12, right: 12 }}
      />

      <Modal visible={showDetails} animationType="slide" transparent>
        <View className="flex-1 bg-black/40 justify-center items-center px-4">
          <View className="bg-white p-4 rounded-2xl w-full max-h-[90%]">
            <DetailedMoodChartModal onClose={() => setShowDetails(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
