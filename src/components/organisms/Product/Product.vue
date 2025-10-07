<script setup lang="ts">
import { ref } from 'vue'
import Button from "../../atoms/Button/Button.vue"
import Icon from "../../atoms/Icon/Icon.vue"
import PriceWithDiscount from "../../molecules/PriceWithDiscount/PriceWithDiscount.vue"
import Rating from "../../molecules/Rating/Rating.vue"
import Sizes from "../../molecules/Sizes/Sizes.vue"
import Colors from "../../molecules/Colors/Colors.vue"
import ImageCarousel from '@/components/organisms/Carousel/ImageCarousel.vue';
import Breadcrumb from '@/components/organisms/Breadcrumb/Breadcrumb.vue';
// Sample images for the carousel
const carouselImages = [
  {
    id: 1,
    src: 'https://picsum.photos/seed/1/800/600',
    alt: 'Beautiful landscape',
    title: 'Mountain View',
    description: 'Stunning mountain landscape with clear blue skies'
  },
  {
    id: 2,
    src: 'https://picsum.photos/seed/2/800/600',
    alt: 'Ocean sunset',
    title: 'Ocean Sunset',
    description: 'Peaceful ocean view during golden hour'
  },
  {
    id: 3,
    src: 'https://picsum.photos/seed/3/800/600',
    alt: 'Forest path',
    title: 'Forest Trail',
    description: 'Serene forest path through ancient trees'
  },
  {
    id: 4,
    src: 'https://picsum.photos/seed/4/800/600',
    alt: 'City skyline',
    title: 'Urban Life',
    description: 'Modern city skyline at twilight'
  },
  {
    id: 5,
    src: 'https://picsum.photos/seed/5/800/600',
    alt: 'Desert dunes',
    title: 'Desert Journey',
    description: 'Golden sand dunes stretching to the horizon'
  },
  {
    id: 6,
    src: 'https://picsum.photos/seed/6/800/600',
    alt: 'Lakeside view',
    title: 'Lakeside Retreat',
    description: 'Tranquil lake surrounded by mountains'
  }
];

defineOptions({
  name: "ProductCard"
})

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  description: string
  rating?: number
  reviewCount?: number
  inStock?: boolean
  tags?: string[]
  colors?: Array<{ name: string; value: string; available: boolean }>
  sizes?: Array<{ name: string; available: boolean }>
  offerEndDate?: string
  offerDescriptionLink?: string
  infoText?: string
  withInfo?: boolean
}

interface Props {
  product: Product
  showAddToCart?: boolean
  showFavorites?: boolean
  showRating?: boolean
  showColors?: boolean
  showSizes?: boolean
  variant?: "default" | "compact" | "detailed"
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  showAddToCart: true,
  showFavorites: true,
  showRating: true,
  showColors: true,
  showSizes: true,
  variant: "default"
})

const emit = defineEmits<{
  addToCart: [product: Product]
  buyNow: [product: Product]
  addToFavorites: [product: Product]
  removeFromFavorites: [product: Product]
  selectColor: [color: string]
  selectSize: [size: string]
}>()

const selectedColor = ref<string>("")
const selectedSize = ref<string>("")
const isInFavorites = ref(false)

// Add breadcrumb items
const breadcrumbItems = ref([
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Electronics', href: '/products/electronics' },
  { label: props.product.name, active: true }
]);

const handleAddToCart = () => {
  emit("addToCart", props.product)
}

const handleToggleFavorites = () => {
  if (isInFavorites.value) {
    emit("removeFromFavorites", props.product)
  } else {
    emit("addToFavorites", props.product)
  }
  isInFavorites.value = !isInFavorites.value
}

const handleBuyNow = () => {
  emit("buyNow", props.product)
}

const handleColorSelect = (color: string) => {
  selectedColor.value = color
  emit("selectColor", color)
}

const handleSizeSelect = (size: string) => {
  selectedSize.value = size
  emit("selectSize", size)
}
</script>

