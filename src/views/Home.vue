<script setup lang="ts">
import { ref, computed } from 'vue';
import PageHeader from '@/components/organisms/Header/Header.vue';
import PageFooter from '@/components/organisms/Footer/Footer.vue';
import Button from '@/components/atoms/Button/Button.vue';
import Icon from '@/components/atoms/Icon/Icon.vue';
import Cart from '@/components/organisms/Cart/Cart.vue';
import Favorites from '@/components/organisms/Favorites/Favorites.vue';
import ReviewCard from '@/components/organisms/ReviewCard/ReviewCard.vue';
import Product from '@/components/organisms/Product/Product.vue';
import type { IProduct } from '@/components/organisms/Product/Product.vue';

defineOptions({
  name: 'HomePage',
});

enum SidebarType {
  CART = 'cart',
  FAVORITES = 'favorites',
}

// Mock data for cart and favorites count
const cartCount = ref(2);
const favoritesCount = ref(1);

// Sidebar state
const sidebarType = ref<SidebarType | null>(null);

// Computed properties
const isSidebarOpen = computed(() => sidebarType.value !== null);
const currentCount = computed(() => {
  return sidebarType.value === SidebarType.CART ? cartCount.value : favoritesCount.value;
});

// Sidebar handlers
const openCart = () => {
  sidebarType.value = SidebarType.CART;
};

const openFavorites = () => {
  sidebarType.value = SidebarType.FAVORITES;
};

const closeSidebar = () => {
  sidebarType.value = null;
};

const removeFromCart = () => {
  cartCount.value = Math.max(0, cartCount.value - 1);
  // Here you would remove the item from cart
};

const removeFromFavorites = () => {
  favoritesCount.value = Math.max(0, favoritesCount.value - 1);
  // Here you would remove the item from favorites
};

const addToCart = () => {
  cartCount.value += 1;
  // Here you would add the item to cart
};

