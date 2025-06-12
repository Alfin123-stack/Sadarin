import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const ImageHeader = ({
  imageSource,
  useImageBackground = true,
  overlayColor = "rgba(0,0,0,0.8)",
  showBackButton = false,
  onBackPress = () => {},
  showBookmarkButton = false,
  bookmarked = false,
  onBookmarkPress = () => {},
  backIconColor = "#4CA771",
  bookmarkIconColor = "#4CA771",
  containerStyle,
  imageStyle,
  backButtonStyle,
  bookmarkButtonStyle,
  children,
  // tambahan:
  backButtonComponent, // jika mau custom back button (misal ScreenHeader)
  overlayOpacity, // optional ganti opacity overlay
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {useImageBackground ? (
        <ImageBackground
          source={imageSource}
          style={[styles.image, imageStyle]}
          resizeMode="cover">
          {/* Overlay */}
          {overlayColor && (
            <View
              style={[
                styles.overlay,
                {
                  backgroundColor: overlayColor,
                  opacity: overlayOpacity ?? 0.4,
                  borderBottomLeftRadius:
                    imageStyle?.borderBottomLeftRadius || 24,
                  borderBottomRightRadius:
                    imageStyle?.borderBottomRightRadius || 24,
                },
              ]}
            />
          )}

          {/* Custom back button component jika ada */}
          {backButtonComponent ? (
            <View style={[styles.backButton, backButtonStyle]}>
              {backButtonComponent}
            </View>
          ) : (
            showBackButton && (
              <TouchableOpacity
                style={[styles.backButton, backButtonStyle]}
                onPress={onBackPress}>
                <Ionicons name="arrow-back" size={24} color={backIconColor} />
              </TouchableOpacity>
            )
          )}

          {/* Bookmark */}
          {showBookmarkButton && (
            <TouchableOpacity
              style={[styles.bookmarkButton, bookmarkButtonStyle]}
              onPress={onBookmarkPress}>
              <Ionicons
                name={bookmarked ? "bookmark" : "bookmark-outline"}
                size={24}
                color={bookmarkIconColor}
              />
            </TouchableOpacity>
          )}

          {/* Children bebas */}
          {children}
        </ImageBackground>
      ) : (
        <View>
          <Image source={imageSource} style={[styles.image, imageStyle]} />

          {/* Overlay */}
          {overlayColor && (
            <View
              style={[
                styles.overlay,
                {
                  backgroundColor: overlayColor,
                  opacity: overlayOpacity ?? 0.4,
                  borderBottomLeftRadius:
                    imageStyle?.borderBottomLeftRadius || 24,
                  borderBottomRightRadius:
                    imageStyle?.borderBottomRightRadius || 24,
                },
              ]}
            />
          )}

          {/* Back button */}
          {showBackButton && (
            <TouchableOpacity
              style={[styles.backButton, backButtonStyle]}
              onPress={onBackPress}>
              <Ionicons name="arrow-back" size={24} color={backIconColor} />
            </TouchableOpacity>
          )}

          {/* Bookmark */}
          {showBookmarkButton && (
            <TouchableOpacity
              style={[styles.bookmarkButton, bookmarkButtonStyle]}
              onPress={onBookmarkPress}>
              <Ionicons
                name={bookmarked ? "bookmark" : "bookmark-outline"}
                size={24}
                color={bookmarkIconColor}
              />
            </TouchableOpacity>
          )}

          {/* Children */}
          {children}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#EAF9E7",
  },
  image: {
    width: "100%",
    height: 400,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#FFFFFF",
    padding: 8,
    borderRadius: 999,
    zIndex: 10,
  },
  bookmarkButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 20,
    zIndex: 10,
  },
});

export default ImageHeader;
