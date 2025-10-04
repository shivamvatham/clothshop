<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="hero-gradient">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-25 text-center">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">New Arrivals</h1>
        <p class="text-gray-600 max-w-2xl mx-auto">Discover the latest additions to our collection. Fresh styles, timeless elegance.</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <ProductCard 
          v-for="product in newProducts" 
          :key="product.id" 
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const products = inject('products')
const cart = inject('cart')

const newProducts = computed(() => products.slice(0, 6))

const addToCart = (product) => {
  const existingItem = cart.value.find(item => item.id === product.id)
  if (existingItem) {
    existingItem.quantity++
  } else {
    cart.value.push({ ...product, quantity: 1 })
  }
}
</script>