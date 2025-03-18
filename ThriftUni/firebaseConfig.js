import { initializeApp } from "firebase/app";
import {
 initializeAuth,
 getReactNativePersistence
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { Platform } from "react-native";


const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:
    Platform.OS === 'ios'
      ? process.env.EXPO_PUBLIC_FIREBASE_APP_ID_IOS // ID para iOS
      : Platform.OS === 'android'
      ? process.env.EXPO_PUBLIC_FIREBASE_APP_ID_ANDROID // ID para Android
      : process.env.EXPO_PUBLIC_FIREBASE_APP_ID_WEB, // ID para Web (solo en web apps),
  ...(Platform.OS === 'web' && { measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID }),
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
 persistence: getReactNativePersistence(AsyncStorage)
});


// Initialize Firestore & Storage if needed
const db = getFirestore(app);
const storage = getStorage(app);


export { app, auth, db, storage };

