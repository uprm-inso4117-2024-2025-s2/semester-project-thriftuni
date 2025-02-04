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
      ? process.env.EXPO_PUBLIC_FIREBASE_APP_ID_IOS
      : process.env.EXPO_PUBLIC_FIREBASE_APP_ID_ANDROID,
};

// Inicializa Firebase solo si no está inicializado previamente
export const initializeFirebaseApp = () => {
  if (!firebaseApp) {
    if (getApps().length === 0) {
      firebaseApp = initializeApp(firebaseConfig, "thriftuni");
      console.log('[Success] Firebase initialized successfully:', "App name:", firebaseApp.name, "App values: ", firebaseApp.options);
    } else {
      firebaseApp = getApp();
      console.log('[Success] Firebase app already initialized:', "App name:", firebaseApp.name, "App values: ", firebaseApp.options);
    }
  }
  return firebaseApp;
};

// Método para probar y verificar la configuración de Firebase
export const testFirebaseConfig = () => {
  console.log("[INFO] Firebase Initialization");
  console.log('[INFO] Testing Firebase Config...');
  console.log('[INFO] apiKey:', firebaseConfig.apiKey);
  console.log('[INFO] authDomain:', firebaseConfig.authDomain);
  console.log('[INFO] projectId:', firebaseConfig.projectId);
  console.log('[INFO] storageBucket:', firebaseConfig.storageBucket);
  console.log('[INFO] messagingSenderId:', firebaseConfig.messagingSenderId);
  console.log('[INFO] appId:', firebaseConfig.appId);

  if (
    !firebaseConfig.apiKey ||
    !firebaseConfig.authDomain ||
    !firebaseConfig.projectId ||
    !firebaseConfig.storageBucket ||
    !firebaseConfig.messagingSenderId ||
    !firebaseConfig.appId
  ) {
    console.error('[ERROR] One or more Firebase config values are missing!');
  } else {
    console.log('[Success] All Firebase config values are loaded successfully.');
  }

  // Inicializa Firebase
  initializeFirebaseApp();
  console.groupEnd();
};
