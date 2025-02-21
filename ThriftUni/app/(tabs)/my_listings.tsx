import { StyleSheet, Pressable, Image, Animated } from 'react-native'
import Svg, { Path } from "react-native-svg";
import { View, Text } from '@/components/Themed';
import React from 'react';

export default function DisplayMyListing() {
  return (
    <View style={styles.container}>
      <View className='Header' style={styles.header}><Text style={styles.header_text}>My Listing</Text></View>
      <View className='Body' style={styles.body}>
        <View className='UpperButtons' style={styles.upper_buttons_container}>
          <Pressable style={styles.upper_button}><Text style={styles.upper_button_text}>All</Text><Svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <Path d="M 9.5 13 A 1.50015 1.50015 0 0 0 8.3066406 15.410156 L 22.806641 34.410156 A 1.50015 1.50015 0 0 0 25.193359 34.410156 L 39.693359 15.410156 A 1.50015 1.50015 0 0 0 38.5 13 L 9.5 13 z M 12.533203 16 L 35.466797 16 L 24 31.025391 L 12.533203 16 z" fill="black" />
          </Svg></Pressable>
          <Pressable style={styles.upper_button}><Text style={styles.upper_button_text}>Edit</Text></Pressable>
        </View>
        <View className='Listings' style={styles.listings}>
          <View className='Listing1' style={styles.card}>
            <Image alt='product image' source={{ uri: 'https://archive.org/download/placeholder-image/placeholder-image.jpg' }} style={styles.image} />
            <View className='Infomation' style={styles.card_information}>
              <Text style={{ fontSize: 25, color: "#000", margin: 5 }}>Lorem Ipsum</Text>
              <Text style={{ fontSize: 15, color: "#000", margin: 5 }}>Details about product</Text>
              <Text style={{ fontSize: 15, color: "#000", margin: 5 }}>$10.05 </Text>
            </View>
            <Text style={{ marginLeft: 'auto', marginRight: 25, fontSize: 10, color: "#000" }} className='Status'>Pending</Text>
          </View>
          <View className='Listing2' style={styles.card}>
            <Image alt='product image' source={{ uri: 'https://archive.org/download/placeholder-image/placeholder-image.jpg' }} style={styles.image} />
            <View className='Infomation' style={styles.card_information}>
              <Text style={{ fontSize: 25, color: "#000", margin: 5 }}>Lorem Ipsum</Text>
              <Text style={{ fontSize: 15, color: "#000", margin: 5 }}>Details about product</Text>
              <Text style={{ fontSize: 15, color: "#000", margin: 5 }}>$5.05 </Text>
            </View>
            <Text style={{ marginLeft: 'auto', marginRight: 25, fontSize: 10, color: "#000" }} className='Status'>Sold</Text>
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
    textAlign: 'center',
    borderBottomColor: '#000',
    borderBottomWidth: 3,
    backgroundColor: 'white',
    color: 'black',
  },
  header_text: {
    fontSize: 35,
    color: 'black',
    textAlign: 'center',

  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: 75,
    backgroundColor: "F6F9FF",
    justifyContent: 'center',
    textAlign: 'center',
  },
  upper_buttons_container: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    margin: 10,
    gap: 200,
    justifyContent: 'center',
    backgroundColor: "#fff",
  },
  upper_button: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,

    borderColor: '#000',
    borderWidth: 3,
    borderRadius: 10,

    textAlign: 'center',
    backgroundColor: "#fff",
  },
  upper_button_text: {
    fontSize: 20,
    color: '#000',
  },


  listings: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 340,
    height: 180,
    margin: 'auto',
    textAlign: 'center',
    gap: 20,
    backgroundColor: "#fff",
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',

    borderColor: "#000",
    borderWidth: 3,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
  },
  card_information: {
    display: 'flex',
    backgroundColor: '#fff',
  },
  card_information_text: {
    fontSize: 15,
    color: "#000",
  },
  image: {
    width: 120,
    height: 120,
    borderRightWidth: 3,
    padding: 20,
  },
});