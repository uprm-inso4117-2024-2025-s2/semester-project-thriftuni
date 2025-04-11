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
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<string>("");

  return (
    <View style={styles.filterContainer}>
      <Picker
        selectedValue={selectedFilter}
        onValueChange={(value: string) => {
          setSelectedFilter(value);
          onFilterChange("availability", value);
        }}
        style={styles.picker}
      >
        <Picker.Item label="Filter: All" value="all" />
        <Picker.Item label="Available" value="available" />
        <Picker.Item label="Unavailable" value="unavailable" />
      </Picker>

      <Picker
        selectedValue={selectedSort}
        onValueChange={(value: string) => {
          setSelectedSort(value);
          onFilterChange(
            value === "asc" || value === "desc" ? "price" : "name",
            value
          );
        }}
        style={styles.picker}
      >
        <Picker.Item label="Sort: None" value="none" />
        <Picker.Item label="Price: Low to High" value="asc" />
        <Picker.Item label="Price: High to Low" value="desc" />
        <Picker.Item label="Name: A-Z" value="asc" />
        <Picker.Item label="Name: Z-A" value="desc" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "black",
    borderRadius: 10,
    marginBottom: 10,
  },
  picker: {
    flex: 1,
  },
});

export default WishlistFilter;
