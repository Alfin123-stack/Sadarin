import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ArticleCard from "../components/ArticleCard";
import ArticleSkeleton from "../components/ArticleSkeleton";
import ScreenHeader from "../components/ScreenHeader";

const API_KEY = "baedddc397ecf7a063d423654167ab07";
const QUERY = "mental health OR gambling";
const ENDPOINT = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
  QUERY
)}&lang=en&token=${API_KEY}&max=10`;

export default function ArticleScreen() {
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(ENDPOINT);
        const data = await response.json();

        const formattedArticles = data.articles.map((item, index) => ({
          id: index,
          title: item.title,
          source: item.source.name,
          date: new Date(item.publishedAt).toDateString(),
          image: { uri: item.image },
          url: item.url,
          content: item.content, // ← ini yang penting
        }));

        setArticles(formattedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

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
                    params: { article: JSON.stringify(article) }, // passing full data
                  })
                }
              />
            ))}
      </ScrollView>
    </SafeAreaView>
  );
}