<template>
  <div class="product" :class="[`product--${props.variant}`, props.class]">
    <!-- Product Image -->
    <div class="gallery-container">
      <ImageCarousel :images="carouselImages" :autoplay="false" :show-navigation="false" :show-pagination="false"
        :items-to-show="1" :wrap-around="true" :width="'100%'" :slide-effect="'fade'" :show-thumbnails="true"
        :thumbnails-items-to-show="4" :thumbnails-height="465" :thumbnails-gap="4" :thumbnails-position="'left'"
        :thumbnails-direction="'column'" />
    </div>

    <!-- Product Info -->
    <div class="product-info">
      <!-- Breadcrumb -->
      <Breadcrumb :items="breadcrumbItems" class="product-breadcrumb" />

      <!-- Product Name -->
      <h3 class="product-name">{{ props.product.name }}</h3>

      <!-- Rating -->
      <Rating v-if="props.showRating && props.product.rating" :rating="props.product.rating"
        :review-count="props.product.reviewCount" :show-reviews-link="true"
        :reviews-link="`/products/${props.product.id}/reviews`" size="md" />

      <!-- Price -->
      <div class="product-price">
        <PriceWithDiscount :price="props.product.price" :original-price="props.product.originalPrice"
          :discount="props.product.discount" :offer-end-date="props.product.offerEndDate"
          :offer-description-link="props.product.offerDescriptionLink" />
      </div>

      <!-- Sizes -->
      <Sizes v-if="props.showSizes && props.product.sizes" :sizes="props.product.sizes" :selected-size="selectedSize"
        @select-size="handleSizeSelect" />

      <!-- Colors -->
      <Colors v-if="props.showColors && props.product.colors" :colors="props.product.colors"
        :selected-color="selectedColor" @select-color="handleColorSelect" />

      <!-- Actions -->
      <div v-if="props.showAddToCart" class="product-actions">
        <Button variant="selected" size="md" :disabled="!props.product.inStock" @click="handleAddToCart"
          class="add-to-cart-btn">
          <Icon name="cart-plus" w="16" h="16" />
          Add to Cart
        </Button>
        <Button variant="primary" size="md" :disabled="!props.product.inStock" @click="handleBuyNow"
          class="buy-now-btn">
          <Icon name="shopping-bag" w="16" h="16" />
          Buy Now
        </Button>
        <Button v-if="props.showFavorites" variant="primary" size="md" @click="handleToggleFavorites"
          class="add-to-wishlist-btn">
          <Icon name="heart-plus" w="22" h="22" />
          {{ isInFavorites ? 'Remove from Wishlist' : 'Add to Wishlist' }}
        </Button>
      </div>
    </div>
  </div>
  <!-- Description -->
  <h4 class="product-description-title">Description:</h4>
  <p v-if="props.variant === 'detailed'" class="product-description">
    {{ props.product.description }}
  </p>
</template>

<style scoped>
.product {
  display: flex;
  gap: 20px;
  background: transparent;
  overflow: hidden;
  transition: all 0.3s ease;
  margin-bottom: 46px;
}

.product--compact {
  flex-direction: row;
  gap: 16px;
}

.product--compact .product-image {
  width: 120px;
  height: 120px;
  flex-shrink: 0;
}

.gallery-container {
  max-width: 587px;
}

.product-image__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product:hover .product-image__img {
  transform: scale(1.05);
}

.product-discount {
  position: absolute;
  top: 8px;
  left: 8px;
  background: var(--color-red);
  color: var(--color-white);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.product-favorite {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.product-favorite:hover {
  background: var(--color-white);
  transform: scale(1.1);
}

.product-favorite .is-favorite {
  color: var(--color-red);
}

.product-info {
  height: 467px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1;
}

.product-breadcrumb {
  padding: 0;
  font-size: 8px;
}

.product-name {
  color: var(--color-black);
  margin: 0;
  font-family: 'Space Grotesk', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 28px;
  text-align: start;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 8px;
}

.rating-stars {
  display: flex;
  gap: 2px;
}

.rating-stars .filled {
  color: var(--color-yellow);
}

.rating-text {
  font-size: 14px;
  color: var(--color-gray-3);
}

.product-price {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-blue);
}

.product-stock {
  margin: 8px 0;
}

.stock-status {
  font-size: 14px;
  font-weight: 500;
}

.stock-status.in-stock {
  color: #10b981;
}

.stock-status.out-of-stock {
  color: var(--color-red);
}

.product-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.product-tag {
  background: var(--color-gray-4);
  color: var(--color-gray);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.product-actions {
  width: 100%;
  padding-top: 16px;
  display: flex;
  gap: 8px;
}

.add-to-cart-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .product--compact {
    flex-direction: column;
  }

  .product--compact .product-image {
    width: 100%;
    height: 200px;
  }

  .product-name {
    font-size: 16px;
  }

  .product-price {
    font-size: 18px;
  }
}

.product-description-title {
  text-align: start;
  color: var(--color-blue);
  font-family: 'Space Grotesk';
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
}

.product-description {
  text-align: start;
  font-family: 'Poppins';
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}
</style>
