<script setup lang="ts">
import Icon from "../../atoms/Icon/Icon.vue"

defineOptions({
  name: "FullLogo"
})


</script>

<template>
  <div class="full-logo">
    <Icon name="logo" :size="40" class="logo-icon" />
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
  font-weight: 600;
  font-family: 'Space Grotesk', sans-serif;
}

.logo-icon {
  flex-shrink: 0;
}

.logo-text {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1;
}
</style>
