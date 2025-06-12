import { StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="setting" options={{ headerShown: false }} />
        <Stack.Screen name="editProfileScreen" options={{ headerShown: false }} />
         <Stack.Screen name="savedScreen" options={{ headerShown: false }} />
         <Stack.Screen name="changePasswordScreen" options={{ headerShown: false }} />
         <Stack.Screen name="aboutScreen" options={{ headerShown: false }} />
      </Stack>

    </>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
