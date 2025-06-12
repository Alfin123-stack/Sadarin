import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AuthInput from "../../components/AuthInput";
import AuthRedirectLink from "../../components/AuthRedirectLink";
import HeaderSection from "../../components/HeaderSection";
import Logo from "../../components/Logo";
import PrimaryButton from "../../components/PrimaryButton";
import StatusModal from "../../components/StatusModal";

import { useAuth } from "../../contexts/AuthContext";
import { auth } from "../../firebaseConfig";
import { useAuthForm } from "../../hooks/useAuthForm";

const getFirebaseErrorMessage = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "Email ini sudah terdaftar. Gunakan email lain atau masuk.";
    case "auth/invalid-email":
      return "Format email tidak valid.";
    case "auth/weak-password":
      return "Password terlalu lemah. Gunakan minimal 6 karakter.";
    default:
      return "Terjadi kesalahan saat mendaftar. Coba lagi.";
  }
};

export default function SignUp() {
  const router = useRouter();
  const { setIsLoggingIn, setJustSignedUp } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const { focused, handleFocus, handleBlur } = useAuthForm([
    "username",
    "email",
    "password",
    "confirmPassword",
  ]);

  const validateInputs = () => {
    if (!username.trim()) return "Username harus diisi!";
    if (!email.trim()) return "Email harus diisi!";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Format email tidak valid!";
    if (!password) return "Password harus diisi!";
    if (password.length < 6) return "Password minimal 6 karakter!";
    if (password !== confirmPassword) return "Konfirmasi password tidak cocok!";
    return null;
  };

  const handleSignUp = async () => {
    const validationError = validateInputs();
    if (validationError) {
      setIsSuccess(false);
      setModalMessage(validationError);
      setModalVisible(true);
      return;
    }

    setIsSubmitting(true);
    setIsLoggingIn(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: username });

      setJustSignedUp(true);
      setIsSuccess(true);
      setModalMessage(
        `Selamat datang, ${username}! Akun kamu berhasil dibuat.`
      );
    } catch (error) {
      setIsSuccess(false);
      setModalMessage(getFirebaseErrorMessage(error.code));
    } finally {
      setIsSubmitting(false);
      setIsLoggingIn(false);
      setModalVisible(true);
    }
  };

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
        onClose={() => setModalVisible(false)}
        success={isSuccess}
        title={isSuccess ? "Pendaftaran Berhasil" : "Pendaftaran Gagal"}
        message={modalMessage}
        buttonText="Oke"
        onConfirm={() => {
          setModalVisible(false);
          if (isSuccess) {
            setJustSignedUp(false);
            router.replace("/(tabs)/home");
          }
        }}
      />
    </SafeAreaView>
  );
}
