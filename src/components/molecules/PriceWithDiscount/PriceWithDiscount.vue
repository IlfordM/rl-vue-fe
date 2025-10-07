<script setup lang="ts">
import { computed } from "vue"

defineOptions({
  name: "PriceWithDiscount"
})

interface Props {
  price: number
  discount?: number
  currency?: string
  offerEndDate?: string
  offerDescriptionLink?: string
}

const props = withDefaults(defineProps<Props>(), {
  currency: "$"
})

const discountedPrice = computed(() => {
  if (!props.discount || props.discount === 0) return props.price
  return props.price * (1 - props.discount / 100)
})

const isOfferActive = computed(() => {
  if (!props.offerEndDate) return false
  return new Date() < new Date(props.offerEndDate)
})

const offerEndDateText = computed(() => {
  if (!props.offerEndDate) return ''
  const date = new Date(props.offerEndDate)
  return `Offer ends ${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`
})

const formatPrice = (price: number) => {
  return `${props.currency}${price.toFixed(2)}`
}
</script>

<template>
  <div class="price-with-discount">
    <span v-if="discount && discount > 0" class="original-price">{{ formatPrice(price) }}</span>
    <span class="discounted-price">{{ formatPrice(discountedPrice) }}</span>
    <span v-if="isOfferActive">Badge</span>
    <a v-if="isOfferActive && offerDescriptionLink" :href="offerDescriptionLink" class="offer-link">
      {{ offerEndDateText }}
    </a>
  </div>
</template>

<style scoped>
.price-with-discount {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-black);
  font-family: 'Courier';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
}

.original-price {
  text-decoration: line-through;
  font-family: inherit;
  font-size: 20px;
  font-weight: 400;
}

.discounted-price {
  font-family: inherit;
  font-size: 36px;
  font-weight: 600;
}

.offer-link {
  font-size: 12px;
  color: var(--color-blue);
  text-decoration: underline;
  margin-left: 8px;

  font-size: 14px;
  line-height: 28px;
}

.offer-link:hover {
  translate: 0 -2px;
}
</style>
