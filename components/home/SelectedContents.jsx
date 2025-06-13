// components/home/SelectedContents.tsx
import { Image, ScrollView, Text, View } from "react-native";


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
