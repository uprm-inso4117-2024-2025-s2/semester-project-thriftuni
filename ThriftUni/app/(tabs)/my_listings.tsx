import { StyleSheet, Pressable, Image, FlatList, Modal, TextInput, ScrollView } from 'react-native';
import { View, Text } from '@/components/Themed';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function DisplayMyListing() {
  const [listings, setListings] = useState([
    {
      id: '1',
      name: 'Lorem Ipsum',
      details: 'Details about product',
      price: '$10.05',
      status: 'Pending',
      photos: ['https://archive.org/download/placeholder-image/placeholder-image.jpg'],
    },
    {
      id: '2',
      name: 'Lorem Ipsum',
      details: 'Details about product',
      price: '$5.05',
      status: 'Sold',
      photos: ['https://archive.org/download/placeholder-image/placeholder-image.jpg'],
    }
  ]);

  const [filter, setFilter] = useState('All');
  const [isEditing, setIsEditing] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentListing, setCurrentListing] = useState<any>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editDetails, setEditDetails] = useState('');
  const [editPhotos, setEditPhotos] = useState<string[]>([]);
  const [editStatus, setEditStatus] = useState('');

  const handleFilter = (status: React.SetStateAction<string>) => {
    setFilter(status);
  };

  const handleDelete = (id: string) => {
    setListings(prevListings => prevListings.filter(listing => listing.id !== id));
  };

  const handleEdit = (listing: any) => {
    setCurrentListing(listing);
    setEditTitle(listing.name);
    setEditPrice(listing.price);
    setEditDetails(listing.details);
    setEditPhotos([...listing.photos]);
    setModalVisible(true);
    setEditStatus(listing.status);
  };

  const handleSaveChanges = () => {
    const updatedListings = listings.map(listing =>
      listing.id === currentListing.id
        ? { ...listing, name: editTitle, price: editPrice, details: editDetails, photos: editPhotos, status: editStatus }
        : listing
    );



    setListings(updatedListings);
    setModalVisible(false);
    setCurrentListing(null);
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
              <Image source={{ uri: item.photos[0] }} style={styles.image} />
              <View style={styles.card_information}>
                <Text style={{ fontSize: 25, color: "#000", margin: 5 }}>{item.name}</Text>
                <Text style={{ fontSize: 15, color: "#000", margin: 5 }}>{item.details}</Text>
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
                  {editPhotos.map((uri, index) => (
                    <View key={index} style={{ position: 'relative', marginRight: 10 }}>
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