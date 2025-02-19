import { StyleSheet, ScrollView, ActivityIndicator, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { View } from '@/components/Themed';
import React, { useState } from 'react';

export default function Signup() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Name" />
        <TextInput style={styles.input} placeholder="Username" />
        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry />
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.loginText}>
        Already have an account? <Text style={styles.link} onPress={() => {}}>Login</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Calibri'
  },
  form: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#F6F9FF',
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    backgroundColor: '##F6F9FF',
    fontFamily: 'Calibri',
  },
  button: {
    backgroundColor: '#F45D5D',
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
    fontFamily: 'Calibri',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Calibri',
  },
  loginText: {
    marginTop: 20,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});