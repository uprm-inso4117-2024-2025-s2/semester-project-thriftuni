import { Pressable, StyleSheet, Text, View } from "react-native";
import CollapsibleView from "./CollapsibleView";
import React, { useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { Rating } from "react-native-ratings";
import { Listings } from "@/app/(tabs)";
import { getDistance } from "geolib";
import CategoryDropdown from "./CategoryDropdown";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";

// DUMMY CATEGORY DATA FOR DEVELOPMENT PURPOSES
const categories = [
  { label: "Electronics", value: "electronics" },
  { label: "Clothing", value: "clothing" },
  { label: "Furniture", value: "furniture" },
];

export interface FilterMenuProps {
  setData: React.Dispatch<React.SetStateAction<Listings[]>>;
  data: Listings[];
}

export default function FilterMenu({ setData, data }: FilterMenuProps) {
  const originalData = data;
  const [distance, setDistance] = React.useState<number>(1);
  const [price, setPrice] = React.useState<number>(1);
  const [category, setCategory] = React.useState<string>("");
  const [sellerRep, setSellerRep] = React.useState<number>(5);
  const [filterApplied, setFilterApplied] = React.useState<boolean>(false);
  const [dropdownFocus, setDropdownFocus] = React.useState<boolean>(false);

  // Use the current theme from Colors.ts
  const theme = useColorScheme() || 'light'; // returns 'light', 'dark', or 'blue'

  useEffect(() => {
    if (filterApplied) {
      // Refetch Filter Data from API (for now, setData to current data)
      setData(data);
      let filteredData = data.filter(
        (item) =>
          item.price <= price &&
          item.sellerInfo.rating >= sellerRep &&
          item.category === category
      );
      filteredData = filteredData.filter(
        (item) =>
          getDistance(
            {
              latitude: 18.2,
              longitude: -66.5,
            },
            {
              latitude: item.latitude,
              longitude: item.longitude,
            }
          ) <= distance
      );
      setData(filteredData);
      console.log("Filters Applied:", distance, price, category, sellerRep);
      setFilterApplied(false);
    }
  }, [filterApplied]);


  const handleClearFilters = () => {
    setData(originalData);
  };

  return (
    <View style={{ backgroundColor: Colors[theme].background }}>
      <CollapsibleView
        expandedHeight={250}
        startContent={<FontAwesome name="filter" size={24} />}
        title="Filter Listings"
      >
        <View style={styles.filtersContainer}>
          <View style={styles.filterRows}>
            <View>
              <Text style={[styles.label, { color: Colors[theme].text }]}>
                Price: ${price.toFixed(2)}
              </Text>
              <Slider
                testID="price-slider"
                style={styles.distanceSlider}
                value={price}
                minimumValue={1}
                maximumValue={10e2}
                thumbTintColor={Colors[theme].tint}
                maximumTrackTintColor="gray"
                minimumTrackTintColor={Colors[theme].tint}
                onSlidingComplete={(value) => setPrice(value)}
              />
            </View>
            <View>
              <Text style={[styles.label, { color: Colors[theme].text }]}>
                Distance: {distance.toFixed(2)} km
              </Text>
              <Slider
                testID="distance-slider"
                style={styles.distanceSlider}
                value={distance}
                thumbTintColor={Colors[theme].tint}
                minimumValue={1}
                maximumValue={500}
                maximumTrackTintColor="gray"
                minimumTrackTintColor={Colors[theme].tint}
                onSlidingComplete={(value) => setDistance(value)}
              />
            </View>
          </View>
          <View style={styles.filterRows}>
            <View>
              <Text style={[styles.label, { color: Colors[theme].text }]}>
                Seller Reputation
              </Text>
              <Rating
                type="custom"
                startingValue={1}
                minValue={1}
                ratingCount={5}
                imageSize={25}
                onFinishRating={setSellerRep}
                tintColor={Colors[theme].background}
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
            style={[styles.applyFilters, { backgroundColor: Colors[theme].tint }]}
            onPress={() => setFilterApplied(true)}
          >
            <Text style={{ color: Colors[theme].background, fontSize: 18, fontWeight: "bold" }}>
              Apply Filters
            </Text>
          </Pressable>
          <Pressable
            testID="clear-filters-button"
            style={[styles.clearFilters, { backgroundColor: Colors[theme].background }]}
            onPress={() => {
              setDistance(1);
              setPrice(1);
              setCategory("");
              setFilterApplied(true);
              handleClearFilters;
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
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  applyFilters: {
    padding: 10,
    borderRadius: 10,
    borderColor: "black",
  },
  clearFilters: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "red",
  },
});