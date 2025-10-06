<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { ref, computed } from 'vue'

interface ImageItem {
  id: string | number
  src: string
  alt: string
  title?: string
  description?: string
}

interface Props {
  images: ImageItem[]
  autoplay?: boolean
  autoplayInterval?: number
  showNavigation?: boolean
  showPagination?: boolean
  itemsToShow?: number
  itemsToScroll?: number
  wrapAround?: boolean
  mouseDrag?: boolean
  touchDrag?: boolean
  height?: number
  width?: string
  slideEffect?: 'slide' | 'fade'
  showThumbnails?: boolean
  thumbnailsItemsToShow?: number
  thumbnailsHeight?: number
  thumbnailsGap?: number
  thumbnailsPosition?: 'bottom' | 'left'
  thumbnailsDirection?: 'row' | 'column'
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: false,
  autoplayInterval: 3000,
  showNavigation: true,
  showPagination: true,
  itemsToShow: 1,
  itemsToScroll: 1,
  wrapAround: true,
  mouseDrag: true,
  touchDrag: true,
  height: 467,
  width: '100%',
  slideEffect: 'slide',
  showThumbnails: false,
  thumbnailsItemsToShow: 6,
  thumbnailsHeight: 80,
  thumbnailsGap: 10,
  thumbnailsPosition: 'bottom',
  thumbnailsDirection: 'row'
})

const currentSlide = ref(0)

const slideTo = (nextSlide: number) => {
  currentSlide.value = nextSlide
}

const galleryConfig = computed(() => ({
  itemsToShow: props.itemsToShow,
  itemsToScroll: props.itemsToScroll,
  wrapAround: props.wrapAround,
  slideEffect: props.slideEffect,
  mouseDrag: props.mouseDrag,
  touchDrag: props.touchDrag,
  height: props.height,
  autoplay: props.autoplay ? props.autoplayInterval : 0,
}))

const thumbnailsConfig = computed(() => ({
  height: props.thumbnailsHeight,
  itemsToShow: props.thumbnailsItemsToShow,
  wrapAround: props.wrapAround,
  touchDrag: false,
  mouseDrag: false,
  gap: props.thumbnailsGap,
  dir: (props.thumbnailsDirection === 'column' ? 'ttb' : 'ltr') as 'ttb' | 'ltr',
}))
</script>

<template>
  <div class="image-carousel" :class="{ 'thumbnails-left': props.thumbnailsPosition === 'left' }"
    :style="{ width: props.width }">
    <!-- Left Thumbnails Layout -->
    <div v-if="props.showThumbnails && props.thumbnailsPosition === 'left'" class="carousel-layout-left">
      <!-- Thumbnails Carousel (Left) -->
      <Carousel id="thumbnails-left" v-bind="thumbnailsConfig" v-model="currentSlide" class="thumbnails-carousel-left">
        <Slide v-for="image in props.images" :key="image.id">
          <template #default="{ currentIndex, isActive }">
            <div :class="['thumbnail', { 'is-active': isActive }]" @click="slideTo(currentIndex)">
              <img :src="image.src" :alt="image.alt" class="thumbnail-image" />
            </div>
          </template>
        </Slide>

        <template #addons>
          <Navigation />
        </template>
      </Carousel>

      <!-- Main Gallery Carousel (Right) -->
      <Carousel id="gallery-left" v-bind="galleryConfig" v-model="currentSlide" class="gallery-carousel-left">
        <Slide v-for="image in props.images" :key="image.id">
          <div class="image-container">
            <img :src="image.src" :alt="image.alt" class="gallery-image" />
            <div v-if="image.title || image.description" class="image-overlay">
              <h3 v-if="image.title" class="image-title">{{ image.title }}</h3>
              <p v-if="image.description" class="image-description">{{ image.description }}</p>
            </div>
          </div>
        </Slide>
      </Carousel>
    </div>

    <!-- Default Bottom Thumbnails Layout -->
    <div v-else>
      <!-- Main Gallery Carousel -->
      <Carousel id="gallery" v-bind="galleryConfig" v-model="currentSlide" class="gallery-carousel">
        <Slide v-for="image in props.images" :key="image.id">
          <div class="image-container">
            <img :src="image.src" :alt="image.alt" class="gallery-image" />
            <div v-if="image.title || image.description" class="image-overlay">
              <h3 v-if="image.title" class="image-title">{{ image.title }}</h3>
              <p v-if="image.description" class="image-description">{{ image.description }}</p>
            </div>
          </div>
        </Slide>

        <template v-if="props.showNavigation" #addons>
          <Navigation />
        </template>
      </Carousel>

      <!-- Thumbnails Carousel (Bottom) -->
      <Carousel v-if="props.showThumbnails" id="thumbnails" v-bind="thumbnailsConfig" v-model="currentSlide"
        class="thumbnails-carousel">
        <Slide v-for="image in props.images" :key="image.id">
          <template #default="{ currentIndex, isActive }">
            <div :class="['thumbnail', { 'is-active': isActive }]" @click="slideTo(currentIndex)">
              <img :src="image.src" :alt="image.alt" class="thumbnail-image" />
            </div>
          </template>
        </Slide>

        <template #addons>
          <Navigation />
        </template>
      </Carousel>

      <!-- Pagination Dots (when thumbnails are not shown) -->
      <div v-if="props.showPagination && !props.showThumbnails" class="pagination-container">
        <button v-for="(image, index) in props.images" :key="index" class="pagination-dot"
          :class="{ active: index === currentSlide }" @click="slideTo(index)"
          :aria-label="`Go to slide ${index + 1}`" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-carousel {
  position: relative;
}

