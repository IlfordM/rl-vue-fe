import { ref, computed } from 'vue';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendEmailVerification,
  // EmailAuthProvider,
  // reauthenticateWithCredential,
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '@/config/firebase';

export type UserCredentials = {
  email: string;
  password: string;
};

export const useAuth = () => {
  const user = ref<User | null>(null);
  const loading = ref(true);
  const error = ref<string | null>(null);
  const emailVerificationSent = ref(false);

  const isAuthenticated = computed(() => !!user.value);
  const isEmailVerified = computed(() => user.value?.emailVerified || false);
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

      // Check if email is verified
      if (!result.user.emailVerified) {
        await firebaseSignOut(auth);
        user.value = null;
        error.value =
          'Please verify your email before signing in. Check your inbox for a verification link.';
        return;
      }

      user.value = result.user;
      return result;
    } catch (err: unknown) {
      if (err instanceof Error && 'code' in err) {
        error.value = getErrorMessage((err as { code: string }).code);
      } else {
        error.value = 'An unexpected error occurred.';
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

      // Send email verification
      await sendEmailVerification(result.user);
      emailVerificationSent.value = true;

      // Sign out the user immediately after sign up
      await firebaseSignOut(auth);
      user.value = null;

      return result;
    } catch (err: unknown) {
      if (err instanceof Error && 'code' in err) {
        error.value = getErrorMessage((err as { code: string }).code);
      } else {
        error.value = 'An unexpected error occurred.';
      }
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const resendVerificationEmail = async () => {
    try {
      if (user.value) {
        await sendEmailVerification(user.value);
        emailVerificationSent.value = true;
      }
    } catch (err: unknown) {
      if (err instanceof Error && 'code' in err) {
        error.value = getErrorMessage((err as { code: string }).code);
      } else {
        error.value = 'An unexpected error occurred.';
      }
      throw err;
    }
  };

  const signOut = async () => {
    try {
      loading.value = true;
      error.value = null;
      await firebaseSignOut(auth);
      user.value = null;
      emailVerificationSent.value = false;
    } catch (err: unknown) {
      if (err instanceof Error && 'code' in err) {
        error.value = getErrorMessage((err as { code: string }).code);
      } else {
        error.value = 'An unexpected error occurred.';
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
    emailVerificationSent,
    isAuthenticated,
    isEmailVerified,
    userEmail,
    userId,
    signIn,
    signUp,
    signOut,
    resendVerificationEmail,
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
    'auth/requires-recent-login': 'Please sign in again to continue.',
    'auth/email-not-verified': 'Please verify your email before signing in.',
  };

  return errorMessages[errorCode] || 'An error occurred. Please try again.';
};
