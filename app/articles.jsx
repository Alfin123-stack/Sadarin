import { useRouter } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useArticles from "../hooks/useArticles";
import ArticleCard from "../components/article/ArticleCard";
import ArticleSkeleton from "../components/article/ArticleSkeleton";
import ScreenHeader from "../components/ScreenHeader";

export default function ArticleScreen() {
  const router = useRouter();
  const { articles, isLoading } = useArticles();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#EAF9E7" }}
      edges={["bottom"]}>
      <ScrollView
        className="flex-1 bg-[#EAF9E7] px-6 pt-14"
        contentContainerStyle={{ paddingBottom: 40 }}>
        <ScreenHeader title="Artikel" className="mb-8" />

        {isLoading
          ? [...Array(10)].map((_, index) => <ArticleSkeleton key={index} />)
          : articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onPress={() =>
                  router.push({
                    pathname: `/article/${article.id}`,
                    params: { article: JSON.stringify(article) },
                  })
                }
              />
            ))}
      </ScrollView>
    </SafeAreaView>
  );
}
