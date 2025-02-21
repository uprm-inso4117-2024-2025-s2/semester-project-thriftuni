import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const WishlistHeader = () => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backButton}>←</Text>
      </TouchableOpacity>
      <Text style={styles.title}>My Wishlist</Text>
      <TouchableOpacity>
        <Text style={styles.sortButton}>Sort</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  backButton: { fontSize: 24, color: "black" },
  title: { fontSize: 20, fontWeight: "bold" },
  sortButton: { fontSize: 16, color: "blue" },
});

export default WishlistHeader;
