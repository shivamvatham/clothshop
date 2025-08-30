<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="hero-gradient">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">New Arrivals</h1>
        <p class="text-gray-600 max-w-2xl mx-auto">Discover the latest additions to our collection. Fresh styles, timeless elegance.</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="product in newProducts" :key="product.id" class="card-hover bg-white rounded-2xl overflow-hidden shadow-sm">
          <div class="relative group">
            <div class="absolute top-4 left-4 bg-pink-400 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
              New
            </div>
            <ProductImage 
              :src="product.image" 
              :alt="product.name" 
              image-class="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <button 
                @click="addToCart(product)"
                class="bg-white text-gray-800 px-6 py-3 rounded-full font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-pink-400 hover:text-white"
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ product.name }}</h3>
            <p class="text-sm text-gray-500 mb-3 capitalize">{{ product.category }}</p>
            <div class="flex justify-between items-center">
              <p class="text-2xl font-bold text-pink-400">₹{{ product.price }}</p>
              <NuxtLink :to="`/products/${product.id}`" class="text-pink-400 hover:text-pink-500 text-sm font-medium">
                View Details
              </NuxtLink>
            </div>
          </div>
        </div>
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