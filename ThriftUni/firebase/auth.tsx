import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';
import { getAuth, GoogleAuthProvider, signInWithCredential  } from 'firebase/auth';
import { Platform } from 'react-native';
import "./firebase.config";

WebBrowser.maybeCompleteAuthSession();

const auth = getAuth();

export const useGoogleSignIn = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID,
    scopes: ['openid', 'profile', 'email'],
    responseType: "id_token",
  });

  useEffect(() => {
    if (Platform.OS !== 'web') {
      console.warn("Google Sign-In is only available on the web.");
      return;
    }

    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential (auth, credential)
        .then((userCredential) => console.log("Usuario autenticado:", userCredential.user))
        .catch((error) => console.error("Error en la autenticación web:", error.message));
    }
  }, [response]);

  return { request, promptAsync };
};
