import React, { useEffect } from 'react';
import { db } from './firebaseConfig.js';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';

const CreateFirestoreCollections = () => {
    useEffect(() => {
        const createCollections = async () => {
            try {
                const listingCollection = collection(db, 'listing');
                const categoriesCollection = collection(db, 'categories');
                const listingCategoriesCollection = collection(db, 'listing_categories');

                // "listing" collection
                const listingDocRef = doc(listingCollection);
                // Firestore creates a random string ID for the document
                const dummyListDoc = {
                    title: "Dummy Listing",
                    description: "Dummy document for testing and temporary structure",
                    price: 0.99,
                    currency: "USD",
                    created_at: serverTimestamp(), // Firestore handles timestamp creation
                };
                await setDoc(listingDocRef, dummyListDoc);
                console.log("'listing' collection created and dummy document added with temporary structure.");

                // "categories" collection
                const categoriesDocRef = doc(categoriesCollection);
                // Firestore creates a random string ID for the document
                const dummyCatDoc = {
                    name: "Dummy Category",
                    description: "Dummy document for testing and referencing documetn structure",
                    created_at: serverTimestamp(), // Firestore handles timestamp creation
                };
                await setDoc(categoriesDocRef, dummyCatDoc);
                console.log("'categories' collection created and dummy document added for structure reference.");

                // "listing_categories" collection
                const listingCategoriesDocRef = doc(listingCategoriesCollection);
                // Firestore creates a random string ID for the document
                const dummyListingCatDoc = {
                    category_id: categoriesDocRef,
                    listing_id: listingDocRef,
                };
                await setDoc(listingCategoriesDocRef, dummyListingCatDoc);
                console.log("'listing_categories' collection created and dummy document added.");


            } catch (error) {
                console.error("Error creating Firestore collections:", error);
            }
        };

        createCollections();
    }, []);

    return (
        <View>
            <Text>Creating Firestore Collections (check console for logs)</Text>
        </View>
    );
};

import { View, Text } from 'react-native';

export default CreateFirestoreCollections;