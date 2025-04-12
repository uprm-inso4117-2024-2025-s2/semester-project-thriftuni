import { db } from "../firebaseConfig.js"; // adjust the path
import { collection, addDoc, Timestamp } from "firebase/firestore";

const insertListing = async (listingData: {
  category_id: string;
  condition: string;
  created_at: Timestamp;
  deleted_at: Timestamp;
  description: string;
  latitude: number;
  listing_id: string;
  location: string;
  longitude: number;
  price: string;
  updated_at: Timestamp;
  image: string;
}) => {
  try {
    const docRef = await addDoc(collection(db, "listings"), {
      ...listingData,
      createdAt: Timestamp.now(),
    });
    console.log("Document written with ID: ", docRef.id);
    console.log("Image is " + listingData.image);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export default insertListing;
