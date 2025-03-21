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
import Colors from "@/constants/Colors";
import { useColorScheme } from '@/components/useColorScheme';
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";

// FOR DEVELOPMENT PURPOSES ONLY------------------
function getRandomInRange(from: number, to: number, fixed: number): number {
  return parseFloat((Math.random() * (to - from) + from).toFixed(fixed));
}

function getRandomImage() {
  return `https://picsum.photos/200?random=${Math.floor(Math.random() * 100)}`;
}

export const dummyData: any[] = [];

const sellerDetails: Seller = {
  name: "Pepe",
  about: "I'm Pepe",
  rating: 4.5,
  location: "Mayaguez, Puerto Rico",
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
  listing_id: string;
  title: string;
  price: number;
  img: string;
  description: string;
  pictures: string[];
  sellerInfo: Seller;
  latitude: number;
  longitude: number;
  category: string;
}

export default function ListingScreen() {
  const theme = useColorScheme(); // 'light' or 'dark' (or 'blue' if your hook supports it)
  const [data, setData] = useState<Listings[]>([]);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsCollection = collection(db, "listings");
        const querySnapshot = await getDocs(listingsCollection);
        const ImagesCollection = collection(db, "listing_images");
        if (querySnapshot.empty) {
          console.log("No documents found in listings collection");
          return;
        }



        
        const listings: any[] = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          listings.push({ listing_id: doc.id, ...doc.data(), sellerInfo: sellerDetails, img: getRandomImage() });
        });
        
        setData(listings);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };
    
    fetchListings();
  }, [db]); // Only re-run if db changes
  
  return (
    <View>
      <View
        style={{
          backgroundColor: "#F6F9FF",
          borderBottomColor: "black",
          borderBottomWidth: 1,
        }}
      >
        <SearchBar />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
      <FilterMenu setData={setData} data={data} />
      <View style={styles.listingGrid}>
          {dummyData.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors[useColorScheme() || 'light'].background,
    paddingBottom: 80,
    minHeight: "100%",
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