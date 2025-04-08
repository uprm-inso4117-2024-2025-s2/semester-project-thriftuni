import { Pressable, StyleSheet, Text, View } from "react-native";
import CollapsibleView from "./CollapsibleView";
import React, { useEffect } from "react";
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
  const [distance, setDistance] = React.useState<number>(1);
  const [price, setPrice] = React.useState<number>(1);
  const [category, setCategory] = React.useState<string>("");
  const [sellerRep, setSellerRep] = React.useState<number>(5);
  const [filterApplied, setFilterApplied] = React.useState<boolean>(false);
  const [dropdownFocus, setDropdownFocus] = React.useState<boolean>(false);
  const [originalData, setOriginalData] = React.useState<Listings[]>(data);

  useEffect(() => {
    if (filterApplied) {
      // 

      // Apply the filtering logic
      let filteredData = [...data];
      
      // Filter by price
      if (price > 1) {
        filteredData = filteredData.filter(item => item.price <= price);
      }
      
      // Filter by category
      if (category) {
        filteredData = filteredData.filter(item => item.category === category);
      }
      
      // Filter by seller reputation (if applicable in your data model)
      if (sellerRep < 5) {
        filteredData = filteredData.filter(item => 
          item.sellerInfo?.rating && item.sellerInfo.rating >= sellerRep
        );
      }
      
      // Distance filtering would require geolocation calculations
      // which would be more complex and depend on user's location
      
      // Update the filtered data
      setData(filteredData);
      console.log("Filters Applied:", distance, price, category, sellerRep);
      setFilterApplied(false);
    }
  }, [filterApplied, data, price, category, sellerRep, distance]);

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
            onPress={() => setFilterApplied(true)}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Apply Filters
            </Text>
          </Pressable>
          <Pressable
            testID="clear-filters-button"
            style={styles.clearFilters}
            onPress={() => {
              setDistance(1);
              setPrice(1);
              setCategory("");
              setFilterApplied(true);
              setSellerRep(5);
              setData(originalData);
            }}
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
