<script setup lang="ts">
import { ref } from 'vue';
import Icon from '@/components/atoms/Icon/Icon.vue';
import Button from '@/components/atoms/Button/Button.vue';

defineProps<{
  isOpen: boolean;
  cartCount: number;
}>();

defineEmits<{
  close: [];
  removeItem: [id: string];
}>();

// Mock cart items
const cartItems = ref([
  { id: '1', name: 'Product 1', price: 29.99, quantity: 1, image: '/placeholder.jpg' },
  { id: '2', name: 'Product 2', price: 49.99, quantity: 1, image: '/placeholder.jpg' }
]);

const totalPrice = ref(79.98);
</script>

<template>
  <section class="cart-sidebar">
    <div class="sidebar-header">
      <h2>Cart ({{ cartCount }})</h2>
      <button class="close-btn" @click="$emit('close')">
        <Icon name="close" w="20" h="20" />
      </button>
    </div>

    <div class="sidebar-content">
      <div v-if="cartItems.length === 0" class="empty-cart">
        <Icon name="cart" w="48" h="48" />
        <p>Cart is empty</p>
      </div>

      <div v-else class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.name" class="item-image" />
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p class="item-price">${{ item.price }}</p>
            <div class="quantity-controls">
              <button class="qty-btn">-</button>
              <span>{{ item.quantity }}</span>
              <button class="qty-btn">+</button>
            </div>
          </div>
          <button class="remove-btn" @click="$emit('removeItem', item.id)">
            <Icon name="trash" w="16" h="16" />
          </button>
        </div>
      </div>
    </div>

    <div v-if="cartItems.length > 0" class="sidebar-footer">
      <div class="total">
        <span>Total: ${{ totalPrice }}</span>
      </div>
      <Button variant="primary" class="checkout-btn">
        Checkout
      </Button>
    </div>
  </section>
</template>

<style scoped>
.cart-sidebar {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid var(--color-gray-2);
}

.sidebar-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background: var(--color-gray-1);
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: var(--color-gray-4);
}

.empty-cart p {
  margin-top: 16px;
  font-size: 16px;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-item {
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
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.qty-btn {
  width: 24px;
  height: 24px;
  border: 1px solid var(--color-gray-3);
  background: var(--color-white);
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.qty-btn:hover {
  background: var(--color-gray-1);
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

.sidebar-footer {
  padding: 20px;
  border-top: 1px solid var(--color-gray-2);
}

.total {
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
}

.checkout-btn {
  width: 100%;
}
</style>
