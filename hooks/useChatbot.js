// hooks/useChatbot.js
import { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { suggestionsByTopic } from "../constants/suggestionsByTopic";
import { sendToBot } from "../scripts/api";

export default function useChatbot() {
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
          .concat({
            id: Date.now() + 2,
            text: botReply,
            sender: "bot",
          })
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

  return {
    messages,
    isLoading,
    inputText,
    isProcessing,
    hasSent,
    filteredSuggestions,
    selectedSuggestion,
    handleInputChange,
    handleSuggestionSelect,
    handleSend,
    handleResetChat,
  };
}
