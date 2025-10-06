<script setup lang="ts">
import Icon from "./components/atoms/Icon/Icon.vue"
</script>

<template>
  <div id="app">
    <div class="app-container">
      <nav class="navigation">
        <router-link to="/" class="nav-link">
          <Icon name="home" class="nav-icon" />
          Home
        </router-link>
        <router-link to="/about" class="nav-link">
          <Icon name="user" class="nav-icon" />
          About
        </router-link>
        <router-link to="/contacts" class="nav-link">
          <Icon name="mail" class="nav-icon" />
          Contacts
        </router-link>
      </nav>
      <router-view />
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

.navigation {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 38px;
  position: sticky;
  top: 0;
  padding: 10px 0;
  text-align: end;
  background-color: white;
  z-index: 3;
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
</style>
