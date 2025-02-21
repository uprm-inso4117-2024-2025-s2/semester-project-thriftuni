import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { logout } from '@/utils/logout';

const LogoutButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          onPress: async () => {
            setLoading(true);
            try {
              await logout();
              setLoading(false);
              router.replace('/login'); // Redirigir al login después del logout
            } catch (error) {
              setLoading(false);
              Alert.alert("Error", (error as Error).message || "Failed to log out. Please try again.");
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        {loading ? <ActivityIndicator color="white" style={styles.loader} /> : null}
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  button: {
    backgroundColor: "#ff4444",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "white",
    textAlign: "center"
  },
  loader: {
    marginRight: 10
  }
});

export default LogoutButton;
