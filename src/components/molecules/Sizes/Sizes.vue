<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Icon from '../../atoms/Icon/Icon.vue';

defineOptions({
  name: 'SizeSelector',
});

interface Size {
  name: string;
  available: boolean;
}

interface Props {
  sizes: Size[];
  selectedSize?: string;
  disabled?: boolean;
  withInfo?: boolean;
  infoText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  selectedSize: '',
  disabled: false,
  withInfo: false,
  infoText: '',
});

const emit = defineEmits<{
  selectSize: [size: string];
}>();

const selectedSize = ref<string>(props.selectedSize);
const showPopover = ref(false);
const infoContainer = ref<HTMLElement>();

const handleSizeSelect = (size: string) => {
  selectedSize.value = size;
  emit('selectSize', size);
};

const togglePopover = () => {
  showPopover.value = !showPopover.value;
};

const handleClickOutside = (event: MouseEvent) => {
  if (infoContainer.value && !infoContainer.value.contains(event.target as Node)) {
    showPopover.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="product-sizes">
    <div class="sizes-header">
      <h4 class="sizes-title">Size</h4>
      <div v-if="props.withInfo" ref="infoContainer" class="info-container">
        <Icon name="info" w="16" h="16" class="info-icon" @click="togglePopover" />
        <div v-if="showPopover" class="popover">
          <p class="popover-text">{{ props.infoText }}</p>
        </div>
      </div>
    </div>
    <div class="sizes-list">
      <button
        v-for="size in props.sizes"
        :key="size.name"
        :class="[
          'size-option',
          {
            selected: selectedSize === size.name,
            unavailable: !size.available,
          },
        ]"
        :disabled="!size.available || props.disabled"
        @click="handleSizeSelect(size.name)"
      >
        {{ size.name }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.product-sizes {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sizes-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sizes-title {
  margin: 0;
  text-align: start;
  font-family: 'Space Grotesk';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: var(--color-blue);
}

.info-container {
  position: relative;
  top: 4px;
}

.info-icon {
  cursor: pointer;
  color: var(--color-blue);
  transition: color 0.2s ease;
}

.info-icon:hover {
  color: var(--color-blue);
}

.popover {
  position: absolute;
  top: -100px;
  left: 30px;
  z-index: 10;
  background: var(--color-white);
  border: 1px solid var(--color-gray-3);
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  max-width: 300px;
}

.popover-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
  color: var(--color-gray);
}

.sizes-list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.size-option {
  padding: 6px 12px;
  border: 1px solid var(--color-gray-3);
  border-radius: 4px;
  background: var(--color-white);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
}

.size-option:hover {
  border-color: var(--color-blue);
}

.size-option.selected {
  border-color: var(--color-blue);
  background: var(--color-blue-3);
  color: var(--color-blue);
}

.size-option.unavailable {
  opacity: 0.3;
  cursor: not-allowed;
}
</style>
