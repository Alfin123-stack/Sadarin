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
import MoodSummaryField from "../../components/profile/MoodSummaryField";
import PrimaryButton from "../../components/PrimaryButton";
import ProfileImageWithName from "../../components/profile/ProfileImageWithName";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import Toast from "../../components/Toast";
import useProfile from "../../hooks/useProfile";

export default function ProfileScreen() {
  const {
    feelingNote,
    setFeelingNote,
    feelingScaleText,
    profileImage,
    isEditingFeeling,
    setIsEditingFeeling,
    toastVisible,
    setToastVisible,
    toastMessage,
    isLoading,
    refreshing,
    onRefresh,
    handleSave,
    user,
    router,
  } = useProfile();

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
                    onEditToggle={() => setIsEditingFeeling((prev) => !prev)}
                    multiline
                    minHeight={100}
                    placeholder="Tulis perasaanmu di sini..."
                  />

                  <MoodSummaryField value={feelingScaleText} />

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
