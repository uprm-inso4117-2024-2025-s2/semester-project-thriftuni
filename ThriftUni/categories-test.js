// imports
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

// mock function to create listing_categories documents
const createListingCategoriesDoc = async (listingsId, categoriesId) => {
    await adminDb.collection("listing_categories").doc(listingsId + categoriesId).set({
        listing_id: listingsId,
        category_id: categoriesId
    });
};

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

// mock function to create categories documents
const createCategoriesDoc = async (categoriesId, name, description) => {
    await adminDb.collection("categories").doc(categoriesId).set({
        category_id: categoriesId,
        name: name,
        description: description,
        created_at: admin.firestore.FieldValue.serverTimestamp()
    });
};

(async () => {
    console.log("Creating documents in Firestore.");

    // Create initial documents in Firestore
    try {
        await createCategoriesDoc("1", "Book", "Book for sale");
        await createListingsDoc("1", "My Book", "Mock Description", 10, 1, ["New"], 0, 0);
        await createListingCategoriesDoc("1", "1");

        console.log("All initial documents have been successfully created.");
    } catch (error) {
        console.error("Error creating initial documents in Firestore:", error.message);
    };

    // Initialize the test environment
    const testEnv = await initializeTestEnvironment({
        projectId: PROJECT_ID
    });

    //////////////////////////////////////////////////////////////////
    afterAll(async () => {
        // Ensure all created documents are deleted
        const categoriesDoc1 = await adminDb.collection("categories").doc("1").get();
        if (categoriesDoc1.exists) {
            await adminDb.collection("categories").doc("1").delete();
        };
        const categoriesDoc2 = await adminDb.collection("categories").doc("2").get();
        if (categoriesDoc2.exists) {
            await adminDb.collection("categories").doc("2").delete();
        };
        const listingsDoc = await adminDb.collection("listings").doc("1").get();
        if (listingsDoc.exists) {
            await adminDb.collection("listings").doc("1").delete();
        };
        const listingCategoriesDoc = await adminDb.collection("listing_categories").doc("11").get();
        if (listingCategoriesDoc.exists) {
            await adminDb.collection("listing_categories").doc("11").delete();
        };

        await testEnv.cleanup();
    });
    //////////////////////////////////////////////////////////////////

    console.log("Running tests.");

    //Test 1: Test for duplicate categories docuent by evaluating name field
    try {
        await createCategoriesDoc("2", "Book", "Book for sale");
        console.log("Test for duplicate categories document by evaluating name field: PASSED");
    } catch (error) {
        console.log(`FAILED: Test for duplicate categories document by evaluating name field\nError: ${error.message}\n`);
    };

    // Test 2: Test for duplicate listing_categories document by evaluating category_id and listing_id fields
    try {
        await createListingCategoriesDoc("1", "1");
        console.log("Test for duplicate listing_categories document by evaluating category_id and listing_id fields: PASSED");
    } catch (error) {
        console.log(`FAILED: Test for duplicate listing_categories document by evaluating category_id and listing_id fields\n Error: ${error.message}\n`);
    };

    // Test 3: Test for category_id being set to null when category document is deleted
    try {
        await adminDb.collection("categories").doc("1").delete();
        const listingCategoriesDoc = await adminDb.collection("listing_categories").doc("11").get();
        assert.strictEqual(listingCategoriesDoc.data().category_id, null)
        console.log("Test for category_id field of listing_category document being set to null when category document is deleted: PASSED");
    } catch (error) {
        console.log(`FAILED: Test for category_id field of listing_category document being set to null when category document is deleted\nError: ${error.message}\n`);
    };

    // Test 4: Test for listing_categories document being deleted when listing document is deleted
    try {
        await adminDb.collection("listings").doc("1").delete();
        const listingCategoriesDoc2 = await adminDb.collection("listing_categories").doc("11").get();
        assert.strictEqual(listingCategoriesDoc2.exists, false);
        console.log("Test for listing_categories document being deleted when listing document is deleted: PASSED");
    } catch (error) {
        console.log(`FAILED: Test for listing_categories document being deleted when listing document is deleted\nError: ${error.message}\n`);
    };

    console.log("🔥 All tests have been executed.");

    await testEnv.cleanup();
})();
