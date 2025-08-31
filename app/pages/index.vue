<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-gradient min-h-[80vh] flex items-center">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="text-center lg:text-left">
          <h1 class="text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            Elegant
            <span class="block text-pink-400">Fashion</span>
            for Every Woman
          </h1>
          <p class="text-xl text-gray-600 mb-8 max-w-lg">
            Discover our exquisite collection of kurtis, sarees, and contemporary wear designed for the modern Indian
            woman.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <NuxtLink to="/products"
              class="bg-pink-400 text-white px-8 py-4 rounded-full font-medium hover:bg-pink-500 transition-colors">
              Shop Collection
            </NuxtLink>
            <NuxtLink to="/new-arrivals"
              class="border-2 border-pink-400 text-pink-400 px-8 py-4 rounded-full font-medium hover:bg-pink-400 hover:text-white transition-colors">
              New Arrivals
            </NuxtLink>
          </div>
        </div>
        <div class="relative">
          <img src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop&auto=format&q=80"
            alt="Elegant Kurti Collection" class="rounded-2xl shadow-2xl w-full max-w-md mx-auto">
        </div>
      </div>
    </section>

    <!-- Category Cards -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">Shop by Category</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Explore our carefully curated collections designed to celebrate
            your unique style</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="card-hover bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-8 text-center">
            <img src="https://cdn.pixabay.com/photo/2022/01/28/16/34/persian-woman-6975068_1280.jpg" alt="Kurtis"
              class="w-32 h-32 rounded-full mx-auto mb-6 object-cover">
            <h3 class="text-2xl font-semibold text-gray-800 mb-3">Kurtis</h3>
            <p class="text-gray-600 mb-6">Elegant and comfortable kurtis for every occasion</p>
            <NuxtLink to="/products?category=kurtis"
              class="inline-block bg-pink-400 text-white px-6 py-3 rounded-full hover:bg-pink-500 transition-colors">
              Shop Kurtis
            </NuxtLink>
          </div>

          <div class="card-hover bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 text-center">
            <img src="https://cdn.pixabay.com/photo/2023/11/10/02/30/woman-8378634_960_720.jpg" alt="Sarees"
              class="w-32 h-32 rounded-full mx-auto mb-6 object-cover">
            <h3 class="text-2xl font-semibold text-gray-800 mb-3">Sarees</h3>
            <p class="text-gray-600 mb-6">Traditional sarees with contemporary designs</p>
            <NuxtLink to="/products?category=sarees"
              class="inline-block bg-purple-400 text-white px-6 py-3 rounded-full hover:bg-purple-500 transition-colors">
              Shop Sarees
            </NuxtLink>
          </div>

          <div class="card-hover bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 text-center">
            <img
              src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=300&fit=crop&auto=format&q=80"
              alt="Dresses" class="w-32 h-32 rounded-full mx-auto mb-6 object-cover">
            <h3 class="text-2xl font-semibold text-gray-800 mb-3">Dresses</h3>
            <p class="text-gray-600 mb-6">Modern dresses for the contemporary woman</p>
            <NuxtLink to="/products?category=dresses"
              class="inline-block bg-teal-400 text-white px-6 py-3 rounded-full hover:bg-teal-500 transition-colors">
              Shop Dresses
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">Featured Products</h2>
          <p class="text-gray-600">Handpicked favorites from our latest collection</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="product in featuredProducts" :key="product.id"
            class="card-hover bg-white rounded-2xl overflow-hidden shadow-sm">
            <div class="relative group">
              <ProductImage :src="product.image" :alt="product.name"
                image-class="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div
                class="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
                <button @click="addToCart(product)"
                  class="bg-white text-gray-800 px-6 py-3 rounded-full font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-pink-400 hover:text-white pointer-events-auto">
                  Add to Cart
                </button>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ product.name }}</h3>
              <p class="text-2xl font-bold text-pink-400">₹{{ product.price }}</p>
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <NuxtLink to="/products"
            class="bg-pink-400 text-white px-8 py-4 rounded-full font-medium hover:bg-pink-500 transition-colors">
            View All Products
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const products = inject('products')
const cart = inject('cart')

const featuredProducts = computed(() => products.slice(0, 6))

const addToCart = (product) => {
  const existingItem = cart.value.find(item => item.id === product.id)
  if (existingItem) {
    existingItem.quantity++
  } else {
    cart.value.push({ ...product, quantity: 1 })
  }
}
</script>