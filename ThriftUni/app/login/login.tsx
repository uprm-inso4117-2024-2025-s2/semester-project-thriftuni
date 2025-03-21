import React, { useState } from "react";
import {router} from "expo-router";
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
    router.push("/login/signup");
    };

  const handleLogin = async () => {
    setLoading(true);
    console.log("email:", email);
    console.log("password:", password);
    const response = await login(email, password);
    setLoading(false);

    if (response.error) {
      setError(response.error);
    } else {
      console.log("User logged in:", response.user);
      router.replace("/(tabs)/main_page"); // ✅ Redirige a main_page después del login
    }
  };

  const handleForget = () => {
    router.push("/login/forgot");
  }

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.form}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none" // Prevents first-letter capitalization
          keyboardType="email-address" // Opens email keyboard
          style={styles.input}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#999"
        />
        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
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

export default LoginScreen;
