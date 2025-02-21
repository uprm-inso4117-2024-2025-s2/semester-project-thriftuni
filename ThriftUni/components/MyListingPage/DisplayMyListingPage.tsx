import { StyleSheet, Pressable, Image, Animated } from 'react-native'

import { View, Text } from '@/components/Themed';
import React from 'react';


export default function DisplayMyListing() {
  return (
    <View style={styles.container}>
      <View className='Header' style={styles.header}>My Listing</View>
      <View className='Body' style={styles.body}>
        <View className='UpperButtons' style={styles.upper_button_container}>
          <Pressable style={styles.upper_button}>All <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
            <path d="M 9.5 13 A 1.50015 1.50015 0 0 0 8.3066406 15.410156 L 22.806641 34.410156 A 1.50015 1.50015 0 0 0 25.193359 34.410156 L 39.693359 15.410156 A 1.50015 1.50015 0 0 0 38.5 13 L 9.5 13 z M 12.533203 16 L 35.466797 16 L 24 31.025391 L 12.533203 16 z"></path>
          </svg></Pressable>
          <Pressable style={styles.upper_button}>Edit</Pressable>
        </View>
        <View className='Listings' style={styles.listings}>
          <View className='Listing1' style={styles.card}>
            <Image alt='product image' source={{ uri: 'https://archive.org/download/placeholder-image/placeholder-image.jpg' }} style={styles.image} />
            <View className='Infomation' style={{ marginLeft: 50 }}>
              <Text style={{ fontSize: 25 }}>Lorem Ipsum</Text>
              <Text style={{ fontSize: 20 }}> Details about product</Text>
              <Text style={{ fontSize: 20 }}> $10.05 </Text>
            </View>
            <Text style={{ marginLeft: 'auto', marginRight: 25 }} className='Status'>Pending</Text>
          </View>
          <View className='Listing2' style={styles.card}>
            <Image alt='product image' source={{ uri: 'https://archive.org/download/placeholder-image/placeholder-image.jpg' }} style={styles.image} />
            <View className='Infomation' style={{ marginLeft: 50 }}>
              <Text style={{ fontSize: 25 }}>Lorem Ipsum</Text>
              <Text style={{ fontSize: 20 }}> Details about product</Text>
              <Text style={{ fontSize: 20 }}> $5.05 </Text>
            </View>
            <Text style={{ marginLeft: 'auto', marginRight: 25 }} className='Status'>Sold</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 40,
    textAlign: 'center',
    borderBottomColor: '#000',
    borderBottomWidth: 5,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: "F6F9FF",
    justifyContent: 'center',
    textAlign: 'center',
  },
  upper_button_container: {
    display: 'flex',
    flexDirection: 'row',
    margin: 100,
    gap: 500,
    justifyContent: 'center',
  },
  upper_button: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 33,
    padding: 10,
    borderColor: '#000',
    borderWidth: 5,
    borderRadius: 10,
    textAlign: 'center'
  },
  listings: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 720,
    height: 180,
    marginLeft: 50,
    marginRight: 50,
    textAlign: 'center',
    gap: 30,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: "#000",
    borderWidth: 5,
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRightWidth: 5,
    padding: 20,

  },
});