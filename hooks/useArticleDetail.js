import { useEffect, useState } from "react";
import { getBookmarks, toggleBookmark } from "../scripts/storage";

export function useArticleDetail(article) {
  const [bookmarked, setBookmarked] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

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

  return {
    bookmarked,
    toastVisible,
    toastMessage,
    setToastVisible,
    handleBookmark,
  };
}
