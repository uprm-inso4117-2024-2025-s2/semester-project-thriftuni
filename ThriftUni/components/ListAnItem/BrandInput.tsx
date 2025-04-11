import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";

interface BrandInputProps {
  brand: string;
  setBrand: (brand: string) => void;
}
export default function BrandInput({ brand, setBrand }: BrandInputProps) {
  return (
    <View style={styles.brandContainer}>
      <Text style={styles.brandLabel}>Brand</Text>
      <TextInput
        style={styles.brandInput}
        placeholder="N/A"
        placeholderTextColor="#888"
        value={brand}
        onChangeText={setBrand}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  brandContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  brandLabel: {
    fontSize: 16,
    color: "#333",
  },
  brandInput: {
    fontSize: 12,
    color: "#000",
    textAlign: "right",
    width: 80,
  },
});
