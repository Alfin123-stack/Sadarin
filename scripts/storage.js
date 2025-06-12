import AsyncStorage from "@react-native-async-storage/async-storage";

const BOOKMARKS_KEY = "BOOKMARKED_ARTICLES";

export const getBookmarks = async () => {
  const json = await AsyncStorage.getItem(BOOKMARKS_KEY);
  return json ? JSON.parse(json) : [];
};

export const saveBookmarks = async (articles) => {
  await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(articles));
};

export const toggleBookmark = async (article) => {
  const bookmarks = await getBookmarks();
  const exists = bookmarks.some((a) => a.url === article.url); // gunakan url sebagai id unik
  let newBookmarks;

  if (exists) {
    newBookmarks = bookmarks.filter((a) => a.url !== article.url);
  } else {
    newBookmarks = [article, ...bookmarks];
  }

  await saveBookmarks(newBookmarks);
  return !exists; // return status sekarang (bookmarked atau tidak)
};
