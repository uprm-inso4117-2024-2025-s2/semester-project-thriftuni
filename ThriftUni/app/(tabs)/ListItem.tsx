import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { ScrollView, TextInput } from "react-native";
import ImageUploader from "@/components/ListAnItem/ImageUploader";
import Selector from "@/components/ListAnItem/Selector";
import PriceInput from "@/components/ListAnItem/PriceInput";
import Buttons from "@/components/ListAnItem/Buttons";

export default function ListItem() {
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => alert("Pressed on Back button.")}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sell an Item</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Image Upload Section */}
        <ImageUploader />

        {/* Description Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Enter description ..."
            placeholderTextColor="#888"
            value={text}
            onChangeText={setText}
            textAlignVertical="top"
            multiline={true}
          />
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Item Details */}
        <Selector type="Category" />
        <Selector type="Brand" />
        <Selector type="Condition" />
        <Selector type="Color" />
        <PriceInput />
      </ScrollView>

      {/* Action Buttons */}
      <Buttons />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  backButton: {
    padding: 10,
    marginRight: 15,
  },
  backText: {
    fontSize: 20,
    color: "#333",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#222",
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  },
  descriptionInput: {
    height: 130,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#D1D1D1",
    backgroundColor: "#fff",
    padding: 10,
    fontSize: 16,
    textAlignVertical: "top",
  },
  divider: {
    marginVertical: 20,
    height: 1,
    backgroundColor: "#DDD",
    alignSelf: "stretch",
  },
});
