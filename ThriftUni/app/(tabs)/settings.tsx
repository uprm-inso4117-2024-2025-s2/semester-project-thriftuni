import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function SettingsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F6F9FF' }}>
      {/* Settings list */}
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>My account</Text>
        </View>

        {/* Settings list */}
        <View style={styles.settingsList}>
          {/* Navigate to Profile screen */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => router.push('/(tabs)/Profile')}
          >
            <Text style={styles.settingText}>Profile</Text>
            <FontAwesome name="chevron-right" size={18} color="black" style={styles.tileIcon} />
          </TouchableOpacity>

          {/* Navigate to Two-factor authentication screen */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.settingText}>Two-factor authentication</Text>
            <FontAwesome name="chevron-right" size={18} color="black" style={styles.tileIcon} />
          </TouchableOpacity>

          {/* Navigate to Interests and Sizes screen */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => router.push('/(tabs)/interestsandsizes')}
          >
            <Text style={styles.settingText}>Interest and Sizes</Text>
            <FontAwesome name="chevron-right" size={18} color="black" style={styles.tileIcon} />
          </TouchableOpacity>

          {/* Navigate to Preferences screen */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => router.push('/(tabs)/preferences')}
          >
            <Text style={styles.settingText}>Preferences</Text>
            <FontAwesome name="chevron-right" size={18} color="black" style={styles.tileIcon} />
          </TouchableOpacity>

          {/* Navigate to Privacy screen */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => router.push('/(tabs)/privacy')}
          >
            <Text style={styles.settingText}>Privacy</Text>
            <FontAwesome name="chevron-right" size={18} color="black" style={styles.tileIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>Sell</Text>
        </View>
        <View style={styles.settingsList}>
          {/* Navigate to Sell screen */}
          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => router.push('/(tabs)/my_listings')}
          >
            <Text style={styles.settingText}>Sell an item on ThriftUni</Text>
            <FontAwesome name="chevron-right" size={18} color="black" style={styles.tileIcon} />
          </TouchableOpacity>

          {/* Logout button */}
          <View style={styles.logoutContainer}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => {
                // Handle logout logic here
                console.log('User logged out');
                router.push('/login'); // Redirect to login screen after logout
              }}
            >
              <FontAwesome
                name="sign-out"
                size={18}
                color="white"
                style={{ position: 'absolute', left: 22, bottom: 12 }}
              />
              <Text style={styles.logoutText}>Logout</Text>
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
  logoutContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#000',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 4,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 16,
  },
});

