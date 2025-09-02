<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-gradient min-h-[80vh] flex items-center">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="text-center lg:text-left">
          <h1 class="text-3xl lg:text-4xl font-bold text-gray-800 mb-6 mt-4 leading-tight">
            Elegant
            <span class="text-pink-400">Fashion</span>
            <span class="block">for Every Woman</span>
          </h1>
          <p class="text-xl text-gray-600 mb-8 max-w-lg">
            Discover our exquisite collection of kurtis, sarees, and contemporary wear designed for the modern Indian woman.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <NuxtLink to="/products" class="bg-pink-400 text-white px-8 py-4 rounded-full font-medium hover:bg-pink-500 transition-colors">
              Shop Collection
            </NuxtLink>
            <NuxtLink to="/new-arrivals" class="border-2 border-pink-400 text-pink-400 px-8 py-4 rounded-full font-medium hover:bg-pink-400 hover:text-white transition-colors">
              New Arrivals
            </NuxtLink>
          </div>
        </div>
        <div class="relative">
          <img 
            src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop&auto=format&q=80" 
            alt="Elegant Kurti Collection" 
            class="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
          >
        </div>
      </div>
    </section>

    <!-- Category Cards -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">Shop by Category</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Explore our carefully curated collections designed to celebrate your unique style</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="card-hover bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-8 text-center">
            <img 
              src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300&h=300&fit=crop&auto=format&q=80" 
              alt="Kurtis" 
              class="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
            >
            <h3 class="text-2xl font-semibold text-gray-800 mb-3">Kurtis</h3>
            <p class="text-gray-600 mb-6">Elegant and comfortable kurtis for every occasion</p>
            <NuxtLink to="/products?category=kurtis" class="inline-block bg-pink-400 text-white px-6 py-3 rounded-full hover:bg-pink-500 transition-colors">
              Shop Kurtis
            </NuxtLink>
          </div>
          
          <div class="card-hover bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 text-center">
            <img 
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=300&fit=crop&auto=format&q=80" 
              alt="Sarees" 
              class="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
            >
            <h3 class="text-2xl font-semibold text-gray-800 mb-3">Sarees</h3>
            <p class="text-gray-600 mb-6">Traditional sarees with contemporary designs</p>
            <NuxtLink to="/products?category=sarees" class="inline-block bg-purple-400 text-white px-6 py-3 rounded-full hover:bg-purple-500 transition-colors">
              Shop Sarees
            </NuxtLink>
          </div>
          
          <div class="card-hover bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 text-center">
            <img 
              src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=300&fit=crop&auto=format&q=80" 
              alt="Dresses" 
              class="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
            >
            <h3 class="text-2xl font-semibold text-gray-800 mb-3">Dresses</h3>
            <p class="text-gray-600 mb-6">Modern dresses for the contemporary woman</p>
            <NuxtLink to="/products?category=dresses" class="inline-block bg-teal-400 text-white px-6 py-3 rounded-full hover:bg-teal-500 transition-colors">
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
        
        <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <ProductCard 
            v-for="product in featuredProducts" 
            :key="product.id"
            :product="product"
          />
        </div>
        
        <div class="text-center mt-12">
          <NuxtLink to="/products" class="bg-pink-400 text-white px-8 py-4 rounded-full font-medium hover:bg-pink-500 transition-colors">
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

const featuredProducts = computed(() => {
  return products.slice(0, 10).map(product => ({
    ...product,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    originalPrice: (product.price * 1.3).toFixed(2),
    salePrice: product.price
  }))
})
</script>