import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { getAuth } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import addListing from "../../firebase/InsertListing";

function getRandomInRange(from: number, to: number, fixed: number): number {
  return parseFloat((Math.random() * (to - from) + from).toFixed(fixed));
  // .toFixed() returns string, so 'parseFloat' is used to convert to number
}

const handlePostListing = async () => {
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
      category_id: "Electronic",
      condition: "New",
      created_at: created_at,
      deleted_at: deleted_at,
      description: "Up for sale is an electric guitar never used before.",
      latitude: getRandomInRange(17.9, 18.5, 6), // Latitude range for Puerto Rico
      longitude: getRandomInRange(-67.3, -65.2, 6), // Longitude range for Puerto Rico
      listing_id: "123456789",
      location: "Mayaguez Pueblo",
      price: 199.99,
      title: "Gibson Les Paul guitar",
      updated_at: updated_at,
    });
    console.log("Listing posted!");
    // You can also add navigation or success feedback here
  } catch (error) {
    console.error("Failed to post listing:", error);
  }
};

export default function Buttons() {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.draftButton}
        onPress={() => alert(`Pressed on 'Save to drafts' button.`)}
      >
        <Text style={styles.draftButtonText}>Save to drafts</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.postButton} onPress={handlePostListing}>
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
