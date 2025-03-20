// imports
const { initializeTestEnvironment, assertSucceeds, assertFails } = require("@firebase/rules-unit-testing");
const admin = require("firebase-admin");

// Initialize admin for rw permissions
const PROJECT_ID = "thriftuni-b345a";

admin.initializeApp({
    projectId: PROJECT_ID,
    credential: admin.credential.applicationDefault()
});

const adminDb = admin.firestore();

// mock function to create listing_categories documents
const createListingCategoriesDoc = async (listingId, categoryId) => {
    await adminDb.collection("listing_categories").doc(listingId + categoryId).set({
        listing_id: listingId,
        category_id: categoryId
    });
};

// mock function to create listing documents
const createListingDoc = async (listingId, title, description, price, category_id, condition, latitude, longitude) => {
    await adminDb.collection("listing").doc(listingId).set({
        listing_id: listingId,
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
const createCategoriesDoc = async (categoryId, name, description) => {
    await adminDb.collection("categories").doc(categoryId).set({
        category_id: categoryId,
        name: name,
        description: description,
        created_at: admin.firestore.FieldValue.serverTimestamp()
    });
};

// Initialize the test environment
const testEnv = await initializeTestEnvironment({
    projectId: PROJECT_ID
});

// Create user contexts
const unauthenticatedContext = testEnv.unauthenticatedContext();
const userContext = testEnv.authenticatedContext("user");

// Obtain Firestore instances
const unauthDb = unauthenticatedContext.firestore();
const userDb = userContext.firestore();

describe("Firesotre rules for categories", () => {
    beforeAll(async () => {
        // Create initial documents
        await createCategoriesDoc("1", "Book", "Book for sale");
        await createListingDoc("1", "My Book", "Mock Description", 10, 1, 0, 0, 0);
        await createListingCategoriesDoc("1", "1");
    });

    afterAll(async () => {
        // Delete all created documents
        await adminDb.collection("categories").doc("1").delete();
        await adminDb.collection("listing").doc("1").delete();
        await adminDb.collection("listing_categories").doc("11").delete();
    });

    // Test 1: Test for duplicate categories docuent by evaluating name field
    test("Test for duplicate categories document by evaluating name field", async () => {
        await assertFails(createCategoriesDoc("2", "Book", "Book for sale"));
    });

    // Test 2: Test for duplicate listing_categories document by evaluating category_id and listing_id fields
    test("Test for duplicate listing_categories document by evaluating category_id and listing_id fields", async () => {
        await assertFails(createListingCategoriesDoc("1", "1"));
    });

    // test 3: Test for category_id being set to null when category document is deleted
    test("Test for category_id field of listing_category document being set to null when category document is deleted", async () => {
        await adminDb.collection("categories").doc("1").delete();
        const listingCategoriesDoc = await adminDb.collection("listing_categories").doc("11").get();
        expect(listingCategoriesDoc.data().category_id).toBeNull();
    });

    // Test 4: Test for listing_categories document being deleted when listing document is deleted
    test("Test for listing_categories document being deleted when listing document is deleted", async () => {
        await adminDb.collection("listing").doc("1").delete();
        const listingCategoriesDoc = await adminDb.collection("listing_categories").doc("11").get();
        expect(listingCategoriesDoc.exists).toBeFalsy();
    });
});

// test general stucture:
// 1) create a categories document
// 2) create a listing document
// 3) create a listing_categories document
// 4) read the listing_categories document and check if the category_id and listing_id are correct
// 5) delete the listing document
// 6) read the listing_categories document, it should not exist anymore
// 7) delete the categories document



