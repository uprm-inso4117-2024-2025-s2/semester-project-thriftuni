import { StyleSheet, ScrollView, Dimensions, Alert } from "react-native";
import { View, Text } from "@/components/Themed";
import ContactSeller from "./buttons/ContactSeller";
import WishlistItem from "./buttons/WishlistItem";
import SellerCard, { Seller } from "./SellerCard";
import LocationMap, { Location } from "./LocationMap";

export interface ListingDetails {
  title: string;
  price: string;
  images: string;
  sellerName: string;
  sellerLocation: string;
  sellerBio: string;
  description: string;
  latitude: string;
  longitude: string;
}

export default function ListingDescription({
  sellerName,
  sellerLocation,
  sellerBio,
  description,
  latitude,
  longitude,
}: ListingDetails) {
  const handleContactSellerButton = () => {
    alert("Pressed contact seller button!");
  };

  const handleWishlistItemButton = () => {
    alert("Pressed wishlist item button!");
  };

  const sellerInfo: Seller = {
    name: sellerName,
    location: sellerLocation,
    rating: 3,
    about: sellerBio,
    onProfilePress: () => alert("Profile Clicked"),
  };

  const locationInfo: Location = {
    latitude: parseFloat(latitude || "0"),
    longitude: parseFloat(longitude || "0"),
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <ContactSeller onPress={handleContactSellerButton} />
        <WishlistItem onPress={handleWishlistItemButton} />
      </View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "500",
          fontStyle: "italic",
          color: "black",
        }}
      >
        Description
      </Text>
      <View style={styles.infoBox}>
        <Text style={styles.descriptionText}>
          Description goes here: {description}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "500",
          fontStyle: "italic",
          color: "black",
        }}
      >
        Location
      </Text>
      <View style={styles.infoBox}>
        <LocationMap {...locationInfo} />
      </View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "500",
          fontStyle: "italic",
          color: "black",
        }}
      >
        About the seller
      </Text>
      <View style={styles.infoBox}>
        <SellerCard {...sellerInfo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: "white",
  },
  buttonContainer: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 10,
    minHeight: 120,
    padding: 10,
    marginTop: 5,
    borderWidth: 1,
    marginBottom: 20,

    // Bottom shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  descriptionText: {
    color: "black",
    fontWeight: "400",
    fontStyle: "italic",
  },
});
