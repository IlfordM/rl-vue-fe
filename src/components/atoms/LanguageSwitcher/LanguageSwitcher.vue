<script setup lang="ts">
import { useI18n } from '@/composables/useI18n';

const { setLocale, currentLocale } = useI18n();

const switchLanguage = () => {
  setLocale(currentLocale.value === 'en' ? 'pl' : 'en');
};
</script>

<template>
  <button @click="switchLanguage" class="language-switcher">
    {{ currentLocale === 'en' ? 'PL' : 'EN' }}
  </button>
</template>

<style scoped>
.language-switcher {
  background: none;
  border: 1px solid var(--color-gray-3);
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-blue);
  transition: all 0.2s ease;
}

.language-switcher:hover {
  background: var(--color-gray-1);
}
</style>
