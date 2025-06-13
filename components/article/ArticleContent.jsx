import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ArticleContent({ content, article }) {
  const router = useRouter();
  const hasTruncated = /\[\d+ chars\]$/.test(content);
  const displayContent = hasTruncated
    ? content.replace(/\s?\[\d+ chars\]$/, "")
    : content;

  return (
    <View style={styles.content}>
      <View style={styles.metaRow}>
        <Ionicons name="newspaper-outline" size={18} color="#4CA771" />
        <Text style={styles.metaText}>{article.source}</Text>
      </View>

      <Text style={styles.body}>{displayContent}</Text>

      {hasTruncated && (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/article/webview",
              params: { article: JSON.stringify(article) },
            })
          }>
          <Text style={styles.readMore}>Read full article</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    padding: 24,
    backgroundColor: "#FFFFFF",
    marginTop: -20,
    minHeight: 500,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 4,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  metaText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#4CA771",
    fontFamily: "Poppins-Regular",
  },
  body: {
    fontSize: 16,
    lineHeight: 26,
    color: "#013237",
    fontFamily: "Poppins-Regular",
  },
  readMore: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#4CA771",
    textDecorationLine: "underline",
  },
});
