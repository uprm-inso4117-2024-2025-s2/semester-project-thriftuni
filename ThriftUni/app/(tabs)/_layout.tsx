import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

import ProductCard from '@/components/ListingsPage/ProductCard';
import SearchBar from '@/components/ListingsPage/SearchBar';
import FilterMenu from '@/components/ListingsPage/FilterMenu';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import Colors from '@/constants/Colors';
import { testFirebaseConfig } from '../../firebase.config';

// FOR DEVELOPMENT PURPOSES ONLY------------------
function getRandomInRange(from: number, to: number, fixed: number): number {
  return parseFloat((Math.random() * (to - from) + from).toFixed(fixed));
}

const dummyData: any[] = [];
for (let i = 0; i < 21; i++) {
  dummyData.push({
    id: i,
    title: 'Product Title',
    price: Math.random() * 100,
    img: `https://picsum.photos/200?random=${Math.floor(Math.random() * 100)}`,
    latitude: getRandomInRange(17.9, 18.5, 6),
    longitude: getRandomInRange(-67.3, -65.2, 6),
  });
}
//---------------------------------

export interface Listings {
  id: number;
  title: string;
  price: number;
  img: string;
  latitude: string;
  longitude: string;
  category: string;
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

function ListingsScreen() {
  const [data, setData] = useState<Listings[]>([]);
  testFirebaseConfig();

  return (
    <View>
      <View style={{ backgroundColor: '#F6F9FF', borderBottomColor: 'black', borderBottomWidth: 1 }}>
        <SearchBar />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <FilterMenu setData={setData} />
        <View style={styles.listingGrid}>
          {dummyData.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </View>

        {/* Link to authentication screen */}
        <Link href="/authentication" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Go to Two-Factor Authentication</Text>
          </TouchableOpacity>
        </Link>
      </ScrollView>
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Browse',
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
        component={ListingsScreen}
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
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F9FF',
    paddingBottom: 80,
  },
  listingGrid: {
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 10,
    backgroundColor: '#F6F9FF',
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
