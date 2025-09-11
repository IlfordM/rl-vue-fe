<script setup lang="ts">
import PageHeader from '@/components/organisms/Header/Header.vue';

defineOptions({
  name: "HomePage"
})
</script>


<template>
  <div class="home">
    <PageHeader />
  </div>
</template>


<style scoped>
.home {
  text-align: center;
  width: 90%;
  padding: 0;
  margin: 0 auto;
}
</style>
