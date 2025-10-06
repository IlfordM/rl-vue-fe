<script setup lang="ts">
import Button from "../../atoms/Button/Button.vue"
import Icon from "../../atoms/Icon/Icon.vue"
import PriceWithDiscount from "../../molecules/PriceWithDiscount/PriceWithDiscount.vue"
import ImageCarousel from '@/components/organisms/Carousel/ImageCarousel.vue';
import Breadcrumb from '@/components/organisms/Breadcrumb/Breadcrumb.vue';
import { ref } from 'vue';

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
      <div v-if="props.showRating && props.product.rating" class="product-rating">
        <div class="rating-stars">
          <template v-for="star in 5" :key="star">
            <Icon name="star-fill" w="16" h="16" :class="star <= (props.product.rating || 0) ? 'filled' : ''" />
          </template>
        </div>
        <span class="rating-text">
          {{ props.product.rating }} ({{ props.product.reviewCount || 0 }})
        </span>
      </div>

      <!-- Price -->
      <div class="product-price">
        <PriceWithDiscount :price="props.product.price" :original-price="props.product.originalPrice"
          :discount="props.product.discount" />
      </div>

      <!-- Description -->
      <p v-if="props.variant === 'detailed'" class="product-description">
        {{ props.product.description }}
      </p>

      <!-- Colors -->
      <div v-if="props.showColors && props.product.colors" class="product-colors">
        <h4 class="colors-title">Colors:</h4>
        <div class="colors-list">
          <button v-for="color in props.product.colors" :key="color.name" :class="['color-option', {
            'selected': selectedColor === color.name,
            'unavailable': !color.available
          }]" :style="{ backgroundColor: color.value }" :disabled="!color.available"
            @click="handleColorSelect(color.name)" :title="color.name" />
        </div>
      </div>

      <!-- Sizes -->
      <div v-if="props.showSizes && props.product.sizes" class="product-sizes">
        <h4 class="sizes-title">Sizes:</h4>
        <div class="sizes-list">
          <button v-for="size in props.product.sizes" :key="size.name" :class="['size-option', {
            'selected': selectedSize === size.name,
            'unavailable': !size.available
          }]" :disabled="!size.available" @click="handleSizeSelect(size.name)">
            {{ size.name }}
          </button>
        </div>
      </div>

      <!-- Stock Status -->
      <div class="product-stock">
        <span :class="['stock-status', { 'in-stock': props.product.inStock, 'out-of-stock': !props.product.inStock }]">
          {{ props.product.inStock ? 'In Stock' : 'Out of Stock' }}
        </span>
      </div>

      <!-- Tags -->
      <div v-if="props.product.tags" class="product-tags">
        <span v-for="tag in props.product.tags" :key="tag" class="product-tag">
          {{ tag }}
        </span>
      </div>

      <!-- Actions -->
      <div v-if="props.showAddToCart" class="product-actions">
        <Button variant="primary" size="md" :disabled="!props.product.inStock" @click="handleAddToCart"
          class="add-to-cart-btn">
          <Icon name="cart-plus" w="16" h="16" />
          Add to Cart
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product {
  display: flex;
  gap: 20px;
  background: transparent;
  overflow: hidden;
  transition: all 0.3s ease;
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex: 1;
}

.product-breadcrumb {
  margin-bottom: 8px;
  padding: 0;
  font-size: 8px;
}

.product-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-gray);
  margin: 0;
  line-height: 1.3;
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

.product-description {
  font-size: 14px;
  color: var(--color-gray-3);
  line-height: 1.4;
  margin: 0;
}

.product-colors,
.product-sizes {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.colors-title,
.sizes-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-gray);
  margin: 0;
}

.colors-list,
.sizes-list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.color-option {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.color-option:hover {
  border-color: var(--color-gray-3);
}

.color-option.selected {
  border-color: var(--color-blue);
  box-shadow: 0 0 0 2px var(--color-blue-3);
}

.color-option.unavailable {
  opacity: 0.3;
  cursor: not-allowed;
}

.size-option {
  padding: 6px 12px;
  border: 1px solid var(--color-gray-3);
  border-radius: 4px;
  background: var(--color-white);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
}

.size-option:hover {
  border-color: var(--color-blue);
}

.size-option.selected {
  border-color: var(--color-blue);
  background: var(--color-blue-3);
  color: var(--color-blue);
}

.size-option.unavailable {
  opacity: 0.3;
  cursor: not-allowed;
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
  margin-top: auto;
  padding-top: 16px;
}

.add-to-cart-btn {
  width: 100%;
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
</style>
