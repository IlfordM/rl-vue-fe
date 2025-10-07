<script setup lang="ts">
defineOptions({
  name: 'AboutPage',
});
</script>

<template>
  <div class="about">
    <h1>About Page</h1>
    <p>This is the about page.</p>
    <router-link to="/">Go to Home</router-link>
  </div>
</template>

<style scoped>
.about {
  text-align: center;
  padding: 2rem;
}
</style>
