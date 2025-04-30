import { StyleSheet, Pressable, Image, FlatList, Modal, TextInput, ScrollView } from 'react-native';
import { View, Text } from '@/components/Themed';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { getCurrentUserListings, updateListing, deleteListing, getListingImages } from '../../backend/Api'; // <-- Updated import
import { useEffect } from 'react';
import { serverTimestamp } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

export default function DisplayMyListing() {
  type Listing = {
    id: string;
    title: string;
    description: string;
    price: number;
    status: string;
    photos: string[];
    category_id?: string;   // categories document id
    condition?: string[];
    created_at?: any;       // Firestore timestamp
    deleted_at?: any;       // Firestore timestamp
    updated_at?: any;       // Firestore timestamp
    latitude?: number;
    longitude?: number;
    location?: string;
    listing_id?: string;
    user?: any;  // Reference to current user document
    listing_images?: Array<{
      id: string;
      image_url: string;
      position: number;
      uploaded_at: any; // Firestore timestamp
    }>;
  };

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState('All');
  const [isEditing, setIsEditing] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentListing, setCurrentListing] = useState<any>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editDetails, setEditDetails] = useState('');
  const [editPhotos, setEditPhotos] = useState<string[]>([]);
  const [editStatus, setEditStatus] = useState('');

  // Function to fetch listings that can be reused
  const fetchListings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCurrentUserListings();

      // Map Firestore data to component structure
      const typedListings = data.map(item => ({
        id: item.id,
        title: (item as any).title || '',
        description: (item as any).description || '',
        price: (item as any).price || 0,
        status: (item as any).status || 'Pending',
        photos: Array.isArray((item as any).photos) ? (item as any).photos : ((item as any).image ? [(item as any).image] : []),
        category_id: (item as any).category_id,
        condition: (item as any).condition,
        created_at: (item as any).created_at,
        deleted_at: (item as any).deleted_at,
        updated_at: (item as any).updated_at,
        latitude: (item as any).latitude,
        longitude: (item as any).longitude,
        location: (item as any).location,
        listing_id: (item as any).listing_id,
        user: (item as any).user,
        listing_images: []
      })) as Listing[];

      // Fetch images for each listing
      const listingsWithImages = await Promise.all(
        typedListings.map(async (listing) => {
          try {
            const images = await getListingImages(listing.id);
            return {
              ...listing,
              listing_images: images,
              displayImage: images.length > 0 ? images[0].image_url : (listing.photos.length > 0 ? listing.photos[0] : null)
            };
          } catch (error) {
            console.error(`Error fetching images for listing with ID ${listing.id}:`, error);
            return {
              ...listing,
              displayImage: listing.photos.length > 0 ? listing.photos[0] : null
            };
          }
        })
      );

      // Ensure compatibility with existing UI
      const compatibleListings = listingsWithImages.map(item => ({
        ...item,
        name: item.title,              // Map to what UI expects
        details: item.description      // Map to what UI expects
      })) as unknown as Listing[];

      setListings(compatibleListings);
    } catch (error) {
      console.error('Error fetching listings:', error);
      setError('Failed to load listings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchListings();
      return () => { }
    }, [])
  );

  useEffect(() => {
    fetchListings();
  }, []);

  const getListingImageSource = (item: Listing) => {
    if (item.listing_images && item.listing_images.length > 0) {
      return { uri: item.listing_images[0].image_url };
    } else if (item.photos && item.photos.length > 0) {
      return { uri: item.photos[0] };
    } else if ((item as any).image) {
      return { uri: (item as any).image };
    }
    return { uri: "https://archive.org/download/placeholder-image/placeholder-image.jpg" };
  };

  const handleFilter = (status: React.SetStateAction<string>) => {
    setFilter(status);
  };

  const handleDelete = async (id: string) => {
    try {
      const success = await deleteListing(id);
      if (success) {
        setListings(prevListings => prevListings.filter(listing => listing.id !== id));
      }
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  };


  const handleEdit = (listing: any) => {
    setCurrentListing(listing);
    setEditTitle(listing.title || listing.name);
    setEditPrice(String(listing.price));
    setEditDetails(listing.description || listing.details);
    // setEditPhotos([...(listing.photos || [])]);
    if (listing.listing_images && listing.listing_images.length > 0) {
      setEditPhotos(listing.listing_images.map((image: any) => image.image_url));
    } else {
      setEditPhotos([...(listing.photos || [])]);
    }
    setModalVisible(true);
    setEditStatus(listing.status || 'Pending');
  };

  const handleSaveChanges = async () => {
    try {
      const updatedItem = {
        ...currentListing,
        title: editTitle,
        price: parseFloat(editPrice) || 0,
        description: editDetails,
        photos: editPhotos,
        status: editStatus,
        updated_at: serverTimestamp()
      };

      const updated = await updateListing(currentListing.id, updatedItem);

      if (updated) {
        await fetchListings();
      }
      setModalVisible(false);
      setCurrentListing(null);
    } catch (error) {
      console.error('Error updating listing:', error);
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setEditPhotos(prevPhotos => [...prevPhotos, uri]);
    }
  };

  const handleRemovePhoto = (uri: string) => {
    setEditPhotos(prevPhotos => prevPhotos.filter(photo => photo !== uri));
  };

  const filteredListings = filter === 'All' ? listings : listings.filter(listing => listing.status === filter);

  return (
    <View style={styles.container}>
      <View style={styles.header}><Text style={styles.header_text}>My Listing</Text></View>
      <View style={styles.body}>
        <View style={styles.upper_buttons_container}>
          <Pressable style={styles.upper_button} onPress={() => handleFilter(filter === 'All' ? 'Sold' : 'All')}>
            <Text style={styles.upper_button_text}>{filter}</Text>
          </Pressable>
          <Pressable style={styles.upper_button} onPress={() => setIsEditing(!isEditing)}>
            <Text style={styles.upper_button_text}>{isEditing ? 'Done' : 'Edit'}</Text>
          </Pressable>
        </View>

        <FlatList
          data={filteredListings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={getListingImageSource(item)} style={styles.image} />
              <View style={styles.card_information}>
                <Text style={{ fontSize: 25, color: "#000", margin: 5 }}>{item.title}</Text>
                <Text style={{ fontSize: 15, color: "#000", margin: 5 }}>{item.description}</Text>
                <Text style={{ fontSize: 15, color: "#000", margin: 5 }}>{item.price}</Text>
              </View>
              <Text style={{ marginLeft: 'auto', marginRight: 25, fontSize: 10, color: "#000" }}>{item.status}</Text>
              {isEditing && (
                <View style={{ flexDirection: 'row', backgroundColor: '#fff', }}>
                  <Pressable onPress={() => handleEdit(item)} style={styles.editButton}>
                    <Text style={{ color: 'white' }}>Edit</Text>
                  </Pressable>
                  <Pressable onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                    <Text style={{ color: 'white' }}>Delete</Text>
                  </Pressable>
                </View>
              )}
            </View>
          )}
        />

        {/* Edit Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <ScrollView>
                <Text style={styles.modalTitle}>Edit Listing</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Title"
                  value={editTitle}
                  onChangeText={setEditTitle}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Price"
                  value={editPrice}
                  onChangeText={setEditPrice}
                />
                <TextInput
                  style={[styles.input, { height: 100 }]}
                  placeholder="Description"
                  value={editDetails}
                  onChangeText={setEditDetails}
                  multiline
                />
                <Text style={{ fontSize: 16, marginTop: 10 }}>Status:</Text>
                <View style={styles.statusButtonGroup}>
                  {['Pending', 'Active', 'Sold'].map(statusOption => (
                    <Pressable
                      key={statusOption}
                      style={[
                        styles.statusButton,
                        editStatus === statusOption && styles.statusButtonSelected
                      ]}
                      onPress={() => setEditStatus(statusOption)}
                    >
                      <Text
                        style={{
                          color: editStatus === statusOption ? 'white' : 'black',
                          fontWeight: 'bold',
                        }}
                      >
                        {statusOption}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                {/* Photo Management */}
                <Text style={{ fontSize: 16, marginVertical: 10 }}>Photos:</Text>
                <ScrollView horizontal>
                  {currentListing?.listing_images && currentListing.listing_images.map((image: { id: string; image_url: string; position: number; uploaded_at: any }, index: number) => (
                    <View key={`db-${index}`} style={{ position: 'relative', marginRight: 10 }}>
                      <Image source={{ uri: image.image_url }} style={styles.editImage} />
                      <Pressable
                        onPress={() => handleRemovePhoto(image.image_url)}
                        style={styles.removePhotoButton}
                      >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>✕</Text>
                      </Pressable>
                    </View>
                  ))}
                  {editPhotos.filter(uri =>
                    !currentListing?.listing_images?.some((image: { id: string; image_url: string; position: number; uploaded_at: any }) => image.image_url === uri)
                  ).map((uri, index) => (
                    <View key={`new-${index}`} style={{ position: 'relative', marginRight: 10 }}>
                      <Image source={{ uri }} style={styles.editImage} />
                      <Pressable
                        onPress={() => handleRemovePhoto(uri)}
                        style={styles.removePhotoButton}
                      >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>✕</Text>
                      </Pressable>
                    </View>
                  ))}
                </ScrollView>
                <Pressable onPress={handlePickImage} style={styles.addPhotoButton}>
                  <Text style={{ color: 'white' }}>Add Photo</Text>
                </Pressable>

                <View style={styles.modalButtonsContainer}>
                  <Pressable style={styles.modalButtonSave} onPress={handleSaveChanges}>
                    <Text style={{ color: 'white' }}>Save Changes</Text>
                  </Pressable>
                  <Pressable style={styles.modalButtonCancel} onPress={() => setModalVisible(false)}>
                    <Text style={{ color: 'white' }}>Cancel</Text>
                  </Pressable>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: {
    textAlign: 'center',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    backgroundColor: 'white',
  },
  header_text: {
    fontSize: 35,
    color: 'black',
    textAlign: 'center',
  },
  body: { flex: 1, padding: 20, backgroundColor: "#F6F9FF" },
  upper_buttons_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: "#F6F9FF",
  },
  upper_button: {
    padding: 10,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  upper_button_text: { fontSize: 20, color: '#000' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  card_information: { flex: 1, backgroundColor: "#fff" },
  image: { width: 80, height: 80, marginRight: 10 },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    backgroundColor: '#fff',
  },
  modalButtonSave: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  editImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  removePhotoButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 12,
    padding: 2,
  },
  addPhotoButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  statusButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    backgroundColor: '#fff'
  },
  statusButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  statusButtonSelected: {
    backgroundColor: '#000',
  },


});