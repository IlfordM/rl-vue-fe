<script setup lang="ts">
interface Props {
  name: string
  fill?: string
  size?: number | string
  w?: number | string
  h?: number | string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  fill: "currentColor",
  size: 24,
  class: ""
})

// Icon definitions
const icons = {
  home: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
  user: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
  mail: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
  phone: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
  search: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
  menu: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z",
  close: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
  arrow: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
  star: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
  rl: "M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 2c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm-5.5 5.5h2.25c.84 0 1.56.18 2.16.54.6.36 1.05.84 1.35 1.44.3.6.45 1.26.45 1.98v.24c0 .72-.15 1.38-.45 1.98-.3.6-.75 1.08-1.35 1.44-.6.36-1.32.54-2.16.54H6.5v-8.16zm2.25 1.8H8.3v4.56h.45c.48 0 .84-.12 1.08-.36.24-.24.36-.6.36-1.08v-.12c0-.48-.12-.84-.36-1.08-.24-.24-.6-.36-1.08-.36zm6.75 1.8v8.16h-1.68V8.7h1.68z"
}

const iconPath = icons[props.name as keyof typeof icons]

// Calculate width and height
const width = computed(() => props.w ?? props.size)
const height = computed(() => props.h ?? props.size)

if (!iconPath) {
  console.warn(`Icon "${props.name}" not found`)
}
</script>

<template>
  <svg :width="width" :height="height" viewBox="0 0 24 24" :fill="fill" :class="class"
    xmlns="http://www.w3.org/2000/svg">
    <path v-if="iconPath" :d="iconPath" />
    <path v-else d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
</template>
