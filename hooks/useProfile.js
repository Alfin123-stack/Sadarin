import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../firebaseConfig";
import { moodReverse, moodText } from "../constants/moodScale";

export default function useProfile() {
  const router = useRouter();
  const user = auth.currentUser;
  const mountedRef = useRef(true); // Untuk hindari setState saat unmounted

  const [feelingNote, setFeelingNote] = useState(
    "Perasaan saya hari ini sangat baik tidak ada niatan untuk melakukan judol."
  );
  const [feelingEmoji, setFeelingEmoji] = useState("");
  const [feelingScaleText, setFeelingScaleText] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const [isEditingFeeling, setIsEditingFeeling] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMoodAverage = useCallback(async () => {
    try {
      if (!user) return;

      const uid = user.uid;
      const data = await AsyncStorage.getItem(`moodData-${uid}`);
      const parsed = data ? JSON.parse(data) : {};

      const moodValues = Object.values(parsed).filter(
        (val) => typeof val === "number" && val > 0
      );

      if (moodValues.length === 0) {
        if (mountedRef.current) {
          setFeelingEmoji("");
          setFeelingScaleText("Belum ada data mood");
        }
        return;
      }

      const total = moodValues.reduce((sum, val) => sum + val, 0);
      const avg = Math.round(total / moodValues.length);

      if (mountedRef.current) {
        setFeelingEmoji(moodReverse[avg] || "");
        setFeelingScaleText(moodText[avg] || "Tidak diketahui");
      }
    } catch (e) {
      console.error("Gagal mengambil rata-rata mood:", e);
    } finally {
      if (mountedRef.current) setIsLoading(false);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      const refreshUser = async () => {
        if (user) {
          await user.reload();
          const updatedUser = auth.currentUser;
          if (mountedRef.current) setProfileImage(updatedUser?.photoURL);
        }
        fetchMoodAverage();
      };
      refreshUser();
    }, [user, fetchMoodAverage])
  );

  useEffect(() => {
    mountedRef.current = true;

    if (!user) {
      router.replace("/(auth)/signin");
      return;
    }

    if (user?.photoURL) {
      setProfileImage(user.photoURL);
    }

    fetchMoodAverage();

    return () => {
      mountedRef.current = false; // Bersihkan saat unmount
    };
  }, [user, router, fetchMoodAverage]);

  const handleSave = async () => {
    setIsEditingFeeling(false);

    // Hindari warning dengan menjadwalkan update di event loop berikutnya
    setTimeout(() => {
      if (mountedRef.current) {
        setToastMessage("Perubahan disimpan.");
        setToastVisible(true);
      }
    }, 0);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    if (user) {
      await user.reload();
      const updatedUser = auth.currentUser;
      if (mountedRef.current) setProfileImage(updatedUser?.photoURL);
    }
    await fetchMoodAverage();
    if (mountedRef.current) setRefreshing(false);
  };

  return {
    feelingNote,
    setFeelingNote,
    feelingEmoji,
    feelingScaleText,
    profileImage,
    isEditingFeeling,
    setIsEditingFeeling,
    toastVisible,
    setToastVisible,
    toastMessage,
    setToastMessage,
    isLoading,
    refreshing,
    onRefresh,
    handleSave,
    user,
    router,
  };
}
