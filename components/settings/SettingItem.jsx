import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export default function SettingItem({ icon, label, onPress }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 1,
      }}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        {icon}
        <Text style={{ color: "#013237", fontFamily: "Poppins-Regular" }}>
          {label}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#4CA771" />
    </TouchableOpacity>
  );
}
