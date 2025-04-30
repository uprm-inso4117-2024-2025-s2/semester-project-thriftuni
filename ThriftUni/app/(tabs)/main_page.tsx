import React from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";

const ThriftUniApp = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to{"\n"}Thrift Uni</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="menu" size={24} color="gray" style={styles.icon} />
        <TextInput placeholder="Search Listings..." style={styles.input} />
        <Feather name="search" size={24} color="gray" />
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <Button icon="upload" text="Post Listing" />
          <Button icon="edit" text="View Drafts" />
        </View>
        <View style={styles.row}>
          <Button icon="star" text="Read Your Reviews" />
          <Button icon="heart" text="View Saved Posts" />
        </View>
      </View>
    </ScrollView>
  );
};

// Button Component
const Button = ({ icon, text }: { icon: string; text: string }) => {
  return (
    <TouchableOpacity style={styles.button}>
      <FontAwesome name={icon as any} size={28} color="black" />
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5", // Bright green background
    paddingVertical: 20,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  searchContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 50,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "black",
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#FFFF",
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "500",
    color: "black",
  },
});

export default ThriftUniApp;
