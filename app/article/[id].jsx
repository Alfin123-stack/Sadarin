import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ArticleContent from "../../components/article/ArticleContent";
import ArticleHeader from "../../components/article/ArticleHeader";
import Toast from "../../components/Toast";
import { useArticleDetail } from "../../hooks/useArticleDetail";

export default function ArticleDetailScreen() {
  const { article: articleString } = useLocalSearchParams();
  const router = useRouter();

  let article = null;
  try {
    article = JSON.parse(articleString);
  } catch (error) {
    console.error("Failed to parse article:", error);
  }

  const {
    bookmarked,
    toastVisible,
    toastMessage,
    setToastVisible,
    handleBookmark,
  } = useArticleDetail(article);

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
