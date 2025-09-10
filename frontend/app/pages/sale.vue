<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-gradient-to-r from-red-400 to-pink-400">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-white">
        <h1 class="text-4xl font-bold mb-4">Special Sale</h1>
        <p class="text-xl mb-6">Up to 50% off on selected items</p>
        <div class="inline-block bg-white text-red-500 px-6 py-2 rounded-full font-bold text-lg">
          Limited Time Offer
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <ProductCard 
          v-for="product in saleProducts" 
          :key="product.id" 
          :product="product"
          :sale-percentage="product.discount"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const products = inject('products')
const cart = inject('cart')

const saleProducts = computed(() => {
  return products.map(product => ({
    ...product,
    discount: Math.floor(Math.random() * 30) + 20, // 20-50% discount
    salePrice: Math.floor(product.price * (1 - (Math.floor(Math.random() * 30) + 20) / 100))
  })).slice(0, 6)
})

const addToCart = (product) => {
  const existingItem = cart.value.find(item => item.id === product.id)
  if (existingItem) {
    existingItem.quantity++
  } else {
    cart.value.push({ ...product, quantity: 1 })
  }
}
</script>