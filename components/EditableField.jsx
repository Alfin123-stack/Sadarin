import { Ionicons } from "@expo/vector-icons";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function EditableField({
  title,
  value,
  isEditing,
  onChange,
  onEditToggle,
  placeholder = "",
  multiline = false,
  maxLength = 1000,
  containerStyle = "",
  minHeight = 0,
}) {
  return (
    <View className={`mb-4 ${containerStyle}`}>
      {title && (
        <Text
          className="mb-1 text-[#013237]"
          style={{ fontFamily: "Poppins-Medium" }}>
          {title}
        </Text>
      )}

      <View className="bg-white rounded-xl p-4 shadow-sm relative flex-row items-start">
        {isEditing ? (
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onEditToggle}
            multiline={multiline}
            maxLength={maxLength}
            autoFocus
            placeholder={placeholder}
            style={{
              flex: 1,
              fontSize: 14, // font size lebih kecil
              fontFamily: "Poppins-Regular",
              color: "#1A1A1A",
              lineHeight: multiline ? 20 : undefined,
              textAlignVertical: multiline ? "top" : "center",
              minHeight: multiline ? minHeight || 80 : undefined,
            }}
          />
        ) : (
          <>
            <Text
              style={{
                flex: 1,
                fontSize: 14, // font size lebih kecil
                fontFamily: "Poppins-Regular",
                color: "#1A1A1A",
                lineHeight: multiline ? 20 : undefined,
              }}>
              {value || placeholder}
            </Text>
            <TouchableOpacity onPress={onEditToggle}>
              <Ionicons name="pencil" size={18} color="#4CA771" />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}
