import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { auth } from "../../firebaseConfig";
import StatusModal from "../home/StatusModal";


export default function LogoutButton() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const { setIsLoggingOut } = useAuth()

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true); // beri tahu layout bahwa kita akan logout
      await auth.signOut(); // auth berubah jadi null
      setModalVisible(true); // tampilkan modal sukses
    } catch (error) {
      setIsLoggingOut(false); // reset jika error
      console.error("Logout error:", error);
      Alert.alert("Gagal Logout", "Terjadi kesalahan saat logout.");
    }
  };

  const handleModalConfirm = () => {
    setModalVisible(false);
    setIsLoggingOut(false); // izinkan TabsLayout redirect di masa depan
    router.replace("/(auth)/signin");
  };

  return (
    <>
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
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 1 },
          shadowRadius: 2,
          elevation: 2,
        }}
        onPress={handleLogout}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Ionicons name="exit-outline" size={20} color="red" />
          <Text style={{ color: "red", fontFamily: "Poppins-SemiBold" }}>
            Keluar
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="red" />
      </TouchableOpacity>

      <StatusModal
        visible={modalVisible}
        onClose={() => {}}
        success={true}
        title="Berhasil Logout"
        message="Kamu telah keluar dari akunmu."
        buttonText="OK"
        onConfirm={handleModalConfirm}
      />
    </>
  );
}
