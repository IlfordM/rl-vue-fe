<script setup lang="ts">
import Icon from "./components/Icon.vue"
</script>

<template>
  <div id="app">
    <nav class="navigation">
      <router-link to="/">
        <Icon name="home" class="nav-icon" />
        Home
      </router-link>
      <router-link to="/about">
        <Icon name="user" class="nav-icon" />
        About
      </router-link>
      <router-link to="/contacts">
        <Icon name="mail" class="nav-icon" />
        Contacts
      </router-link>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
.navigation {
  padding: 12px;
  text-align: end;
}

.navigation a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: underline;
  margin: 0 10px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.navigation a.router-link-active {
  color: #42b983;
}

.nav-icon {
  width: 16px;
  height: 16px;
}
</style>
