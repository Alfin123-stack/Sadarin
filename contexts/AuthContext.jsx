import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [justSignedUp, setJustSignedUp] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false); // ⬅️ Penting!

  return (
    <AuthContext.Provider
      value={{
        isLoggingOut,
        setIsLoggingOut,
        isLoggingIn,
        setIsLoggingIn,
        justSignedUp,
        setJustSignedUp,
        isAuthReady, // ⬅️ Tambahkan
        setIsAuthReady, // ⬅️ Tambahkan
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthContext, AuthProvider, useAuth };
