// firebase.js
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDuqUlHcGfsErBvL580V-BWmpuhiDWipzU",
  authDomain: "sadarin-app.firebaseapp.com",
  projectId: "sadarin-app",
  storageBucket: "sadarin-app.firebasestorage.app",
  messagingSenderId: "834662115892",
  appId: "1:834662115892:web:7d8bfb5bd2d583bc4eb861",
  measurementId: "G-XD3YV33K8G",
};

// Inisialisasi Firebase App
const app = initializeApp(firebaseConfig);

// Inisialisasi Firebase Auth dengan persistence AsyncStorage (React Native)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app, auth };
