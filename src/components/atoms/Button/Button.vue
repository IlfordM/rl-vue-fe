<script setup lang="ts">
import { computed } from 'vue';

defineOptions({
  name: 'AppButton',
});

interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'selected';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  class?: string;
  style?: string | Record<string, string | number>;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  type: 'button',
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const buttonClasses = computed(() => {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    selected: 'btn-selected',
  };
  const sizeClasses = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
  };

  return [baseClasses, variantClasses[props.variant], sizeClasses[props.size], props.class]
    .filter(Boolean)
    .join(' ');
});

const buttonStyles = computed(() => {
  const sizeStyles = {
    sm: { padding: '4px 10px', fontSize: '12px' },
    md: { padding: '8px 16px', fontSize: '16px' },
    lg: { padding: '12px 24px', fontSize: '18px' },
  };

  return {
    ...sizeStyles[props.size],
    opacity: props.disabled || props.loading ? 0.5 : 1,
    cursor: props.disabled || props.loading ? 'not-allowed' : 'pointer',
    ...(typeof props.style === 'object' ? props.style : {}),
  };
});

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};
</script>

<template>
  <button
    :type="type"
    :style="buttonStyles"
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <svg
      v-if="loading"
      style="animation: spin 1s linear infinite; margin-right: 8px; width: 16px; height: 16px"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle style="opacity: 0.25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path
        style="opacity: 0.75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <slot />
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  transition: all 0.2s;
  border-style: none;
  border: 2px solid currentColor;
  outline: none;
  border-radius: 2px;
  cursor: pointer;
}

.btn:focus {
  box-shadow: 0 0 5px -1px currentColor;
}

.btn-primary {
  background-color: transparent;
  color: currentColor;
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--color-gray);
  border-color: var(--color-gray);
  color: var(--color-white);
}

.btn-secondary {
  font-weight: 400;
  font-size: 20px;
  background-color: transparent;
  color: currentColor;
  opacity: 0.8;
  border-radius: 6px;
  border: 1px solid var(--color-blue-3);
}

.btn-secondary:hover:not(:disabled) {
  background-color: var(--color-blue);
  color: var(--color-white);
}

.btn-ghost {
  background-color: transparent;
  color: currentColor;
  text-decoration: underline;
  border: none;
}

.btn-ghost:hover:not(:disabled) {
  background-color: var(--color-gray);
  color: var(--color-white);
  opacity: 0.1;
}

.btn-selected {
  background-color: var(--color-black);
  color: var(--color-white);
}

.btn-selected:hover:not(:disabled) {
  background-color: var(--color-gray);
  border-color: var(--color-gray);
  color: var(--color-white);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
