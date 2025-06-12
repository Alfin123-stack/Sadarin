import { Tabs, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import CustomTabBar from "../../components/CustomTabBar";
import { useAuth } from "../../contexts/AuthContext"; // pastikan path sesuai
import { auth } from "../../firebaseConfig";

export default function TabsLayout() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggingOut } = useAuth(); // ← ambil status logout

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user && !isLoggingOut) {
        router.replace("/(auth)/signin");
      } else {
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, [router, isLoggingOut]); // ← penting!

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Tabs tabBar={(props) => <CustomTabBar {...props} />}>
      <Tabs.Screen name="chatbot" options={{ headerShown: false }} />
      <Tabs.Screen name="home" options={{ headerShown: false }} />
      <Tabs.Screen name="profile" options={{ headerShown: false }} />
      <Tabs.Screen name="tips" options={{ headerShown: false }} />
    </Tabs>
  );
}
