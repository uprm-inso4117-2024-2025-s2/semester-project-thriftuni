import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LogoutButton from '@/components/LogoutButton'; // Importa el botón de logout
import { getAuth } from 'firebase/auth';

export default function ProfileScreen() {
  const auth = getAuth();
  const user = auth.currentUser; // Obtener datos del usuario autenticado

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {user ? (
        <>
          <Text style={styles.userInfo}>Email: {user.email}</Text>
          <Text style={styles.userInfo}>User ID: {user.uid}</Text>
        </>
      ) : (
        <Text style={styles.userInfo}>No user signed in</Text>
      )}
      <LogoutButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 10,
  },
});
