<script setup lang="ts">
import FullLogo from '../../molecules/FullLogo/FullLogo.vue';
import AuthBlock from '../../molecules/AuthBlock/AuthBlock.vue';
import Button from '../../atoms/Button/Button.vue';
import Icon from '../../atoms/Icon/Icon.vue';
import Input from '../../atoms/Input/Input.vue';
import { useI18n } from '@/composables/useI18n';

defineOptions({
  name: 'PageHeader',
});

const { t } = useI18n();
</script>

<template>
  <div class="page-header">
    <FullLogo style="min-width: 220px" />
    <Button
      class="shop-button"
      variant="secondary"
      :style="{
        fontSize: '20px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        borderRadius: '2px',
      }"
    >
      <Icon name="bag" w="18" h="18" />
      {{ t('navigation.shop') }}
      <Icon name="dropdown" w="16" h="8" />
    </Button>
    <Input
      type="search"
      placeholder="Search"
      variant="withIcon"
      icon="search"
      iconSize="24"
      size="md"
      style="max-width: 800px"
    />
    <AuthBlock
      style="min-width: 320px; display: inline-flex; align-items: end; justify-content: flex-end"
    />
  </div>
</template>

<style scoped>
.page-header {
  width: 100%;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: var(--color-blue);
  background-color: inherit;
  padding: 0;
  margin-bottom: 14px;
}
</style>
