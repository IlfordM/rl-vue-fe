<script setup lang="ts">
import { ref } from 'vue';
import Icon from '@/components/atoms/Icon/Icon.vue';
import Button from '@/components/atoms/Button/Button.vue';
import PriceWithDiscount from '@/components/molecules/PriceWithDiscount/PriceWithDiscount.vue';

defineOptions({
  name: 'CartSidebar',
});

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
  {
    id: '1',
    name: 'The Perfect Pockets Long Parka',
    price: 195.0,
    discount: 10.0,
    size: 'XL',
    color: 'Yellow',
    quantity: 1,
    image: 'public/assets/images/image1.jpg',
  },
  {
    id: '2',
    name: 'Product 2',
    price: 49.99,
    quantity: 1,
    image: 'public/assets/images/image1.jpg',
  },
]);

const totalPrice = ref(79.98);
</script>

<template>
  <section class="cart-sidebar">
    <header class="cart-header">
      <Icon name="cart" w="30" h="28" />
      <h2 class="cart-title">Cart ({{ cartCount }})</h2>
    </header>

    <div class="cart-content">
      <div v-if="cartItems.length === 0" class="empty-cart">
        <Icon name="cart" w="48" h="48" />
        <p>Cart is empty</p>
      </div>

      <div v-else class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <div class="item-container">
            <img
              :src="item.image"
              :alt="item.name"
              class="item-image"
              loading="lazy"
              decoding="async"
              w="94"
              h="94"
            />
            <div class="item-details">
              <h3 class="item-name">{{ item.name }}</h3>
              <PriceWithDiscount
                :price="item.price"
                :discount="item.discount"
                class="item-price-discount"
              />
            </div>
            <Icon name="heart" w="25" h="25" />
          </div>
          <div class="item-actions">
            <Button variant="secondary" size="sm" @click="$emit('removeItem', item.id)">
              {{ item.size }}
            </Button>
            <Button variant="secondary" size="sm" @click="$emit('removeItem', item.id)">
              {{ item.color }}
            </Button>
            <div class="quantity-controls">
              <button class="qty-btn">-</button>
              <span>{{ item.quantity }}</span>
              <button class="qty-btn">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer v-if="cartItems.length > 0" class="cart-footer">
      <div class="total">
        <span>Total Payment</span>
        <PriceWithDiscount :price="totalPrice" />
      </div>
      <div class="promo-code">
        <span>Promo Code</span>
        <div class="promo-code-input">
          <input type="text" placeholder="e.g APRIL20" class="promo-code-input-field" />
          <Button variant="primary" class="promo-code-btn">
            <Icon name="coupon" w="18" h="14" style="margin-right: 8px" />
            Apply
          </Button>
        </div>
      </div>
      <div class="checkout-btn-container">
        <Button variant="selected" class="checkout-btn" style="font-size: 20px; font-weight: 500">
          <Icon name="cart-plus" w="16" h="16" style="margin-right: 8px" />
          Checkout
        </Button>
      </div>
    </footer>
  </section>
</template>

<style scoped>
.cart-sidebar {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid var(--color-gray-3);
}

.cart-header .cart-title {
  font-family: 'Space Grotesk', sans-serif;
  margin: 0;
  font-size: 36px;
  font-weight: 600;
}

.cart-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px 0;
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
  gap: 20px;
  margin-bottom: 16px;
}

.cart-item {
  padding: 0 20px;
  border-bottom: 1px solid var(--color-gray-3);
}

.item-container {
  display: flex;
  margin-bottom: 6px;
  gap: 12px;
}

.item-actions {
  display: flex;
  gap: 8px;
  align-items: flex-end;
  padding-bottom: 16px;
}

.item-image {
  width: 94px;
  height: 94px;
  object-fit: cover;
  border-radius: 2px;
  background: var(--color-gray-1);
  margin: 0;
}

.item-name {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 500;
  text-align: start;
  margin-bottom: 14px;
}

.item-details {
  flex: 1;
}

.item-price {
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
}

.quantity-controls {
  margin-left: auto;
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

.cart-footer {
  padding: 20px 0;
  border-top: 1px solid var(--color-gray-2);
}

.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Space Grotesk', sans-serif;
  color: var(--color-blue);
  padding: 0 20px;
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  border-bottom: 1px solid var(--color-gray-3);
}

.total-price {
  color: var(--color-black);
  font-family: 'Courier';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
}

.checkout-btn-container {
  padding: 0 20px;
}

.promo-code {
  color: var(--color-blue);
  font-family: 'Space Grotesk', sans-serif;
  font-size: 18px;
  font-weight: 600;
  text-align: start;
  padding: 0 20px;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--color-gray-3);
}

.promo-code-input {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 16px;
}

.promo-code-input-field {
  flex: 1;
  border: 1px solid var(--color-gray-3);
  border-radius: 6px;
  background-color: var(--color-gray-4);
  padding: 8px 16px;
  height: 52px;
  box-sizing: border-box;
}

.promo-code-btn {
  color: var(--color-black);
  margin-left: 8px;
  height: 52px;
  min-height: 52px;
}

.checkout-btn {
  width: 100%;
  font-weight: 500;
}
</style>
