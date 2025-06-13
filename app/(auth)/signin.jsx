import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AuthInput from "../../components/auth/AuthInput";
import AuthRedirectLink from "../../components/auth/AuthRedirectLink";
import HeaderSection from "../../components/HeaderSection";
import Logo from "../../components/Logo";
import PrimaryButton from "../../components/PrimaryButton";
import StatusModal from "../../components/home/StatusModal";

import { useState } from "react";
import { useAuthForm } from "../../hooks/useAuthForm";
import { useSignIn } from "../../hooks/useSignIn"; // gunakan custom hook

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { focused, handleFocus, handleBlur } = useAuthForm([
    "email",
    "password",
  ]);

  const {
    signIn,
    isSubmitting,
    modalVisible,
    isSuccess,
    modalMessage,
    handleModalConfirm,
    setModalVisible,
  } = useSignIn();

  return (
    <>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#EAF9E7" }}
        edges={["bottom"]}>
        <KeyboardAvoidingView
          style={{ flex: 1, justifyContent: "center", paddingHorizontal: 32 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}>
          <Logo containerClassName="mb-8" imageClassName="w-24 h-24" />
          <HeaderSection
            title="Selamat Datang"
            subtitle="Masuk untuk mulai pakai Sadarin"
          />

          <AuthInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email kamu"
            onFocus={() => handleFocus("email")}
            onBlur={() => handleBlur("email")}
            isFocused={focused.email}
            keyboardType="email-address"
            editable={!isSubmitting}
          />
          <AuthInput
            value={password}
            onChangeText={setPassword}
            placeholder="Kata sandi (min. 6 karakter)"
            onFocus={() => handleFocus("password")}
            onBlur={() => handleBlur("password")}
            isFocused={focused.password}
            secure
            showToggle
            editable={!isSubmitting}
          />

          <PrimaryButton
            title={isSubmitting ? "Sedang masuk..." : "Masuk"}
            onPress={() => signIn(email, password)}
            containerClassName="mt-6 py-4 rounded-full items-center shadow-md"
            disabled={isSubmitting}
          />

          <AuthRedirectLink
            text="Belum punya akun?"
            linkText="Daftar"
            to="/(auth)/signup"
          />
        </KeyboardAvoidingView>
      </SafeAreaView>

      <StatusModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        success={isSuccess}
        title={isSuccess ? "Berhasil Masuk" : "Gagal Masuk"}
        message={modalMessage}
        buttonText="Oke"
        onConfirm={handleModalConfirm}
      />
    </>
  );
}
