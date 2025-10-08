import { ref, computed } from 'vue';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import type { User, AuthError } from 'firebase/auth';
import { auth } from '@/config/firebase';

export type UserCredentials = {
  email: string;
  password: string;
};

export const useAuth = () => {
  const user = ref<User | null>(null);
  const loading = ref(true);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => !!user.value);
  const userEmail = computed(() => user.value?.email || '');
  const userId = computed(() => user.value?.uid || '');

  // Initialize auth state listener
  onAuthStateChanged(auth, firebaseUser => {
    user.value = firebaseUser;
    loading.value = false;
  });

  const signIn = async (credentials: UserCredentials) => {
    try {
      loading.value = true;
      error.value = null;
      const result = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      user.value = result.user;
      return result;
    } catch (err: unknown) {
      if (err instanceof Error && 'code' in err) {
        error.value = getErrorMessage((err as AuthError).code);
      } else {
        error.value = getErrorMessage((err as { code: string }).code);
      }
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const signUp = async (credentials: UserCredentials) => {
    try {
      loading.value = true;
      error.value = null;
      const result = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      user.value = result.user;
      return result;
    } catch (err: unknown) {
      if (err instanceof Error && 'code' in err) {
        error.value = getErrorMessage((err as AuthError).code);
      } else {
        error.value = getErrorMessage((err as { code: string }).code);
      }
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const signOut = async () => {
    try {
      loading.value = true;
      error.value = null;
      await firebaseSignOut(auth);
      user.value = null;
    } catch (err: unknown) {
      if (err instanceof Error && 'code' in err) {
        error.value = getErrorMessage((err as AuthError).code);
      } else {
        error.value = getErrorMessage((err as { code: string }).code);
      }
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const clearError = () => {
    error.value = null;
  };

  return {
    user,
    loading,
    error,
    isAuthenticated,
    userEmail,
    userId,
    signIn,
    signUp,
    signOut,
    clearError,
  };
};

// Helper function to convert Firebase error codes to user-friendly messages
const getErrorMessage = (errorCode: string): string => {
  const errorMessages: Record<string, string> = {
    'auth/user-not-found': 'No user found with this email address.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/invalid-email': 'Invalid email address.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
  };

  return errorMessages[errorCode] || 'An error occurred. Please try again.';
};
