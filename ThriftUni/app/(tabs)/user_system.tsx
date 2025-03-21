import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function UserProfileScreen() {
  const navigation = useNavigation();
  
  // State for profile fields
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [bio, setBio] = useState('');

  // Username validation
  const [isUsernameValid, setIsUsernameValid] = useState<boolean | null>(null); // null, true, or false
  const existingUsernames = ['fulano1', 'user123', 'johnDoe']; // Simulated database

  // Load profile when screen mounts
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        const storedFirstName = await AsyncStorage.getItem('firstName');
        const storedLastName = await AsyncStorage.getItem('lastName');
        const storedBirthdate = await AsyncStorage.getItem('birthdate');
        const storedBio = await AsyncStorage.getItem('bio');

        if (storedUsername) setUsername(storedUsername);
        if (storedFirstName) setFirstName(storedFirstName);
        if (storedLastName) setLastName(storedLastName);
        if (storedBirthdate) setBirthdate(storedBirthdate);
        if (storedBio) setBio(storedBio);
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    loadProfile();
  }, []);

  // Check username availability
  const checkUsernameAvailability = (text: string) => {
    setUsername(text);
    setIsUsernameValid(!existingUsernames.includes(text));
  };

  // Save profile
  const saveProfile = async () => {
    if (!isUsernameValid) return; // Prevent saving if username is taken

    try {
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('firstName', firstName);
      await AsyncStorage.setItem('lastName', lastName);
      await AsyncStorage.setItem('birthdate', birthdate);
      await AsyncStorage.setItem('bio', bio);
      navigation.goBack();
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Edit Profile</Text>

      {/* Username Input with Validation */}
      <Text style={styles.label}>Username</Text>
      <View style={styles.inputContainer}>
        <TextInput 
          style={[
            styles.input, 
            isUsernameValid === false ? styles.inputError : isUsernameValid ? styles.inputValid : null
          ]}
          value={username}
          onChangeText={checkUsernameAvailability}
        />
        {isUsernameValid !== null && (
          <Ionicons 
            name={isUsernameValid ? 'checkmark-circle' : 'close-circle'}
            size={24} 
            color={isUsernameValid ? 'green' : 'red'} 
            style={styles.icon}
          />
        )}
      </View>
      {isUsernameValid === false && (
        <Text style={styles.errorText}>A user with that username already exists.</Text>
      )}

      {/* First Name */}
      <Text style={styles.label}>First Name</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />
      </View>

      {/* Last Name */}
      <Text style={styles.label}>Last Name</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />
      </View>

      {/* Birthdate */}
      <Text style={styles.label}>Birthdate</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} value={birthdate} onChangeText={setBirthdate} />
      </View>

      {/* Bio */}
      <Text style={styles.label}>Bio</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} value={bio} onChangeText={setBio} />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  backButton: { marginBottom: 20 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', position: 'relative' }, // Keeps all inputs consistent
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 8, 
    borderRadius: 5, 
    marginTop: 5, 
    width: '100%' // Ensures uniform width for all inputs
  },
  inputValid: { borderColor: 'green', color: 'green' },
  inputError: { borderColor: 'red', color: 'red' },
  icon: { position: 'absolute', right: 10, top: 12 },
  errorText: { color: 'red', fontSize: 14, marginTop: 5 },
  saveButton: { backgroundColor: 'black', padding: 10, marginTop: 20, alignItems: 'center' },
  saveText: { color: 'white', fontSize: 18 },
});

