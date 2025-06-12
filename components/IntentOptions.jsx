import { Text, TouchableOpacity, View } from "react-native";

export default function IntentOptions({ options, onSelect }) {
  return (
    <View className="mt-4">
      <Text className="text-base text-gray-700 mb-2">
        Pilih yang paling cocok:
      </Text>
      {options.map((opt) => (
        <TouchableOpacity
          key={opt.id}
          className="bg-white py-3 px-4 rounded-xl mb-2 shadow"
          onPress={() => onSelect(opt.label)}>
          <Text className="text-base text-[#013237]">{opt.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
