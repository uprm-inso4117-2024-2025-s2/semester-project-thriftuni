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
import { login } from "../../firebase/login";
import { useRouter } from "expo-router";
import { sendEmailVerification } from "firebase/auth";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSignup = () => {
    router.push("/signup");
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await login(email, password);
      setLoading(false);

      if (response.error) {
        setError(response.error);
      } else {
        const user = response.user;

        if (user && !user.emailVerified) {
          setError("Please verify your email. Didn't receive it? Resend below.");
          return;
        }

        if (router?.replace) {
          router.replace("/(tabs)/main_page");
        }
      }
    } catch (err) {
      setLoading(false);
      setError("An unexpected error occurred.");
    }
  };

  const handleResendVerification = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await login(email, password);
      const user = response.user;

      if (user && !user.emailVerified) {
        await sendEmailVerification(user);
        setError("Verification email sent. Check your inbox!");
      }
    } catch (err) {
      setError("Unable to resend verification. Try again.");
    }

    setLoading(false);
  };

  const handleForget = () => {
    router.push("/forgot");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} testID="login-title">
        Login
      </Text>
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
        {error ? (
          <Text testID="error-message" style={{ color: "red" }}>
            {error}
          </Text>
        ) : null}
        {error?.includes("verify your email") && (
          <TouchableOpacity onPress={handleResendVerification}>
            <Text style={[styles.link, { marginTop: 10 }]}>
              Resend Verification Email
            </Text>
          </TouchableOpacity>
        )}
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

export default LoginScreen;
