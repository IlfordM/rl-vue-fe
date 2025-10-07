<script setup lang="ts">
import { computed } from 'vue';
import Icon from '../Icon/Icon.vue';

defineOptions({
  name: 'AppInput',
});

interface Props {
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'withIcon' | 'outline';
  icon?: string;
  iconSize?: number | string;
  class?: string;
  style?: string | Record<string, string | number>;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  value: '',
  disabled: false,
  readonly: false,
  required: false,
  size: 'md',
  variant: 'default',
  icon: 'search',
  iconSize: 24,
});

const emit = defineEmits<{
  'update:value': [value: string];
  input: [event: Event];
  change: [event: Event];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

const inputClasses = computed(() => {
  const baseClasses = 'input';
  const variantClasses = {
    default: 'input-default',
    withIcon: 'input-with-icon',
    outline: 'input-outline',
  };
  const sizeClasses = {
    sm: 'input-sm',
    md: 'input-md',
    lg: 'input-lg',
  };

  return [baseClasses, variantClasses[props.variant], sizeClasses[props.size], props.class]
    .filter(Boolean)
    .join(' ');
});

const inputStyles = computed(() => {
  const sizeStyles = {
    sm: { padding: '10px 18px', fontSize: '14px' },
    md: { padding: '12px 22px', fontSize: '16px' },
    lg: { padding: '16px 30px', fontSize: '18px' },
  };

  // Override padding for withIcon variant
  if (props.variant === 'withIcon') {
    const iconPaddingStyles = {
      sm: { padding: '10px 18px 10px 34px', fontSize: '14px' },
      md: { padding: '12px 22px 12px 38px', fontSize: '16px' },
      lg: { padding: '16px 30px 16px 42px', fontSize: '18px' },
    };
    return {
      ...iconPaddingStyles[props.size],
      ...(typeof props.style === 'object' ? props.style : {}),
    };
  }

  return {
    ...sizeStyles[props.size],
    ...(typeof props.style === 'object' ? props.style : {}),
  };
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:value', target.value);
  emit('input', event);
};

const handleChange = (event: Event) => {
  emit('change', event);
};

const handleFocus = (event: FocusEvent) => {
  emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
  emit('blur', event);
};
</script>

<template>
  <div class="input-wrapper">
    <div v-if="variant === 'withIcon'" class="input-icon-container">
      <Icon :name="icon" :size="iconSize" class="input-icon" />
      <input
        :type="type"
        :placeholder="placeholder"
        :value="value"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :class="inputClasses"
        :style="inputStyles"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </div>
    <input
      v-else
      :type="type"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :class="inputClasses"
      :style="inputStyles"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </div>
</template>

<style scoped>
.input-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}

.input {
  width: 100%;
  border: 1px solid var(--color-gray-3);
  border-radius: 6px;
  background-color: var(--color-gray-4);
  color: var(--color-black);
  transition: all 0.2s;
  outline: none;
  font-family: inherit;
}

.input:focus {
  border-color: var(--color-blue);
  box-shadow: 0 0 0 3px var(--color-blue-3);
}

.input:disabled {
  background-color: var(--color-gray);
  color: var(--color-white);
  opacity: 0.5;
  cursor: not-allowed;
}

.input:read-only {
  background-color: var(--color-gray);
  color: var(--color-white);
  opacity: 0.7;
}

/* Variants */
.input-default {
  border: 1px solid var(--color-gray);
}

.input-outline {
  border: 2px solid var(--color-blue);
  background-color: transparent;
}

.input-with-icon {
  padding-left: 40px;
}

/* Icon container */
.input-icon-container {
  position: relative;
  display: inline-block;
  width: 100%;
}

.input-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-gray);
  pointer-events: none;
}

/* Sizes */
.input-sm {
  padding: 6px 12px;
  font-size: 14px;
}

.input-md {
  padding: 8px 16px;
  font-size: 16px;
}

.input-lg {
  padding: 12px 20px;
  font-size: 18px;
}

/* Placeholder styling */
.input::placeholder {
  color: var(--color-gray);
  opacity: 0.7;
}
</style>
