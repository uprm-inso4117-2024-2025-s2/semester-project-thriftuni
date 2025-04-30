import { Pressable, StyleSheet, Text, View } from "react-native";
import CollapsibleView from "./CollapsibleView";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { Rating } from "react-native-ratings";
import { Listings } from "@/app/(tabs)";
import CategoryDropdown from "./CategoryDropdown";

// DUMMY CATEGORY DATA FOR DEVELOPMENT PURPOSES
const categories = [
  {
    label: "Electronics",
    value: "electronics",
  },
  {
    label: "Clothing",
    value: "clothing",
  },
  {
    label: "Furniture",
    value: "furniture",
  },
];

export interface FilterMenuProps {
  setData: React.Dispatch<React.SetStateAction<Listings[]>>;
  data: Listings[];
}

export default function FilterMenu({ setData, data }: FilterMenuProps) {
  const [distance, setDistance] = useState<number>(1);
  const [price, setPrice] = useState<number>(1);
  const [category, setCategory] = useState<string>("");
  const [sellerRep, setSellerRep] = useState<number>(1);
  const [dropdownFocus, setDropdownFocus] = useState<boolean>(false);
  const [originalData, setOriginalData] = useState<Listings[]>([]);
  const [firstRender, setFirstRender] = useState<boolean>(true);

  // Store original data when component mounts or data changes
  useEffect(() => {
    if (data && data.length > 0 && firstRender) {
      setOriginalData([...data]);
      setFirstRender(false);
    }
  }, [data]);

  const applyFilters = () => {
    let filteredData = [...originalData];
    
    // Filter by price
    if (price > 1) {
      filteredData = filteredData.filter(item => item.price <= price);
    }
    
    // Filter by category
    if (category) {
      filteredData = filteredData.filter(item => 
        item.category_id === category || 
        item.category_id === category.toLowerCase()
      );
    }
    
    // Filter by seller reputation
    if (sellerRep > 1) {
      filteredData = filteredData.filter(item => 
        item.sellerInfo?.rating || 5 >= sellerRep
      );
    }
    
    // Apply distance filter (if location services are available)
    if (distance > 1) {
      // For now, this is a simplified version without actual distance calculation
      // You would normally use geolocation here
      console.log(`Filtering by distance: ${distance}km`);
    }
    
    // Update the filtered data
    setData(filteredData);
  };

  // Function to handle clearing filters
  const handleClearFilters = () => {
    // Reset filter values
    setDistance(1);
    setPrice(1);
    setCategory("");
    setSellerRep(1);
    
    // Important: Reset data to original
    if (originalData && originalData.length > 0) {
      setData([...originalData]);
    }
  };

  return (
    <View>
      <CollapsibleView
        expandedHeight={250}
        startContent={<FontAwesome name="filter" size={24} />}
        title="Filter Listings"
      >
        <View style={styles.filtersContainer}>
          <View style={styles.filterRows}>
            <View>
              <Text>Max Price: ${price.toFixed(2)}</Text>
              <Slider
                testID="price-slider"
                style={styles.distanceSlider}
                value={price}
                minimumValue={1}
                maximumValue={250}
                thumbTintColor="green"
                maximumTrackTintColor="gray"
                minimumTrackTintColor="green"
                onSlidingComplete={(value) => setPrice(value)}
              />
            </View>
            <View>
              <Text>Max Distance: {distance.toFixed(2)} km</Text>
              <Slider
                testID="distance-slider"
                style={styles.distanceSlider}
                value={distance}
                thumbTintColor="green"
                minimumValue={1}
                maximumValue={500}
                maximumTrackTintColor="gray"
                minimumTrackTintColor="green"
                onSlidingComplete={(value) => setDistance(value)}
              />
            </View>
          </View>
          <View style={styles.filterRows}>
            <View>
              <Text>Seller Reputation</Text>
              <Rating
                type="custom"
                startingValue={1}
                minValue={1}
                ratingCount={5}
                imageSize={25}
                onFinishRating={setSellerRep}
                tintColor="#F6F9FF"
                ratingBackgroundColor="#999999"
                style={{ padding: 10 }}
              />
            </View>
            <View style={{ width: "50%", gap: 10 }}>
              <CategoryDropdown
                setDropdownFocus={setDropdownFocus}
                dropdownFocus={dropdownFocus}
                setCategory={setCategory}
                category={category}
                categories={categories}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
            gap: 10,
          }}
        >
          <Pressable
            testID="apply-filters-button"
            style={styles.applyFilters}
            onPress={applyFilters}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Apply Filters
            </Text>
          </Pressable>
          <Pressable
            testID="clear-filters-button"
            style={styles.clearFilters}
            onPress={handleClearFilters}
          >
            <Text style={{ color: "red", fontSize: 18, fontWeight: "bold" }}>
              Clear Filters
            </Text>
          </Pressable>
        </View>
      </CollapsibleView>
    </View>
  );
}

const styles = StyleSheet.create({
  distanceSlider: {
    width: 170,
    padding: 5,
  },
  filtersContainer: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 10,
    gap: 10,
  },
  filterRows: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
  },
  applyFilters: {
    padding: 10,
    backgroundColor: "#000000",
    borderRadius: 10,
    borderColor: "black",
  },
  clearFilters: {
    padding: 10,
    backgroundColor: "#F6F9FF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "red",
  },
});
