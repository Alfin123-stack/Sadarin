import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import Spinner from "../../components/Spinner"; // pastikan path sesuai

export default function WebViewScreen() {
  const { article: articleString } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  let article = null;

  try {
    article = JSON.parse(articleString);
  } catch (error) {
    console.error("Failed to parse article:", error);
  }

  if (!article || !article.url) {
    return (
      <View style={styles.center}>
        <Text style={{ fontFamily: "Poppins-Regular" }}>Article not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: article.url }}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        style={styles.webview}
      />

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <Spinner />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  webview: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});
