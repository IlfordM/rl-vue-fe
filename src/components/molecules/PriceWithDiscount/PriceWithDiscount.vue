<script setup lang="ts">
import { computed } from "vue"

defineOptions({
  name: "PriceWithDiscount"
})

interface Props {
  price: number
  discount?: number
  currency?: string
}

const props = withDefaults(defineProps<Props>(), {
  currency: "$"
})

const discountedPrice = computed(() => {
  if (!props.discount || props.discount === 0) return props.price
  return props.price * (1 - props.discount / 100)
})

const formatPrice = (price: number) => {
  return `${props.currency}${price.toFixed(2)}`
}
</script>

<template>
  <div class="price-with-discount">
    <span v-if="discount && discount > 0" class="original-price">{{ formatPrice(price) }}</span>
    <span class="discounted-price">{{ formatPrice(discountedPrice) }}</span>
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
  font-size: 14px;
  font-weight: 400;
}

.discounted-price {
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
}
</style>
