import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ImageUploader() {
  const [images, setImages] = useState<string[]>([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]); // Add new image to the list
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={[...images, "add"]} // Show images + an add button
        horizontal
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) =>
          item === "add" ? (
            <TouchableOpacity style={styles.addButton} onPress={pickImage}>
              <Text style={{ fontSize: 32 }}>+</Text>
            </TouchableOpacity>
          ) : (
            <Image source={{ uri: item }} style={styles.image} />
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  addButton: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: "red", // Red dotted border
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    alignContent: "center",
  },
  plusIcon: {
    width: 60,
    height: 60,
    tintColor: "black",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 5,
    marginRight: 10,
  },
});
