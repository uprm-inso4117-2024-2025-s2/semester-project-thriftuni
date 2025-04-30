import { db } from '../firebaseConfig.js';
import {
  collection, getDocs, doc, getDoc, updateDoc, deleteDoc,
  addDoc, query, where, orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { getAuth } from "firebase/auth";

// To get the reference to a logged-in user
const getCurrentUserRef = () => {
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  if (!uid) {
    throw new Error('User not authenticated');
  }
  return doc(db, 'users', uid);
};

// listings collection reference
const listingsCollectionRef = collection(db, 'listings');

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
    const q = query(listingsCollectionRef, where('user_id', '==', getCurrentUserRef().id));
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
      user_id: getCurrentUserRef().id,
      created_at: serverTimestamp(), // Firestore handles timestamp creation
    };
    const docRef = await addDoc(listingsCollectionRef, listingFromUser);
    return { id: docRef.id, ...listingFromUser };
  } catch (error) {
    console.error('Error creating listing:', error);
    throw error;
  }
};

// To update a listing by ID
export const updateListing = async (id: string, updatedData: any) => {
  try {
    const docRef = doc(db, 'listings', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error(`Listing with ID ${id} not found`);
    }
    const listingData = docSnap.data();
    if (listingData.user_id !== getCurrentUserRef().id) {
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

// To delete a listing by ID
export const deleteListing = async (id: string) => {
  try {
    const docRef = doc(db, 'listings', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error(`Listing with ID ${id} not found`);
    }
    const listingData = docSnap.data();
    if (listingData.user_id !== getCurrentUserRef().id) {
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


export const getSellerById = async (id: string) => {
  try {
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null; // seller document does not exist
    }
  } catch (error) {
    console.error(`Error fetching seller ${id}:`, error);
    throw error;
  }
}