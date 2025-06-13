import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HeaderSection from "../../components/HeaderSection";
import Logo from "../../components/Logo";
import PrimaryButton from "../../components/PrimaryButton";

import { useAuthForm } from "../../hooks/useAuthForm";
import { useSignUp } from "../../hooks/useSignUp";
import AuthInput from "../../components/auth/AuthInput";
import AuthRedirectLink from "../../components/auth/AuthRedirectLink";
import StatusModal from "../../components/home/StatusModal";

export default function SignUp() {
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isSubmitting,
    handleSignUp,
    modalVisible,
    isSuccess,
    modalMessage,
    handleModalClose,
  } = useSignUp();

  const { focused, handleFocus, handleBlur } = useAuthForm([
    "username",
    "email",
    "password",
    "confirmPassword",
  ]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#EAF9E7" }}
      edges={["bottom"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 20}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              paddingHorizontal: 32,
              paddingVertical: 40,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View>
              <Logo containerClassName="mb-8" imageClassName="w-24 h-24" />
              <HeaderSection
                title="Buat Akun Baru"
                subtitle="Daftar untuk mulai gunakan Sadarin"
              />

              <AuthInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                editable={!isSubmitting}
                onFocus={() => handleFocus("username")}
                onBlur={() => handleBlur("username")}
                isFocused={focused.username}
              />
              <AuthInput
                placeholder="Email kamu"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                editable={!isSubmitting}
                onFocus={() => handleFocus("email")}
                onBlur={() => handleBlur("email")}
                isFocused={focused.email}
              />
              <AuthInput
                placeholder="Kata sandi (min. 6 karakter)"
                value={password}
                onChangeText={setPassword}
                secure
                showToggle
                editable={!isSubmitting}
                onFocus={() => handleFocus("password")}
                onBlur={() => handleBlur("password")}
                isFocused={focused.password}
              />
              <AuthInput
                placeholder="Ulangi kata sandi"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secure
                showToggle
                editable={!isSubmitting}
                onFocus={() => handleFocus("confirmPassword")}
                onBlur={() => handleBlur("confirmPassword")}
                isFocused={focused.confirmPassword}
              />

              <PrimaryButton
                title={isSubmitting ? "Sedang mendaftar..." : "Daftar"}
                onPress={handleSignUp}
                disabled={isSubmitting}
                containerClassName="mt-6 py-4 rounded-full items-center shadow-md"
              />

              <AuthRedirectLink
                text="Sudah punya akun?"
                linkText="Masuk"
                to="/(auth)/signin"
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <StatusModal
        visible={modalVisible}
        onClose={handleModalClose}
        success={isSuccess}
        title={isSuccess ? "Pendaftaran Berhasil" : "Pendaftaran Gagal"}
        message={modalMessage}
        buttonText="Oke"
        onConfirm={handleModalClose}
      />
    </SafeAreaView>
  );
}
