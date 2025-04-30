// firebaseUtils.js
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
  } from "firebase/auth";
  import { doc, setDoc } from "firebase/firestore";
  import { auth, db } from "../firebaseConfig";
  
  export const registerUser = async (name: any, username: any, email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
  
    await sendEmailVerification(user);
  
    await setDoc(doc(db, "users", user.uid), {
      name,
      username,
      email,
      createdAt: new Date(),
      emailVerified: false,
    });
  
    return user;
  };
  