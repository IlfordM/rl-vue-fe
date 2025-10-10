<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';
import Icon from '@/components/atoms/Icon/Icon.vue';

const { currentTheme, setTheme } = useTheme();

const cycleTheme = () => {
  const themes = ['light', 'dark'] as const;
  const currentIndex = themes.indexOf(currentTheme.value);
  const nextIndex = (currentIndex + 1) % themes.length;
  setTheme(themes[nextIndex]);
};

const getThemeIcon = () => {
  switch (currentTheme.value) {
    case 'light':
      return 'moon';
    case 'dark':
      return 'sun';
    default:
      return 'sun';
  }
};
</script>

<template>
  <button @click="cycleTheme" class="theme-switcher" :title="`Current: ${currentTheme}`">
    <Icon :name="getThemeIcon()" class="theme-icon" />
  </button>
</template>

<style scoped>
.theme-switcher {
  background: var(--color-gray);
  border: 1px solid var(--color-gray-3);
  border-radius: 4px;
  padding: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-switcher:hover {
  background: var(--color-gray);
  border-color: var(--color-blue);
}

.theme-icon {
  width: 16px;
  height: 16px;
  color: var(--color-yellow);
}

/* Dark mode styles */
:global(.dark) .theme-switcher {
  border-color: var(--color-gray-3);
  background-color: var(--color-white);
}

:global(.dark) .theme-switcher:hover {
  background: var(--color-gray-3);
  border-color: var(--color-yellow);
}

:global(.dark) .theme-icon {
  color: var(--color-yellow);
}
</style>
