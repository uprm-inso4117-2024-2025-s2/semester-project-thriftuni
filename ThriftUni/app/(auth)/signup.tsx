import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { View } from "@/components/Themed";
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

import { router } from "expo-router";

import { firebaseApp } from "../../firebase/firebase.config";

const app = firebaseApp;

const auth = getAuth(app);
const db = getFirestore(app);

export default function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password || !name || !username) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
  
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setLoading(false);
  
      // Send verification email
      await sendEmailVerification(user);
  
      // Save user to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        username,
        email,
        createdAt: new Date(),
        emailVerified: false, // You can update this later based on a listener
      });
  
      // Optionally redirect to login screen
      router.push("/resend");
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", (error as any).message);
    }
  };
  

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address" // Opens email keyboard
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none" // Prevents first-letter capitalization
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#999"
        />
        { loading ? (
          <ActivityIndicator testID="loading-indicator" size="small" />
        ) :
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        }
      </View>
      <Text style={styles.loginText}>
        Already have an account?{" "}
        <Text style={styles.link} onPress={handleLogin}>
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
    backgroundColor: "#F6F9FF",
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
    color: "black",
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
  loginText: {
    marginTop: 20,
  },
  link: {
    color: "black",
    fontWeight: "bold",
  },
});
