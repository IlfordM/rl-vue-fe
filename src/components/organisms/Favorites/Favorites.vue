<script setup lang="ts">
import { ref } from 'vue';
import Icon from '@/components/atoms/Icon/Icon.vue';
import Button from '@/components/atoms/Button/Button.vue';

defineProps<{
  isOpen: boolean;
  favoritesCount: number;
}>();

defineEmits<{
  close: [];
  removeFavorite: [id: string];
  addToCart: [id: string];
}>();

// Mock favorite items
const favoriteItems = ref([
  { id: '1', name: 'Favorite Product 1', price: 39.99, image: '/placeholder.jpg' }
]);
</script>

<template>
  <section class="favorites-sidebar">
    <header class="favorites-header">
      <Icon name="heart" w="30" h="28" />
      <h2>Favorites ({{ favoritesCount }})</h2>
    </header>

    <div class="favorites-content">
      <div v-if="favoriteItems.length === 0" class="empty-favorites">
        <Icon name="heart" w="48" h="48" />
        <p>Favorites list is empty</p>
      </div>

      <div v-else class="favorite-items">
        <div v-for="item in favoriteItems" :key="item.id" class="favorite-item">
          <img :src="item.image" :alt="item.name" class="item-image" />
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p class="item-price">${{ item.price }}</p>
          </div>
          <div class="item-actions">
            <Button variant="primary" size="sm" @click="$emit('addToCart', item.id)">
              add to cart
            </Button>
            <button class="remove-btn" @click="$emit('removeFavorite', item.id)">
              <Icon name="trash" w="16" h="16" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.favorites-sidebar {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.favorites-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid var(--color-gray-2);
}

.favorites-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.favorites-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.empty-favorites {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: var(--color-gray-4);
}

.empty-favorites p {
  margin-top: 16px;
  font-size: 16px;
}

.favorite-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.favorite-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  border: 1px solid var(--color-gray-2);
  border-radius: 8px;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  background: var(--color-gray-1);
}

.item-details {
  flex: 1;
}

.item-details h3 {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 500;
}

.item-price {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
}

.item-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
}

.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  color: var(--color-red);
  transition: background-color 0.2s;
}

.remove-btn:hover {
  background: var(--color-red-light);
}
</style>
