import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

interface PriceInputProps {
  price: string;
  setPrice: (price: string) => void;
}

export default function PriceInput({ price, setPrice }: PriceInputProps) {
  return (
    <View style={styles.priceContainer}>
      <Text style={styles.priceLabel}>Price</Text>
      <TextInput
        style={styles.priceInput}
        placeholder="$ 0.00"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  priceLabel: {
    fontSize: 16,
    color: "#333",
  },
  priceInput: {
    fontSize: 12,
    color: "#000",
    textAlign: "right",
    width: 80,
  },
});
