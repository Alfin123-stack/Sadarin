import { Text, TouchableOpacity } from "react-native";

export default function PrimaryButton({
  title = "Button",
  onPress = () => {},
  containerClassName,
  textClassName,
  style = {},
  textStyle = {},
  disabled = false, // ✅ Tambah
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled} // ✅ nonaktifkan interaksi
      className={`${
        disabled ? "bg-[#A5D6AA]" : "bg-[#4CA771]"
      } py-3 rounded-full items-center shadow-md ${containerClassName}`}
      style={{
        shadowColor: "#013237",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
        opacity: disabled ? 0.6 : 1, // ✅ efek visual nonaktif
        ...style,
      }}>
      <Text
        className={`text-white font-psemibold text-base text-center ${textClassName}`}
        style={textStyle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
