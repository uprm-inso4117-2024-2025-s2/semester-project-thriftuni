import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD7EBLPezmrBujRy58eLzmAV1jeKTUrPoQ",
  authDomain: "thriftuni-b345a.firebaseapp.com",
  projectId: "thriftuni-b345a",
  storageBucket: "thriftuni-b345a.firebasestorage.app",
  messagingSenderId: "501062585933",
  appId: "1:501062585933:web:7bb28a9b3f4f2f61a3d604",
  measurementId: "G-MCWKZZQPTP"
};

const app = initializeApp(firebaseConfig);

export { app };
