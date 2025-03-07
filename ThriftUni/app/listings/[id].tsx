import { useLocalSearchParams, useNavigation } from "expo-router";
import { Text } from "react-native";
import { dummyData } from "../(tabs)";
import DisplayIndividualListing, {
  ListingDetails,
} from "@/components/DisplayIndividualListing";
import { Listings } from "../(tabs)";

export default function IndividualListing() {
  const { id } = useLocalSearchParams();

  const product: Listings = dummyData.find((item) => item.id.toString() === id);

  if (!product)
    return (
      <Text style={{ color: "white" }}>
        Product not found ${dummyData.length} id = ${id}
      </Text>
    );

  const listingDetails: ListingDetails = {
    title: product.title,
    pictures: product.pictures,
    description: product.description,
    sellerDetails: product.sellerInfo,
  };

  return <DisplayIndividualListing {...listingDetails} />;
}
