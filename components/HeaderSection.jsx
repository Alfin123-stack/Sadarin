import { Text, View } from "react-native";

export default function HeaderSection({
  title,
  subtitle,
  containerClassName = "",
  titleClassName = "",
  subtitleClassName = "",
  titleStyle = {},
  subtitleStyle = {},
}) {
  return (
    <View className={`items-center ${containerClassName}`}>
      <Text
        className={`text-center font-psemibold text-[28px] mb-3 ${titleClassName}`}
        style={{
          color: "#013237",
          ...titleStyle,
        }}>
        {title}
      </Text>
      <Text
        className={`text-center font-pregular text-base leading-6 mb-8 ${subtitleClassName}`}
        style={{
          color: "#4C5B50",
          ...subtitleStyle,
        }}>
        {subtitle}
      </Text>
    </View>
  );
}
