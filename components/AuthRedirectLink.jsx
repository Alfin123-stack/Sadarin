import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function AuthRedirectLink({
  text = "Already have an account?",
  linkText = "Sign In",
  to = "/(auth)/signin",
  containerClassName = "",
  textClassName = "",
  linkClassName = "",
  color = "#4CA771",
}) {
  const router = useRouter();

  return (
    <View className={`mt-4 items-center ${containerClassName}`}>
      <View className="flex-row">
        <Text
          className={`text-base font-pregular ${textClassName}`}
          style={{ color }}>
          {text}
        </Text>
        <TouchableOpacity onPress={() => router.push(to)}>
          <Text
            className={`text-base font-psemibold underline ml-1 ${linkClassName}`}
            style={{ color }}>
            {linkText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
