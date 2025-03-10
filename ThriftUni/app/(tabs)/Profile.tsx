import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';


const Profile: React.FC = () => {
 const [activeTab, setActiveTab] = useState<'favorites' | 'selling'>('selling');


 const profile = {
   username: 'HolaAdios123',
   followers: 0,
   following: 0,
   reviews: 0,
   website: 'thriftuni.com/@HolaAdios123',
   listings: 0,
   favorites: 0,
 };


 return (
   <View style={styles.container}>
     {/* Header */}
     <View style={styles.header}>
       <Text style={styles.username}>{profile.username}</Text>
       <View style={styles.headerButtons}>
         <TouchableOpacity>
           <Ionicons name="add-circle-outline" size={24} color="black" />
         </TouchableOpacity>
         <TouchableOpacity onPress={() => router.push('/settings')}>
           <Ionicons name="menu" size={24} color="black" />
         </TouchableOpacity>
       </View>
     </View>


     {/* Favorites & Selling Buttons */}
     <View style={styles.toggleButtons}>
       <TouchableOpacity
         style={[styles.toggleButton, activeTab === 'favorites' && styles.activeButton]}
         onPress={() => setActiveTab('favorites')}>
         <Text style={activeTab === 'favorites' ? styles.activeText : undefined}>Favorites</Text>
       </TouchableOpacity>
       <TouchableOpacity
         style={[styles.toggleButton, activeTab === 'selling' && styles.activeButton]}
         onPress={() => setActiveTab('selling')}>
         <Text style={activeTab === 'selling' ? styles.activeText : undefined}>Selling</Text>
       </TouchableOpacity>
     </View>
      {/* Profile Info */}
      <View style={styles.profileInfo}>
       <View style={styles.profileImagePlaceholder}>
         <Ionicons name="person-circle-outline" size={80} color="#ccc" />
       </View>
       <View style={styles.stats}>
         <View style={styles.statItem}>
           <Text style={styles.statNumber}>{profile.followers}</Text>
           <Text style={styles.infoText}>Followers</Text>
         </View>
         <View style={styles.statItem}>
           <Text style={styles.statNumber}>{profile.following}</Text>
           <Text style={styles.infoText}>Following</Text>
         </View>
         <View style={styles.statItem}>
           <Text style={styles.statNumber}>{profile.reviews}</Text>
           <Text style={styles.infoText}>Reviews</Text>
         </View>
       </View>
     </View>


     {/* Website Link */}
     <Text style={styles.website}>{profile.website}</Text>


     {/* Listings / Favorites Section */}
     <View style={styles.listingsContainer}>
       <Text style={styles.listings}>
         {activeTab === 'favorites' ? `Favorites (${profile.favorites})` : `Active Listings (${profile.listings})`}
       </Text>
       <TouchableOpacity>
         <Ionicons name="filter" size={24} color="#007bff" />
       </TouchableOpacity>
     </View>
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