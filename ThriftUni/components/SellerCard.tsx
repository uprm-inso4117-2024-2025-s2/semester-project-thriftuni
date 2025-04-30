import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export interface Seller {
  name: string;
  location: string;
  about: string;
  onProfilePress: () => void;
}

export default function SellerCard({
  name,
  location,
  about,
  onProfilePress,
}: Seller) {
  return (
    <View style={styles.card}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/60" }} // Placeholder for profile image
          style={styles.profileImage}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.location}>{location}</Text>
        </View>
      </View>

      {/* About Section */}
      <Text style={styles.aboutTitle}>About:</Text>
      <Text style={styles.aboutText}>{about}</Text>

      {/* Visit Profile Button */}
      <TouchableOpacity style={styles.button} onPress={onProfilePress}>
        <Text style={styles.buttonText}>Visit Profile</Text>
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
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  location: {
    fontSize: 14,
    color: "gray",
    fontStyle: "italic",
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
