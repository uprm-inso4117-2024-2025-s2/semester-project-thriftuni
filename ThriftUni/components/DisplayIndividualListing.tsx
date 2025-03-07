import { StyleSheet, ScrollView, Dimensions } from "react-native";
import { View, Text } from "@/components/Themed";
import React from "react";
import ListingDescription from "./ListingDescription";
import ProductCard from "./ListingsPage/ProductCard";
import ProductImages from "./ProductImages";
import { Seller } from "./SellerCard";

export interface ListingDetails {
  title: string;
  pictures: string[];
  description: string;
  sellerDetails: Seller;
}

export default function DisplayIndividualListing({
  title,
  pictures,
  description,
  sellerDetails,
}: ListingDetails) {
  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.listingTitle}>{title}</Text>
        <ProductImages images={pictures} />
        <ListingDescription
          description={description}
          sellerDetails={sellerDetails}
        />
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
