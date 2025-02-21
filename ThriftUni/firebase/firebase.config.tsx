import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { Platform } from 'react-native';


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


// Inicializa Firebase si no está inicializado
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(firebaseApp);

// Exportaciones
export { firebaseApp, auth };