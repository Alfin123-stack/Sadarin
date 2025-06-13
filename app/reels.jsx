import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, useWindowDimensions, View } from "react-native";
import VideoItem from "../components/reels/VideoItem";
import reels from "../constants/reels";


export default function ReelsScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const { height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      {/* Tombol kembali */}
      <View style={styles.backButton}>
        <Ionicons
          name="arrow-back"
          size={26}
          color="#fff"
          onPress={() => router.back()}
        />
      </View>

      <FlatList
        data={reels}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
        getItemLayout={(data, index) => ({
          length: height,
          offset: height * index,
          index,
        })}
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        windowSize={3}
        removeClippedSubviews
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.y / height);
          setCurrentIndex(index);
        }}
        renderItem={({ item, index }) => (
          <VideoItem item={item} index={index} currentIndex={currentIndex} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 999,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 8,
    borderRadius: 999,
  },
});
