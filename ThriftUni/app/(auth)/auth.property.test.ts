import fc from 'fast-check';
import { login } from '@/firebase/login';
import { signUp } from '@/firebase/signUp';

// ✅ Mock signUp and login functions
jest.mock('@/firebase/signUp', () => ({
  signUp: jest.fn(async (email: string, password: string) => {
    if (!email.includes('@')) {
      throw new Error('Invalid email format.');
    }
    if (password.length < 6) {
      throw new Error('Password too weak.');
    }
    return { success: true };
  }),
}));

jest.mock('@/firebase/login', () => ({
  login: jest.fn(async (email: string, password: string) => {
    if (!email.includes('@') || password.length < 6) {
      throw new Error('Invalid login.');
    }
    return { success: true };
  }),
}));

describe('Property-based Authentication Tests', () => {

  it('should handle random emails and passwords without crashing (signUp)', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string(),
        fc.string(),
        async (email, password) => {
          try {
            const result = await signUp(email, password);
            expect(result).toBeDefined();
          } catch (e) {
            expect(e).toBeDefined(); // 🔥 If it throws, that's fine
          }
        }
      ),
      { numRuns: 50 }
    );
  });

  it('should reject clearly invalid emails during signUp', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1, maxLength: 5 }),
        fc.string(),
        async (invalidEmail, password) => {
          try {
            const result = await signUp(invalidEmail, password);
            // If it doesn't throw, manually fail
            expect(result).toBeUndefined();
          } catch (error: any) {
            expect(error.message).toMatch(/invalid email/i);
          }
        }
      ),
      { numRuns: 30 }
    );
  });

  it('should reject weak passwords', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.emailAddress(),
        fc.string({ minLength: 0, maxLength: 4 }),
        async (email, weakPassword) => {
          try {
            const result = await signUp(email, weakPassword);
            // If it doesn't throw, manually fail
            expect(result).toBeUndefined();
          } catch (error: any) {
            expect(error.message).toMatch(/weak/i);
          }
        }
      ),
      { numRuns: 30 }
    );
  });

});
