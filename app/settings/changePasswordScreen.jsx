import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

import { auth } from "../../firebaseConfig";
import StatusModal from "../../components/home/StatusModal";

export default function ChangePasswordScreen() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(true);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const showModal = ({ success, title, message }) => {
    setModalSuccess(success);
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return showModal({
        success: false,
        title: "Gagal",
        message: "Semua kolom harus diisi.",
      });
    }
    if (newPassword !== confirmPassword) {
      return showModal({
        success: false,
        title: "Gagal",
        message: "Konfirmasi sandi tidak cocok.",
      });
    }

    setIsSubmitting(true);

    try {
      const user = auth.currentUser;

      if (!user || !user.email) {
        throw new Error("Pengguna tidak ditemukan.");
      }

      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, newPassword);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      showModal({
        success: true,
        title: "Berhasil",
        message: "Kata sandi berhasil diperbarui.",
      });
    } catch (error) {
      let message = "Terjadi kesalahan. Silakan coba lagi.";

      if (error.code === "auth/wrong-password") {
        message = "Kata sandi lama salah.";
      } else if (error.code === "auth/weak-password") {
        message = "Kata sandi baru terlalu lemah. Gunakan minimal 6 karakter.";
      } else if (error.code === "auth/too-many-requests") {
        message = "Terlalu banyak percobaan. Silakan coba lagi nanti.";
      } else if (error.code === "auth/invalid-credential") {
        message =
          "Kredensial tidak valid atau kadaluarsa. Silakan login ulang.";
      }

      showModal({
        success: false,
        title: "Gagal",
        message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-[#EAF9E7] px-6 pt-14"
      contentContainerStyle={{ paddingBottom: 40 }}>
      <View className="flex-row items-center gap-4 mb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-white w-10 h-10 rounded-full items-center justify-center shadow-md">
          <Ionicons name="arrow-back" size={22} color="#4CA771" />
        </TouchableOpacity>
        <Text className="text-xl text-[#013237] font-psemibold">
          Ganti Kata Sandi
        </Text>
      </View>

      <View className="gap-5">
        <View>
          <Text className="text-[#013237] font-psemibold mb-1">
            Kata Sandi Saat Ini
          </Text>
          <TextInput
            placeholder="Masukkan sandi lama"
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
            editable={!isSubmitting}
            className="bg-white rounded-xl px-4 py-3 text-[#013237] font-pregular"
          />
        </View>

        <View>
          <Text className="text-[#013237] font-psemibold mb-1">
            Kata Sandi Baru
          </Text>
          <TextInput
            placeholder="Masukkan sandi baru"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
            editable={!isSubmitting}
            className="bg-white rounded-xl px-4 py-3 text-[#013237] font-pregular"
          />
        </View>

        <View>
          <Text className="text-[#013237] font-psemibold mb-1">
            Konfirmasi Kata Sandi Baru
          </Text>
          <TextInput
            placeholder="Ulangi sandi baru"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            editable={!isSubmitting}
            className="bg-white rounded-xl px-4 py-3 text-[#013237] font-pregular"
          />
        </View>

        <TouchableOpacity
          onPress={handleSave}
          disabled={isSubmitting}
          className={`${
            isSubmitting ? "bg-[#A5D6B5]" : "bg-[#4CA771]"
          } py-3 rounded-2xl items-center mt-6`}>
          <Text className="text-white font-psemibold text-base">
            {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
          </Text>
        </TouchableOpacity>
      </View>

      <StatusModal
        visible={modalVisible}
        success={modalSuccess}
        title={modalTitle}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
        onConfirm={() => {
          setModalVisible(false);
          if (modalSuccess) {
            router.back(); // kembali ke screen sebelumnya jika sukses
          }
        }}
      />
    </ScrollView>
  );
}
