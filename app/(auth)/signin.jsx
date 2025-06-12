import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AuthInput from "../../components/AuthInput";
import AuthRedirectLink from "../../components/AuthRedirectLink";
import HeaderSection from "../../components/HeaderSection";
import Logo from "../../components/Logo";
import PrimaryButton from "../../components/PrimaryButton";
import StatusModal from "../../components/StatusModal";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../contexts/AuthContext";
import { auth } from "../../firebaseConfig";
import { useAuthForm } from "../../hooks/useAuthForm";

// Konversi error Firebase ke bahasa yang user-friendly
const getFirebaseErrorMessage = (code) => {
  switch (code) {
    case "auth/user-not-found":
      return "Email belum terdaftar. Yuk daftar dulu.";
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Email atau kata sandi salah. Coba lagi, ya.";
    case "auth/invalid-email":
      return "Format email tidak valid.";
    case "auth/too-many-requests":
      return "Terlalu banyak percobaan gagal. Coba beberapa saat lagi.";
    default:
      return "Terjadi kesalahan saat masuk. Silakan coba kembali.";
  }
};

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { focused, handleFocus, handleBlur } = useAuthForm([
    "email",
    "password",
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const { setIsLoggingIn } = useAuth();

  const handleSignIn = async () => {
    if (!email || !password) {
      setIsSuccess(false);
      setModalMessage("Email dan kata sandi wajib diisi!");
      setModalVisible(true);
      return;
    }

    setIsSubmitting(true);
    setIsLoggingIn(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsSuccess(true);
      setModalMessage(`Selamat datang kembali, ${email}!`);
      setShouldNavigate(true);
      setModalVisible(true);
    } catch (error) {
      setIsLoggingIn(false); // penting: reset flag kalau gagal
      setIsSuccess(false);
      setModalMessage(getFirebaseErrorMessage(error.code));
      setModalVisible(true);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            onPress={handleSignIn}
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
        onConfirm={() => {
          setModalVisible(false);
          if (shouldNavigate) {
            setTimeout(() => {
              router.replace("/(tabs)/home");
              setShouldNavigate(false);
              setIsLoggingIn(false); // reset flag setelah redirect
            }, 300);
          }
        }}
      />
    </>
  );
}
