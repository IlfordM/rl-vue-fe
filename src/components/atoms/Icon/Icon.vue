<script setup lang="ts">
import { computed } from 'vue';

defineOptions({
  name: 'AppIcon',
});

interface Props {
  name: string;
  fill?: string;
  size?: number | string;
  w?: number | string;
  h?: number | string;
  className?: string;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  fill: 'currentColor',
  className: 'fill-current',
});

const defaultWidth = 24;
const defaultHeight = 24;

// Calculate width and height
const width = computed(() => props.w ?? props.size ?? defaultWidth);
const height = computed(() => props.h ?? props.size ?? defaultHeight);

// Icon href computed property
const iconHref = computed(() => `/assets/icons/icons.svg#${props.name}`);

// Available icons
const availableIcons = [
  'home',
  'user',
  'mail',
  'phone',
  'search',
  'trash',
  'coupon',
  'menu',
  'close',
  'arrow',
  'star',
  'rl',
  'lock',
  'logo',
  'bag',
  'bag-plus',
  'heart-plus',
  'dropdown',
  'cart',
  'cart-plus',
  'info',
  'heart',
  'search',
  'star-fill',
  'star-half',
  'star-empty',
];

if (!availableIcons.includes(props.name)) {
  console.warn(`Icon "${props.name}" not found. Available icons: ${availableIcons.join(', ')}`);
}
</script>

<template>
  <svg
    :width="width"
    :height="height"
    :fill="fill"
    :aria-label="ariaLabel"
    role="img"
    :class="className"
    xmlns="http://www.w3.org/2000/svg"
  >
    <use :href="iconHref" />
  </svg>
</template>
