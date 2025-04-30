import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import ProtectedRoute from "../../components/ProtectedRoute";


type TabKey = 'favorites' | 'selling';

interface TabConfig {
  key: TabKey;
  label: string;
  count: number;
}

interface ProfileStatsItem {
  label: string;
  value: number;
}

const ProfileHeader: React.FC<{ username: string }> = ({ username }) => (
  <View style={styles.header}>
    <Text style={styles.username}>{username}</Text>
    <View style={styles.headerButtons}>
      <TouchableOpacity>
        <Ionicons name="add-circle-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/settings')}>
        <Ionicons name="menu" size={24} color="black" />
      </TouchableOpacity>
    </View>
  </View>
);

const ProfileStats: React.FC<{ stats: ProfileStatsItem[] }> = ({ stats }) => (
  <View style={styles.profileInfo}>
    <View style={styles.profileImagePlaceholder}>
      <Ionicons name="person-circle-outline" size={80} color="#ccc" />
    </View>
    <View style={styles.stats}>
      {stats.map(({ label, value }) => (
        <View key={label} style={styles.statItem}>
          <Text style={styles.statNumber}>{value}</Text>
          <Text style={styles.infoText}>{label}</Text>
        </View>
      ))}
    </View>
  </View>
);

const TabToggle: React.FC<{
  tabs: TabConfig[];
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}> = ({ tabs, activeTab, onTabChange }) => (
  <View style={styles.toggleButtons}>
    {tabs.map((tab) => (
      <TouchableOpacity
        key={tab.key}
        style={[styles.toggleButton, activeTab === tab.key && styles.activeButton]}
        onPress={() => onTabChange(tab.key)}
      >
        <Text style={activeTab === tab.key ? styles.activeText : undefined}>
          {tab.label}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const ListingsSection: React.FC<{
  activeTab: TabKey;
  tabs: TabConfig[];
}> = ({ activeTab, tabs }) => {
  const activeTabData = tabs.find((tab) => tab.key === activeTab);
  return (
    <View style={styles.listingsContainer}>
      <Text style={styles.listings}>
        {activeTabData?.label} ({activeTabData?.count})
      </Text>
      <TouchableOpacity>
        <Ionicons name="filter" size={24} color="#007bff" />
      </TouchableOpacity>
    </View>
  );
};

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('selling');
  const [username, setUsername] = useState('');
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [reviews, setReviews] = useState(0);
  const [favorites, setFavorites] = useState(0);
  const [listings, setListings] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      const loadProfile = async () => {
        try {
          const storedUsername = await AsyncStorage.getItem('username');
          const storedFavorites = await AsyncStorage.getItem('favorites');
          const storedListings = await AsyncStorage.getItem('listings');

          if (storedUsername) setUsername(storedUsername);
          if (storedFavorites) setFavorites(Number(storedFavorites));
          if (storedListings) setListings(Number(storedListings));
        } catch (error) {
          console.error('Failed to load profile data:', error);
        }
      };

      loadProfile();
    }, [])
  );

  const profile = { website: `thriftuni.com/@${username || 'user'}` };


  // All tab-related configuration is defined here. Adding a new tab would only require extending this array.
  const tabs: TabConfig[] = [
    { key: 'favorites', label: 'Favorites', count: favorites },
    { key: 'selling', label: 'Selling', count: listings },
  ];

  const stats: ProfileStatsItem[] = [
    { label: 'Followers', value: followers },
    { label: 'Following', value: following },
    { label: 'Reviews', value: reviews },
  ];

  return (
    <View style={styles.container}>
      <ProfileHeader username={username || 'Username'} />
      <TabToggle tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <ProfileStats stats={stats} />
      <Text style={styles.website}>
        {profile?.website || `thriftuni.com/@${username || 'user'}`}
      </Text>

      {/* Earnings Button */}
      <TouchableOpacity style={styles.earningsButton} onPress={() => router.push('/earnings')}>
        <Text style={styles.earningsButtonText}>Earnings</Text>
      </TouchableOpacity>

      <ListingsSection activeTab={activeTab} tabs={tabs} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  toggleButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 20,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeButton: {
    backgroundColor: '#007bff',
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    backgroundColor: '#eee',
    marginRight: 20,
  },
  stats: {
    flexDirection: 'row',
    gap: 30,
    marginLeft: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 14,
    color: '#555',
  },
  website: {
    fontSize: 14,
    color: '#007bff',
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listings: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
