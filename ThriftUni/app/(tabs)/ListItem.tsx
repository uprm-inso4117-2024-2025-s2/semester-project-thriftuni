import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { ScrollView, TextInput } from "react-native";
import ImageUploader from "@/components/ListAnItem/ImageUploader";
import Selector from "@/components/ListAnItem/Selector";
import PriceInput from "@/components/ListAnItem/PriceInput";
import TitleInput from "@/components/ListAnItem/TitleInput";
import Buttons from "@/components/ListAnItem/Buttons";
import { ListingProps } from "@/components/ListAnItem/Buttons";

function getRandomInRange(from: number, to: number, fixed: number): number {
  return parseFloat((Math.random() * (to - from) + from).toFixed(fixed));
  // .toFixed() returns string, so 'parseFloat' is used to convert to number
}

export default function ListItem() {
  const categories = [
    { label: "Clothing", value: "clothing" },
    { label: "Electronics", value: "electronics" },
    { label: "Books", value: "books" },
    { label: "Furniture", value: "furniture" },
    { label: "Other", value: "other" },
  ];
  const [category, setCategory] = useState("");

  const colors = [
    { label: "Red", value: "red" },
    { label: "Blue", value: "blue" },
    { label: "Green", value: "green" },
    { label: "Yellow", value: "yellow" },
    { label: "Black", value: "black" },
    { label: "White", value: "white" },
  ];
  const [color, setColor] = useState("");

  const conditions = [
    { label: "New", value: "new" },
    { label: "Like New", value: "like-new" },
    { label: "Good", value: "good" },
    { label: "Fair", value: "fair" },
    { label: "Poor", value: "poor" },
  ];
  const [condition, setCondition] = useState("");

  const [description, setDescription] = useState("");

  const [price, setPrice] = useState(0);
  const [title, setTitle] = useState("0");

  // Only storing one image.
  const [image, setImage] = useState("");

  const latitude = getRandomInRange(17.9, 18.5, 6); // Latitude range for Puerto Rico
  const longitude = getRandomInRange(-67.3, -65.2, 6); // Longitude range for Puerto Rico
  const location = "Mayaguez, Puerto Rico";

  const listingData: ListingProps = {
    category_id: category,
    condition,
    description,
    latitude,
    longitude,
    location,
    price,
    image,
    title,
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={() => alert("Pressed on Back button.")}
        >
          <Text>←</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 22 }}>Sell an item</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/*Add picture section*/}
        <ImageUploader image={image} setImage={setImage} />
        {/*Add description section*/}
        <View style={{ padding: 5 }}>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>Description</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Enter description ..."
            placeholderTextColor="grey"
            value={description}
            onChangeText={setDescription}
            textAlignVertical="top"
            multiline={true}
          />
        </View>
        {/*Divider*/}
        <View
          style={{
            marginTop: 20,
            marginBottom: 20,
            height: 5,
            borderWidth: 5,
            borderColor: "grey",
          }}
        />
        {/* Item details */}
        <Selector
          label="Category"
          value={category}
          options={categories}
          onSelect={(selected) => setCategory(selected)}
        />
        <Selector
          label="Condition"
          value={condition}
          options={conditions}
          onSelect={(selected) => setCondition(selected)}
        />
        <Selector
          label="Color"
          value={color}
          options={colors}
          onSelect={(selected) => setColor(selected)}
        />
        <TitleInput title={title} setTitle={(value) => setTitle(value)} />
        <PriceInput 
          price={price} 
          setPrice={(value) => {
            // Ensure value is properly parsed as float
            const parsedValue = value === '' ? 0 : parseFloat(value);
            setPrice(isNaN(parsedValue) ? 0 : parsedValue);
          }} 
        />
      </ScrollView>
      {/* Save to draft and post buttons */}
      <Buttons {...listingData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  topBar: {
    alignContent: "center",
    alignItems: "center",
    height: 50,
    flexDirection: "row",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 300,
  },
  picturesSection: {
    padding: 5,
  },
  descriptionInput: {
    height: 130,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#E4AAAA",
  },
});
