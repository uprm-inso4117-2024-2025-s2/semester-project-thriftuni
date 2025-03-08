import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';

export interface Location {
    latitude: number,
    longitude: number,
}

export default function LocationMap({latitude, longitude} : Location) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude, // Replace with actual latitude
          longitude: longitude, // Replace with actual longitude
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {/* Marker for the location */}
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          title="Plaza Cristóbal Colón"
        />

        {/* Circular overlay */}
        <Circle
          center={{ latitude: latitude, longitude: longitude }}
          radius={500} // Adjust as needed
          strokeColor="rgba(0, 128, 0, 0.5)" // Green border
          fillColor="rgba(66, 219, 43, 0.2)" // Light green fill
        />
      </MapView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: 300, // Adjust size as needed
  },
  overlayText: {
    position: 'absolute',
    top: 20,
    left: '30%',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'purple',
  },
});
