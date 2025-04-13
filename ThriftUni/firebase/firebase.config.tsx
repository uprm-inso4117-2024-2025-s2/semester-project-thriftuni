import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Platform } from "react-native";

const resetAttempts: Record<string, { count: number; timestamp: number }> = {};
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes
const MAX_ATTEMPTS = 3;

export const sendPasswordReset = async (email: string) => {
  const auth = getAuth();
  try {
    await sendPasswordResetEmail(auth, email);
    logResetAttempt(email, "success");
    return { success: true };
  } catch (error) {
    logResetAttempt(email, "failed");
    return { error: (error as any).message };
  }
};

export const logResetAttempt = (
  email: string,
  status: "success" | "failed"
) => {
  console.log(
    `Password reset attempt for ${email}: ${status} at ${new Date().toISOString()}`
  );
};

export const checkRateLimit = (email: string) => {
  const now = Date.now();
  if (!resetAttempts[email]) {
    resetAttempts[email] = { count: 1, timestamp: now };
    return false;
  }

  const elapsedTime = now - resetAttempts[email].timestamp;
  if (elapsedTime > RATE_LIMIT_WINDOW) {
    resetAttempts[email] = { count: 1, timestamp: now };
    return false;
  }

  if (resetAttempts[email].count >= MAX_ATTEMPTS) {
    return true;
  }

  resetAttempts[email].count += 1;
  return false;
};

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:
    Platform.OS === "ios"
      ? process.env.EXPO_PUBLIC_FIREBASE_APP_ID_IOS // ID para iOS
      : Platform.OS === "android"
      ? process.env.EXPO_PUBLIC_FIREBASE_APP_ID_ANDROID // ID para Android
      : process.env.EXPO_PUBLIC_FIREBASE_APP_ID_WEB, // ID para Web (solo en web apps),
  ...(Platform.OS === "web" && {
    measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
  }),
};

// Inicializa Firebase si no está inicializado
const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(firebaseApp);

// Exportaciones
export { firebaseConfig, firebaseApp, auth };
