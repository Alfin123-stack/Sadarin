import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="[id]" options={{ headerShown: false }} />
        <Stack.Screen name="webview" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