const product = ref({
  id: '1',
  name: 'The Perfect Pockets Long Parka',
  price: 199.99,
  originalPrice: 249.99,
  discount: 20,
  image: 'https://picsum.photos/seed/product/400/400',
  description:
    'This cozy parka has a water-resistant shell made of upcycled materials, synthetic down filling, and an abundance of pockets. There are six zipper-close pockets plus one roomy velcro-close pouch. Engineered for storage, this parka provides space for all the necessities you’ll bring on your next cold-weather adventure.',
  rating: 4.5,
  reviewCount: 128,
  inStock: true,
  tags: ['Wireless', 'Noise Cancelling', 'Premium'],
  colors: [
    { name: 'Black', value: '#000000', available: true },
    { name: 'White', value: '#ffffff', available: true },
    { name: 'Red', value: '#ff0000', available: true },
    { name: 'Green', value: '#00ff00', available: true },
    { name: 'Blue', value: '#3b82f6', available: false },
  ],
  sizes: [
    { name: 'XS', available: true },
    { name: 'S', available: true },
    { name: 'M', available: true },
    { name: 'L', available: false },
    { name: 'XL', available: true },
    { name: 'XXL', available: true },
  ],
  offerEndDate: '2025-12-31',
  offerDescriptionLink: '/offers/wireless-headphones-sale',
  infoText:
    'This cozy parka has a water-resistant shell made of upcycled materials, synthetic down filling, and an abundance of pockets. There are six zipper-close pockets plus one roomy velcro-close pouch. Engineered for storage, this parka provides space for all the necessities you’ll bring on your next cold-weather adventure.',
  withInfo: true,
  reviews: [
    {
      reviewerName: 'John Doe',
      reviewerInitials: 'JD',
      rating: 5,
      reviewText: 'Amazing product! Highly recommend it to everyone.',
      productSize: 'XL',
      productColor: 'Yellow',
      avatarBackgroundColor: '#5c7995',
    },
    {
      reviewerName: 'Jane Doe',
      reviewerInitials: 'JD',
      rating: 4,
      reviewText: 'Good product! Recommend it to everyone.',
      productSize: 'L',
      productColor: 'Red',
      avatarBackgroundColor: '#eb0606',
    },
    {
      reviewerName: 'Jim Doe',
      reviewerInitials: 'JD',
      rating: 3,
      reviewText: 'Average product! Not worth the price.',
      productSize: 'M',
      productColor: 'Blue',
      avatarBackgroundColor: '#6c6c6c',
    },
    {
      reviewerName: 'Sarah Wilson',
      reviewerInitials: 'SW',
      rating: 5,
      reviewText:
        "Absolutely fantastic! I've been using this product for over 6 months now and it has exceeded all my expectations. The build quality is outstanding, the materials feel premium, and the design is both functional and aesthetically pleasing. I particularly love how it fits perfectly and the attention to detail in the craftsmanship. The customer service was also excellent when I had a question about sizing. I would definitely purchase again and have already recommended it to several friends who have also been very happy with their purchases. This is exactly what I was looking for and more!",
      productSize: 'S',
      productColor: 'Black',
      avatarBackgroundColor: '#e1a829',
    },
    {
      reviewerName: 'Mike Johnson',
      reviewerInitials: 'MJ',
      rating: 2,
      reviewText:
        'Not quite what I expected. The quality could be better for the price point. The material feels cheaper than advertised and the fit is a bit off. I had to return it and get a different size, which was a hassle. The customer service was helpful with the exchange though. Overall, I think there are better options available for the same price.',
      productSize: 'L',
      productColor: 'Green',
      avatarBackgroundColor: '#ff6b6b',
    },
    {
      reviewerName: 'Emily Chen',
      reviewerInitials: 'EC',
      rating: 4,
      reviewText:
        "Really solid product overall. The quality is good and it does exactly what it's supposed to do. I've been using it for about 3 months now and it's held up well. The only minor issue is that the color is slightly different from what I expected based on the photos, but it's still nice. Would recommend to others.",
      productSize: 'M',
      productColor: 'White',
      avatarBackgroundColor: '#4ecdc4',
    },
    {
      reviewerName: 'Alex Rodriguez',
      reviewerInitials: 'AR',
      rating: 5,
      reviewText:
        "This is hands down the best purchase I've made this year! I was skeptical at first because of the price, but after using it for several months, I can confidently say it's worth every penny. The attention to detail is incredible - from the packaging to the product itself, everything feels premium. The functionality is exactly what I needed and more. I love how versatile it is and how well it integrates with my daily routine. The customer support team was also incredibly helpful when I had questions. I've already ordered another one as a gift for my brother. This company really knows what they're doing and I'll definitely be a repeat customer. Highly, highly recommend!",
      productSize: 'XL',
      productColor: 'Blue',
      avatarBackgroundColor: '#9b59b6',
    },
    {
      reviewerName: 'Lisa Thompson',
      reviewerInitials: 'LT',
      rating: 3,
      reviewText:
        "It's okay, nothing special. Does the job but I expected more for the price. The quality is decent but not exceptional. The shipping was fast though.",
      productSize: 'XS',
      productColor: 'Red',
      avatarBackgroundColor: '#f39c12',
    },
    {
      reviewerName: 'David Kim',
      reviewerInitials: 'DK',
      rating: 4,
      reviewText:
        "Good value for money. The product arrived quickly and was well packaged. It works as described and I'm satisfied with my purchase. The only thing I would change is the sizing - it runs a bit small so I'd recommend going up one size.",
      productSize: 'L',
      productColor: 'Black',
      avatarBackgroundColor: '#2ecc71',
    },
    {
      reviewerName: 'Maria Garcia',
      reviewerInitials: 'MG',
      rating: 5,
      reviewText:
        "Incredible product! I've been searching for something like this for months and finally found it. The quality is outstanding and it has made such a difference in my daily life. The design is beautiful and functional, and I get compliments on it all the time. The company clearly cares about their customers and it shows in every aspect of the product and service. I'm so happy with this purchase and would definitely buy again. Thank you for creating such an amazing product!",
      productSize: 'M',
      productColor: 'Purple',
      avatarBackgroundColor: '#e74c3c',
    },
  ],
});

const handleAddToCart = (product: IProduct) => {
  cartCount.value += 1;
  console.log('Added to cart:', product);
};

