// components/home/SelectedContents.tsx
import { Image, ScrollView, Text, View } from "react-native";

// const contents = [
//   {
//     title: "Teknik Pernapasan",
//     description: "Latihan pernapasan 4-7-8 untuk menenangkan pikiran.",
//     image: require("../../assets/onboarding1.jpg"),
//   },
//   {
//     title: "Jurnal Syukur",
//     description: "Tuliskan 3 hal yang kamu syukuri hari ini.",
//     image: require("../../assets/onboarding2.jpg"),
//   },
//   {
//     title: "Peregangan Ringan",
//     description: "Lakukan peregangan selama 5 menit untuk rileks.",
//     image: require("../../assets/onboarding3.jpg"),
//   },
// ];

export default function SelectedContents({contents}) {
  return (
    <>
      <Text className="text-[#013237] font-pbold text-lg mb-2">Konten Pilihan</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
        {contents.map((item, index) => (
          <View
            key={index}
            className="w-64 mr-4 bg-white rounded-2xl overflow-hidden shadow-md">
            <Image source={item.image} className="w-full h-44" resizeMode="cover" />
            <View className="p-4">
              <Text className="text-[#013237] font-pbold text-base mb-1">{item.title}</Text>
              <Text className="text-gray-600 text-sm font-pregular">{item.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </>
  );
}
