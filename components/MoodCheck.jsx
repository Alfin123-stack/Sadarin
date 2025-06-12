import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  DeviceEventEmitter,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../firebaseConfig"; // Sesuaikan path
import StatusModal from "./StatusModal"; // Sesuaikan path

const moods = [
  { emoji: "😄", label: "Senang" },
  { emoji: "🙂", label: "Baik" },
  { emoji: "😐", label: "Biasa" },
  { emoji: "😔", label: "Sedih" },
  { emoji: "😡", label: "Marah" },
];

const moodToValue = {
  Senang: 5,
  Baik: 4,
  Biasa: 3,
  Sedih: 2,
  Marah: 1,
};

export default function MoodCheck() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [pendingMood, setPendingMood] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isCheckedToday, setIsCheckedToday] = useState(false);
  const [reminderVisible, setReminderVisible] = useState(false);
  const [hasSeenReminder, setHasSeenReminder] = useState(false);

  const todayDate = new Date().toISOString().split("T")[0];

  const checkMoodToday = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const uid = user.uid;
    const moodLogKey = `moodLog-${uid}`;

    try {
      const moodLog = await AsyncStorage.getItem(moodLogKey);
      if (moodLog) {
        const parsed = JSON.parse(moodLog);
        if (parsed[todayDate]) {
          setSelectedMood(parsed[todayDate]);
          setIsCheckedToday(true);
        } else if (!hasSeenReminder) {
          setReminderVisible(true);
        }
      } else if (!hasSeenReminder) {
        setReminderVisible(true);
      }
    } catch (e) {
      console.error("Gagal memeriksa data mood hari ini:", e);
    }
  };

  useEffect(() => {
    checkMoodToday();
  }, [hasSeenReminder]);

  const saveMoodToStorage = async (mood) => {
    const user = auth.currentUser;
    if (!user) return;

    const uid = user.uid;
    const moodDataKey = `moodData-${uid}`;
    const moodLogKey = `moodLog-${uid}`;
    const moodValue = moodToValue[mood.label];

    try {
      // Simpan ke moodData per tanggal
      const stored = await AsyncStorage.getItem(moodDataKey);
      const moodData = stored ? JSON.parse(stored) : {};
      moodData[todayDate] = moodValue;
      await AsyncStorage.setItem(moodDataKey, JSON.stringify(moodData));

      // Simpan log mood
      const log = await AsyncStorage.getItem(moodLogKey);
      const moodLog = log ? JSON.parse(log) : {};
      moodLog[todayDate] = { label: mood.label, emoji: mood.emoji };
      await AsyncStorage.setItem(moodLogKey, JSON.stringify(moodLog));

      setSelectedMood(mood);
      setIsCheckedToday(true);
      DeviceEventEmitter.emit("moodUpdated");
    } catch (e) {
      console.error("Gagal menyimpan mood:", e);
    }
  };

  const confirmMood = () => {
    if (pendingMood) {
      saveMoodToStorage(pendingMood);
      setPendingMood(null);
      setModalVisible(false);
    }
  };

  // const resetMoodToday = async () => {
  //   const user = auth.currentUser;
  //   if (!user) return;

  //   const uid = user.uid;
  //   const moodLogKey = `moodLog-${uid}`;
  //   const moodDataKey = `moodData-${uid}`;

  //   // Hapus log
  //   const log = await AsyncStorage.getItem(moodLogKey);
  //   const parsedLog = log ? JSON.parse(log) : {};
  //   delete parsedLog[todayDate];
  //   await AsyncStorage.setItem(moodLogKey, JSON.stringify(parsedLog));

  //   // Hapus mood data
  //   const moodStored = await AsyncStorage.getItem(moodDataKey);
  //   const parsedMood = moodStored ? JSON.parse(moodStored) : {};
  //   delete parsedMood[todayDate];
  //   await AsyncStorage.setItem(moodDataKey, JSON.stringify(parsedMood));

  //   setSelectedMood(null);
  //   setIsCheckedToday(false);
  //   setReminderVisible(false);
  //   setHasSeenReminder(false);
  //   checkMoodToday();
  // };

  return (
    <View className="bg-white rounded-2xl p-5 mb-6 shadow-md">
      <Text className="text-[#013237] font-psemibold text-base mb-4">
        Bagaimana perasaanmu hari ini?
      </Text>

      {selectedMood ? (
        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center">
            <View className="bg-[#C0E6BA] rounded-full w-14 h-14 items-center justify-center mr-4">
              <Text className="text-2xl">{selectedMood.emoji}</Text>
            </View>
            <Text className="text-[#013237] text-lg font-psemibold">
              {selectedMood.label}
            </Text>
          </View>
        </View>
      ) : (
        <Text className="text-[#4CA771] font-pmedium mb-4">
          Silakan pilih mood kamu di bawah ini.
        </Text>
      )}

      {isCheckedToday && (
        <Text className="text-green-700 text-sm font-pmedium mb-3">
          ✅ Kamu sudah check-in hari ini
        </Text>
      )}

      <View className="flex-row justify-between opacity-100">
        {moods.map((mood, index) => (
          <TouchableOpacity
            key={index}
            disabled={isCheckedToday}
            onPress={() => {
              setPendingMood(mood);
              setModalVisible(true);
            }}
            className={`items-center ${
              selectedMood?.label === mood.label ? "opacity-100" : "opacity-60"
            }`}>
            <Text className="text-2xl mb-1">{mood.emoji}</Text>
            <Text className="text-xs text-[#013237] font-pregular">
              {mood.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal konfirmasi */}
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View className="flex-1 items-center justify-center bg-black/40">
          <View className="bg-white rounded-2xl p-6 w-4/5 shadow-lg items-center">
            <Text className="text-[#013237] font-psemibold text-base mb-4">
              Konfirmasi Mood
            </Text>
            {pendingMood && (
              <>
                <Text className="text-4xl mb-2">{pendingMood.emoji}</Text>
                <Text className="text-[#4CA771] font-psemibold text-lg mb-4">
                  {pendingMood.label}
                </Text>
              </>
            )}
            <View className="flex-row space-x-4 gap-6">
              <Pressable
                onPress={() => setModalVisible(false)}
                className="bg-gray-200 px-4 py-2 rounded-xl">
                <Text className="text-[#013237] font-pmedium">Batal</Text>
              </Pressable>
              <Pressable
                onPress={confirmMood}
                className="bg-[#4CA771] px-4 py-2 rounded-xl">
                <Text className="text-white font-pmedium">Simpan</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal pengingat check-in */}
      <StatusModal
        visible={reminderVisible}
        onClose={() => {
          setReminderVisible(false);
          setHasSeenReminder(true);
        }}
        title="Gimana kabarmu hari ini? 😊"
        message="Yuk isi mood hari ini biar kamu bisa lebih kenal sama diri sendiri. Satu menit aja cukup buat jaga kesehatan mental kamu 💚"
        buttonText="Isi Mood Sekarang"
        success={true}
        imageUrl="https://res.cloudinary.com/damvrr929/image/upload/v1748838687/emotion_sigp5z.png"
      />
    </View>
  );
}
