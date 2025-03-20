import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";

// Import your screens
import DisplayMyListing from "./my_listings";
import ListItem from "./ListItem";
import WishlistPage from "./WishlistPage";
import Profile from "./Profile";

const ThriftUniApp = () => {
  const [activeScreen, setActiveScreen] = useState<"home" | "listings" | "post" | "wishlist" | "profile">("home");

  const renderScreen = () => {
    switch (activeScreen) {
      case "listings":
        return (
          <>
            <TouchableOpacity onPress={() => setActiveScreen("home")} style={styles.backButton}>
              <Text style={styles.backButtonText}>← Back to Home</Text>
            </TouchableOpacity>
            <DisplayMyListing />
          </>
        );
      case "post":
        return (
          <>
            <TouchableOpacity onPress={() => setActiveScreen("home")} style={styles.backButton}>
              <Text style={styles.backButtonText}>← Back to Home</Text>
            </TouchableOpacity>
            <ListItem />
          </>
        );
      case "wishlist":
        return (
          <>
            <TouchableOpacity onPress={() => setActiveScreen("home")} style={styles.backButton}>
              <Text style={styles.backButtonText}>← Back to Home</Text>
            </TouchableOpacity>
            <WishlistPage />
          </>
        );
      case "profile":
        return (
          <>
            <TouchableOpacity onPress={() => setActiveScreen("home")} style={styles.backButton}>
              <Text style={styles.backButtonText}>← Back to Home</Text>
            </TouchableOpacity>
            <Profile />
          </>
        );
      default:
        return <MainPage navigate={setActiveScreen} />;
    }
  };

  return <View style={{ flex: 1 }}>{renderScreen()}</View>;
};

const MainPage = ({ navigate }: { navigate: (screen: any) => void }) => {
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

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <Button icon="list" text="My Listings" onPress={() => navigate("listings")} />
          <Button icon="plus" text="Post Listing" onPress={() => navigate("post")} />
        </View>
        <View style={styles.row}>
          <Button icon="heart" text="View Wishlist" onPress={() => navigate("wishlist")} />
          <Button icon="user" text="View My Profile" onPress={() => navigate("profile")} />
        </View>
      </View>
    </ScrollView>
  );
};

const Button = ({ icon, text, onPress }: { icon: string; text: string; onPress?: () => void }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <FontAwesome name={icon as any} size={28} color="black" />
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E5E5E5", paddingVertical: 20 },
  header: { justifyContent: "center", alignItems: "center", marginVertical: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: "black", textAlign: "center" },
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
  icon: { marginRight: 10 },
  input: { flex: 1, color: "black", fontSize: 16 },
  buttonContainer: { marginTop: 20, paddingHorizontal: 20 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
  button: {
    backgroundColor: "#FFF",
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { marginTop: 5, fontSize: 16, fontWeight: "500", color: "black" },

  // Back Button Styling
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    margin: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  backButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ThriftUniApp;
