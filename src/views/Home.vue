<script setup lang="ts">
import Button from '@/components/atoms/Button/Button.vue';

defineOptions({
  name: "HomePage"
})
</script>


<template>
  <div class="home">
    <Button variant="secondary">Primary</Button>

  </div>
</template>


<style scoped>
.home {
  text-align: center;
  padding: 2rem;
}
</style>
