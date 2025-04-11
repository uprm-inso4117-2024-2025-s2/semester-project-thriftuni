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

interface ImageProps {
  image: string;
  setImage: (image: string) => void;
}
const BLOB_READ_WRITE_TOKEN = "insert-token"; // Replace with token!!!

export default function ImageUploader({ image, setImage }: ImageProps) {
  const [frontImage, setFrontImage] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setFrontImage(result.assets[0].uri); // preview
      uploadImage(result.assets[0]);
    }
  };

  const uploadImage = async (asset: ImagePicker.ImagePickerAsset) => {
    const uri = asset.uri;
    const fileName = uri.split("/").pop();
    const fileType = asset.type || "image/jpeg";

    // Read the image file
    const response = await fetch(uri);
    const blob = await response.blob();

    try {
      const uploadUrl = `https://blob.vercel-storage.com/${encodeURIComponent(
        fileName as string
      )}`;
      const vercelResponse = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${BLOB_READ_WRITE_TOKEN}`,
          "Content-Type": fileType,
        },
        body: blob,
      });

      const data = await vercelResponse.json();
      console.log("Uploaded image URL:", data.url);
      setImage(data.url); // Update the state with the new URL
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={[frontImage, "add"]} // Show images + an add button
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
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: "red", // Red dotted border
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    alignContent: "center",
  },
  plusIcon: {
    width: 40,
    height: 40,
    tintColor: "black",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
});
