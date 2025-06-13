import { useEffect, useState } from "react";

const API_KEY = "baedddc397ecf7a063d423654167ab07";
const QUERY = "mental health OR gambling";
const ENDPOINT = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
  QUERY
)}&lang=en&token=${API_KEY}&max=10`;

export default function useArticles() {
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
          content: item.content,
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

  return { articles, isLoading };
}
