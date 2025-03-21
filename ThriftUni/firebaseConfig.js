import { initializeApp, getApps, getApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 🔹 Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBliTLyyqHam9ei-900BYyt-y4ZGoowrEk",
  authDomain: "thriftuni-b345a.firebase.com",
  projectId: "thriftuni-b345a",
  storageBucket: "thriftuni-b345a.firebasestorage.app",
  messagingSenderId: "501062585933",
  appId: "1:501062585933:android:11ca96ded2177956a3d604",
  measurementId: "G-MCWKZZQPTP",
};

// ✅ Ensure Firebase App is initialized only once
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// ✅ Initialize Firebase Auth with AsyncStorage (if not already initialized)
const auth =
  getApps().length === 0
    ? initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) })
    : getAuth(app);

// ✅ Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
