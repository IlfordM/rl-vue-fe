<script setup lang="ts">
import FullLogo from "../../molecules/FullLogo/FullLogo.vue"

defineOptions({
  name: "PageHeader"
})

</script>

<template>
  <div class="page-header">
    <FullLogo />
  </div>
</template>

<style scoped>
.page-header {
  width: 100%;
  display: inline-flex;
  align-items: start;
  gap: 12px;
  color: var(--color-blue);
}
</style>
