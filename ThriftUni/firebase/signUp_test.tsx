import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "./firebase.config";

export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await sendEmailVerification(user);

    return { user }; // ✅ Return the user object so you can check it if needed
  } catch (error: any) {
    let errorMessage = "An error occurred during sign-up."; // ✅ correct message

    switch (error.code) {
      case "auth/invalid-email":
        errorMessage = "Invalid email format.";
        break;
      case "auth/email-already-in-use":
        errorMessage = "This email is already registered.";
        break;
      case "auth/weak-password":
        errorMessage = "Password is too weak.";
        break;
      default:
        console.error("Unexpected error during sign up:", error);
    }

    return { error: errorMessage };
  }
};
