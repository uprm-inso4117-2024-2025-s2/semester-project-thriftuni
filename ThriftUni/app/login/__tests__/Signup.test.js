const admin = require("firebase-admin");

const serviceAccount = require("./service.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const testEmail = `testuser_${Date.now()}@example.com`; 

afterAll(async () => {
  try {
    const user = await admin.auth().getUserByEmail(testEmail);
    await admin.auth().deleteUser(user.uid);
    console.log("Test user deleted:", user.uid);
  } catch (error) {
    if (error.code !== "auth/user-not-found") {
      console.error("Error deleting test user:", error);
    }
  }
});

test("Create a test user in Firebase", async () => {
  let userMessage;

  try {
    const userRecord = await admin.auth().createUser({
      email: testEmail,
      password: "TestPassword123",
      displayName: "Test User",
      disabled: false,
    });

    console.log("Test user created:", userRecord.uid);
    userMessage = "Test user created";
  } catch (error) {
    console.error("Error creating test user:", error);
    userMessage = "Error creating test user";
  }

  expect(userMessage).toBe("Test user created");
});
