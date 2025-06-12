const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// ✅ Tambahkan ini untuk mencegah error Firebase Auth di Expo SDK 53
config.resolver.unstable_enablePackageExports = false;

// Tetap gunakan konfigurasi NativeWind
module.exports = withNativeWind(config, { input: './global.css' });
