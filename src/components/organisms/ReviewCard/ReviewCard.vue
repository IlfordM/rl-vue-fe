<script setup lang="ts">
import Rating from '../../molecules/Rating/Rating.vue';
import Badge from '../../atoms/Badge/Badge.vue';

defineOptions({
  name: 'ReviewCard',
});

interface Props {
  reviewerName: string;
  avatarBackgroundColor?: string;
  reviewerInitials: string;
  rating: number;
  reviewText: string;
  productSize?: string;
  productColor?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  productSize: '',
  productColor: '',
  avatarBackgroundColor: '#5c7995',
});

</script>

<template>
  <div class="review-card" :class="props.class">
    <div class="review-header">
      <div class="reviewer-info">
        <div class="avatar" :style="{ backgroundColor: props.avatarBackgroundColor }">
          {{ props.reviewerInitials }}
        </div>
        <div class="reviewer-details">
          <h4 class="reviewer-name">{{ props.reviewerName }}</h4>
          <div v-if="props.productSize || props.productColor" class="product-attributes">
            <Badge v-if="props.productSize" variant="stroke" size="sm">{{ props.productSize }}</Badge>
            <Badge v-if="props.productColor" variant="stroke" size="sm">{{ props.productColor }}</Badge>
          </div>
        </div>
      </div>
      <div class="rating-container">
        <Rating :rating="props.rating" :show-review-count="false" />
      </div>
    </div>
    <div class="review-content">
      <p class="review-text">{{ props.reviewText }}</p>
    </div>
  </div>
</template>

<style scoped>
.review-card {
  background: var(--color-white);
  border: 1px solid var(--color-gray-3);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.reviewer-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  font-weight: 600;
  font-size: 16px;
  flex-shrink: 0;
}

.reviewer-details {
  display: flex;
  gap: 8px;
}

.reviewer-name {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;

  color: var(--color-blue);
  margin: 0;
}

.product-attributes {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.attribute-tag {
  background: transparent;
  border: 1px solid var(--color-gray-3);
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 12px;
  color: var(--color-gray);
  font-weight: 400;
}

.rating-container {
  display: flex;
  align-items: center;
}

.review-content {
  margin-top: 0;
}

.review-text {
  text-align: left;
  font-size: 16px;
  line-height: 24px;

  color: var(--color-black);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .review-header {
    flex-direction: column;
    gap: 12px;
  }

  .rating-container {
    align-self: flex-start;
  }

  .review-card {
    padding: 16px;
  }
}
</style>