.carousel-layout-left {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.gallery-carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
  --vc-nav-color: var(--color-gray);
  --vc-nav-width: 48px;
  --vc-nav-height: 48px;
}

.gallery-carousel-left {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
  --vc-nav-color: var(--color-gray);
  --vc-nav-width: 48px;
  --vc-nav-height: 48px;
}

.thumbnails-carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
  --vc-nav-color: var(--color-gray);
  --vc-nav-width: 32px;
  --vc-nav-height: 32px;
}

.thumbnails-carousel-left {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
  --vc-nav-color: var(--color-gray);
  --vc-nav-width: 32px;
  --vc-nav-height: 32px;
  height: v-bind('props.thumbnailsHeight + "px"');
  flex-shrink: 0;
  border: 1px solid var(--color-gray-3);
  border-radius: 4px;
  padding: 6px;
}

.thumbnails-carousel-left :deep(.carousel__viewport) {
  position: relative;
  height: 360px;
  top: 42px;
}

.thumbnails-carousel-left :deep(.carousel__prev),
.thumbnails-carousel-left :deep(.carousel__next) {
  width: 104px;
  height: 32px;
  background: var(--color-gray-4);
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray);
  transition: all 0.3s ease;
}

.thumbnails-carousel-left :deep(.carousel__prev) {
  margin-top: 10px;
}

.thumbnails-carousel-left :deep(.carousel__next) {
  margin-bottom: 10px;
}

.thumbnails-carousel-left :deep(.carousel__prev:hover),
.thumbnails-carousel-left :deep(.carousel__next:hover) {
  background: var(--color-gray-3);
  color: var(--color-white);
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 4px;
  background: var(--color-gray-4);
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: var(--color-white);
  padding: 20px;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  border-radius: 0 0 16px 16px;
}

.image-title {
  margin: 0 0 8px 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-white);
}

.image-description {
  margin: 0;
  font-size: 0.875rem;
  opacity: 0.9;
  color: var(--color-white);
}

.thumbnails-carousel {
  margin-top: 10px;
}

.thumbnail {
  height: 100%;
  width: 100%;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.3s ease-in-out;
  border-radius: 2px;
  overflow: hidden;
  border: 2px solid transparent;
}

.thumbnail.is-active {
  opacity: 1;
  border-color: var(--color-blue);
}

.thumbnail:hover {
  opacity: 1;
  border-color: var(--color-blue-3);
}

.thumbnail-image {
  border-radius: 2px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pagination-container {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
}

.pagination-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: var(--color-gray-3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-dot:hover {
  background: var(--color-gray);
}

.pagination-dot.active {
  background: var(--color-blue);
  transform: scale(1.2);
}

/* Left thumbnails specific styles */
.thumbnails-left .carousel-layout-left {
  flex-direction: row;
}

.thumbnails-left .thumbnails-carousel-left {
  width: 120px;
  order: 1;
}

.thumbnails-left .gallery-carousel-left {
  flex: 1;
  order: 2;
}

/* Responsive Design */
@media (max-width: 768px) {

  .gallery-carousel,
  .gallery-carousel-left {
    --vc-nav-width: 40px;
    --vc-nav-height: 40px;
  }

  .thumbnails-carousel,
  .thumbnails-carousel-left {
    --vc-nav-width: 28px;
    --vc-nav-height: 28px;
  }

  .image-overlay {
    padding: 16px;
  }

  .image-title {
    font-size: 1.125rem;
  }

  .image-description {
    font-size: 0.8rem;
  }

  .thumbnails-left .carousel-layout-left {
    flex-direction: column;
  }

  .thumbnails-left .thumbnails-carousel-left {
    width: 100%;
    order: 2;
  }

  .thumbnails-left .gallery-carousel-left {
    order: 1;
  }
}

@media (max-width: 480px) {

  .gallery-carousel,
  .gallery-carousel-left {
    --vc-nav-width: 36px;
    --vc-nav-height: 36px;
  }

  .thumbnails-carousel,
  .thumbnails-carousel-left {
    --vc-nav-width: 24px;
    --vc-nav-height: 24px;
  }

  .pagination-dot {
    width: 10px;
    height: 10px;
  }
}
</style>
