<script setup lang="ts">
import Icon from '../../atoms/Icon/Icon.vue';

defineOptions({
  name: 'BreadcrumbNav',
});

interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface Props {
  items: BreadcrumbItem[];
  separator?: string;
  showHome?: boolean;
  homeLabel?: string;
  homeHref?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  separator: '/',
  showHome: true,
  homeLabel: 'Home',
  homeHref: '/',
});

const emit = defineEmits<{
  navigate: [item: BreadcrumbItem, index: number];
}>();

const handleClick = (item: BreadcrumbItem, index: number) => {
  if (!item.active && item.href) {
    emit('navigate', item, index);
  }
};
</script>

<template>
  <nav class="breadcrumb" :class="props.class" aria-label="Breadcrumb">
    <ol class="breadcrumb-list">
      <!-- Home item -->
      <li v-if="props.showHome" class="breadcrumb-item">
        <a
          :href="props.homeHref"
          class="breadcrumb-link home-link"
          @click="handleClick({ label: props.homeLabel, href: props.homeHref }, -1)"
        >
          <Icon name="home" w="16" h="16" class="home-icon" />
          <span>{{ props.homeLabel }}</span>
        </a>
      </li>

      <!-- Separator after home -->
      <li v-if="props.showHome && props.items.length > 0" class="breadcrumb-separator">
        <Icon name="arrow" w="12" h="12" class="separator-icon" />
      </li>

      <!-- Breadcrumb items -->
      <li
        v-for="(item, index) in props.items"
        :key="index"
        class="breadcrumb-item"
        :class="{ 'is-active': item.active }"
      >
        <a
          v-if="!item.active && item.href"
          :href="item.href"
          class="breadcrumb-link"
          @click="handleClick(item, index)"
        >
          {{ item.label }}
        </a>
        <span v-else class="breadcrumb-current" :aria-current="item.active ? 'page' : undefined">
          {{ item.label }}
        </span>

        <!-- Separator after item (except last) -->
        <span v-if="index < props.items.length - 1" class="breadcrumb-separator">
          <Icon name="arrow" w="12" h="12" class="separator-icon" />
        </span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  padding: 8px 0;
  font-size: inherit;
  /* Use parent font-size instead of fixed 14px */
  color: var(--color-gray);
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  list-style: none;
  font-size: inherit;
  margin: 0;
  padding: 0;
  gap: 4px;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: inherit;
}

.breadcrumb-link {
  color: var(--color-blue);
  text-decoration: none;
  font-size: inherit;
  /* padding: 4px 8px; */
  border-radius: 4px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;
}

.breadcrumb-link:hover {
  background-color: var(--color-gray-4);
  color: var(--color-blue-3);
}

.breadcrumb-current {
  color: var(--color-gray);
  font-weight: 500;
  font-size: inherit;
  padding: 4px 8px;
}

.breadcrumb-separator {
  display: flex;
  align-items: center;
  color: var(--color-gray-3);
  margin: 0 4px;
}

.separator-icon {
  transform: rotate(90deg);
  color: var(--color-gray-3);
}

.home-link {
  display: flex;
  font-size: inherit;
  align-items: center;
  gap: 4px;
}

.home-icon {
  color: var(--color-blue);
}

.breadcrumb-item.is-active .breadcrumb-current {
  color: var(--color-gray);
  font-weight: 600;
}

/* Responsive design */
@media (max-width: 768px) {
  .breadcrumb {
    font-size: inherit;
    /* Keep inheriting parent font-size */
    padding: 6px 0;
  }

  .breadcrumb-link,
  .breadcrumb-current {
    padding: 2px 4px;
  }

  .breadcrumb-separator {
    margin: 0 2px;
  }
}

/* Truncate long breadcrumbs on mobile */
@media (max-width: 480px) {
  .breadcrumb-list {
    overflow: hidden;
    white-space: nowrap;
  }

  .breadcrumb-item:not(:last-child):not(.is-active) {
    display: none;
  }

  .breadcrumb-item:last-child {
    flex: 1;
    min-width: 0;
  }

  .breadcrumb-current {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
