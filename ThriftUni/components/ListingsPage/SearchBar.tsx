import {TextInput, StyleSheet} from 'react-native'
import { View } from '@/components/Themed'
import React, {useState} from 'react'
import { FontAwesome } from '@expo/vector-icons'

interface SearchBarProps {
  setListings: React.Dispatch<React.SetStateAction<any>>;
  listings: any;
}


const SearchBar = ({setListings, listings} : SearchBarProps) => {
  const [searchText, setSearchText] = useState<string>('')
  const [originalListings, setOriginalListings] = useState<any>(listings)

  const handleSubmit = () => {
    if (searchText === '') {
      setListings(originalListings)
      return
    }
    const filteredListings = originalListings.filter((listing: any) => {
      return listing.title.toLowerCase().includes(searchText.toLowerCase())
    })
    setListings(filteredListings)
  }

  return (
    <View style={styles.container}>
      <FontAwesome style={styles.searchBarIcon} name="search" size={24} color="black" />
      <TextInput onEndEditing={handleSubmit} style={styles.searchBarInput} onChangeText={setSearchText} placeholder='Search...'/>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 3,
    margin: 10,
    borderRadius: 50,
    borderWidth : 1,
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    gap: 10,
  },
  searchBarInput: {
    flex: 1,
    fontSize: 16,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 50,
  },
  searchBarIcon: {
    margin: 5,
    width: 30,
    height: 30,
    backgroundColor: 'white',

  }
})

export default SearchBar;