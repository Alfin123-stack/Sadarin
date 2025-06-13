import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "../../components/ScreenHeader";
import { getBookmarks } from "../../scripts/storage";
import ArticleSkeleton from "../../components/article/ArticleSkeleton";
import ArticleCard from "../../components/article/ArticleCard";

export default function SavedScreen() {
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSavedArticles = async () => {
      try {
        const saved = await getBookmarks();
        setArticles(saved);
      } catch (error) {
        console.error("Failed to load bookmarks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedArticles();
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#EAF9E7" }}
      edges={["bottom"]}>
      <ScrollView
        className="flex-1 bg-[#EAF9E7] px-6 pt-14"
        contentContainerStyle={{ paddingBottom: 40 }}>
        <ScreenHeader title="Disimpan" className="mb-8" />

        {isLoading ? (
          [...Array(4)].map((_, index) => <ArticleSkeleton key={index} />)
        ) : articles.length === 0 ? (
          <Text className="text-[#4CA771] font-pregular text-base text-center mt-10">
            Belum ada artikel yang disimpan.
          </Text>
        ) : (
          articles.map((article, index) => (
            <ArticleCard
              key={index}
              article={article}
              onPress={() =>
                router.push({
                  pathname: `/article/${article.id}`,
                  params: { article: JSON.stringify(article) },
                })
              }
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
