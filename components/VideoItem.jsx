import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get("window");

function VideoItem({ item, index, currentIndex }) {
  const player = useVideoPlayer(item.uri, (p) => {
    p.loop = true;
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  useEffect(() => {
    if (index === currentIndex) {
      player.play();
    } else {
      player.pause();
    }
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      {/* Video */}
      <VideoView
        player={player}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        allowsFullscreen
        allowsPictureInPicture
      />

      {/* Overlay teks */}
      <View style={styles.overlay}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.caption} numberOfLines={3}>
          {item.caption}
        </Text>
        <Text style={styles.hashtags}>{item.hashtags?.join(" ")}</Text>

        {/* Tambahan Credit */}
        {item.credit && (
          <Text style={styles.credit} numberOfLines={2}>
            {item.credit}
          </Text>
        )}
      </View>
    </View>
  );
}

export default React.memo(VideoItem);

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: "#000",
    justifyContent: "flex-end",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.45)",
    padding: 16,
    borderRadius: 16,
    margin: 20,
  },
  title: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  caption: {
    color: "#DDDDDD",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
  hashtags: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "500",
    color: "#B6F7C3",
  },
  credit: {
    marginTop: 8,
    fontSize: 12,
    fontStyle: "italic",
    color: "#BDBDBD",
  },
});
