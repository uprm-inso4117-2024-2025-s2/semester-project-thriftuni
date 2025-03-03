import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface WishlistItemProps {
  item: {
    id: string;
    title: string;
    price: number;
    available: boolean;
    image: any;
  };
  onRemove: (id: string) => void;
}

const WishlistItem: React.FC<WishlistItemProps> = ({ item, onRemove }) => {
  return (
    <View style={[styles.itemContainer, !item.available && styles.unavailable]}>
      {/* Image on the Left */}
      <Image source={item.image} style={styles.image} />

      {/* Item Details & Buttons */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>

        {/* Buttons Aligned to the Right */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeButton} onPress={() => onRemove(item.id)}>
            <Text style={styles.buttonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row", // Makes items appear in a row
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center", // Align items in the center
  },
  unavailable: {
    opacity: 0.5,
  },
  image: {
    width: 120, // Increased size
    height: 120,
    borderRadius: 8,
    marginRight: 15, // Space between image and text/buttons
  },
  infoContainer: {
    flex: 1, // Takes remaining space
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: "red",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start", // Align buttons on the right side
    gap: 10, // Space between buttons
  },
  addButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    flex: 1, // Makes buttons equal width
  },
  removeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    flex: 1, // Makes buttons equal width
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default WishlistItem;
