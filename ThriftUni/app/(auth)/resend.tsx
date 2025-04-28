import React, { useState } from "react";
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
import { firebaseApp } from "../../firebase/firebase.config";

const auth = getAuth(firebaseApp);

const ResendVerificationScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleResendVerification = async () => {
    if (!email || !password) {
      setMessage("Please enter both email and password");
      setIsSuccess(false);
      return;
    }

    setLoading(true);
    setMessage("");
    setIsSuccess(false);

    try {
      // Sign in to get the user object
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        // Send verification email
        await sendEmailVerification(user);
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

  const handleGoToLogin = () => {
    router.push("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resend Verification Email</Text>
      <View style={styles.form}>
        <TextInput
          testID="email-input"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TextInput
          testID="password-input"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#999"
        />
        
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
      
      <TouchableOpacity onPress={handleGoToLogin} style={styles.backLink}>
        <Text style={styles.link}>Back to Login</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
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