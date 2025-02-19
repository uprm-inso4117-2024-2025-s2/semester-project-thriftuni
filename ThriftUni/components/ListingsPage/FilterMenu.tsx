import { Pressable, StyleSheet, Text, View } from 'react-native'
import CollapsibleView from './CollapsibleView'
import React, { useEffect } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import Slider from '@react-native-community/slider'
import { Rating } from 'react-native-ratings'
import { Dropdown } from 'react-native-element-dropdown'
import { Listings } from "@/app/(tabs)"



// DUMMY CATEGORY DATA FOR DEVELOPMENT PURPOSES
const categories = [
  {
    label: 'Electronics',
    value: 'electronics'
  },
  {
    label: 'Clothing',
    value: 'clothing'
  },
  {
    label: 'Furniture',
    value: 'furniture'
  }
]


interface FilterMenuProps {
  setData: React.Dispatch<React.SetStateAction<Listings[]>>
}



export default function FilterMenu({setData} : FilterMenuProps) {
  const [distance, setDistance] = React.useState<number>(1)
  const [price, setPrice] = React.useState<number>(1)
  const [category, setCategory] = React.useState<string>('')
  const [sellerRep, setSellerRep] = React.useState<number>(5)
  const [filterApplied, setFilterApplied] = React.useState<boolean>(false)
  const [dropdownFocus, setDropdownFocus] = React.useState<boolean>(false)

  useEffect(() => {
    if (filterApplied) {
      // Refetch Filter Data from API
      // setData(filteredData)
      console.log("Filters Applied:", distance, price, category, sellerRep);
      setFilterApplied(false);
    }
  }
  , [filterApplied]);

  return (
    <View>
      <CollapsibleView expandedHeight={250} startContent={<FontAwesome name='filter' size={24}/> } title='Filter Listings'>
        <View style={styles.filtersContainer}>
          <View style={styles.filterRows}>
          <View>
            <Text>Price: ${price.toFixed(2)}</Text>
            <Slider style={styles.distanceSlider} value={price} minimumValue={1} maximumValue={10e2} thumbTintColor='green' maximumTrackTintColor='gray' minimumTrackTintColor='green' onSlidingComplete={(value) => setPrice(value)}/>
          </View>
          <View>
            <Text>Distance: {distance.toFixed(2)} km</Text>
            <Slider style={styles.distanceSlider} value={distance} thumbTintColor='green' minimumValue={1} maximumValue={500} maximumTrackTintColor='gray' minimumTrackTintColor='green' onSlidingComplete={(value) => setDistance(value)}/>            
          </View>
        </View>
        <View style={styles.filterRows}>
            <View>
              <Text>Seller Reputation</Text>
              <Rating type='custom' startingValue={1} minValue={1} ratingCount={5} imageSize={25} onFinishRating={setSellerRep} tintColor='#F6F9FF' ratingBackgroundColor='#999999' style={{padding: 10}}/>
            </View>
            <View style={{width: "50%", gap: 10}}>
              <Text>Category</Text>
              <Dropdown style={styles.categoryDropdown} renderLeftIcon={() => <FontAwesome name='bars' style={{marginRight: 10}} size={14}/>} onFocus={() => setDropdownFocus(true)} onBlur={() => setDropdownFocus(false)} placeholder={dropdownFocus ? "Select Category" : "..."} labelField={"label"} valueField={"value"} data={categories} value={category} onChange={(value) => setCategory(value)} />
            </View>
          </View>

        </View>
        <View style={{padding: 10, flexDirection: 'row', justifyContent: 'center', width: '100%', gap: 10}}>
          <Pressable style={styles.applyFilters} onPress={() => setFilterApplied(true)}>
            <Text style={{color: 'white', fontSize: 18, fontWeight:"bold"}}>Apply Filters</Text>
          </Pressable>
          <Pressable style={styles.clearFilters} onPress={() => {
            setDistance(1);
            setPrice(1);
            setCategory('');
            setFilterApplied(true);
          }}>
            <Text style={{color: 'red', fontSize: 18, fontWeight:"bold"}}>Clear Filters</Text>
          </Pressable>
        </View>

      </CollapsibleView>
    </View>
  )
}

const styles = StyleSheet.create({
  distanceSlider: {
    width: 170,
    padding:5
  },
  filtersContainer: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 10,
    gap: 10
  },
  filterRows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10
  },
  applyFilters: {
    padding: 10,
    backgroundColor: '#000000',
    borderRadius: 10,
    borderColor: 'black',
  },
  clearFilters: {
    padding: 10,
    backgroundColor: '#F6F9FF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'red',
  },
  categoryDropdown: {
    width: "auto", 
    borderColor: "gray", 
    borderWidth: 1, 
    borderRadius:10, 
    padding:10
  }

})