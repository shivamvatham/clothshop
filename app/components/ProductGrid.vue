<template>
  <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
    <ProductCard 
      v-for="product in products" 
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  products: {
    type: Array,
    default: () => []
  }
})
</script>