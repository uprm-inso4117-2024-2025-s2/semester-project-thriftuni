import { initializeApp, getApps, getApp } from 'firebase/app';
import { Platform } from 'react-native';

let firebaseApp; // Variable global para almacenar la instancia de Firebase

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

// Inicializa Firebase solo si no está inicializado previamente
export const initializeFirebaseApp = () => {
  try {
    if (!firebaseApp) {
      if (getApps().length === 0) {
        firebaseApp = initializeApp(firebaseConfig);
        console.log('[Success] Firebase initialized successfully:');
      } else {
        firebaseApp = getApp();
        console.log('[Success] Firebase app already initialized:');
      }
      console.log('Firebase options:', firebaseApp.options);
      console.log('Firebase name:', firebaseApp.name);
    }
  } catch (error) {
    console.error('[Error] Failed to initialize Firebase:', error.message);
  }
};

// Método para verificar la configuración de Firebase
export const testFirebaseConfig = () => {
  console.log("[INFO] Testing Firebase Config...");
  console.log('[INFO] Firebase Config:', firebaseConfig);

  if (
    !firebaseConfig.apiKey ||
    !firebaseConfig.authDomain ||
    !firebaseConfig.projectId ||
    !firebaseConfig.storageBucket ||
    !firebaseConfig.messagingSenderId ||
    !firebaseConfig.appId
  ) {
    console.error('[ERROR] Missing required Firebase configuration values!');
  } else {
    console.log('[Success] All Firebase config values are loaded successfully.');
  }

  // Inicializa Firebase
  initializeFirebaseApp();
};
