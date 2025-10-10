import { ref, computed } from 'vue';
import enTranslations from '@/locales/en.json';
import plTranslations from '@/locales/pl.json';

type Locale = 'en' | 'pl';
type TranslationKey = string;

const translations = {
  en: enTranslations,
  pl: plTranslations,
};

const currentLocale = ref<Locale>('en');

export const useI18n = () => {
  // Auto-detect language on initialization
  const detectLanguage = (): Locale => {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('pl')) {
      return 'pl';
    }
    return 'en';
  };

  // Initialize with detected language
  if (currentLocale.value === 'en') {
    currentLocale.value = detectLanguage();
  }

  const t = (key: TranslationKey): string => {
    const keys = key.split('.');
    let value: unknown = translations[currentLocale.value];

    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }

    return (value as string) || key;
  };

  const setLocale = (locale: Locale) => {
    currentLocale.value = locale;
    localStorage.setItem('preferred-locale', locale);
  };

  const getLocale = computed(() => currentLocale.value);

  // Load saved preference
  const savedLocale = localStorage.getItem('preferred-locale') as Locale;
  if (savedLocale && (savedLocale === 'en' || savedLocale === 'pl')) {
    currentLocale.value = savedLocale;
  }

  return {
    t,
    setLocale,
    getLocale,
    currentLocale: computed(() => currentLocale.value),
  };
};
