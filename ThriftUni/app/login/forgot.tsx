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
import { sendPasswordReset } from "../../firebase/firebase.config";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    const response = await sendPasswordReset(email);
    setLoading(false);

    if (response.error) {
      setError(response.error);
    } else {
      setMessage("Password reset link sent. Check your email.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <View style={styles.form}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
          placeholderTextColor="#999"
        />
        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
        {message ? <Text style={{ color: "green" }}>{message}</Text> : null}
        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Send Reset Link</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.backText}>
        <Text style={styles.link} onPress={() => router.push("/login/login")}>Back to Login</Text>
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
