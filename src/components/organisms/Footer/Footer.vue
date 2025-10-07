<script setup lang="ts">
import FullLogo from "../../molecules/FullLogo/FullLogo.vue"


defineOptions({
  name: "PageFooter"
})

</script>

<template>
  <footer class="page-footer">
    <FullLogo style="min-width: 220px;" class="footer-logo" />

  </footer>
</template>

<style scoped>
.page-footer {
  color: var(--color-blue);
  background-color: var(--color-gray-4);
  /* font-size: 10px; */
}

.footer-logo {
  color: var(--color-blue);
  padding: 5px;
}
</style>
