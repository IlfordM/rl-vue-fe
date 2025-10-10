<script setup lang="ts">
import { computed } from 'vue';
import Icon from '@/components/atoms/Icon/Icon.vue';
import Button from '@/components/atoms/Button/Button.vue';
import { useCart } from '@/composables/useCart';

defineOptions({
  name: 'FavoritesSidebar',
});

defineProps<{
  isOpen: boolean;
}>();

defineEmits<{
  close: [];
  removeFavorite: [id: string];
  addToCart: [id: string];
}>();

const { favorites, removeFromFavorites: removeFavorite } = useCart();

const favoritesCount = computed(() => favorites.value.length);

const handleRemoveFavorite = (productId: string) => {
  removeFavorite(productId);
};

const handleAddToCart = (productId: string) => {
  const favoriteItem = favorites.value.find(item => item.productId === productId);
  if (favoriteItem) {
    // ToDo getItemById from API
    // addToCart(favoriteItem);
  }
};
</script>

<template>
  <section class="favorites-sidebar">
    <header class="favorites-header">
      <Icon name="heart" w="30" h="28" />
      <h2>Favorites ({{ favoritesCount }})</h2>
    </header>

    <div class="favorites-content">
      <div v-if="favorites.length === 0" class="empty-favorites">
        <Icon name="heart" w="48" h="48" />
        <p>Favorites list is empty</p>
      </div>

      <div v-else class="favorite-items">
        <div v-for="item in favorites" :key="item.id" class="favorite-item">
          <img :src="item.image" :alt="item.name" class="item-image" />
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p class="item-price">${{ item.price }}</p>
          </div>
          <div class="item-actions">
            <Button variant="primary" size="sm" @click="handleAddToCart(item.productId)">
              add to cart
            </Button>
            <button class="remove-btn" @click="handleRemoveFavorite(item.productId)">
              <Icon name="trash" w="16" h="16" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
