import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "expo-router";

import { auth } from "../firebaseConfig";
import { useAuth } from "../contexts/AuthContext";

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

export function useSignUp() {
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
    const errorMessage = validateInputs();
    if (errorMessage) {
      setIsSuccess(false);
      setModalMessage(errorMessage);
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
      await updateProfile(userCredential.user, { displayName: username });

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

  const handleModalClose = () => {
    setModalVisible(false);
    if (isSuccess) {
      setJustSignedUp(false);
      router.replace("/(tabs)/home");
    }
  };

  return {
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
  };
}
