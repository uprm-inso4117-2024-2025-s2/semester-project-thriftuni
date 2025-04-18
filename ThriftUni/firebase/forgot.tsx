import { getAuth, sendPasswordResetEmail } from "firebase/auth";

// Rate limiting config
const resetAttempts: Record<string, { count: number; timestamp: number }> = {};
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes
const MAX_ATTEMPTS = 3;

/**
 * Sends a password reset email and logs the attempt.
 */
export const sendPasswordReset = async (email: string) => {
  const auth = getAuth();

  try {
    await sendPasswordResetEmail(auth, email);
    logResetAttempt(email, "success");
    return { success: true };
  } catch (error) {
    logResetAttempt(email, "failed");
    return { error: (error as any).message };
  }
};

/**
 * Logs the outcome of a password reset attempt.
 */
export const logResetAttempt = (
  email: string,
  status: "success" | "failed"
) => {
  console.log(
    `Password reset attempt for ${email}: ${status} at ${new Date().toISOString()}`
  );
};

/**
 * Checks if the user has hit the rate limit for reset attempts.
 */
export const checkRateLimit = (email: string): boolean => {
  const now = Date.now();

  if (!resetAttempts[email]) {
    resetAttempts[email] = { count: 1, timestamp: now };
    return false;
  }

  const elapsedTime = now - resetAttempts[email].timestamp;

  if (elapsedTime > RATE_LIMIT_WINDOW) {
    resetAttempts[email] = { count: 1, timestamp: now };
    return false;
  }

  if (resetAttempts[email].count >= MAX_ATTEMPTS) {
    return true;
  }

  resetAttempts[email].count += 1;
  return false;
};
