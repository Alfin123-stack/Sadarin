import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { auth } from "../firebaseConfig"; // Sesuaikan path jika perlu

const screenWidth = Dimensions.get("window").width;

const moodLabels = ["", "Marah", "Sedih", "Netral", "Baik", "Bahagia"];
const moodEmojis = ["", "😡", "😔", "😐", "🙂", "😄"];

const getLast7Days = () => {
  const labels = [];
  const dates = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const label = date.toLocaleDateString("id-ID", { weekday: "short" }); // Sen, Sel, dst.
    const dateStr = date.toISOString().split("T")[0]; // Format YYYY-MM-DD
    labels.push(label);
    dates.push(dateStr);
  }

  return { labels, dates };
};

export default function MoodChart({ onClose }) {
  const [moodData, setMoodData] = useState(Array(7).fill(0));
  const [dayLabels, setDayLabels] = useState([]);
  const [averageMood, setAverageMood] = useState(0);

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
        setDayLabels(labels);

        const validMoods = moodValues.filter((val) => val > 0);
        const avg =
          validMoods.length > 0
            ? validMoods.reduce((sum, val) => sum + val, 0) / validMoods.length
            : 0;
        setAverageMood(avg);
      } else {
        setMoodData(Array(7).fill(0));
        setDayLabels(labels);
        setAverageMood(0);
      }
    } catch (e) {
      console.error("Gagal memuat data mood:", e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadMoodData();
    }, [])
  );

  let insight = "Mood kamu stabil minggu ini.";
  if (averageMood >= 4) insight = "Kamu tampak ceria minggu ini, pertahankan!";
  else if (averageMood <= 2)
    insight = "Minggu ini agak berat ya. Nggak apa-apa, kamu kuat 💪";

  return (
    <View className="bg-white rounded-2xl px-4 py-5">
      {/* Tombol Tutup */}
      <View className="flex-row justify-end mb-2">
        <TouchableOpacity onPress={onClose}>
          <Text className="text-red-500 font-psemibold text-sm">Tutup</Text>
        </TouchableOpacity>
      </View>

      {/* Header dan Rata-rata */}
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-[#013237] font-psemibold text-base">
          Mood Mingguan
        </Text>
        <Text className="text-[#4CA771] font-pbold text-sm">
          Rata-rata: {averageMood.toFixed(1)} (
          {moodLabels[Math.round(averageMood)] || "Belum diisi"})
        </Text>
      </View>

      {/* Insight */}
      <Text className="text-[#4CA771] italic text-xs mb-6">{insight}</Text>

      {/* Grafik */}
      <LineChart
        data={{
          labels: dayLabels,
          datasets: [
            {
              data: moodData,
              color: () => "#4CA771",
              strokeWidth: 2,
            },
          ],
        }}
        fromZero
        yAxisInterval={1}
        segments={5}
        yLabelsOffset={10}
        width={screenWidth - 80}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#F4FDF1",
          backgroundGradientTo: "#F4FDF1",
          decimalPlaces: 0,
          color: () => "#4CA771",
          labelColor: () => "#013237",
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffffff",
            fill: "#4CA771",
          },
          propsForLabels: {
            fontSize: 12,
            fontWeight: "600",
          },
        }}
        bezier
        style={{ borderRadius: 16 }}
        contentInset={{ left: 12, right: 12 }}
        renderDotContent={({ x, y, index }) =>
          moodData[index] > 0 ? (
            <View
              key={index}
              style={{
                position: "absolute",
                top: y - 26,
                left: x - 10,
                backgroundColor: "#4CA771",
                paddingHorizontal: 5,
                paddingVertical: 2,
                borderRadius: 6,
              }}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 10,
                  fontWeight: "bold",
                }}>
                {moodEmojis[moodData[index]]}
              </Text>
            </View>
          ) : null
        }
      />

      {/* Skala Mood */}
      <View className="mt-6 space-y-2">
        <Text className="text-[#013237] font-psemibold text-sm mb-1">
          Skala Mood
        </Text>
        {[5, 4, 3, 2, 1].map((val) => (
          <Text key={val} className="text-[#4CA771] text-xs font-pregular">
            {val} = {moodLabels[val]} {moodEmojis[val]}
          </Text>
        ))}
      </View>
    </View>
  );
}
