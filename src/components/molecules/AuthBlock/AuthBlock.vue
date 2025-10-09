<script setup lang="ts">
import { ref } from 'vue';
import Button from '../../atoms/Button/Button.vue';
import Input from '../../atoms/Input/Input.vue';
import { useAuth } from '@/composables/useAuth';

defineOptions({
  name: 'AuthBlock',
});

const { user, loading, error, signIn, signUp, signOut, clearError } = useAuth();

const showAuthModal = ref(false);
const isSignUp = ref(false);
const credentials = ref({
  email: '',
  password: '',
});

const openSignInModal = () => {
  isSignUp.value = false;
  showAuthModal.value = true;
  clearError();
  credentials.value = { email: '', password: '' };
};

const openSignUpModal = () => {
  isSignUp.value = true;
  showAuthModal.value = true;
  clearError();
  credentials.value = { email: '', password: '' };
};

const toggleAuthModal = () => {
  showAuthModal.value = !showAuthModal.value;
  clearError();
  credentials.value = { email: '', password: '' };
};

const toggleAuthMode = () => {
  isSignUp.value = !isSignUp.value;
  clearError();
  credentials.value = { email: '', password: '' };
};

const handleAuth = async () => {
  try {
    if (isSignUp.value) {
      await signUp(credentials.value);
    } else {
      await signIn(credentials.value);
    }
    showAuthModal.value = false;
    credentials.value = { email: '', password: '' };
  } catch (err) {
    console.error('Auth error:', err);
  }
};

const handleSignOut = async () => {
  try {
    await signOut();
  } catch (err) {
    console.error('Sign out error:', err);
  }
};
</script>

<template>
  <div class="auth-block">
    <!-- Authenticated State -->
    <div v-if="user" class="authenticated-state">
      <span class="user-email">{{ user.email }}</span>
      <Button variant="ghost" size="sm" @click="handleSignOut" :disabled="loading">
        {{ loading ? 'Signing out...' : 'Sign Out' }}
      </Button>
    </div>

    <!-- Unauthenticated State -->
    <div v-else class="unauthenticated-state">
      <Button variant="ghost" :style="{ color: 'var(--color-black)' }" @click="openSignUpModal">
        Sign Up
      </Button>
      <Button variant="secondary" class="sign-in-btn" @click="openSignInModal">Sign in</Button>
    </div>

    <!-- Auth Modal -->
    <div v-if="showAuthModal" class="auth-modal-overlay" @click="toggleAuthModal">
      <div class="auth-modal" @click.stop>
        <div class="auth-modal-header">
          <h3>{{ isSignUp ? 'Create Account' : 'Sign In' }}</h3>
          <button class="close-btn" @click="toggleAuthModal">&times;</button>
        </div>

        <form @submit.prevent="handleAuth" class="auth-form">
          <Input v-model="credentials.email" type="email" placeholder="Email" required :disabled="loading" />

          <Input v-model="credentials.password" type="password" placeholder="Password" required :disabled="loading" />

          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <Button type="submit" variant="secondary" class="auth-submit-btn" :disabled="loading">
            {{ loading ? 'Please wait...' : isSignUp ? 'Sign Up' : 'Sign In' }}
          </Button>
        </form>

        <div class="auth-modal-footer">
          <p v-if="isSignUp">
            Already have an account?
            <button type="button" class="toggle-auth-btn" @click="toggleAuthMode">Sign In</button>
          </p>
          <p v-else>
            Don't have an account?
            <button type="button" class="toggle-auth-btn" @click="toggleAuthMode">Sign Up</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-block {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-family: 'Space Grotesk', sans-serif;
}

.sign-in-btn {
  background-color: var(--color-blue) !important;
  color: var(--color-white) !important;
  border-radius: 2px;
  border: none;
  transition: background-color 0.2s ease;
}

.sign-in-btn:hover {
  background-color: var(--color-blue-3) !important;
}

.unauthenticated-state {
  display: flex;
  align-items: center;
  gap: 12px;
}

.authenticated-state {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-email {
  font-size: 14px;
  color: var(--color-gray-2);
}

.auth-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
}

.auth-modal {
  background: var(--color-white);
  border-radius: 8px;
  padding: 24px;
  width: 400px;
  max-width: 90vw;
  box-shadow: 0 10px 25px var(--color-gray-2);
}

.auth-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.auth-modal-header h3 {
  margin: 0;
  color: var(--color-blue);
  font-size: 20px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--color-gray-2);
  transition: all 0.2s ease;
}

.close-btn:hover {
  transform: scale(1.1);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.error-message {
  color: var(--color-red);
  font-size: 14px;
  text-align: center;
  padding: 8px;
  background: var(--color-red-3);
  border-radius: 4px;
}

.auth-submit-btn {
  width: 100%;
  margin-top: 8px;
}

.auth-modal-footer {
  margin-top: 20px;
  text-align: center;
}

.toggle-auth-btn {
  background: none;
  border: none;
  color: var(--color-blue);
  cursor: pointer;
  text-decoration: underline;
  font-size: inherit;
  padding: 0;
}

.toggle-auth-btn:hover {
  color: var(--color-blue-3);
}
</style>
