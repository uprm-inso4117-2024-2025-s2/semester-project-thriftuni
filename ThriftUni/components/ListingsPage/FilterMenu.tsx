import { StyleSheet, Text, View } from 'react-native'
import CollapsibleView from './CollapsibleView'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

export default function FilterMenu() {
  const [isCollapsed, setCollapsed] = React.useState<boolean>(false)

  return (
    <View>
      <CollapsibleView startContent={<FontAwesome name='filter' size={24}/> } title='Filter Listings'>
        <View>
          <Text>Filter 1</Text>
          <Text>Filter 2</Text>
          <Text>Filter 3</Text>
        </View>
      </CollapsibleView>
    </View>
  )
}

const styles = StyleSheet.create({})