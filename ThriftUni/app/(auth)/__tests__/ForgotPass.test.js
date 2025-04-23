const admin = require("firebase-admin");
const { initializeApp } = require("firebase/app");
const { getAuth, sendPasswordResetEmail } = require("firebase/auth");

const serviceAccount = require("./service.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBliTLyyqHam9ei-900BYyt-y4ZGoowrEk",
  authDomain: "thriftuni-b345a.firebase.com",
});

const auth = getAuth(firebaseApp);

const testEmail = `testuser_${Date.now()}@example.com`;
const testPassword = "TestPassword123";

beforeAll(async () => {
  await admin.auth().createUser({
    email: testEmail,
    password: testPassword,
    displayName: "Test User",
  });
});

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

test("Send password reset email", async () => {
  let resetMessage;

  try {
    await sendPasswordResetEmail(auth, testEmail);
    resetMessage = "Password reset email sent";
  } catch (error) {
    console.error("Error sending password reset email:", error);
    resetMessage = "Error sending password reset email";
  }

  expect(resetMessage).toBe("Password reset email sent");
});
