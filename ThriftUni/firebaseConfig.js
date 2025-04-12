import { initializeApp, getApps } from "firebase/app";
import {
    getAuth,
    getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
    apiKey: "AIzaSyBliTLyyqHam9ei-900BYyt-y4ZGoowrEk",
    authDomain: "thriftuni-b345a.firebase.com",
    projectId: "thriftuni-b345a",
    storageBucket: "thriftuni-b345a.firebasestorage.app",
    messagingSenderId: "501062585933",
    appId: "1:501062585933:android:11ca96ded2177956a3d604",
    appID: "1:501062585933:ios:22353406f954b406a3d604",
};


let app;

if (getApps().length === 0) {
    // Initialize Firebase only if it doesn't already exist
    app = initializeApp(firebaseConfig);
} else {
    // Use the existing Firebase app if already initialized
    app = getApps()[0];
}

const auth = getAuth(app);
auth.setPersistence(getReactNativePersistence(ReactNativeAsyncStorage));

// Initialize Firestore & Storage if needed
const db = getFirestore(app);
const storage = getStorage(app);


export { app, auth, db, storage };

