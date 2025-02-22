import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface WishlistFilterProps {
  onFilterChange: (filterType: string, value: any) => void;
}

const WishlistFilter: React.FC<WishlistFilterProps> = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleFilterPress = (filterType: string, value: any) => {
    setSelectedFilter(`${filterType}-${value}`); // Store the selected filter
    onFilterChange(filterType, value);
  };

  return (
    <View style={styles.filterContainer}>
      <Text style={styles.filterTitle}>Filter By:</Text>

      {/* Availability Filter */}
      <TouchableOpacity onPress={() => handleFilterPress("availability", "available")} style={styles.filterButton}>
        <Text style={[styles.filterText, selectedFilter === "availability-available" && styles.selected]}>
          Available
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleFilterPress("availability", "unavailable")} style={styles.filterButton}>
        <Text style={[styles.filterText, selectedFilter === "availability-unavailable" && styles.selected]}>
          Unavailable
        </Text>
      </TouchableOpacity>

      {/* Sorting Options */}
      <Text style={styles.filterTitle}>Sort By:</Text>

      <TouchableOpacity onPress={() => handleFilterPress("price", "asc")} style={styles.filterButton}>
        <Text style={[styles.filterText, selectedFilter === "price-asc" && styles.selected]}>
          Price: Low to High
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleFilterPress("price", "desc")} style={styles.filterButton}>
        <Text style={[styles.filterText, selectedFilter === "price-desc" && styles.selected]}>
          Price: High to Low
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleFilterPress("name", "asc")} style={styles.filterButton}>
        <Text style={[styles.filterText, selectedFilter === "name-asc" && styles.selected]}>
          Name: A-Z
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleFilterPress("name", "desc")} style={styles.filterButton}>
        <Text style={[styles.filterText, selectedFilter === "name-desc" && styles.selected]}>
          Name: Z-A
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 10,
  },
  filterTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
    width: "100%",
  },
  filterButton: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  filterText: {
    fontSize: 14,
    color: "#333",
  },
  selected: {
    fontWeight: "bold",
    color: "blue",
  },
});

export default WishlistFilter;
