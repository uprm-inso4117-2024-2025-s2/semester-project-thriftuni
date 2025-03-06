import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Chip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.chip, selected && styles.chipSelected]}
    >
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function InterestsAndSizesScreen() {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState<'Interests' | 'Sizes'>(
    'Interests'
  );

  const outfitStyles = [
    'Casual',
    'Business Casual',
    'Formal',
    'Vintage',
    'Streetwear',
    'Minimalist',
    'Old Money',
    'Classic',
  ];
  const tops = ['T-shirts', 'Blouses', 'Sweaters', 'Hoodies'];
  const bottoms = ['Jeans', 'Leggings', 'Joggers', 'Skirts'];
  const dresses = ['Casual', 'Jumpsuit', 'Evening', 'Summer'];

  const topSizes = ['X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large'];
  const bottomSizes = ['X-Small', 'Small', 'Medium', 'Large', 'XX-Large'];
  const dressSizes = ['X-Small', 'Small', 'Medium', 'Large', 'XX-Large'];
  const footwearSizes = [
    '8',
    '9',
    '9.5',
    '10',
    '10.5',
    '11',
    '11.5',
    '12',
    '13',
  ];

  const [selectedOutfitStyles, setSelectedOutfitStyles] = useState<string[]>([]);
  const [selectedTops, setSelectedTops] = useState<string[]>([]);
  const [selectedBottoms, setSelectedBottoms] = useState<string[]>([]);
  const [selectedDresses, setSelectedDresses] = useState<string[]>([]);

  const [selectedTopSizes, setSelectedTopSizes] = useState<string[]>([]);
  const [selectedBottomSizes, setSelectedBottomSizes] = useState<string[]>([]);
  const [selectedDressSizes, setSelectedDressSizes] = useState<string[]>([]);
  const [selectedFootwearSizes, setSelectedFootwearSizes] = useState<string[]>(
    []
  );

  const toggleSelection = (
    item: string,
    selectedArray: string[],
    setSelectedArray: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selectedArray.includes(item)) {
      setSelectedArray(selectedArray.filter((val) => val !== item));
    } else {
      setSelectedArray([...selectedArray, item]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabHeader}>
        <TouchableOpacity
          onPress={() => setSelectedTab('Interests')}
          style={[
            styles.tabButton,
            selectedTab === 'Interests' && styles.tabButtonActive,
          ]}
        >
          <Text
            style={[
              styles.tabButtonText,
              selectedTab === 'Interests' && styles.tabButtonTextActive,
            ]}
          >
            Interests
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab('Sizes')}
          style={[
            styles.tabButton,
            selectedTab === 'Sizes' && styles.tabButtonActive,
          ]}
        >
          <Text
            style={[
              styles.tabButtonText,
              selectedTab === 'Sizes' && styles.tabButtonTextActive,
            ]}
          >
            Sizes
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} contentContainerStyle={{paddingBottom: 100}}>
        {selectedTab === 'Interests' ? (
          <View>
            <Text style={styles.sectionHeader}>Outfit Styles</Text>
            <View style={styles.chipContainer}>
              {outfitStyles.map((style) => (
                <Chip
                  key={style}
                  label={style}
                  selected={selectedOutfitStyles.includes(style)}
                  onPress={() =>
                    toggleSelection(style, selectedOutfitStyles, setSelectedOutfitStyles)
                  }
                />
              ))}
            </View>

            <Text style={styles.sectionHeader}>Tops</Text>
            <View style={styles.chipContainer}>
              {tops.map((style) => (
                <Chip
                  key={style}
                  label={style}
                  selected={selectedTops.includes(style)}
                  onPress={() => toggleSelection(style, selectedTops, setSelectedTops)}
                />
              ))}
            </View>

            <Text style={styles.sectionHeader}>Bottoms</Text>
            <View style={styles.chipContainer}>
              {bottoms.map((style) => (
                <Chip
                  key={style}
                  label={style}
                  selected={selectedBottoms.includes(style)}
                  onPress={() =>
                    toggleSelection(style, selectedBottoms, setSelectedBottoms)
                  }
                />
              ))}
            </View>

            <Text style={styles.sectionHeader}>Dresses & One-Pieces</Text>
            <View style={styles.chipContainer}>
              {dresses.map((style) => (
                <Chip
                  key={style}
                  label={style}
                  selected={selectedDresses.includes(style)}
                  onPress={() =>
                    toggleSelection(style, selectedDresses, setSelectedDresses)
                  }
                />
              ))}
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.sectionHeader}>Tops</Text>
            <View style={styles.chipContainer}>
              {topSizes.map((size) => (
                <Chip
                  key={size}
                  label={size}
                  selected={selectedTopSizes.includes(size)}
                  onPress={() =>
                    toggleSelection(size, selectedTopSizes, setSelectedTopSizes)
                  }
                />
              ))}
            </View>

            <Text style={styles.sectionHeader}>Bottoms</Text>
            <View style={styles.chipContainer}>
              {bottomSizes.map((size) => (
                <Chip
                  key={size}
                  label={size}
                  selected={selectedBottomSizes.includes(size)}
                  onPress={() =>
                    toggleSelection(size, selectedBottomSizes, setSelectedBottomSizes)
                  }
                />
              ))}
            </View>

            <Text style={styles.sectionHeader}>Dresses & One-Pieces</Text>
            <View style={styles.chipContainer}>
              {dressSizes.map((size) => (
                <Chip
                  key={size}
                  label={size}
                  selected={selectedDressSizes.includes(size)}
                  onPress={() =>
                    toggleSelection(size, selectedDressSizes, setSelectedDressSizes)
                  }
                />
              ))}
            </View>

            <Text style={styles.sectionHeader}>Footwear</Text>
            <View style={styles.chipContainer}>
              {footwearSizes.map((size) => (
                <Chip
                  key={size}
                  label={size}
                  selected={selectedFootwearSizes.includes(size)}
                  onPress={() =>
                    toggleSelection(size, selectedFootwearSizes, setSelectedFootwearSizes)
                  }
                />
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.saveButtonContainer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F9FF',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  tabHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#F6F9FF',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabButtonActive: {
    borderBottomWidth: 3,
    borderBottomColor: '#000',
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
  },
  tabButtonTextActive: {
    color: '#000',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
    color: '#000',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#EFEFEF',
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  chipSelected: {
    backgroundColor: '#000',
  },
  chipText: {
    color: '#000',
    fontSize: 14,
  },
  chipTextSelected: {
    color: '#FFF',
  },
  saveButtonContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#F6F9FF',
  },
  saveButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
