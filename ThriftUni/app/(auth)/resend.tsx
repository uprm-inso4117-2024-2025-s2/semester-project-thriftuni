import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { getAuth, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { firebaseApp, auth } from "../../firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";

const ResendVerificationScreen = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleResendVerification = async () => {
    setLoading(true);
    setMessage("");
    setIsSuccess(false);

    try {
      const user = auth.currentUser;
      if (!user?.emailVerified) {
        // Send verification email
        if (user) {
          await sendEmailVerification(user);
        } else {
          throw new Error("No user is currently signed in.");
        }
        setMessage("Verification email sent successfully! Please check your inbox.");
        setIsSuccess(true);
      } else {
        setMessage("Your email is already verified. You can now login.");
        setIsSuccess(true);
      }
    } catch (error: any) {
      // Handle specific authentication errors
      let errorMessage = "Failed to send verification email. Please try again.";
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = "No account found with this email.";
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = "Incorrect password.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Invalid email format.";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many attempts. Please try again later.";
      }
      
      setMessage(errorMessage);
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const user = auth.currentUser;
      if (user) {
        await user.reload(); // 🔄 Refresh user state from Firebase
        if (user.emailVerified) {
          clearInterval(intervalId); // 🛑 Stop checking
          router.replace("/(tabs)"); // ✅ Navigate to your main/home screen
        }
      }
    }, 3000); // ⏱️ Check every 3 seconds
  
    return () => clearInterval(intervalId); // ✅ Cleanup when component unmounts
  }, []);

  const handleGoToLogin = () => {
    router.push("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Verification Email Sent
      </Text>
      <Text style={styles.text}>
        Please check your inbox to verify your email before logging in.
      </Text>
      <View style={styles.form}>
        {message ? (
          <Text testID="message" style={isSuccess ? styles.successMessage : styles.errorMessage}>
            {message}
          </Text>
        ) : null}

        {loading ? (
          <ActivityIndicator testID="loading-indicator" size="small" style={styles.loading} />
        ) : (
          <TouchableOpacity
            testID="resend-button"
            style={styles.button}
            onPress={handleResendVerification}
          >
            <Text style={styles.buttonText}>Resend Verification</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F9FF",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Calibri",
  },
  text: {
    fontSize: 16,
    marginBottom: 10, 
    fontFamily: "Calibri",
  },
  form: {
    width: "100%",
    maxWidth: 400,
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    backgroundColor: "#F6F9FF",
    fontFamily: "Calibri",
  },
  button: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  successMessage: {
    color: "green",
    marginTop: 10,
    textAlign: "center",
  },
  loading: {
    marginTop: 15,
  },
  backLink: {
    marginTop: 20,
  },
  link: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ResendVerificationScreen;