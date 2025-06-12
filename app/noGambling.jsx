import { Dimensions, ScrollView, Text, View } from "react-native";
import ImageHeader from "../components/ImageHeader";
import NoGamblingQuote from "../components/NoGamblingQuote";
import ScreenHeader from "../components/ScreenHeader";
import TestimonialCard from "../components/TestimonialCard";

const testimonials = [
  {
    name: "M. F. P.",
    quote:
      "Saya pemain judi online. Karena judi, saya hancur hingga tidak memiliki apa pun lagi.",
  },
  {
    name: "N. A.",
    quote:
      "Judi itu menipu. Jangan terlena karena bisa menghancurkan hidup kita.",
  },
  {
    name: "R. H.",
    quote:
      "Awalnya hanya iseng, akhirnya kecanduan. Sekarang saya harus mulai dari nol.",
  },
];

export default function NoGamblingScreen() {
  const screenWidth = Dimensions.get("window").width;

  return (
    <ScrollView className="flex-1 bg-[#03282B]">
      {/* Banner */}
      <ImageHeader
        imageSource={require("../assets/no-gambling-1.png")}
        useImageBackground={true}
        overlayColor={"#00000040"}
        backButtonComponent={
          <ScreenHeader
            showTitle={false}
            iconColor="#013237"
            bgColor="#FFFFFFB0"
            shadow={false}
          />
        }
        containerStyle={{
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          overflow: "hidden",
        }}
        imageStyle={{
          height: 256,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}
      />

      {/* Kutipan motivasi */}
      <NoGamblingQuote />

      {/* Section: Testimoni */}
      <View className="px-5 mt-6 mb-10">
        <Text
          className="text-white text-lg font-semibold mb-3"
          style={{ fontFamily: "Poppins-SemiBold" }}>
          Cerita Nyata dari Mereka
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}>
          {testimonials.map((item, index) => (
            <TestimonialCard
              key={index}
              name={item.name}
              quote={item.quote}
              width={screenWidth * 0.8}
            />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}
