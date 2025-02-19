import { StyleSheet, Text, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { FontAwesome } from '@expo/vector-icons'
import React from 'react'

export interface CategoryDropdownProps {
  setDropdownFocus: React.Dispatch<React.SetStateAction<boolean>>
  dropdownFocus: boolean
  setCategory: React.Dispatch<React.SetStateAction<string>>
  category: string 
  categories: {label: string, value: string}[] 
}

export default function CategoryDropdown({categories, setDropdownFocus, dropdownFocus, setCategory, category}: CategoryDropdownProps) {
  return (
    <>
      <Text>Category</Text>
                    <Dropdown
                      testID="categories-dropdown"
                      itemTestIDField="value"
                      style={styles.categoryDropdown}
                      renderLeftIcon={() => (
                        <FontAwesome
                          name="bars"
                          style={{ marginRight: 10 }}
                          size={14}
                        />
                      )}
                      onFocus={() => setDropdownFocus(true)}
                      onBlur={() => setDropdownFocus(false)}
                      placeholder={dropdownFocus ? "Select Category" : "..."}
                      labelField={"label"}
                      valueField={"value"}
                      data={categories}
                      value={category}
                      onChange={(value) => setCategory(value)}
                    />
    </>
  )
}

const styles = StyleSheet.create({
  categoryDropdown: {
    width: "auto",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
})