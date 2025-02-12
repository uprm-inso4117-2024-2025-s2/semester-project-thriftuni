import { StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import ProductCard from '@/components/ListingsPage/ProductCard'

// FOR DEVELOPMENT PURPOSES ONLY------------------

function getRandomInRange(from: number, to: number, fixed:number) : number {
  return parseFloat((Math.random() * (to - from) + from).toFixed(fixed));
  // .toFixed() returns string, so 'parseFloat' is used to convert to number
}

const dummyData : any[] = [];

for (let i = 0; i < 21; i++) {
  dummyData.push({
    id: i,
    title: "Product Title",
    price: Math.random() * 100,
    img: `https://picsum.photos/200?random=${Math.floor(Math.random() * 100)}`,
    latitude: getRandomInRange(17.9, 18.5, 6), // Latitude range for Puerto Rico
    longitude: getRandomInRange(-67.3, -65.2, 6), // Longitude range for Puerto Rico
  });
}
//---------------------------------

export default function ListingScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {dummyData.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 10,
    backgroundColor: '#F6F9FF',
  }
})