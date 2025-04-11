import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { getAuth } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import addListing from "../../firebase/InsertListing";

export interface ListingProps {
  category_id: string;
  condition: string;
  description: string;
  latitude: number;
  longitude: number;
  location: string;
  price: string;
  image: string;
}

const handlePostListing = async (listing: ListingProps) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    console.warn("User not authenticated");
    return;
  }
  const now = new Date();
  const created_at = Timestamp.fromDate(now);
  const deleted_at = Timestamp.fromDate(now); // Assuming deleted_at is null initially
  const updated_at = Timestamp.fromDate(now);
  try {
    await addListing({
      ...listing,
      created_at: created_at,
      deleted_at: deleted_at,
      listing_id: "123456789",
      updated_at: updated_at,
    });
    console.log("Listing posted!");
    // You can also add navigation or success feedback here
  } catch (error) {
    console.error("Failed to post listing:", error);
  }
};

export default function Buttons(listingData: ListingProps) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.draftButton}
        onPress={() => alert(`Pressed on 'Save to drafts' button.`)}
      >
        <Text style={styles.draftButtonText}>Save to drafts</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.postButton}
        onPress={() => handlePostListing(listingData)}
      >
        <Text style={styles.postButtonText}>Post listing</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "white", // Keeps the background solid when scrolling
  },
  draftButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginRight: 10,
  },
  draftButtonText: {
    color: "black",
    fontSize: 16,
  },
  postButton: {
    flex: 1,
    backgroundColor: "black",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  postButtonText: {
    color: "white",
    fontSize: 16,
  },
});
