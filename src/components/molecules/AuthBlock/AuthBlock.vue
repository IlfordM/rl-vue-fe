<script setup lang="ts">
import Button from "../../atoms/Button/Button.vue"

defineOptions({
  name: "AuthBlock"
})


</script>

<template>
  <div class="auth-block">
    <Button variant="ghost" :style="{ color: 'var(--color-black)' }">Sign Up</Button>
    <Button variant="secondary"
      :style="{ backgroundColor: 'var(--color-blue)', color: 'var(--color-white)', borderRadius: '2px', border: 'none' }">Sign
      in</Button>
  </div>
</template>

<style scoped>
.auth-block {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-family: 'Space Grotesk', sans-serif;
}
</style>
