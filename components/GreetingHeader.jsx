import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../firebaseConfig";

export default function GreetingHeader() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState(null);

  const fetchUserInfo = () => {
    const user = auth.currentUser;
    if (user) {
      setDisplayName(user.displayName || "Pengguna");
      setPhotoURL(user.photoURL);
    }
  };

  // Panggil ulang setiap kali screen difokuskan (termasuk kembali dari /profile)
  useFocusEffect(() => {
    fetchUserInfo();
  });

  useEffect(() => {
    fetchUserInfo(); // untuk initial render juga
  }, []);

  return (
    <View className="flex-row items-center justify-between mb-6">
      <View>
        <Text className="text-base text-[#4CA771] font-pregular">Halo,</Text>
        <Text className="text-xl text-[#013237] font-psemibold">
          {displayName}
        </Text>
      </View>
      <TouchableOpacity onPress={() => router.push("/profile")}>
        <Image
          source={
            photoURL
              ? { uri: photoURL }
              : {
                  uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    displayName || "User"
                  )}&background=03282B&color=ffffff&size=512`,
                }
          }
          className="w-10 h-10 rounded-full"
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
}
