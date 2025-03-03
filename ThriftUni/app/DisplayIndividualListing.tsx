import { StyleSheet, ScrollView, Dimensions } from "react-native";
import { View, Text } from "@/components/Themed";
import React from "react";
import ListingDescription, {
  ListingDetails,
} from "../components/ListingDescription";
import ProductImages from "../components/ProductImages";
import { useLocalSearchParams } from "expo-router";

export default function DisplayIndividualListing() {
  const params = useLocalSearchParams();

  // Ensure all parameters are strings
  const title: string = Array.isArray(params.title)
    ? params.title.join(" ")
    : params.title || "No title";
  const price: string = Array.isArray(params.price)
    ? params.price.join(" ")
    : params.price || "0";
  const pictures: string[] =
    typeof params.images === "string" ? JSON.parse(params.images) : [];
  const sellerName: string = Array.isArray(params.sellerName)
    ? params.sellerName.join(" ")
    : params.sellerName || "Unknown";
  const sellerLocation: string = Array.isArray(params.sellerLocation)
    ? params.sellerLocation.join(" ")
    : params.sellerLocation || "Unknown";
  const sellerBio: string = Array.isArray(params.sellerBio)
    ? params.sellerBio.join(" ")
    : params.sellerBio || "No bio available";
  const description: string = Array.isArray(params.description)
    ? params.description.join(" ")
    : params.description || "No description available";
  const latitude: string = Array.isArray(params.latitude)
    ? params.latitude.join(" ")
    : params.latitude || "0";
  const longitude: string = Array.isArray(params.longitude)
    ? params.longitude.join(" ")
    : params.longitude || "0";

  const additionalDescription: ListingDetails = {
    sellerName: sellerName,
    sellerLocation: sellerLocation,
    sellerBio: sellerBio,
    description: description,
    price: price,
    latitude: latitude,
    longitude: longitude,
  };

  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.listingTitle}>{title}</Text>
        <ProductImages images={pictures} />
        <ListingDescription {...additionalDescription} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    padding: 16,
  },
  slider: {
    paddingRight: 16,
  },
  listingTitle: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 15,
    marginTop: 10,
    color: "black",
    fontStyle: "italic",
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  sellerName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "black",
  },
  sellerBio: {
    fontSize: 16,
    color: "gray",
  },
});
