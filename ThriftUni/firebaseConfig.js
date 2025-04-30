import { initializeApp } from "firebase/app";
import {
 initializeAuth,
 getReactNativePersistence
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
 apiKey: "AIzaSyBliTLyyqHam9ei-900BYyt-y4ZGoowrEk",
 authDomain: "thriftuni-b345a.firebase.com",
 projectId: "thriftuni-b345a",
 storageBucket: "thriftuni-b345a.firebasestorage.app",
 messagingSenderId: "501062585933",
 appId: "1:501062585933:android:11ca96ded2177956a3d604",
 appID: "1:501062585933:ios:22353406f954b406a3d604",
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

