import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import WishlistHeader from "../../components/Wishlist/WishlistHeader";
import WishlistItem from "../../components/Wishlist/WishlistItem";
import WishlistFilter from "../../components/Wishlist/WishlistFilter";

const initialWishlistData = [
  { id: "1", title: "Tiffany Lamp", price: 50.45, available: true, image: require("../../assets/images/lamp.png") },
  { id: "2", title: "Miffy Pottery Bowl", price: 15.78, available: true, image: require("../../assets/images/bowl.png") },
  { id: "3", title: "Cat Jewelry Box", price: 15.78, available: true, image: require("../../assets/images/jewelry.png") },
  { id: "4", title: "Doe Blanket", price: 25.99, available: false, image: require("../../assets/images/blanket.png") },
];

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState(initialWishlistData);
  const [filteredWishlist, setFilteredWishlist] = useState(initialWishlistData);

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
  const handleRemove = (id: string) => {
    const updatedWishlist = wishlist.filter(item => item.id !== id);
    setWishlist(updatedWishlist);
    setFilteredWishlist(updatedWishlist);
  };

  return (
    <View style={styles.container}>
      <WishlistHeader />
      <WishlistFilter onFilterChange={applyFilter} />
      <FlatList
        data={filteredWishlist}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <WishlistItem item={item} onRemove={handleRemove} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
});

export default WishlistPage;
