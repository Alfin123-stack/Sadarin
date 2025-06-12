import { useEffect, useState } from "react";
import { Text, View } from "react-native";

// Array kumpulan kata motivasi
const motivationalQuotes = [
  {
    title: "Hari ini adalah awal yang baru.",
    subtitle: "Kamu tidak harus sempurna, cukup terus mencoba.",
  },
  {
    title: "Kamu tidak sendiri.",
    subtitle: "Selalu ada jalan keluar, dan bantuan selalu tersedia.",
  },
  {
    title: "Langkah kecil tetaplah sebuah kemajuan.",
    subtitle: "Fokus pada proses, bukan kesempurnaan.",
  },
  {
    title: "Pilih dirimu, bukan jebakan judi.",
    subtitle: "Kesehatan mentalmu lebih penting dari semuanya.",
  },
  {
    title: "Istirahat bukan berarti menyerah.",
    subtitle: "Kadang, berhenti sejenak adalah bentuk kekuatan.",
  },
  {
    title: "Waktu sulit tidak berlangsung selamanya.",
    subtitle: "Kamu sudah melewati banyak hal, terus bertahan.",
  },
  {
    title: "Kamu pantas untuk hidup yang tenang.",
    subtitle: "Jauhkan diri dari hal yang merusak, termasuk judi online.",
  },
];

export default function MotivationalCard() {
  const [quote, setQuote] = useState(motivationalQuotes[0]);

  useEffect(() => {
    // Menampilkan motivasi secara acak setiap kali komponen dimuat
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[randomIndex]);

    // ✅ Jika ingin motivasi berubah setiap hari (bukan acak),
    // kamu bisa pakai kode berikut sebagai pengganti:
    // const dayIndex = new Date().getDay() % motivationalQuotes.length;
    // setQuote(motivationalQuotes[dayIndex]);
  }, []);

  return (
    <View className="bg-[#4CA771] rounded-2xl p-5 mb-6 shadow-md">
      <Text className="text-white text-lg font-pbold mb-2">
        &quot;{quote.title}&quot;
      </Text>
      <Text className="text-white text-sm font-pregular">{quote.subtitle}</Text>
    </View>
  );
}
