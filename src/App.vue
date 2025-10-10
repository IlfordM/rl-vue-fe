<script setup lang="ts">
import Icon from './components/atoms/Icon/Icon.vue';
import { useAuth } from '@/composables/useAuth';
import { useI18n } from '@/composables/useI18n';
import { useTheme } from '@/composables/useTheme';
import LanguageSwitcher from '@/components/atoms/LanguageSwitcher/LanguageSwitcher.vue';
import ThemeSwitcher from '@/components/atoms/ThemeSwitcher/ThemeSwitcher.vue';
import PageHeader from '@/components/organisms/Header/Header.vue';
import { onMounted } from 'vue';
import Footer from '@/components/organisms/Footer/Footer.vue';

const { isAuthenticated } = useAuth();
const { t } = useI18n();
const { initializeTheme } = useTheme();

onMounted(() => {
  initializeTheme();
});
</script>

<template>
  <div id="app">
    <div class="header-wrapper">
      <div class="top-bar">
        <nav class="navigation">
          <router-link to="/" class="nav-link">
            <Icon name="home" class="nav-icon" />
            {{ t('navigation.home') }}
          </router-link>
          <router-link to="/about" class="nav-link">
            <Icon name="user" class="nav-icon" />
            {{ t('navigation.about') }}
          </router-link>
          <router-link to="/contacts" class="nav-link">
            <Icon name="mail" class="nav-icon" />
            {{ t('navigation.contacts') }}
          </router-link>
          <router-link v-if="isAuthenticated" to="/profile" class="nav-link">
            <Icon name="user" class="nav-icon" />
            {{ t('navigation.profile') }}
          </router-link>
        </nav>
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
      <PageHeader />
    </div>
    <div class="app-container">
      <router-view />
    </div>
    <div class="footer-wrapper">
      <Footer />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  position: relative;
  width: vw;
  padding: 0 100px;
  margin: 0 auto;
}

.header-wrapper {
  padding: 0 100px;
  position: sticky;
  background-color: var(--color-gray-4);
  z-index: 3;
  top: 0;
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 44px;
}

.navigation {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 38px;
  padding: 10px 0;
  text-align: end;
}

.navigation .nav-link {
  color: var(--color-black);
  text-decoration: underline;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.navigation a.router-link-active {
  color: var(--color-blue);
}

.nav-icon {
  width: 16px;
  height: 16px;
}

.footer-wrapper {
  padding: 0 100px;
  margin: 0 auto;
  background-color: var(--color-gray-4);
}
</style>
