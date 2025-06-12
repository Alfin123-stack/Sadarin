import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Image, StyleSheet, Text, View } from "react-native";
import ImageHeader from "./ImageHeader";

export default function ArticleHeader({
  article,
  bookmarked,
  onBackPress,
  onBookmarkPress,
}) {
  const formattedDate =
    article.publishedAt || article.date
      ? format(new Date(article.publishedAt || article.date), "dd MMMM yyyy", {
          locale: id,
        })
      : "";

  return (
    <ImageHeader
      imageSource={article.image}
      useImageBackground={false}
      showBackButton={true}
      onBackPress={onBackPress}
      showBookmarkButton={true}
      bookmarked={bookmarked}
      onBookmarkPress={onBookmarkPress}
      imageStyle={{ height: 400 }}>
      <View style={styles.headerText}>
        <Text style={styles.headerDate}>{formattedDate}</Text>
        <Text style={styles.headerTitle}>{article.title}</Text>
        <View style={styles.authorRow}>
          <Image source={article.image} style={styles.avatar} />
          <Text style={styles.authorName}>{article.author}</Text>
        </View>
      </View>
    </ImageHeader>
  );
}

const styles = StyleSheet.create({
  headerText: {
    position: "absolute",
    paddingBottom: 20,
    bottom: 20,
    left: 20,
    right: 20,
  },
  headerDate: {
    color: "#C0E6BA",
    fontSize: 12,
    marginBottom: 4,
    fontFamily: "Poppins-Regular",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    marginBottom: 8,
  },
  authorRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
    backgroundColor: "#ccc",
  },
  authorName: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
  },
});
