import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import EditableField from "../../components/EditableField";
import PrimaryButton from "../../components/PrimaryButton";
import ProfileImageWithName from "../../components/ProfileImageWithName";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import Toast from "../../components/Toast";
import { auth } from "../../firebaseConfig";

// Emoji untuk skala 1–5
const moodReverse = {
  1: "😡",
  2: "😔",
  3: "😐",
  4: "🙂",
  5: "😄",
};

// Teks + emoji untuk skala 1–5
const moodText = {
  1: "Sangat Buruk 😡",
  2: "Buruk 😔",
  3: "Netral 😐",
  4: "Baik 🙂",
  5: "Sangat Baik 😄",
};

export default function ProfileScreen() {
  const router = useRouter();

  const [feelingNote, setFeelingNote] = useState(
    "Perasaan saya hari ini sangat baik tidak ada niatan untuk melakukan judol."
  );
  const [feelingEmoji, setFeelingEmoji] = useState("");
  const [feelingScaleText, setFeelingScaleText] = useState(""); // teks + emoji
  const [profileImage, setProfileImage] = useState(null);

  const [isEditingFeeling, setIsEditingFeeling] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const user = auth.currentUser;

  // ✅ Refresh saat kembali ke halaman
  useFocusEffect(
    useCallback(() => {
      const refreshUser = async () => {
        if (user) {
          await user.reload();
          const updatedUser = auth.currentUser;
          setProfileImage(updatedUser?.photoURL);
        }
        fetchMoodAverage();
      };
      refreshUser();
    }, [])
  );

  // ✅ Load awal
  useEffect(() => {
    if (!user) {
      router.replace("/(auth)/signin");
      return;
    }

    if (user?.photoURL) {
      setProfileImage(user.photoURL);
    }

    fetchMoodAverage();
  }, [user]);

  // ✅ Ambil mood rata-rata dari AsyncStorage
  const fetchMoodAverage = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const uid = user.uid;
      const data = await AsyncStorage.getItem(`moodData-${uid}`);
      const parsed = data ? JSON.parse(data) : {};

      // Ambil semua nilai mood (angka) dari objek
      const moodValues = Object.values(parsed).filter(
        (val) => typeof val === "number" && val > 0
      );

      if (moodValues.length === 0) {
        setFeelingEmoji("");
        setFeelingScaleText("Belum ada data mood");
        return;
      }

      const total = moodValues.reduce((sum, val) => sum + val, 0);
      const avg = Math.round(total / moodValues.length);

      setFeelingEmoji(moodReverse[avg] || "");
      setFeelingScaleText(moodText[avg] || "Tidak diketahui");
    } catch (e) {
      console.error("Gagal mengambil rata-rata mood:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsEditingFeeling(false);
    setToastMessage("Perubahan disimpan.");
    setToastVisible(true);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    if (user) {
      await user.reload();
      const updatedUser = auth.currentUser;
      setProfileImage(updatedUser?.photoURL);
    }
    await fetchMoodAverage();
    setRefreshing(false);
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
            <View className="flex-row items-center justify-between mb-8">
              <ScreenHeader
                title="Profil"
                onBack="/(tabs)/home"
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
                  style={{ flex: 1 }}
                  contentContainerStyle={{ flexGrow: 1 }}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }>
                  <ProfileImageWithName
                    imageUri={
                      profileImage ||
                      user?.photoURL ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user?.displayName || "User"
                      )}&background=03282B&color=ffffff&size=512`
                    }
                    name={user?.displayName || "User"}
                  />

                  <EditableField
                    title="Perasaan hari ini"
                    value={feelingNote}
                    isEditing={isEditingFeeling}
                    onChange={setFeelingNote}
                    onEditToggle={() => setIsEditingFeeling(!isEditingFeeling)}
                    multiline
                    minHeight={100}
                    placeholder="Tulis perasaanmu di sini..."
                  />

                  <EditableField
                    title="Skala perasaan (rata-rata)"
                    value={feelingScaleText}
                    isEditing={false}
                    onChange={() => {}}
                    onEditToggle={() => {}}
                    editable={false}
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
});
