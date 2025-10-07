<script setup lang="ts">
import Icon from "../../atoms/Icon/Icon.vue"

defineOptions({
  name: "ProductRating"
})

interface Props {
  rating: number
  reviewCount?: number
  showReviewCount?: boolean
  showReviewsLink?: boolean
  reviewsLink?: string
  size?: "sm" | "md" | "lg"
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  showReviewCount: true,
  showReviewsLink: false,
  size: "md"
})

const iconSize = {
  sm: "12",
  md: "16",
  lg: "20"
}

const getStarType = (starIndex: number, rating: number) => {
  if (starIndex <= Math.floor(rating)) return "star-fill"
  if (starIndex === Math.ceil(rating) && rating % 1 !== 0) return "star-half"
  return "star"
}

</script>

<template>
  <div class="rating" :class="[`rating--${props.size}`, props.class]">
    <div class="rating-stars">
      <template v-for="star in 5" :key="star">
        <Icon :name="getStarType(star, props.rating)" :w="iconSize[props.size]" :h="iconSize[props.size]"
          class="filled" />
      </template>
    </div>
    <span v-if="props.showReviewCount" class="rating-text">
      {{ props.rating }}
      <a v-if="props.showReviewsLink && props.reviewsLink" :href="props.reviewsLink" class="reviews-link">
        See All Reviews ({{ props.reviewCount || 0 }})
      </a>
      <span v-else>({{ props.reviewCount || 0 }})</span>
    </span>
  </div>
</template>

<style scoped>
.rating {
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

.reviews-link {
  font-size: 14px;
  color: var(--color-blue);
  text-decoration: underline;
  margin-left: 4px;
}

.reviews-link:hover {
  text-decoration: underline;
}

.rating--sm .rating-text,
.rating--sm .reviews-link {
  font-size: 12px;
}

.rating--lg .rating-text,
.rating--lg .reviews-link {
  font-size: 16px;
}
</style>
