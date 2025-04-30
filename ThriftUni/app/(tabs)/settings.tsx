import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { signOut } from "firebase/auth";
import { auth } from '@/firebaseConfig';
import { deleteUser } from "firebase/auth";

export default function SettingsScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: '#F6F9FF' }}>
      {/* Settings list */}
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>My account</Text>
        </View>

        {/* Settings list */}
        <View style={styles.settingsList}>
          {/* My account */}
          <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/user_system')}>
            <Text style={styles.settingText}>Profile</Text>
            <FontAwesome name="chevron-right" size={18} color="black" style={styles.tileIcon} />
          </TouchableOpacity>


          <TouchableOpacity style={styles.settingItem} onPress={() => {/* navigate to 2FA screen */}}>
            <Text style={styles.settingText}>Two-factor authentication</Text>
            <FontAwesome name="chevron-right" size={18} color="black" style={styles.tileIcon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/settings')}></TouchableOpacity>
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => router.push('/(tabs)/interestsandsizes')} // cast to 'never' if TS complains
          >
            <Text style={styles.settingText}>Interest and Sizes</Text>
            <FontAwesome name="chevron-right" size={18} color="black" style={styles.tileIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={() => {/* navigate to Preferences */}}>
            <Text style={styles.settingText}>Preferences</Text>
            <FontAwesome name="chevron-right" size={18} color="black" style={styles.tileIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={() => {/* navigate to Privacy */}}>
            <Text style={styles.settingText}>Privacy</Text>
            <FontAwesome name="chevron-right" size={18} color="black" style={styles.tileIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>Sell</Text>
        </View>
        <View style={styles.settingsList}>
          <TouchableOpacity style={styles.settingItem} onPress={() => {/* navigate to Sell screen */}}>
            <Text style={styles.settingText}>Sell an item on ThriftUni</Text>
            <FontAwesome name="chevron-right" size={18} color="black" style={styles.tileIcon} />
          </TouchableOpacity>
          {/* Logout button */}
          <View style={styles.logoutContainer}>
            <TouchableOpacity style={styles.logoutButton} onPress={async () => {
              await signOut(auth);
              router.replace('/(auth)');
            }}>
            <FontAwesome name="sign-out" size={18} color="white" style={{position: 'absolute', left: 22, bottom: 12}} />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
            {/* Delete Account button */}
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={async () => {
                try {
                  const user = auth.currentUser;
                  if (user) {
                    await deleteUser(user);
                    router.replace("/(auth)");
                  } else {
                    alert("No user is currently signed in.");
                  }
                } catch (error: any) {
                  if (error.code === "auth/requires-recent-login") {
                    alert("Please log in again before deleting your account.");
                  } else {
                    alert("Error deleting account: " + error.message);
                  }
                }
              }}
            >
              <FontAwesome name="trash" size={18} color="white" style={{ position: "absolute", left: 22, bottom: 12 }} />
              <Text style={styles.logoutText}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F9FF',
    paddingBottom: 80,
  },
  tileIcon: {
    position: 'absolute',
    right: 16,
    marginTop: 16,
  },
  subHeader: {
    paddingLeft: 12,
    paddingTop: 16,
  },
  subHeaderText: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: -10,
  },
  settingsList: {
    paddingHorizontal: 16,
    paddingVertical: 2,
  },
  settingItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  settingText: {
    fontSize: 18,
    color: '#000',
  },
  linkText: {
    fontSize: 14,
    color: 'blue',
    marginTop: 4,
  },
  logoutContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#000',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 4,
    marginBottom: 20
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 16,
  },
  deleteButton: {
    backgroundColor: '#000',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 4,
    marginBottom: 20
  },
});

