const { initializeTestEnvironment, assertFails, assertSucceeds } = require('@firebase/rules-unit-testing');
const admin = require("firebase-admin");

const PROJECT_ID = "thriftuni-b345a";  // Replace with your project ID

// Initialize Firebase Admin (to write documents without restrictions)
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: PROJECT_ID
});

const adminDb = admin.firestore(); // Administrator-level Firestore connection

(async () => {
    // 🔹 Define REAL user IDs in Firestore (must match the context UIDs)
    const USER_A_ID = "userA";
    const USER_B_ID = "userB";

    // 🔹 Define other document IDs
    const DUMMY_LISTING_ID = "9n6rXwn8cg26yMakJOgn";
    const DUMMY_CATEGORY_ID = "7BLt0bQeBVH91wi3jQIM";
    const DUMMY_RELATION_ID = "Wd3cSGlPzAAyVAdzSWBg";

    console.log("📌 Creating documents in Firestore with ADMIN permissions...");

    // 🔹 Create documents with Admin privileges
    try {
        // Create users in Firestore with correct UIDs
        await adminDb.collection("users").doc(USER_A_ID).set({
            createdAt: new Date(),
            email: "userA@gmail.com",
            name: "User A",
            username: "userA"
        });

        await adminDb.collection("users").doc(USER_B_ID).set({
            createdAt: new Date(),
            email: "userB@gmail.com",
            name: "User B",
            username: "userB"
        });

        // Create other test documents
        await adminDb.collection("listing").doc(DUMMY_LISTING_ID).set({
            created_at: new Date(),
            currency: "USD",
            description: "Dummy document for testing and temporary structure",
            price: 0.99,
            title: "Dummy Listing",
            ownerId: USER_A_ID // 🔹 Assign a real owner to the listing
        });

        await adminDb.collection("categories").doc(DUMMY_CATEGORY_ID).set({
            created_at: new Date(),
            description: "Dummy document for testing and referencing document structure",
            name: "Dummy Category"
        });

        await adminDb.collection("listing_categories").doc(DUMMY_RELATION_ID).set({
            category_id: `/categories/${DUMMY_CATEGORY_ID}`,
            listing_id: `/listing/${DUMMY_LISTING_ID}`
        });

        console.log("✅ All documents have been successfully created.");
    } catch (error) {
        console.error("❌ Error creating documents in Firestore:", error.message);
    }

    // 🔹 Initialize the test environment
    const testEnv = await initializeTestEnvironment({
        projectId: PROJECT_ID,
    });

    // 🔹 Create user contexts with correct UIDs
    const unauthenticatedContext = testEnv.unauthenticatedContext();
    const userAContext = testEnv.authenticatedContext(USER_A_ID); // 🔹 Now uses the real UID
    const userBContext = testEnv.authenticatedContext(USER_B_ID); // 🔹 Now uses the real UID

    // 🔹 Obtain Firestore instances
    const unauthDb = unauthenticatedContext.firestore();
    const userADb = userAContext.firestore();
    const userBDb = userBContext.firestore();

    console.log("🚀 Running tests...");

    // Function to print test results
    async function runTest(description, testPromise) {
        console.log(`🟡 ${description}`);
        try {
            await testPromise;
            console.log(`✅ PASSED: ${description}\n`);
        } catch (error) {
            console.log(`❌ FAILED: ${description}\n   ⚠️  Error: ${error.message}\n`);
        }
    }

    // 🔹 Execute tests with descriptive messages
    await runTest("Authenticated users can read profiles",
        assertFails(userADb.collection("users").doc(USER_A_ID).get())); // Incorrect assertFails to force failure

    await runTest("A user CANNOT modify another user's profile",
        assertFails(userBDb.collection("users").doc(USER_A_ID).set({ name: "New Name" })));

    await runTest("A user CAN modify their own profile",
        assertSucceeds(userADb.collection("users").doc(USER_A_ID).set({ name: "New Name" })));

    await runTest("Everyone can read categories",
        assertSucceeds(unauthDb.collection("categories").doc(DUMMY_CATEGORY_ID).get()));

    await runTest("No one can write in categories",
        assertFails(userADb.collection("categories").doc(DUMMY_CATEGORY_ID).set({ name: "New Category" })));

    await runTest("Everyone can read listings",
        assertSucceeds(unauthDb.collection("listing").doc(DUMMY_LISTING_ID).get()));

    await runTest("A user CANNOT modify a listing that is not theirs",
        assertFails(userBDb.collection("listing").doc(DUMMY_LISTING_ID).set({ title: "Edited Listing" })));

    await runTest("Access to unknown collections is blocked",
        assertFails(userADb.collection("unknownCollection").doc("doc1").set({ data: "test" })));

    await runTest("Everyone can read relationships between listings and categories",
        assertSucceeds(unauthDb.collection("listing_categories").doc(DUMMY_RELATION_ID).get()));

    await runTest("No one can write in listing_categories",
        assertFails(userADb.collection("listing_categories").doc(DUMMY_RELATION_ID).set({ listingId: DUMMY_LISTING_ID, categoryId: DUMMY_CATEGORY_ID })));

    console.log("🎉 All tests have completed.");

    // Cleanup test environment
    await testEnv.cleanup();
})();
