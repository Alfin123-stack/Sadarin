import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ArticleContent from "../../components/ArticleContent";
import ArticleHeader from "../../components/ArticleHeader";
import Toast from "../../components/Toast";
import { getBookmarks, toggleBookmark } from "../../scripts/storage";

export default function ArticleDetailScreen() {
  const { article: articleString } = useLocalSearchParams();
  const router = useRouter();
  const [bookmarked, setBookmarked] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  let article = null;
  try {
    article = JSON.parse(articleString);
  } catch (error) {
    console.error("Failed to parse article:", error);
  }

  // Cek apakah artikel sudah di-bookmark
  useEffect(() => {
    const checkBookmark = async () => {
      if (!article) return;
      const saved = await getBookmarks();
      const found = saved.some((a) => a.url === article.url);
      setBookmarked(found);
    };
    checkBookmark();
  }, [article]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  const handleBookmark = async () => {
    const nowBookmarked = await toggleBookmark(article);
    setBookmarked(nowBookmarked);
    showToast(
      nowBookmarked ? "Ditambahkan ke bookmark" : "Dihapus dari bookmark"
    );
  };

  if (!article) {
    return (
      <View style={styles.center}>
        <Text style={{ fontFamily: "Poppins-Regular" }}>Article not found</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <ArticleHeader
          article={article}
          bookmarked={bookmarked}
          onBackPress={() => router.back()}
          onBookmarkPress={handleBookmark}
        />
        <ArticleContent article={article} content={article.content} />
      </ScrollView>

      <Toast
        message={toastMessage}
        visible={toastVisible}
        onHide={() => setToastVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#EAF9E7" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
