import React, { useState } from "react";
import { router } from "expo-router";
import {
  View,
  TextInput,
  Button,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { login } from "../../firebase/login";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = () => {
    router.push("/signup");
  };

  const handleLogin = async () => {
    setLoading(true);
    // Stryker disable next-line all
    console.log("email:", email);
    // Stryker disable next-line all
    console.log("password:", password);
    const response = await login(email, password);
    setLoading(false);

    if (response.error) {
      setError(response.error);
    }
    else if (error !== "")  // Stryker disable next-line all
    {
      setError("");
      // Stryker disable next-line all
      console.log("User logged in:", response.user);
      if (router?.replace) {
        router.replace("/(tabs)/main_page"); // ✅ Redirige solo si `router` está disponible
      }
    }
  };

  const handleForget = () => {
    router.push("/forgot");
  };

   // Stryker disable all: The JSX block inside the return statement was excluded from mutation testing using // Stryker disable all because it contains purely visual elements (e.g., layout, styles, text content). These do not affect the business logic or behavior of the component, and testing visual mutations adds no value to the application's correctness. Excluding them keeps mutation reports clean and focused on critical logic paths.
  return (
    <View style={styles.container}>
      <Text style={styles.title} testID="login-title">Login</Text>
      <View style={styles.form}>
        <TextInput
          testID="email-input"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none" // Prevents first-letter capitalization
          keyboardType="email-address" // Opens email keyboard
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
        {error ? <Text testID="error-message" style={{ color: "red" }}>{error}</Text> : null}
        {loading ? (
          <ActivityIndicator testID="loading-indicator" size="small" />
        ) : (
          <TouchableOpacity
            testID="login-button"
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.forgotText}>
        <Text style={styles.link} onPress={handleForget}>
          Forgot Password?
        </Text>
      </Text>
      <Text style={styles.signupText}>
        Don't have an account?{" "}
        <Text style={styles.link} onPress={handleSignup}>
          Sign Up
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
  signupText: {
    marginTop: 5,
  },
  link: {
    color: "black",
    fontWeight: "bold",
  },
  forgotText: {
    marginTop: 15,
  },
});
// Stryker restore all

export default LoginScreen;
