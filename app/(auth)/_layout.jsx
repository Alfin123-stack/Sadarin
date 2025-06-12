import { Stack, usePathname, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { auth } from "../../firebaseConfig";

const AuthLayout = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const {
    isLoggingIn,
    justSignedUp,
    isAuthReady,
    setIsAuthReady,
  } = useAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      const isOnAuthPage =
        pathname === "/(auth)/signin" || pathname === "/(auth)/signup";

      if (user) {
        // Jangan langsung redirect kalau user baru login atau sign up
        if (!isLoggingIn && !justSignedUp && isOnAuthPage) {
          router.replace("/(tabs)/home");
        }
      }

      setIsAuthReady(true);
      setCheckingAuth(false);
    });

    return unsubscribe;
  }, [router, pathname, isLoggingIn, justSignedUp]);

  if (checkingAuth || !isAuthReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="signin" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;
