import React, { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// Imports for setting up Firestore collections (currently commented out)
// import CreateFirestoreCollections from '../../db-setup';
import { Slot } from 'expo-router';

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string; }) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const systemScheme = useColorScheme();
  // Use a state hook to override the theme: 'light', 'dark', or 'blue'
  const [theme, setTheme] = useState<'light' | 'dark' | 'blue'>(systemScheme || 'light');

  // Function to cycle through the themes in order: light -> dark -> blue -> light
  const cycleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : prev === 'dark' ? 'blue' : 'light'));
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Theme Switcher Button */}
      <View style={{ height: 50 }} />
      <View style={styles.themeSwitcher}>
        <TouchableOpacity onPress={cycleTheme} style={styles.switcherButton}>
          <Text style={styles.switcherText}>Theme: {theme.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
      <Tabs
        screenOptions={{
          tabBarActiveBackgroundColor: Colors[theme].background,
          tabBarInactiveBackgroundColor: Colors[theme].background,
          tabBarInactiveTintColor: Colors[theme].tabIconDefault,
          tabBarActiveTintColor: Colors[theme].tint,
          headerShown: useClientOnlyValue(false, false),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Browse',
            tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          }}
        />
        <Tabs.Screen
          name="ListItem"
          options={{
            title: 'List an item',
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          }}
        />
        <Tabs.Screen
          name="my_listings"
          options={{
            title: 'My Listing',
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
        <Tabs.Screen
          name="WishlistPage"
          options={{
            title: 'Wishlist',
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  themeSwitcher: {
    padding: 10,
    alignItems: 'flex-start',
    backgroundColor: '#F6F9FF',
  },
  switcherButton: {
    backgroundColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  switcherText: {
    color: '#FFF',
    fontSize: 14,
  },
});