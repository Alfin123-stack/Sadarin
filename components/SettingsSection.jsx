import { Text, View } from "react-native";
export default function SettingsSection({ title, children }) {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text
        style={{
          color: "#013237",
          fontFamily: "Poppins-SemiBold",
          marginBottom: 8,
        }}>
        {title}
      </Text>
      <View style={{ gap: 12 }}>{children}</View>
    </View>
  );
}
