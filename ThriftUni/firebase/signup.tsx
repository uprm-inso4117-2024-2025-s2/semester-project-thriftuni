  import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
  import { auth, db } from "./firebase.config";
  import { setDoc, doc } from "firebase/firestore";
  
  const verificationAttempts: Record<string, { count: number; timestamp: number }> = {};
  const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes
  const MAX_ATTEMPTS = 3;
  
  export const signUp = async (email: string, password: string, displayName: string) => {
    if (checkRateLimit(email)) {
      return { error: "Too many verification requests. Please try again later." };
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await updateProfile(user, { displayName });
  
      await setDoc(doc(db, "users", user.uid), {
        displayName,
        email,
        createdAt: new Date(),
      });
  
      await sendEmailVerification(auth, email);
      logVerificationAttempt(email, "success");
      return { success: true, message: "Please check your email to verify your account."};
      
    } catch (error: any) {
      logVerificationAttempt(email, "failed");
  
      let errorMessage = "An error occurred during sign-up.";
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "This email is already in use.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email format.";
          break;
        case "auth/weak-password":
          errorMessage = "Password is too weak. Choose a stronger one.";
          break;
      }
  
      return { error: errorMessage };
    }
  };
  
  const logVerificationAttempt = (email: string, status: "success" | "failed") => {
    console.log(`Email verification attempt for ${email}: ${status} at ${new Date().toISOString()}`);
  };
  
  const checkRateLimit = (email: string) => {
    const now = Date.now();
    if (!verificationAttempts[email]) {
      verificationAttempts[email] = { count: 1, timestamp: now };
      return false;
    }
  
    const elapsedTime = now - verificationAttempts[email].timestamp;
    if (elapsedTime > RATE_LIMIT_WINDOW) {
      verificationAttempts[email] = { count: 1, timestamp: now };
      return false;
    }
  
    if (verificationAttempts[email].count >= MAX_ATTEMPTS) {
      return true;
    }
  
    verificationAttempts[email].count += 1;
    return false;
  };
  
  