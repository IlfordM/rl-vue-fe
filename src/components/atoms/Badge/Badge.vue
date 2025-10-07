<script setup lang="ts">
defineOptions({
  name: 'ProductBadge',
});

interface Props {
  variant?: 'default' | 'sale' | 'info';
  size?: 'sm' | 'md' | 'lg';
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
});
</script>

<template>
  <span class="badge" :class="[`badge--${props.variant}`, `badge--${props.size}`, props.class]">
    <slot />
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
}

/* Variants */
.badge--default {
  background-color: var(--color-gray-3);
  color: var(--color-white);
}

.badge--sale {
  background-color: var(--color-red);
  color: var(--color-white);
}

.badge--info {
  background-color: var(--color-blue);
  color: var(--color-white);
}

/* Sizes */
.badge--sm {
  padding: 2px 6px;
  font-size: 10px;
  line-height: 1.2;
}

.badge--md {
  padding: 4px 8px;
  font-size: 12px;
  line-height: 1.3;
}

.badge--lg {
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.4;
}
</style>
