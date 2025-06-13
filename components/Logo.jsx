import { Image, View } from "react-native";

export default function Logo({
  containerClassName = "",
  imageClassName = "",
  style = {},
  imageStyle = {},
}) {
  return (
    <View className={`items-center mb-4 ${containerClassName}`} style={style}>
      <Image
        source={require("../assets/sadar.png")}
        className={`w-36 h-36 rounded-full ${imageClassName}`}
        resizeMode="cover"
        style={{
          shadowColor: "#4CA771",
          shadowOpacity: 0.3,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 10 },
          elevation: 12,
          ...imageStyle,
        }}
      />
    </View>
  );
}
