<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: "ColorSelector"
})

interface Color {
  name: string
  value: string
  available: boolean
}

interface Props {
  colors: Color[]
  selectedColor?: string
  disabled?: boolean
  withInfo?: boolean
  infoText?: string
}

const props = withDefaults(defineProps<Props>(), {
  selectedColor: "",
  disabled: false,
  withInfo: false,
  infoText: ""
})

const emit = defineEmits<{
  selectColor: [color: string]
}>()

const selectedColor = ref<string>(props.selectedColor)

const handleColorSelect = (color: string) => {
  selectedColor.value = color
  emit("selectColor", color)
}
</script>

<template>
  <div class="product-colors">
    <h4 class="colors-title">Colors:</h4>
    <div class="colors-list">
      <button v-for="color in props.colors" :key="color.name" :class="['color-option', {
        'selected': selectedColor === color.name,
        'unavailable': !color.available
      }]" :disabled="!color.available || props.disabled" @click="handleColorSelect(color.name)" :title="color.name">
        <div class="color-circle" :style="{ backgroundColor: color.value }"></div>
        <span class="color-name">{{ color.name }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.product-colors {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.colors-title {
  margin: 0;
  font-family: 'Space Grotesk';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  text-align: start;
  color: var(--color-blue);
}

.colors-list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.color-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid var(--color-gray-3);
  border-radius: 8px;
  background: var(--color-white);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  min-width: 80px;
}

.color-option:hover {
  border-color: var(--color-blue);
}

.color-option.selected {
  border-color: var(--color-blue);
  background: var(--color-blue-3);
}

.color-option.unavailable {
  opacity: 0.3;
  cursor: not-allowed;
}

.color-circle {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.color-name {
  font-weight: 500;
  color: var(--color-black);
}
</style>
