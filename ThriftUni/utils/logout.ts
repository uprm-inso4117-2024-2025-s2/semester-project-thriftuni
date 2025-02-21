import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

/**
 * Logs out the currently authenticated user using Firebase Authentication.
 * Ensures that the authentication state updates correctly.
 * Handles potential errors that may occur during the logout process.
 */
export const logout = async () => {
  try {
    await signOut(auth);
    console.log('User logged out successfully');
  } catch (error) {
    console.error('Error logging out:', (error as Error).message);
  }
};
