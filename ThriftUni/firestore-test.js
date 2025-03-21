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
    let testFailed = false; // Variable to track if any test fails

    console.log("📌 Creating documents in Firestore with ADMIN permissions...");

    try {
        // 🔹 Define REAL user IDs in Firestore
        const USER_A_ID = "userA";
        const USER_B_ID = "userB";

        // 🔹 Define other document IDs
        const DUMMY_LISTING_ID = "9n6rXwn8cg26yMakJOgn";
        const DUMMY_CATEGORY_ID = "7BLt0bQeBVH91wi3jQIM";
        const DUMMY_RELATION_ID = "Wd3cSGlPzAAyVAdzSWBg";

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

        console.log("✅ All documents have been successfully created.");
    } catch (error) {
        console.error("❌ Error creating documents in Firestore:", error.message);
        testFailed = true;
    }

    // 🔹 Initialize the test environment
    const testEnv = await initializeTestEnvironment({ projectId: PROJECT_ID });

    const unauthenticatedContext = testEnv.unauthenticatedContext();
    const userAContext = testEnv.authenticatedContext("userA");
    const userBContext = testEnv.authenticatedContext("userB");

    const unauthDb = unauthenticatedContext.firestore();
    const userADb = userAContext.firestore();
    const userBDb = userBContext.firestore();

    console.log("🚀 Running tests...");

    async function runTest(description, testPromise) {
        console.log(`🟡 ${description}`);
        try {
            await testPromise;
            console.log(`✅ PASSED: ${description}\n`);
        } catch (error) {
            console.log(`❌ FAILED: ${description}\n   ⚠️  Error: ${error.message}\n`);
            testFailed = true; // Mark the test as failed
        }
    }

    // 🔹 Run tests
    await runTest("Authenticated users can read profiles",
        assertSucceeds(userADb.collection("users").doc("userA").get()));

    await runTest("A user CANNOT modify another user's profile",
        assertFails(userBDb.collection("users").doc("userA").set({ name: "New Name" })));

    await runTest("A user CAN modify their own profile",
        assertSucceeds(userADb.collection("users").doc("userA").set({ name: "New Name" })));

    await runTest("Everyone can read categories",
        assertSucceeds(unauthDb.collection("categories").doc("7BLt0bQeBVH91wi3jQIM").get()));

    await runTest("No one can write in categories",
        assertFails(userADb.collection("categories").doc("7BLt0bQeBVH91wi3jQIM").set({ name: "New Category" })));

    await runTest("Access to unknown collections is blocked",
        assertFails(userADb.collection("unknownCollection").doc("doc1").set({ data: "test" })));

    console.log("🎉 All tests have completed.");

    // 🔹 If any test failed, force exit with error
    if (testFailed) {
        console.error("🔥 Some tests failed. Exiting with error.");
        process.exit(1);
    }

    // Cleanup test environment
    await testEnv.cleanup();
})();