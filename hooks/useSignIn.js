import { useRouter } from "expo-router";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebaseConfig";

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

export const useSignIn = () => {
  const router = useRouter();
  const { setIsLoggingIn } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const signIn = async (email, password) => {
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
      setIsLoggingIn(false);
      setIsSuccess(false);
      setModalMessage(getFirebaseErrorMessage(error.code));
      setModalVisible(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalConfirm = () => {
    setModalVisible(false);
    if (shouldNavigate) {
      setTimeout(() => {
        router.replace("/(tabs)/home");
        setShouldNavigate(false);
        setIsLoggingIn(false);
      }, 300);
    }
  };

  return {
    signIn,
    isSubmitting,
    modalVisible,
    isSuccess,
    modalMessage,
    handleModalConfirm,
    setModalVisible,
  };
};


