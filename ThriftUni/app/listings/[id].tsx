import { useLocalSearchParams, useNavigation } from "expo-router";
import { Text } from "react-native";
import { dummyData } from "../(tabs)";
import DisplayIndividualListing, {
  ListingDetails,
} from "@/components/DisplayIndividualListing";
import { Listings } from "../(tabs)";
import { getListingById, getSellerById } from "@/backend/Api";
import { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function IndividualListing() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<any>(null);
  const [seller, setSeller] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        // Try to get from Firebase first
        const dbListing : any = await getListingById(id as string);
        
        if (dbListing) {
          // Fetch seller information using the user ID from the listing
          const sellerId = dbListing?.user_id || "unknown";
          const sellerInfo = await getSellerById(sellerId);
          
          setProduct({...dbListing});
          setSeller(sellerInfo);
        } else {
          // Fallback to dummy data
          const dummyProduct = dummyData.find((item) => item.id.toString() === id);
          setProduct(dummyProduct);
          // Use the seller info from dummy data
          setSeller(dummyProduct?.sellerInfo || null);
        }
      } catch (err) {
        console.error("Error fetching listing:", err);
        setError("Failed to load listing");
        
        // Fallback to dummy data on error
        const dummyProduct = dummyData.find((item) => item.id.toString() === id);
        setProduct(dummyProduct);
        setSeller(dummyProduct?.sellerInfo || null);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Product not found</Text>
      </View>
    );
  }

  // Create a seller details object with only the required fields
  const sellerDetails = {
    name: seller?.name || seller?.username || seller?.email || "Unknown Seller",
    email: seller?.email || "No email available",
    location: product.location || "Unknown Location",
    about: "Contact for more information", // Simplified about section
    rating: seller?.rating || 4.5, // Default rating if not available
    onProfilePress: () => alert(`Contact ${seller?.email || "seller"} for more information`),
  };

  // Create a standardized listing details object
  const listingDetails: ListingDetails = {
    title: product.title || "Untitled Product",
    pictures: product.pictures || (product.image ? [product.image] : []),
    description: product.description || "No description provided",
    sellerDetails: sellerDetails,
    longitude: product.longitude || 18.2,
    latitude: product.latitude || -67.1,
  };

  return <DisplayIndividualListing {...listingDetails} />;
}
