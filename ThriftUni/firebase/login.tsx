import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config";

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (!userCredential.user.emailVerified) {
      return { error: "Please verify your email before logging in." };
    }
    
    return { user: userCredential.user };
  } catch (error: any) {
    let errorMessage = "An error occurred during login.";

    switch (error.code) {
      case "auth/invalid-email":
        errorMessage = "Invalid email format.";
        break;
      case "auth/user-not-found":
        errorMessage = "No account found with this email.";
        break;
      case "auth/wrong-password":
        errorMessage = "Incorrect password. Please try again.";
        break;
      case "auth/user-disabled":
        errorMessage = "This account has been disabled.";
        break;
    }

    return { error: errorMessage };
  }
};
