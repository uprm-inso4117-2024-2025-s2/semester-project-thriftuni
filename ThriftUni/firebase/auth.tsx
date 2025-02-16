import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Platform } from "react-native";
import "./firebase.config";

const auth = getAuth();

export const useGoogleSignIn = () => {
  return async () => {
    if (Platform.OS !== "web") {
      console.warn("Google Sign-In is only available on the web.");
      return;
    }

    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Usuario autenticado:", result.user);
    } catch (error) {
      console.error("Error en la autenticación web:", error);
    }
  };
};
