import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

export default function AuthInput({
  value,
  onChangeText,
  placeholder,
  secure = false,
  showToggle = false,
  onFocus,
  onBlur,
  isFocused,
  keyboardType = "default",
  editable = true, // ✅ default true
}) {
  const [show, setShow] = useState(false);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderWidth: 2,
        borderColor: isFocused ? "#4CA771" : "#FFFFFF",
        borderRadius: 12,
        paddingHorizontal: 12,
        marginBottom: 10,
      }}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        keyboardType={keyboardType}
        secureTextEntry={secure && !show}
        placeholderTextColor="#9CA3AF"
        editable={editable} // ✅ Disable input jika false
        style={{
          flex: 1,
          color: "#013237",
          fontSize: 14,
          paddingVertical: 12,
          fontFamily: "Poppins-Regular",
          opacity: editable ? 1 : 0.6, // ✅ Biar kelihatan disable
        }}
      />
      {showToggle && (
        <TouchableOpacity onPress={() => setShow(!show)}>
          <Ionicons name={show ? "eye-off" : "eye"} size={20} color="#9CA3AF" />
        </TouchableOpacity>
      )}
    </View>
  );
}
