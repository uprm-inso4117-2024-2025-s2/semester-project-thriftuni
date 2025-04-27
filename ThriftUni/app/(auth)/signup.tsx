import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  View
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { registerUser } from "../../firebase/signup"; // 👈 Updated path

export default function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!email || !password || !name || !username) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    try {
      await registerUser(name, username, email, password);
      Alert.alert(
        "Verification Email Sent",
        "Please check your inbox to verify your email before logging in."
      );
      router.push("/login");
    } catch (error) {
      Alert.alert("Error", (error as any).message);
    }
  };
  return (
    <View testID= "container-test" style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View testID= "form-test" style={styles.form}>
        <TextInput
          testID="name-input"
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          testID="username-input"
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          testID="email-input"
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address" // Opens email keyboard
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none" // Prevents first-letter capitalization
        />
        <TextInput
          testID="password-input"
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity testID="signup-button" style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <Text testID="have-account" style={styles.loginText}>
      Already have an account?
        <Text style={styles.link} onPress={() => {}}>
          Login
        </Text>
      </Text>
    </View>
  );
}

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
    borderRadius: 15,
    backgroundColor: "#F6F9FF",
    fontFamily: "Calibri",
  },

  button: {
    backgroundColor: "#F45D5D",
    padding: 12,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  loginText: {
    marginTop: 20,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
});
