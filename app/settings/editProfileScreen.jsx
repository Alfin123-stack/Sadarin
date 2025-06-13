import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { updateEmail, updateProfile } from "firebase/auth";
import EditableField from "../../components/EditableField";
import PrimaryButton from "../../components/PrimaryButton";
import ProfileImageWithName from "../../components/profile/ProfileImageWithName";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import Toast from "../../components/Toast";
import { auth } from "../../firebaseConfig";

export default function EditProfileScreen() {
  const router = useRouter();

  const user = auth.currentUser;

  const [username, setUsername] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profileImage, setProfileImage] = useState(user?.photoURL || null);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Modal konfirmasi email update
  const [modalVisible, setModalVisible] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");

  useEffect(() => {
    // Refresh state saat user berubah
    setUsername(user?.displayName || "");
    setEmail(user?.email || "");
    setProfileImage(user?.photoURL || null);
  }, [user]);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Izin dibutuhkan", "Aplikasi membutuhkan akses ke galeri.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const localUri = result.assets[0].uri;
      setIsLoading(true); // ⏳ Tampilkan spinner
      try {
        const formData = new FormData();
        formData.append("file", {
          uri: localUri,
          type: "image/jpeg",
          name: "profile.jpg",
        });
        formData.append("upload_preset", "sadarin_app");
        formData.append("folder", "sadarin");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/damvrr929/image/upload",
          {
            method: "POST",
            body: formData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const data = await response.json();

        if (data.secure_url) {
          await updateProfile(user, { photoURL: data.secure_url });
          await user.reload();
          const updatedUser = auth.currentUser;
          setProfileImage(updatedUser?.photoURL || data.secure_url); // ✅ refresh image
          setToastMessage("Foto profil berhasil diperbarui.");
          setToastVisible(true);
        } else {
          throw new Error("Upload gagal");
        }
      } catch (error) {
        console.error("Upload gagal:", error);
        Alert.alert("Upload gagal", "Gagal mengunggah foto profil.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSave = async () => {
    setIsEditingName(false);
    setIsEditingEmail(false);

    if (!user) {
      Alert.alert("Error", "User tidak ditemukan.");
      return;
    }

    setIsLoading(true);

    try {
      // Update displayName jika berubah
      if (username !== user.displayName) {
        await updateProfile(user, { displayName: username });
      }

      // Update email jika berubah, tapi harus konfirmasi dulu lewat modal
      if (email !== user.email) {
        setPendingEmail(email);
        setModalVisible(true);
        setIsLoading(false);
        return;
      }

      setToastMessage("Perubahan berhasil disimpan.");
      setToastVisible(true);
    } catch (error) {
      Alert.alert("Error", error.message || "Gagal menyimpan perubahan.");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmEmailUpdate = async () => {
    setModalVisible(false);
    if (!user) return;

    setIsLoading(true);
    try {
      await updateEmail(user, pendingEmail);
      setToastMessage("Email berhasil diperbarui.");
      setToastVisible(true);
    } catch (error) {
      Alert.alert("Error", error.message || "Gagal memperbarui email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#EAF9E7" }}
      edges={["bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 24,
              paddingTop: 56,
              paddingBottom: 24,
            }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 32,
              }}>
              <ScreenHeader
                title="Sunting Profil"
                onBack="/settings/setting"
                iconColor="#4CA771"
                bgColor="#FFFFFF"
                shadow
              />
              <TouchableOpacity
                onPress={() => router.push("/settings/setting")}
                className="bg-white w-10 h-10 rounded-full items-center justify-center shadow-md">
                <Ionicons name="settings-outline" size={22} color="#4CA771" />
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <Spinner />
                </View>
              ) : (
                <ScrollView
                  keyboardShouldPersistTaps="handled"
                  style={{ flex: 1 }}>
                  <ProfileImageWithName
                    isEdit={true}
                    imageUri={
                      profileImage ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        username || "User"
                      )}&background=03282B&color=ffffff&size=512`
                    }
                    name={username}
                    onPickImage={pickImage}
                  />

                  <EditableField
                    title="Nama Pengguna"
                    value={username}
                    isEditing={isEditingName}
                    onChange={setUsername}
                    onEditToggle={() => setIsEditingName(!isEditingName)}
                    placeholder="Masukkan nama pengguna"
                  />

                  <EditableField
                    title="Email"
                    value={email}
                    isEditing={isEditingEmail}
                    onChange={setEmail}
                    onEditToggle={() => setIsEditingEmail(!isEditingEmail)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="Masukkan email"
                    containerStyle="mb-8"
                  />

                  <PrimaryButton
                    title="Simpan Perubahan"
                    onPress={handleSave}
                  />
                </ScrollView>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>

        <Toast
          visible={toastVisible}
          message={toastMessage}
          onHide={() => setToastVisible(false)}
          iconName="check-circle"
        />

        {/* Modal konfirmasi email */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
            style={styles.modalBackdrop}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Konfirmasi Email</Text>
              <Text style={styles.modalText}>
                Apakah Anda yakin ingin mengganti email menjadi{" "}
                <Text style={{ fontWeight: "bold" }}>{pendingEmail}</Text>?
              </Text>

              <View style={styles.modalButtons}>
                <PrimaryButton title="Ya, Ganti" onPress={confirmEmailUpdate} />
                <PrimaryButton
                  title="Batal"
                  onPress={() => setModalVisible(false)}
                  containerStyle={{ backgroundColor: "#ccc", marginTop: 8 }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#EAF9E7",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    width: "100%",
    maxWidth: 320,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#013237",
    fontFamily: "Poppins-Regular",
  },
  modalText: {
    fontSize: 15,
    marginBottom: 20,
    color: "#013237",
    fontFamily: "Poppins-Regular",
  },
  modalButtons: {
    flexDirection: "column",
    gap: 12,
  },
});
