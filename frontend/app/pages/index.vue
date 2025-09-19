<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-orange-50 via-red-50 to-orange-100">
      <div class="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-400/10"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-10">
          <div class="text-center lg:text-left space-y-8">
            <div class="space-y-3">
              <div class="inline-block px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 border border-white/40 shadow-sm">
                ✨ New Collection {{ new Date().getFullYear() }}
              </div>
              <div class="flex items-center justify-center lg:justify-start space-x-3">
                <img src="/shreeFashion.png" alt="Shree Fashion" class="h-24 w-auto">
                <h1 class="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 bg-clip-text text-transparent">
                  Shree Fashion
                </h1>
              </div>
              <p class="text-md text-gray-600 max-w-xl leading-relaxed">
                Discover premium fashion that blends traditional craftsmanship with contemporary design for the modern woman.
              </p>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <NuxtLink to="/products" class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <span>Explore Collection</span>
                <ArrowRight class="w-5 h-5 ml-2" />
              </NuxtLink>
              <NuxtLink to="/new-arrivals" class="inline-flex items-center px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 border-2 border-gray-200 rounded-xl font-semibold hover:border-orange-500 hover:text-orange-600 hover:-translate-y-1 transition-all duration-300 shadow-sm">
                <span>New Arrivals</span>
              </NuxtLink>
            </div>
            
            <div class="flex items-center justify-center lg:justify-start gap-8 pt-6">
              <div class="text-center">
                <div class="text-2xl font-bold text-gray-900">10K+</div>
                <div class="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-gray-900">500+</div>
                <div class="text-sm text-gray-600">Premium Designs</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-gray-900">4.9★</div>
                <div class="text-sm text-gray-600">Customer Rating</div>
              </div>
            </div>
          </div>
          
          <div class="relative max-w-lg mx-auto">
            <div class="relative">
              <img 
                src="https://cdn.pixabay.com/photo/2024/07/02/07/58/dress-8866994_1280.jpg" 
                alt="Elegant Fashion Collection" 
                class="w-full h-[600px] object-cover rounded-3xl shadow-2xl"
              >
              <!-- <div class="absolute inset-0 bg-gradient-to-t from-orange-500/20 via-transparent to-red-500/20 rounded-3xl"></div> -->
            </div>
            <div class="absolute -bottom-6 -left-6 lg:block hidden bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Check class="w-6 h-6 text-white" />
                </div>
                <div>
                  <div class="font-semibold text-gray-900">Premium Quality</div>
                  <div class="text-sm text-gray-600">Handcrafted Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Category Cards -->
    <section class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-1">
              Shop by <span class="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Category</span>
            </h2>
            <p class="text-gray-600">Discover our premium collections</p>
          </div>
          <NuxtLink to="/products" class="hidden md:inline-flex items-center text-orange-600 hover:text-orange-700 font-medium text-sm">
            View All
            <ArrowRight class="w-4 h-4 ml-1" />
          </NuxtLink>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Kurtis Category -->
          <NuxtLink to="/products?category=kurtis" class="group relative bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 border border-orange-100">
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src="https://cdn.pixabay.com/photo/2024/07/02/07/58/dress-8866994_1280.jpg" 
                  alt="Kurtis" 
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                >
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900 mb-1">Elegant Kurtis</h3>
                <p class="text-sm text-gray-600 mb-2">Timeless designs for every occasion</p>
                <div class="flex items-center justify-between">
                  <span class="text-xs text-orange-600 font-medium">150+ Items</span>
                  <ArrowRight class="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </NuxtLink>
          
          <!-- Sarees Category -->
          <NuxtLink to="/products?category=sarees" class="group relative bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 border border-red-100">
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&h=100&fit=crop&auto=format&q=80" 
                  alt="Sarees" 
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                >
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900 mb-1">Premium Sarees</h3>
                <p class="text-sm text-gray-600 mb-2">Traditional elegance meets modern style</p>
                <div class="flex items-center justify-between">
                  <span class="text-xs text-red-600 font-medium">200+ Items</span>
                  <ArrowRight class="w-4 h-4 text-red-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </NuxtLink>
          
          <!-- Dresses Category -->
          <NuxtLink to="/products?category=dresses" class="group relative bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 border border-orange-100">
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=100&h=100&fit=crop&auto=format&q=80" 
                  alt="Dresses" 
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                >
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900 mb-1">Modern Dresses</h3>
                <p class="text-sm text-gray-600 mb-2">Contemporary designs for confident women</p>
                <div class="flex items-center justify-between">
                  <span class="text-xs text-teal-600 font-medium">120+ Items</span>
                  <ArrowRight class="w-4 h-4 text-teal-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 mb-3">Featured Products</h2>
          <p class="text-gray-600">Handpicked favorites from our latest collection</p>
        </div>
        
        <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <ProductCard 
            v-for="product in featuredProducts" 
            :key="product.id"
            :product="product"
          />
        </div>
        
        <div class="text-center mt-10">
          <NuxtLink to="/products" class="bg-pink-400 text-white px-8 py-4 rounded-full font-medium hover:bg-pink-500 transition-colors">
            View All Products
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ArrowRight, Check } from 'lucide-vue-next'

const { request } = useRequest()

const { data: products, error } = await useAsyncData('products', () => 
  request('/products')
)
console.log(products.value.currency)
if (products.value?.currency && process.client) {
  localStorage.setItem('currency', products.value.currency)
}
if (process.client) {
  console.log('Currency from localStorage:', localStorage.getItem('currency'))
}
const config = useRuntimeConfig()

const featuredProducts = computed(() => {
  if (!products?.value?.data || !Array.isArray(products?.value?.data)) return []
  return products.value.data.map(product => ({
    id: product._id,
    name: product.name,
    price: product.salePrice,
    originalPrice: product.higherPrice,
    salePrice: product.actualPrice,
    image: product.images?.[0] ? `${config.public.apiBaseUrl.replace('/api', '')}${product.images[0]}` : '',
    sizes: product.sizes || [],
    inStock: product.inStock
  }))
})
</script>