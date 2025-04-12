import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

/** Chip Component: Renders a single chip item. */
const Chip = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) => {
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
};

/** TabHeader Component: Renders tab buttons driven by a configuration array. */
const TabHeader = ({
  tabs,
  selectedTab,
  onTabSelect,
}: {
  tabs: string[];
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}) => {
  return (
    <View style={styles.tabHeader}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => onTabSelect(tab)}
          style={[
            styles.tabButton,
            selectedTab === tab && styles.tabButtonActive,
          ]}
        >
          <Text
            style={[
              styles.tabButtonText,
              selectedTab === tab && styles.tabButtonTextActive,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

/** InterestsSection Component: Renders one section of interests with a title. */
const InterestsSection = ({
  title,
  items,
  selectedItems,
  toggleItem,
}: {
  title: string;
  items: string[];
  selectedItems: string[];
  toggleItem: (item: string) => void;
}) => {
  return (
    <View>
      <Text style={styles.sectionHeader}>{title}</Text>
      <View style={styles.chipContainer}>
        {items.map((item) => (
          <Chip
            key={item}
            label={item}
            selected={selectedItems.includes(item)}
            onPress={() => toggleItem(item)}
          />
        ))}
      </View>
    </View>
  );
};

/** SizesSection Component: Renders one section of sizes with a title. */
const SizesSection = ({
  title,
  sizes,
  selectedSizes,
  toggleSize,
}: {
  title: string;
  sizes: string[];
  selectedSizes: string[];
  toggleSize: (size: string) => void;
}) => {
  return (
    <View>
      <Text style={styles.sectionHeader}>{title}</Text>
      <View style={styles.chipContainer}>
        {sizes.map((size) => (
          <Chip
            key={size}
            label={size}
            selected={selectedSizes.includes(size)}
            onPress={() => toggleSize(size)}
          />
        ))}
      </View>
    </View>
  );
};

/** InterestsAndSizesScreen Component: The main component orchestrating sub-components. */
export default function InterestsAndSizesScreen() {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState<'Interests' | 'Sizes'>(
    'Interests'
  );

  // Configuration for Interests tab
  const interestsConfig = {
    outfitStyles: [
      'Casual',
      'Business Casual',
      'Formal',
      'Vintage',
      'Streetwear',
      'Minimalist',
      'Old Money',
      'Classic',
    ],
    tops: ['T-shirts', 'Blouses', 'Sweaters', 'Hoodies'],
    bottoms: ['Jeans', 'Leggings', 'Joggers', 'Skirts'],
    dresses: ['Casual', 'Jumpsuit', 'Evening', 'Summer'],
  };

  // Configuration for Sizes tab
  const sizesConfig = {
    topSizes: ['X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large'],
    bottomSizes: ['X-Small', 'Small', 'Medium', 'Large', 'XX-Large'],
    dressSizes: ['X-Small', 'Small', 'Medium', 'Large', 'XX-Large'],
    footwearSizes: ['8', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'],
  };

  // Local state for selected interests and sizes
  const [selectedInterests, setSelectedInterests] = useState({
    outfitStyles: [] as string[],
    tops: [] as string[],
    bottoms: [] as string[],
    dresses: [] as string[],
  });

  const [selectedSizes, setSelectedSizes] = useState({
    topSizes: [] as string[],
    bottomSizes: [] as string[],
    dressSizes: [] as string[],
    footwearSizes: [] as string[],
  });

  /** Toggle handler to update a selected items array. */
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

  const tabs = ['Interests', 'Sizes'];

  return (
    <View style={styles.container}>
      <TabHeader
        tabs={tabs}
        selectedTab={selectedTab}
        onTabSelect={(tab) => setSelectedTab(tab as 'Interests' | 'Sizes')}
      />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {selectedTab === 'Interests' ? (
          <>
            <InterestsSection
              title="Outfit Styles"
              items={interestsConfig.outfitStyles}
              selectedItems={selectedInterests.outfitStyles}
              toggleItem={(item) =>
                toggleSelection(
                  item,
                  selectedInterests.outfitStyles,
                  (newArr: string[]) =>
                    setSelectedInterests({
                      ...selectedInterests,
                      outfitStyles: newArr,
                    })
                )
              }
            />
            <InterestsSection
              title="Tops"
              items={interestsConfig.tops}
              selectedItems={selectedInterests.tops}
              toggleItem={(item) =>
                toggleSelection(
                  item,
                  selectedInterests.tops,
                  (newArr: string[]) =>
                    setSelectedInterests({ ...selectedInterests, tops: newArr })
                )
              }
            />
            <InterestsSection
              title="Bottoms"
              items={interestsConfig.bottoms}
              selectedItems={selectedInterests.bottoms}
              toggleItem={(item) =>
                toggleSelection(
                  item,
                  selectedInterests.bottoms,
                  (newArr: string[]) =>
                    setSelectedInterests({ ...selectedInterests, bottoms: newArr })
                )
              }
            />
            <InterestsSection
              title="Dresses & One-Pieces"
              items={interestsConfig.dresses}
              selectedItems={selectedInterests.dresses}
              toggleItem={(item) =>
                toggleSelection(
                  item,
                  selectedInterests.dresses,
                  (newArr: string[]) =>
                    setSelectedInterests({ ...selectedInterests, dresses: newArr })
                )
              }
            />
          </>
        ) : (
          <>
            <SizesSection
              title="Tops"
              sizes={sizesConfig.topSizes}
              selectedSizes={selectedSizes.topSizes}
              toggleSize={(size) =>
                toggleSelection(
                  size,
                  selectedSizes.topSizes,
                  (newArr: string[]) =>
                    setSelectedSizes({ ...selectedSizes, topSizes: newArr })
                )
              }
            />
            <SizesSection
              title="Bottoms"
              sizes={sizesConfig.bottomSizes}
              selectedSizes={selectedSizes.bottomSizes}
              toggleSize={(size) =>
                toggleSelection(
                  size,
                  selectedSizes.bottomSizes,
                  (newArr: string[]) =>
                    setSelectedSizes({ ...selectedSizes, bottomSizes: newArr })
                )
              }
            />
            <SizesSection
              title="Dresses & One-Pieces"
              sizes={sizesConfig.dressSizes}
              selectedSizes={selectedSizes.dressSizes}
              toggleSize={(size) =>
                toggleSelection(
                  size,
                  selectedSizes.dressSizes,
                  (newArr: string[]) =>
                    setSelectedSizes({ ...selectedSizes, dressSizes: newArr })
                )
              }
            />
            <SizesSection
              title="Footwear"
              sizes={sizesConfig.footwearSizes}
              selectedSizes={selectedSizes.footwearSizes}
              toggleSize={(size) =>
                toggleSelection(
                  size,
                  selectedSizes.footwearSizes,
                  (newArr: string[]) =>
                    setSelectedSizes({ ...selectedSizes, footwearSizes: newArr })
                )
              }
            />
          </>
        )}
      </ScrollView>

      <View style={styles.saveButtonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={() => navigation.goBack()}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/** Styles */
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
    fontSize: 14,
    color: '#000',
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
