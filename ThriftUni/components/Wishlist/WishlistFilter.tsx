import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface WishlistFilterProps {
  onFilterChange: (
    filterType: "availability" | "price" | "name",
    value: string
  ) => void;
}

const WishlistFilter: React.FC<WishlistFilterProps> = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedSort, setSelectedSort] = useState("");

  return (
    <View style={styles.filterContainer}>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedFilter}
          onValueChange={(value) => {
            setSelectedFilter(value);
            if (value !== "all") {
              onFilterChange("availability", value);
            } else {
              onFilterChange("availability", "available"); // default reset
            }
          }}
          style={styles.picker}
        >
          <Picker.Item label="Filter: All" value="all" />
          <Picker.Item label="Available" value="available" />
          <Picker.Item label="Unavailable" value="unavailable" />
        </Picker>
      </View>

      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedSort}
          onValueChange={(value) => {
            setSelectedSort(value);
            const [type, direction] = value.split("-");
            if (type && direction) {
              onFilterChange(type as "price" | "name", direction);
            }
          }}
          style={styles.picker}
        >
          <Picker.Item label="Sort: None" value="" />
          <Picker.Item label="Price: Low to High" value="price-asc" />
          <Picker.Item label="Price: High to Low" value="price-desc" />
          <Picker.Item label="Name: A–Z" value="name-asc" />
          <Picker.Item label="Name: Z–A" value="name-desc" />
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginBottom: 10,
    padding: 5,
  },
  pickerWrapper: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
  picker: {
    height: 44,
    width: "100%",
  },
});

export default WishlistFilter;
