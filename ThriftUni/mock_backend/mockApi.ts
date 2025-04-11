// mock_backend/mockApi.ts
import listingsData from './listingsData.json';
import { db } from '../firebaseConfig.js';
import {
  collection, getDocs, doc, getDoc, updateDoc, deleteDoc,
  addDoc, query, where, orderBy,
  serverTimestamp
} from 'firebase/firestore';

// Constant reference to mock a logged in user
const currentUserRef = doc(db, 'users', 'o7O7aJAdDsgLMeNjeP9U87Jj4ob2');

// listings and users collection references
const listingsCollectionRef = collection(db, 'listings');
const usersCollectionRef = collection(db, 'users');

let listings = [...listingsData]; // In-memory mock database

// export const getListings = async () => {
//   return [...listings]; // Simulate async fetch
// };

// To get all listings
export const getListings = async () => {
  try {
    const querySnapshot = await getDocs(listingsCollectionRef);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
};

// To get listings associated to the current user
export const getCurrentUserListings = async () => {
  try {
    const q = query(listingsCollectionRef, where('user', '==', currentUserRef));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching current user listings:', error);
    throw error;
  }
};

// To get a single listing by ID
export const getListingById = async (id: string) => {
  try {
    const docRef = doc(db, 'listings', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null; // listing document does not exist
    }
  } catch (error) {
    console.error(`Error fecting listing ${id}:`, error);
    throw error;
  }
};

// To create a new listings document
export const createListing = async (listingsData: any) => {
  try {
    const listingFromUser = {
      ...listingsData,
      user: currentUserRef,
      created_at: serverTimestamp(), // Firestore handles timestamp creation
    };
    const docRef = await addDoc(listingsCollectionRef, listingFromUser);
    return { id: docRef.id, ...listingFromUser };
  } catch (error) {
    console.error('Error creating listing:', error);
    throw error;
  }
};

// export const updateListing = async (id: string, updatedData: any) => {
//   listings = listings.map(listing =>
//     listing.id === id ? { ...listing, ...updatedData } : listing
//   );
//   return listings.find(listing => listing.id === id);
// };

// To update a listing by ID
export const updateListing = async (id: string, updatedData: any) => {
  try {
    const docRef = doc(db, 'listings', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error(`Listing with ID ${id} not found`);
    }
    const listingData = docSnap.data();
    if (listingData.user.path !== currentUserRef.path) {
      throw new Error('Current user does not have permission to update this listing');
    }
    await updateDoc(docRef, updatedData);
    const updatedDoc = await getDoc(docRef);
    return { id: updatedDoc.id, ...updatedDoc.data() };
  } catch (error) {
    console.error(`Error updating listing with ID ${id}:`, error);
    throw error;
  }
};

// export const deleteListing = async (id: string) => {
//   listings = listings.filter(listing => listing.id !== id);
//   return true;
// };

// To delete a listing by ID
export const deleteListing = async (id: string) => {
  try {
    const docRef = doc(db, 'listings', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error(`Listing with ID ${id} not found`);
    }
    const listingData = docSnap.data();
    if (listingData.user.path !== currentUserRef.path) {
      throw new Error('Current user does not have permission to delete this listing');
    }
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(`Error deleting listing with ID ${id}:`, error);
    throw error;
  }
};

interface ListingImage {
  id: string;
  image_url: string;
  listing_id: any;
  position: number;
  uploaded_at: any;
}

// To get images for a listing by ID
export const getListingImages = async (listingId: string): Promise<ListingImage[]> => {
  try {
    const imagesCollectionRef = collection(db, 'listing_images');
    const q = query(
      imagesCollectionRef,
      where('listing_id', '==', doc(db, 'listings', listingId)),
      orderBy('position', 'asc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ListingImage[];
  } catch (error) {
    console.error(`Error fetching images for listing with ID ${listingId}:`, error);
    return []; // Empty array of images
  }
};