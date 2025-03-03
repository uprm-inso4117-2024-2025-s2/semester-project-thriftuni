import { View, Text } from "@/components/Themed";
import { StyleSheet, Pressable, Image, Animated } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { getDistance } from "geolib";
import { formatCurrency } from "@/utils/lib";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { ListingDetails } from "../ListingDescription";

export interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  img: string;
  pictures: string[];
  description: string;
  sellerName: string;
  sellerLocation: string;
  sellerBio: string;
  latitude: string;
  longitude: string;
}

export default function ProductCard({
  id,
  title,
  price,
  img,
  pictures,
  description,
  sellerName,
  sellerLocation,
  sellerBio,
  latitude,
  longitude,
}: ProductCardProps) {
  const [isProductWishlisted, setWishlisted] = useState<boolean>(false);
  const [distance, setDistance] = useState<number>(0);
  const [err, setErr] = useState<string | null>(null);
  const scaleValue = useRef(new Animated.Value(1)).current;

  const router = useRouter();

  useEffect(() => {
    async function getLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErr("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setDistance(
        getDistance(
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          { latitude: parseFloat(latitude), longitude: parseFloat(longitude) }
        )
      );
    }

    getLocation();

    return () => {
      setDistance(0);
      setErr(null);
    };
  }, []);

  const handleWishlistClick = () => {
    console.log("Wishlist Button Pressed");
    setWishlisted(!isProductWishlisted);
    animateButton();
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleProductClick = () => {
    const productDetails: Record<string, string> = {
      title: title,
      price: price.toString(),
      images: JSON.stringify(pictures),
      sellerName: sellerName,
      sellerLocation: sellerLocation,
      sellerBio: sellerBio,
      description: description,
      latitude: latitude,
      longitude: longitude,
    };
    router.push({
      pathname: "/DisplayIndividualListing",
      params: productDetails,
    });
    console.log(`Product ${id} clicked`);
  };

  return (
    <Pressable style={styles.card} onPress={handleProductClick}>
      <View style={styles.image_view}>
        <Image alt="product image" source={{ uri: img }} style={styles.image} />
      </View>
      <View style={styles.info}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={{ fontSize: 12 }}>{`${(distance / 1000).toFixed(
            2
          )} km`}</Text>
        </View>
        <Text style={styles.price}>{formatCurrency(price)}</Text>
      </View>
      <Animated.View
        style={[styles.wishlist_button, { transform: [{ scale: scaleValue }] }]}
      >
        <Pressable
          hitSlop={{ top: 7, bottom: 7, right: 7, left: 7 }}
          onPress={handleWishlistClick}
        >
          <FontAwesome
            name={isProductWishlisted ? "heart" : "heart-o"}
            size={24}
            color={isProductWishlisted ? "red" : "gray"}
          />
        </Pressable>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    width: "45%",
    boxShadow: "0px 0px 6px 0px rgba(0,0,0,0.75)",
    aspectRatio: 1,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 125,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image_view: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  wishlist_button: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 10,
  },
  seller_image: {
    height: 40,
    aspectRatio: 1,
    borderRadius: 10,
    position: "absolute",
    top: 5,
    left: 5,
    borderWidth: 1,
    borderColor: "black",
  },
  title_container: {
    flex: 1,
    margin: 5,
    flexDirection: "column",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
  },
  info: {
    borderRadius: 10,
    borderTopEndRadius: 0,
    borderTopStartRadius: 0,
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    flex: 1,
  },
});
