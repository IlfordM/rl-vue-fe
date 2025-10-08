<script setup lang="ts">
defineOptions({
  name: 'ProfilePage',
});
</script>

<template>
  <div class="profile">
    <h1>Profile Page</h1>
    <p>This is the profile page.</p>
    <router-link to="/">Go to Home</router-link>
  </div>
</template>

<style scoped>
.profile {
  text-align: center;
  padding: 2rem;
}
</style>
