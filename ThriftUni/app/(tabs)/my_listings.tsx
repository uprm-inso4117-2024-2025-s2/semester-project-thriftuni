import { StyleSheet, Pressable, Image, FlatList } from 'react-native';
import Svg, { Path } from "react-native-svg";
import { View, Text } from '@/components/Themed';
import React, { useState } from 'react';
import ProtectedRoute from "../../components/ProtectedRoute";

export default function DisplayMyListing() {
  const [listings, setListings] = useState([
    { id: '1', name: 'Lorem Ipsum', details: 'Details about product', price: '$10.05', status: 'Pending' },
    { id: '2', name: 'Lorem Ipsum', details: 'Details about product', price: '$5.05', status: 'Sold' }
  ]);
  const [filter, setFilter] = useState('All');
  const [isEditing, setIsEditing] = useState(false);

  const handleFilter = (status: React.SetStateAction<string>) => {
    setFilter(status);
  };

  const handleDelete = (id: string) => {
    setListings((prevListings) => prevListings.filter(listing => listing.id !== id));
  };

  const filteredListings = filter === 'All' ? listings : listings.filter(listing => listing.status === filter);

  return (
  <ProtectedRoute>
    <View style={styles.container}>
      <View style={styles.header}><Text style={styles.header_text}>My Listing</Text></View>
      <View style={styles.body}>
        <View style={styles.upper_buttons_container}>
          <Pressable style={styles.upper_button} onPress={() => handleFilter(filter === 'All' ? 'Sold' : 'All')}>
            <Text style={styles.upper_button_text}>{filter}</Text>
          </Pressable>
          <Pressable style={styles.upper_button} onPress={() => setIsEditing(!isEditing)}>
            <Text style={styles.upper_button_text}>{isEditing ? 'Done' : 'Edit'}</Text>
          </Pressable>
        </View>
        <FlatList
          data={filteredListings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: 'https://archive.org/download/placeholder-image/placeholder-image.jpg' }} style={styles.image} />
              <View style={styles.card_information}>
                <Text style={{ fontSize: 25, color: "#000", margin: 5 }}>{item.name}</Text>
                <Text style={{ fontSize: 15, color: "#000", margin: 5 }}>{item.details}</Text>
                <Text style={{ fontSize: 15, color: "#000", margin: 5 }}>{item.price}</Text>
              </View>
              <Text style={{ marginLeft: 'auto', marginRight: 25, fontSize: 10, color: "#000" }}>{item.status}</Text>
              {isEditing && (
                <Pressable onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                  <Text style={{ color: 'white' }}>Delete</Text>
                </Pressable>
              )}
            </View>
          )}
        />
      </View>
    </View>
  </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    textAlign: 'center',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    backgroundColor: 'white',
  },
  header_text: {
    fontSize: 35,
    color: 'black',
    textAlign: 'center',
  },
  body: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F6F9FF",
  },
  upper_buttons_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: "#F6F9FF",
  },
  upper_button: {
    padding: 10,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  upper_button_text: {
    fontSize: 20,
    color: '#000',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  card_information: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  }
});