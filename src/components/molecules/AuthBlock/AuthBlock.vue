<script setup lang="ts">
import Button from '../../atoms/Button/Button.vue';

defineOptions({
  name: 'AuthBlock',
});
</script>

<template>
  <div class="auth-block">
    <Button variant="ghost" :style="{ color: 'var(--color-black)' }">Sign Up</Button>
    <Button variant="secondary" class="sign-in-btn">Sign in</Button>
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
</style>
