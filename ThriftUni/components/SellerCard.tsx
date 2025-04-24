import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export interface Seller {
  name: string;
  email?: string;
  location: string;
  about: string;
  rating: number;
  onProfilePress: () => void;
}

export default function SellerCard({
  name,
  email,
  location,
  about,
  rating,
  onProfilePress,
}: Seller) {
  return (
    <View style={styles.card}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: "https://picsum.photos/60" }} // Placeholder for profile image
          style={styles.profileImage}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name}</Text>
          {email && <Text style={styles.email}>{email}</Text>}
          <Text style={styles.location}>{location}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{rating.toFixed(1)}</Text>
          </View>
        </View>
      </View>

      {/* About Section - Simplified */}
      <Text style={styles.aboutTitle}>About:</Text>
      <Text style={styles.aboutText}>{about}</Text>

      {/* Contact Seller Button */}
      <TouchableOpacity style={styles.button} onPress={onProfilePress}>
        <Text style={styles.buttonText}>Contact Seller</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 15,
    margin: 10,
    elevation: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ddd",
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  location: {
    fontSize: 14,
    color: "gray",
    fontStyle: "italic",
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  rating: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  aboutTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 5,
    fontStyle: "italic",
  },
  aboutText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#333",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    fontStyle: "italic",
  },
});
