import { ref, computed } from 'vue';

type Theme = 'light' | 'dark';

const currentTheme = ref<Theme>('light');

export const useTheme = () => {
  const detectSystemTheme = (): 'light' | 'dark' => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const effectiveTheme = computed(() => {
    if (currentTheme.value === 'light') {
      return detectSystemTheme();
    }
    return currentTheme.value;
  });

  const applyTheme = (theme: 'light' | 'dark') => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const setTheme = (theme: Theme) => {
    currentTheme.value = theme;
    localStorage.setItem('preferred-theme', theme);
    applyTheme(effectiveTheme.value);
  };

  const initializeTheme = () => {
    const savedTheme = localStorage.getItem('preferred-theme') as Theme;
    if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
      currentTheme.value = savedTheme;
    } else {
      currentTheme.value = 'light';
    }
    applyTheme(effectiveTheme.value);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (currentTheme.value === 'light') {
        applyTheme(detectSystemTheme());
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  };

  return {
    currentTheme: computed(() => currentTheme.value),
    effectiveTheme,
    setTheme,
    initializeTheme,
  };
};
