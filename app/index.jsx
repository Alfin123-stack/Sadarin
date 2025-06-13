import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderSection from "../components/HeaderSection";
import Logo from "../components/Logo";
import PrimaryButton from "../components/PrimaryButton";
import { auth } from "../firebaseConfig";

export default function Index() {
  const router = useRouter();
  const slideAnimImage = useRef(new Animated.Value(300)).current;
  const slideAnimText = useRef(new Animated.Value(300)).current;

  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.replace("/(tabs)/home");
      } else {
        setCheckingAuth(false); // Lanjut render halaman landing
      }
    });

    return unsubscribe;
  }, [router]);

  useEffect(() => {
    Animated.stagger(300, [
      Animated.timing(slideAnimImage, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnimText, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, [slideAnimImage, slideAnimText]);

  if (checkingAuth) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#EAF9E7",
        }}>
        <ActivityIndicator size="large" color="#4CA771" />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#EAF9E7" }}
      edges={["bottom"]}>
      <View
        className="flex-1 justify-end relative"
        style={{ backgroundColor: "#EAF9E7" }}>
        {/* Gambar Animasi */}
        <Animated.View
          style={{
            position: "absolute",
            top: 96,
            left: 0,
            right: 0,
            alignItems: "center",
            transform: [{ translateX: slideAnimImage }],
          }}>
          <Logo containerClassName="mt-10" imageClassName="w-72 h-72" />
        </Animated.View>

        {/* Konten Bawah */}
        <View
          className="rounded-t-[40px] px-8 pt-20 pb-10 shadow-lg"
          style={{ backgroundColor: "#FFFFFF" }}>
          {/* Teks Animasi */}
          <Animated.View style={{ transform: [{ translateX: slideAnimText }] }}>
            <HeaderSection
              title="Selamat Datang di Sadarin"
              subtitle={"Deteksi sejak dini dan cegah\nkecanduan judi online"}
            />
          </Animated.View>

          {/* Tombol CTA */}
          <PrimaryButton
            title="Mulai Sekarang"
            onPress={() => router.push("/(auth)/onboarding")}
            containerClassName="py-4 rounded-full items-center shadow-md"
            textClassName="text-white text-lg font-pmedium"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
