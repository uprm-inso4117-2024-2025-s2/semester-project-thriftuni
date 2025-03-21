// What am I testing?
// 1) test for duplicate listing_images documents by evaluating their listing_id and position
// 2) test for listing_images document being deleted when listing document is deleted

// Imports
const { initializeTestEnvironment, assertSucceeds, assertFails } = require("@firebase/rules-unit-testing");
const admin = require("firebase-admin");
const assert = require("assert");

// Initialize admin for rw permissions
const PROJECT_ID = "thriftuni-b345a";

admin.initializeApp({
    projectId: PROJECT_ID,
    credential: admin.credential.applicationDefault()
});

const adminDb = admin.firestore();

// THESE MOCK FUNCTIONS ARE TO BE REPLACED WITH IMPLEMENTED FUNCTIONS FROM FRONTEND AND BACKEND INTERACTION

// mock function to create listing documents
const createListingsDoc = async (listingsId, title, description, price, category_id, condition, latitude, longitude) => {
    await adminDb.collection("listings").doc(listingsId).set({
        listing_id: listingsId,
        title: title,
        description: description,
        price: price,
        category_id: category_id,
        condition: condition,
        created_at: admin.firestore.FieldValue.serverTimestamp(),
        updated_at: admin.firestore.FieldValue.serverTimestamp(),
        deleted_at: null,
        latitude: latitude,
        longitude: longitude
    });
};

// mock function to create listing_images documents
const createListingImagesDoc = async (listingImagesId, listing_id, imageUrl, position) => {
    await adminDb.collection("listing_images").doc(listingImagesId).set({
        listing_id: listing_id,
        image_url: imageUrl,
        position: position,
        uploaded_at: admin.firestore.FieldValue.serverTimestamp()
    });
};

(async () => {
    console.log("Creating documents in Firestore.");

    // Create initial documents in Firestore
    try {
        await createListingsDoc("1", "My Book", "Mock Description", 10, "1", ["New"], 0, 0);
        await createListingImagesDoc("1", "1", "DOWNLOAD_URL", 1);

        console.log("Initial documents created successfully.");
    } catch (error) {
        console.error("Error creating documents: ", error.message);
    };

    // Initialize the test environment
    const testEnv = await initializeTestEnvironment({
        projectId: PROJECT_ID
    });

    afterAll(async () => {
        // Ensure all created documents are deleted
        await adminDb.collection("listings").doc("1").delete();
        await adminDb.collection("listing_images").doc("1").delete();
        await testEnv.cleanup();
    });

    console.log("Running tests.");

    // Test 1: Test duplicate listing_images document by evaluating their listing_id
    try {
        await createListingImagesDoc("2", "1", "DOWNLOAD_URL", 1);
        assert.fail("Test for duplicate listing_images document FAILED.");
    } catch (error) {
        console.log("Test for duplicate listing_images document PASSED: ", error.message);
    };

    //test 2: Test for listing_images document being deleted when listing document is deleted
    try {
        await adminDb.collection("listings").doc("1").delete();
        const listingImagesDoc = await adminDb.collection("listing_images").doc("1").get();
        assert.strictEqual(listingImagesDoc.exists, false);
        console.log("Test for listing_images document being deleted when listing document is deleted PASSED.");
    } catch (error) {
        console.error("Error deleting listing document: ", error.message);
    };

    console.log("🔥 All tests have been executed.");

    await testEnv.cleanup();
})();