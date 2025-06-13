import { useState } from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { slides } from "../../constants/gamblingWarningData";


export default function GamblingWarningModal({ onClose }) {
  const [visible, setVisible] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      setVisible(false);
      onClose(); // Beri sinyal ke HomeScreen bahwa modal selesai
    }
  };

  const { image, title, description } = slides[currentSlide];

  // useEffect(() => {
  //   (async () => {
  //     const hasSeenModal = await AsyncStorage.getItem("hasSeenGamblingModal");
  //     if (!hasSeenModal) {
  //       setVisible(true);
  //       await AsyncStorage.setItem("hasSeenGamblingModal", "true");
  //     } else {
  //       setVisible(false);
  //     }
  //   })();
  // }, []);

  // Saat pertama kali buka dan juga 1 kali sehari
  // const lastShown = await AsyncStorage.getItem("lastShownModalDate");
  // const today = new Date().toDateString();

  // if (lastShown !== today) {
  //   setVisible(true);
  //   await AsyncStorage.setItem("lastShownModalDate", today);
  // }

  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View className="flex-1 justify-center items-center bg-black/50 px-6">
        <View className="bg-white rounded-3xl p-6 w-full max-w-md shadow-lg items-center">
          <Image
            source={image}
            className="w-full h-52 rounded-2xl mb-4"
            resizeMode="cover"
          />
          <Text className="text-[#B91C1C] font-pbold text-lg mb-2 text-center">
            {title}
          </Text>
          <Text className="text-[#4B1D1D] font-pregular text-sm mb-4 text-center">
            {description}
          </Text>

          {/* Dot indicators */}
          <View className="flex-row space-x-2 gap-2 mb-4">
            {slides.map((_, index) => (
              <View
                key={index}
                className={`w-2.5 h-2.5 rounded-full ${
                  index === currentSlide ? "bg-[#4CA771]" : "bg-gray-300"
                }`}
              />
            ))}
          </View>

          <TouchableOpacity
            onPress={handleNext}
            className="bg-[#4CA771] px-4 py-3 rounded-xl w-full">
            <Text className="text-white font-psemibold text-center">
              {currentSlide === slides.length - 1 ? "Got It" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
