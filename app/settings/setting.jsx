import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView, ScrollView, View } from "react-native";
import LogoutButton from "../../components/LogoutButton";
import ScreenHeader from "../../components/ScreenHeader";
import SettingItem from "../../components/SettingItem";
import SettingsSection from "../../components/SettingsSection";

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EAF9E7" }}>
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 24,
          paddingTop: 56,
          paddingBottom: 24,
        }}>
        <ScreenHeader
          title="Pengaturan"
          className="mb-6"
          onBack="/(tabs)/profile"
        />

        <SettingsSection title="Akun">
          <SettingItem
            icon={<Ionicons name="person-outline" size={20} color="#013237" />}
            label="Sunting profil"
            onPress={() => router.push("/settings/editProfileScreen")}
          />
          <SettingItem
            icon={
              <Ionicons name="bookmark-outline" size={20} color="#013237" />
            }
            label="Disimpan"
            onPress={() => router.push("/settings/savedScreen")}
          />
          <SettingItem
            icon={<Ionicons name="key-outline" size={20} color="#013237" />}
            label="Ganti kata sandi"
            onPress={() => router.push("/settings/changePasswordScreen")}
          />
        </SettingsSection>

        <SettingsSection title="Info">
          <SettingItem
            icon={
              <Ionicons
                name="information-circle-outline"
                size={20}
                color="#013237"
              />
            }
            label="Tentang"
            onPress={() => router.push("/settings/aboutScreen")}
          />
        </SettingsSection>

        <LogoutButton />

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
