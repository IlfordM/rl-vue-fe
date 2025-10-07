<script setup lang="ts">
defineOptions({
  name: 'ContactsPage',
});
</script>

<template>
  <div class="contacts">
    <h1>Contacts Page</h1>
    <p>This is the contacts page.</p>
    <router-link to="/">Go to Home</router-link>
  </div>
</template>

<style scoped>
.contacts {
  text-align: center;
  padding: 2rem;
}
</style>
