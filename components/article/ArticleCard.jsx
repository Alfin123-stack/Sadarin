import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Image, Text, TouchableOpacity, View } from "react-native";

// Fungsi untuk validasi URL
function isValidHttpUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
}

// Fallback image lokal jika URL rusak
const fallbackImage = require("../../assets/onboarding2.jpg");

export default function ArticleCard({ article, onPress }) {
const formattedDate =
  article.publishedAt || article.date
    ? format(new Date(article.publishedAt || article.date), "dd MMMM yyyy", {
        locale: id,
      })
    : "";


  const imageUrl = article.image?.uri || article.image;
  const validImage = isValidHttpUrl(imageUrl);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="flex-row bg-white rounded-2xl mb-4 p-4"
      style={{
        shadowColor: "#4CA771",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
      }}>
      {/* Text */}
      <View className="flex-1 pr-3 justify-center">
        <Text className="text-[#013237] text-sm font-psemibold mb-1">
          {article.source?.name || article.source}
        </Text>
        <Text
          className="text-[#013237] font-pregular text-base mb-1"
          numberOfLines={2}
          ellipsizeMode="tail">
          {article.title}
        </Text>

        <Text className="text-[#4CA771] text-xs font-pregular">
          {formattedDate}
        </Text>
      </View>

      {/* Image */}
      <Image
        source={validImage ? { uri: imageUrl } : fallbackImage}
        style={{
          width: 80,
          height: 80,
          borderRadius: 12,
          backgroundColor: "#D1D5DB",
        }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
}