const handleAddToFavorites = (product: IProduct) => {
  favoritesCount.value += 1;
  console.log('Added to favorites:', product);
};

const handleRemoveFromFavorites = (product: IProduct) => {
  favoritesCount.value = Math.max(0, favoritesCount.value - 1);
  console.log('Removed from favorites:', product);
};
</script>

<template>
  <div class="home">
    <PageHeader />
    <Button class="sidebar-button" variant="ghost" :style="{ top: '140px' }" @click="openCart">
      <div class="icon-with-badge">
        <Icon name="cart" w="27" h="24" class="icon-cart" />
        <span v-if="cartCount > 0" class="badge" :aria-label="`${cartCount} items in cart`">
          {{ cartCount > 99 ? '99+' : cartCount }}
        </span>
      </div>
    </Button>
    <Button class="sidebar-button" variant="ghost" :style="{ top: '240px' }" @click="openFavorites">
      <div class="icon-with-badge">
        <Icon name="heart" w="27" h="24" class="icon-heart" />
        <span
          v-if="favoritesCount > 0"
          class="badge"
          :aria-label="`${favoritesCount} items in favorites`"
        >
          {{ favoritesCount > 99 ? '99+' : favoritesCount }}
        </span>
      </div>
    </Button>

    <!-- Single Sidebar Container -->
    <div v-if="isSidebarOpen" class="sidebar-overlay" @click="closeSidebar">
      <div class="sidebar-container" @click.stop>
        <Cart
          v-if="sidebarType === SidebarType.CART"
          :is-open="true"
          :cart-count="currentCount"
          @close="closeSidebar"
          @remove-item="removeFromCart"
        />

        <Favorites
          v-if="sidebarType === SidebarType.FAVORITES"
          :is-open="true"
          :favorites-count="currentCount"
          @close="closeSidebar"
          @remove-favorite="removeFromFavorites"
          @add-to-cart="addToCart"
        />
      </div>
    </div>

    <main class="main-content">
      <section class="hero">
        <h1>RL shop</h1>
      </section>
      <section class="item-section">
        <div class="item-details">
          <Product
            :product="product"
            variant="detailed"
            @add-to-cart="handleAddToCart"
            @add-to-favorites="handleAddToFavorites"
            @remove-from-favorites="handleRemoveFromFavorites"
          />
        </div>
      </section>

      <section class="reviews">
        <h2 class="reviews-title">Reviews ({{ product.reviews.length }})</h2>
        <ReviewCard
          v-for="review in product.reviews"
          :key="review.reviewerName"
          :reviewer-name="review.reviewerName"
          :reviewer-initials="review.reviewerInitials"
          :rating="review.rating"
          :review-text="review.reviewText"
          :product-size="review.productSize"
          :product-color="review.productColor"
          :avatar-background-color="review.avatarBackgroundColor || '#5c7995'"
        />
      </section>
    </main>
  </div>
  <PageFooter />
</template>

<style scoped>
.home {
  text-align: center;
  width: 100%;
  padding: 0;
  margin: 0 auto;
}

.main-content {
  padding: 0 60px;
}

.reviews-title {
  text-align: start;
  color: var(--color-blue);
  font-family: 'Space Grotesk';
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
}

.sidebar-button {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border-radius: 6px 0 0 6px;
  position: fixed;
  height: 84px;
  width: 80px;
  right: 0;
  background-color: var(--color-white);
  box-shadow: 0 0 10px 0 var(--color-gray);
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 3;
  display: flex;
  justify-content: flex-end;
}

.sidebar-container {
  width: 400px;
  height: 100vh;
  background: var(--color-white);
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
}

.icon-with-badge {
  position: relative;
  display: inline-block;
}

.badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: var(--color-red);
  color: var(--color-white);
  border-radius: 50%;
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  border: 1px solid var(--color-white);
  box-shadow: 0 1px 3px rgba(0, 0, 0, var(--color-gray-3));
  transition: all 0.2s ease;
  animation: badgePulse 0.3s ease-out;
}

.badge:hover {
  transform: scale(1.1);
}

.item-details {
  flex: 1;
  width: 100%;
  background-color: var(--color-gray-1);
}

@keyframes badgePulse {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}
</style>
