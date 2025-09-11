<script setup lang="ts">
import Icon from "../../atoms/Icon/Icon.vue"

defineOptions({
  name: "FullLogo"
})


</script>

<template>
  <div class="full-logo">
    <Icon name="logo" :size="64" class="logo-icon" />
    <span class="logo-text">
      Ridge Line
    </span>
  </div>
</template>

<style scoped>
.full-logo {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 28px;
  font-family: 'Space Grotesk', sans-serif;
}

.full-logo * {
  font-weight: inherit;
  font-size: inherit;
  font-family: inherit;
}

.logo-icon {
  flex-shrink: 0;
}
</style>
