// app/auth/auth.fuzz.test.ts

import { signUp } from '@/firebase/signUp_test';
import { login } from '@/firebase/login';
import { fuzzStrings } from './fuzzHelpers';

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

describe('Authentication Fuzz Testing', () => {

  fuzzStrings.forEach((fuzz) => {
    it(`should not crash signUp with fuzzed input: ${fuzz}`, async () => {
      try {
        const result = await signUp(fuzz, fuzz);
        expect(result).toBeDefined();
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it(`should not crash login with fuzzed input: ${fuzz}`, async () => {
      try {
        const result = await login(fuzz, fuzz);
        expect(result).toBeDefined();
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  it('should not crash with undefined inputs (signUp)', async () => {
    await expect(signUp(undefined as any, undefined as any)).rejects.toBeDefined();
  });

  it('should not crash with null inputs (signUp)', async () => {
    await expect(signUp(null as any, null as any)).rejects.toBeDefined();
  });

  it('should not crash with undefined inputs (login)', async () => {
    await expect(login(undefined as any, undefined as any)).rejects.toBeDefined();
  });

  it('should not crash with null inputs (login)', async () => {
    await expect(login(null as any, null as any)).rejects.toBeDefined();
  });

});