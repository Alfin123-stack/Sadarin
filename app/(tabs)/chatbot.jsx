import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import ChatMessages from "../../components/chatbot/ChatMessages";
import ChatInput from "../../components/chatbot/ChatInput";
import ChatSuggestions from "../../components/chatbot/ChatSuggestions";
import ResetChatButton from "../../components/chatbot/ResetChatButton";
import useChatbot from "../../hooks/useChatbot";

export default function ChatbotScreen() {
  const {
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
  } = useChatbot();

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#EAF9E7" }}
      edges={["bottom"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingTop: insets.top + 20,
              paddingBottom: insets.bottom + 8,
              paddingHorizontal: 24,
              backgroundColor: "#EAF9E7",
            }}
            keyboardShouldPersistTaps="handled">
            <View style={{ flex: 1 }}>
              <ScreenHeader
                onBack="/(tabs)/home"
                title="Bantuan Chat"
                iconColor="#4CA771"
                bgColor="#FFFFFF"
                shadow
                className="mb-6"
              />

              <ResetChatButton onPress={handleResetChat} />

              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  <ChatMessages messages={messages} style={{ flex: 1 }} />
                  <View style={{ marginTop: 16 }}>
                    <ChatSuggestions
                      suggestions={filteredSuggestions}
                      onSelect={handleSuggestionSelect}
                    />
                    <ChatInput
                      inputText={inputText}
                      onChangeText={handleInputChange}
                      onSend={handleSend}
                      selectedSuggestion={selectedSuggestion}
                      isProcessing={isProcessing}
                      hasSent={hasSent}
                    />
                  </View>
                </>
              )}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
