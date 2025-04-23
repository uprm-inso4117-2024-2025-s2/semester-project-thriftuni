import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Text,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { View } from "@/components/Themed";
import React, { useState } from "react";

export default function ProductImages({ images }: { images: string[] }) {
  const { width } = Dimensions.get("window");
  const height = width * 0.7;

  const [active, setActive] = useState(0);

  const onScrollChange = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;

    const slide = Math.ceil(contentOffset.x / layoutMeasurement.width);

    if (slide !== active) {
      setActive(slide);
    }
  };

  return (
    <View
      style={{
        width: width,
        backgroundColor: "white",
        marginHorizontal: -16,
        marginBottom: 10,
      }}
    >
      <ScrollView
        pagingEnabled
        horizontal
        onScroll={onScrollChange}
        showsHorizontalScrollIndicator={false}
        style={{ width, height }}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            testID={`product-image-${index}`}
            style={{
              width,
              height,
              padding: 10,
            }}
          />
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {images.map((i, k) => (
          <Text key={k} style={k == active ? styles.activeDot : styles.dot}>
            •
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: -0,
    alignSelf: "center",
    backgroundColor: "transparent",
  },
  dot: {
    color: "#888",
    fontSize: 50,
  },
  activeDot: {
    color: "#FFF",
    fontSize: 50,
  },
});
