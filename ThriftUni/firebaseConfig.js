import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyD7EBLPezmrBujRy58eLzmAV1jeKTUrPoQ",
  authDomain: "thriftuni-b345a.firebaseapp.com",
  databaseURL: "https://thriftuni-b345a-default-rtdb.firebaseio.com",
  projectId: "thriftuni-b345a",
  storageBucket: "thriftuni-b345a.appspot.com",
  messagingSenderId: "501062585933",
  appId: "1:501062585933:web:7bb28a9b3f4f2f61a3d604",
  measurementId: "G-MCWKZZQPTP"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export { app, auth, db, storage };
