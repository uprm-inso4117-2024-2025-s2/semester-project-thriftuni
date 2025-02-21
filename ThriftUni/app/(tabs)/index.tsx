import { StyleSheet, ScrollView, ActivityIndicator, Button, Platform } from 'react-native'
import { View } from '@/components/Themed'
import React, {useState, Suspense} from 'react'
import ProductCard from '@/components/ListingsPage/ProductCard'
import SearchBar from '@/components/ListingsPage/SearchBar';
import FilterMenu from '@/components/ListingsPage/FilterMenu';

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

export interface Listings {
  id: number,
  title: string,
  price: number,
  img: string,
  latitude: string,
  longitude: string,
  category: string,
}


export default function ListingScreen() {
  const [data, setData] = useState<Listings[]>([])
  return (
    <View>
      <View style={{backgroundColor: '#F6F9FF', borderBottomColor: 'black', borderBottomWidth: 1}}>
        <SearchBar />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <FilterMenu setData={setData}/>
          <View style={styles.listingGrid}>
          {dummyData.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
          </View>
      </ScrollView>
    </View>
  )
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
  }
})
