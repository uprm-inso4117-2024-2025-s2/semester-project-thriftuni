import React, { useState } from "react";
import { router } from "expo-router";
import {
  View,
  TextInput,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  sendPasswordReset,
  checkRateLimit,
} from "../../firebase/forgot";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async () => {
    setLoading(true);
    setMessage("");
    setError("");
  
    if (!email.trim()) {
      setLoading(false);
      setError("Please enter your email.");
      return;
    }
  
    const rateLimited = checkRateLimit(email);
    if (rateLimited) {
      setLoading(false);
      setError("Too many reset attempts. Please try again later.");
      return;
    }
  
    const result = await sendPasswordReset(email);
  
    if (result.success) {
      setMessage("Password reset link sent. Check your email.");
    } else {
      setError(result.error || "Something went wrong.");
    }
  
    setLoading(false);
    setEmail("");
  };

  return (
    <View style={styles.container} testID="container">
      <Text style={styles.title} testID="title">Reset Password</Text>
      <View testID= "form-test" style={styles.form}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
          placeholderTextColor="#999"
          testID="email-input"
        />
        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
        {message ? <Text style={{ color: "green" }}>{message}</Text> : null}
        {loading ? (
          <ActivityIndicator size="small" testID="loading-indicator" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleResetPassword} testID="reset-button">
            <Text testID="reset-button-text" style={styles.buttonText}>Send Reset Link</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text testID="back-text" style={styles.backText}>
        <Text testID= "link-test" style={styles.link} onPress={() => router.push("./login")}>
          Back to Login
        </Text>
      </Text>
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
    fontSize: 32,
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
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    color: "black",
    fontWeight: "bold",
  },
  backText: {
    marginTop: 15,
  },
});

export default ForgotPasswordScreen;
