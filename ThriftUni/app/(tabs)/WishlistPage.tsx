import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from "react-native";
import WishlistHeader from "../../components/Wishlist/WishlistHeader";
import WishlistItem from "../../components/Wishlist/WishlistItem";
import WishlistFilter from "../../components/Wishlist/WishlistFilter";

// Define Wishlist Item Type
interface WishlistItemType {
  id: string;
  title: string;
  price: number;
  available: boolean;
  image: any;
}

// Placeholder function to simulate an API call (Replace with Firebase later)
const fetchWishlist = async (): Promise<WishlistItemType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: "1", title: "Tiffany Lamp", price: 50.45, available: true, image: require("../../assets/images/lamp.png") },
        { id: "2", title: "Miffy Pottery Bowl", price: 15.78, available: true, image: require("../../assets/images/bowl.png") },
        { id: "3", title: "Cat Jewelry Box", price: 15.78, available: true, image: require("../../assets/images/jewelry.png") },
        { id: "4", title: "Doe Blanket", price: 25.99, available: false, image: require("../../assets/images/blanket.png") },
      ]);
    }, 1000); // Simulate network delay
  });
};

// Placeholder function for removing an item (Replace with Firebase later)
const removeWishlistItem = async (id: string): Promise<string> => {
  return new Promise((resolve) => setTimeout(() => resolve(id), 500));
};

const WishlistPage = () => {
  // Explicitly define the type of wishlist state
  const [wishlist, setWishlist] = useState<WishlistItemType[]>([]);
  const [filteredWishlist, setFilteredWishlist] = useState<WishlistItemType[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch wishlist items on mount
  useEffect(() => {
    const loadWishlist = async () => {
      setLoading(true);
      const data = await fetchWishlist();
      setWishlist(data);
      setFilteredWishlist(data);
      setLoading(false);
    };

    loadWishlist();
  }, []);

  // Function to apply filter
  const applyFilter = (filterType: string, value: any) => {
    let filteredData = [...wishlist];

    switch (filterType) {
      case "availability":
        filteredData = wishlist.filter((item) =>
          value === "available" ? item.available : !item.available
        );
        break;
      case "price":
        filteredData.sort((a, b) =>
          value === "asc" ? a.price - b.price : b.price - a.price
        );
        break;
      case "name":
        filteredData.sort((a, b) =>
          value === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
        );
        break;
    }

    setFilteredWishlist(filteredData);
  };

  // Function to remove an item
  const handleRemove = async (id: string) => {
    await removeWishlistItem(id);
    const updatedWishlist = wishlist.filter(item => item.id !== id);
    setWishlist(updatedWishlist);
    setFilteredWishlist(updatedWishlist);
  };

  return (
    <View style={styles.container}>
      <WishlistHeader />
      <WishlistFilter onFilterChange={applyFilter} />

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : filteredWishlist.length === 0 ? (
        <Text style={styles.emptyMessage}>Your wishlist is empty</Text>
      ) : (
        <FlatList
          data={filteredWishlist}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <WishlistItem item={item} onRemove={handleRemove} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  emptyMessage: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "gray",
  },
});

export default WishlistPage;
