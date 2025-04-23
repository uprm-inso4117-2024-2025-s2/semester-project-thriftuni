import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Button,
  Platform,
} from "react-native";
import { View } from "@/components/Themed";
import React, { useState, Suspense, useEffect } from "react";
import ProductCard from "@/components/ListingsPage/ProductCard";
import SearchBar from "@/components/ListingsPage/SearchBar";
import FilterMenu from "@/components/ListingsPage/FilterMenu";
import { Seller } from "@/components/SellerCard";
import { db } from "@/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

// FOR DEVELOPMENT PURPOSES ONLY------------------

function getRandomInRange(from: number, to: number, fixed: number): number {
  return parseFloat((Math.random() * (to - from) + from).toFixed(fixed));
  // .toFixed() returns string, so 'parseFloat' is used to convert to number
}

function getRandomImage() {
  return `https://picsum.photos/200?random=${Math.floor(Math.random() * 100)}`;
}

export const dummyData: any[] = [];

const sellerDetails: Seller = {
  name: "Pepe",
  about: "I'm Pepe",
  location: "Mayaguez, Puerto Rico",
  rating: 4.5,
  onProfilePress: () => alert("Profile Clicked"),
};

for (let i = 0; i < 21; i++) {
  const frontImage: string = getRandomImage();
  dummyData.push({
    id: i,
    title: "Product Title",
    price: Math.random() * 100,
    img: frontImage,
    description: "This is a description for a product.",
    pictures: [
      frontImage,
      getRandomImage(),
      getRandomImage(),
      getRandomImage(),
    ],
    sellerInfo: sellerDetails,
    latitude: getRandomInRange(17.9, 18.5, 6), // Latitude range for Puerto Rico
    longitude: getRandomInRange(-67.3, -65.2, 6), // Longitude range for Puerto Rico
  });
}
//---------------------------------

export interface Listings {
  id: number | string;
  title: string;
  price: number;
  description: string;
  image?: string; // For single image from ListItem
  pictures?: string[]; // For multiple images
  category_id: string;
  condition: string;
  color?: string;
  latitude: number;
  longitude: number;
  location: string;
  sellerInfo?: Seller; // Keep for backward compatibility
  user?: any; // Reference to user
  created_at?: any; // Timestamp
}

export default function ListingScreen() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Clear previous data before fetching
        setData([]);
        
        const listingsSnapshot = await getDocs(collection(db, "listings"));
        const listingsData = listingsSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "No Title",
            price: data.price || 0,
            description: data.description || "",
            image: data.image || "",
            pictures: data.image ? [data.image] : [], // Use single image as first in pictures array
            category_id: data.category_id || "other",
            condition: data.condition || "unknown",
            color: data.color || "",
            latitude: data.latitude || 18.2,
            longitude: data.longitude || -67.1,
            location: data.location || "Unknown location",
            created_at: data.created_at
          };
        });

        // After all data is collected, update state once
        setData(listingsData);
        console.log("Fetched data from Firestore:", listingsData.length, "listings");
      } catch (e) {
        console.error("Error fetching listings:", e);
      }
    };
    
    fetchData();
  }, []);

  return (
    <View>
      <View
        style={{
          backgroundColor: "#F6F9FF",
          borderBottomColor: "black",
          borderBottomWidth: 1,
        }}
      >
        <SearchBar setListings={setData} listings={data} />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <FilterMenu setData={setData} data={data} />
        <View style={styles.listingGrid}>
          {data.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F9FF",
    paddingBottom: 80,
  },
  listingGrid: {
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 10,
    paddingVertical: 10,
    backgroundColor: "#F6F9FF",
  },
});
