import { Feather } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MessageBubble from "../../components/MessageBubble";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import { sendToBot } from "../../scripts/api";


const suggestionsByTopic = {
  judi: [
    {
      label: "🎰 Saya ingin tahu tentang dampak buruk judi yang saya alami.",
      intent: "efek_judi",
    },
    {
      label: "🚫 Bagaimana caranya berhenti total dari kebiasaan judi?",
      intent: "cara_berhenti_judi",
    },
    {
      label: "💸 Apa solusi untuk dampak buruk akibat judi?",
      intent: "efek_judi",
    },
    {
      label: "🧠 Tolong bantu saya menghadapi kebiasaan judi.",
      intent: "cara_berhenti_judi",
    },
    {
      label: "🎯 Saya ingin lepas dari pengaruh judi.",
      intent: "cara_berhenti_judi",
    },
  ],
  mental: [
    {
      label:
        "😟 Tolong bantu saya mengontrol emosi saat keinginan berjudi muncul.",
      intent: "kontrol_emosi",
    },
    {
      label: "🧘 Saya merasa emosi saya tidak stabil sejak kecanduan judi.",
      intent: "kontrol_emosi",
    },
    {
      label:
        "💭 Saya butuh bantuan untuk menenangkan diri dari dorongan berjudi.",
      intent: "kontrol_emosi",
    },
    {
      label: "🫂 Bagaimana cara saya mengontrol emosi ketika stres menyerang?",
      intent: "kontrol_emosi",
    },
    {
      label: "💤 Saya merasa cemas dan stres karena masalah judi.",
      intent: "kontrol_emosi",
    },
  ],
  motivasi: [
    {
      label: "💪 Saya sedang mencari semangat hidup tanpa judi.",
      intent: "motivasi_sehat",
    },
    {
      label: "📈 Apa solusi untuk tetap positif dan sehat?",
      intent: "motivasi_sehat",
    },
    {
      label: "🌟 Saya ingin tahu cara hidup sehat setelah lepas dari judi.",
      intent: "motivasi_sehat",
    },
    {
      label: "⚡ Bagaimana agar saya tetap semangat menghadapi hidup?",
      intent: "motivasi_sehat",
    },
    {
      label: "🔥 Saya ingin kembali ke gaya hidup sehat dan semangat.",
      intent: "motivasi_sehat",
    },
  ],
};

export default function ChatbotScreen() {
  const [messages, setMessages] = useState([
    {
      id: 0,
      text: "Hai! Aku di sini untuk bantu kamu. Ketik pertanyaan atau pilih topik di bawah ini.",
      sender: "bot",
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasSent, setHasSent] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const scrollRef = useRef(null);

  const allSuggestions = Object.values(suggestionsByTopic).flat();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleMessage = async (text, intent = null) => {
    const userMsg = { id: Date.now(), text, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setIsProcessing(true);

    const processingMsg = {
      id: Date.now() + 1,
      text: "⏳ Bot sedang memproses pesan kamu...",
      sender: "bot",
    };
    setMessages((prev) => [...prev, processingMsg]);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      const botReply = await sendToBot(null, intent);
      setMessages((prev) =>
        prev
          .filter((msg) => msg.text !== processingMsg.text)
          .concat({ id: Date.now() + 2, text: botReply, sender: "bot" })
      );
    } catch {
      setMessages((prev) =>
        prev
          .filter((msg) => msg.text !== processingMsg.text)
          .concat({
            id: Date.now() + 3,
            text: "Terjadi kesalahan saat menghubungi bot.",
            sender: "bot",
          })
      );
    } finally {
      setIsProcessing(false);
      setInputText("");
      setSelectedSuggestion(null);
    }
  };

  const handleInputChange = (text) => {
    setInputText(text);
    const filtered = allSuggestions.filter((s) =>
      s.label.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setSelectedSuggestion(null);
  };

  const handleSuggestionSelect = (suggestion) => {
    setInputText(suggestion.label);
    setSelectedSuggestion(suggestion);
    setFilteredSuggestions([]);
    Keyboard.dismiss();
  };

  const handleSend = () => {
    if (!selectedSuggestion || isProcessing || hasSent) return;
    setHasSent(true);
    handleMessage(selectedSuggestion.label, selectedSuggestion.intent).finally(
      () => setHasSent(false)
    );
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 0,
        text: "Hai! Aku di sini untuk bantu kamu. Ketik pertanyaan atau pilih topik di bawah ini.",
        sender: "bot",
      },
    ]);
    setInputText("");
    setSelectedSuggestion(null);
    setFilteredSuggestions([]);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#EAF9E7" }}
      edges={["bottom"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View className="flex-1 px-6 pt-14 pb-2 bg-[#EAF9E7]">
            <ScreenHeader
              onBack="/(tabs)/home"
              title="Bantuan Chat"
              iconColor="#4CA771"
              bgColor="#FFFFFF"
              shadow
              className="mb-6"
            />

            <TouchableOpacity
              onPress={handleResetChat}
              className="flex-row items-center self-end mb-2 px-4 py-1 rounded-full bg-white border border-[#4CA771]">
              <Feather name="rotate-ccw" size={16} color="#4CA771" />
              <Text className="ml-2 text-[#4CA771] font-[Poppins-Medium] text-sm">
                Reset Chat
              </Text>
            </TouchableOpacity>

            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <ScrollView
                  ref={scrollRef}
                  style={{ flex: 1 }}
                  contentContainerStyle={{ paddingBottom: 100 }}
                  onContentSizeChange={() =>
                    scrollRef.current?.scrollToEnd({ animated: true })
                  }
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}>
                  {messages.map((msg) => (
                    <MessageBubble
                      key={msg.id}
                      text={msg.text}
                      sender={msg.sender}
                    />
                  ))}
                </ScrollView>

                <View className="mt-4">
                  {filteredSuggestions.length > 0 && (
                    <ScrollView
                      keyboardShouldPersistTaps="handled"
                      className="mb-2 max-h-48 bg-white rounded-2xl shadow-md border border-[#E0E0E0]">
                      {filteredSuggestions.map((sug, idx) => (
                        <TouchableOpacity
                          key={idx}
                          onPress={() => handleSuggestionSelect(sug)}
                          className="px-4 py-3 border-b border-gray-100">
                          <Text className="text-sm text-[#4CA771] font-[Poppins-Regular]">
                            {sug.label}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  )}
                  <View className="flex-row items-end px-4 py-3 bg-white rounded-3xl shadow-lg border border-[#D6EAD3]">
                    <View className="flex-1 pr-3">
                      <TextInput
                        value={inputText}
                        onChangeText={handleInputChange}
                        placeholder="Tulis pertanyaan atau pilih saran..."
                        placeholderTextColor="#9E9E9E"
                        multiline
                        numberOfLines={3}
                        editable={!isProcessing && !hasSent}
                        className="text-sm font-[Poppins-Regular] text-[#333] leading-5"
                        style={{ maxHeight: 100 }}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={handleSend}
                      disabled={!selectedSuggestion || isProcessing || hasSent}
                      className={`p-3 rounded-full ${
                        selectedSuggestion && !isProcessing && !hasSent
                          ? "bg-[#4CA771]"
                          : "bg-[#A8D3BA]"
                      } shadow-md`}>
                      <Feather name="send" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
