import { StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { View } from '@/components/Themed'
import React, {useState, Suspense} from 'react'
import { SliderBox } from 'react-native-image-slider-box'

export default function ImageCarousel() {
  return (
    <View>
      <SliderBox></SliderBox>
    </View>

  )
}