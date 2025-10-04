<template>
  <div>
    <!-- Hero Section -->
    <section class="relative h-screen overflow-hidden pt-20">
      <!-- Image Slider -->
      <div class="absolute inset-0">
        <div 
          v-for="(image, index) in heroImages" 
          :key="index"
          :class="['absolute inset-0 transition-opacity duration-1000', currentSlide === index ? 'opacity-100' : 'opacity-0']"
        >
          <img 
            :src="image.url" 
            :alt="image.alt" 
            class="w-full h-full object-cover"
          >
          <div class="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/40"></div>
        </div>
      </div>
      
      <!-- Content Overlay -->
      <div class="relative z-10 h-full flex items-center">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div class="text-center lg:text-left space-y-8">
              <div class="space-y-3">
                <div
                  class="inline-block px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/40 shadow-sm">
                  ✨ New Collection {{ new Date().getFullYear() }}
                </div>
                <div class="flex items-center justify-center lg:justify-start space-x-3">
                  <img src="/shreeFashion.png" alt="Shree Fashion" class="h-28 w-auto">
                  <h1
                    class="text-4xl lg:text-6xl font-bold text-white drop-shadow-lg">
                    Shree Fashion
                  </h1>
                </div>
                <p class="text-md text-white/90 max-w-xl leading-relaxed drop-shadow">
                  Discover premium fashion that blends traditional craftsmanship with contemporary design for the modern
                  woman.
                </p>
              </div>

              <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <NuxtLink to="/products"
                  class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <span>Explore Collection</span>
                  <ArrowRight class="w-5 h-5 ml-2" />
                </NuxtLink>
                <NuxtLink to="/new-arrivals"
                  class="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-semibold hover:bg-white/30 hover:-translate-y-1 transition-all duration-300 shadow-sm">
                  <span>New Arrivals</span>
                </NuxtLink>
              </div>

              <!-- <div class="flex items-center justify-center lg:justify-start gap-8 pt-6">
                <div class="text-center">
                  <div class="text-2xl font-bold text-white">10K+</div>
                  <div class="text-sm text-white/80">Happy Customers</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-white">500+</div>
                  <div class="text-sm text-white/80">Premium Designs</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-white">4.9★</div>
                  <div class="text-sm text-white/80">Customer Rating</div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      
      <!-- Slide Indicators -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        <button 
          v-for="(image, index) in heroImages" 
          :key="index"
          @click="currentSlide = index"
          :class="['w-3 h-3 rounded-full transition-all duration-300', currentSlide === index ? 'bg-white' : 'bg-white/50']"
        ></button>
      </div>
    </section>

    <!-- Category Cards -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">Discover our curated collections of premium ethnic wear, crafted with love and attention to detail</p>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-3 gap-6">
          <CategoryCard 
            v-for="category in categories" 
            :key="category.id" 
            :category="category" 
          />
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
          <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
        </div>

        <div class="text-center mt-10">
          <NuxtLink to="/products"
            class="inline-block bg-orange-600 hover:bg-orange-500 transform hover:scale-105 text-white px-8 py-3 rounded-full font-medium transition-all duration-300">
            <span class="flex items-center gap-2">
              View All Products
              <ArrowRight />
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowRight, Check } from 'lucide-vue-next'

const { request } = useRequest()

const { data: products, error } = await useAsyncData('products', () =>
  request('/products')
)

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
    inStock: product.inStock,
    currency: products.value.currency
  }))
})

// Categories data
const categories = [
  {
    id: 1,
    title: 'Stitched Suits',
    description: 'Elegant ready-to-wear suits',
    image: 'https://cdn.pixabay.com/photo/2017/08/01/11/48/woman-2564660_1280.jpg',
    link: '/products?category=suits'
  },
  {
    id: 2,
    title: 'Kurtis & Kurta Sets',
    description: 'Traditional comfort meets modern style',
    image: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.jpg',
    link: '/products?category=kurtis'
  },
  {
    id: 3,
    title: 'Kaftans & Dresses',
    description: 'Flowing silhouettes for effortless elegance',
    image: 'https://cdn.pixabay.com/photo/2016/03/27/22/16/fashion-1284496_1280.jpg',
    link: '/products?category=dresses'
  },
  {
    id: 4,
    title: 'Sarees & Lehengas',
    description: 'Timeless traditional elegance',
    image: 'https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383_1280.jpg',
    link: '/products?category=sarees'
  },
  {
    id: 5,
    title: 'Palazzo & Co-ords',
    description: 'Contemporary comfort wear',
    image: 'https://cdn.pixabay.com/photo/2017/08/06/12/06/people-2592247_1280.jpg',
    link: '/products?category=palazzo'
  },
  {
    id: 6,
    title: 'Accessories',
    description: 'Complete your ethnic look',
    image: 'https://cdn.pixabay.com/photo/2017/08/01/11/48/woman-2564660_1280.jpg',
    link: '/products?category=accessories'
  }
]

// Hero slider functionality
const currentSlide = ref(0)
let slideInterval = null

const heroImages = [
  {
    url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop&auto=format&q=80',
    alt: 'Fashion Store Interior'
  },
  {
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1920&h=1080&fit=crop&auto=format&q=80',
    alt: 'Fashion Collection Display'
  },
  {
    url: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&h=1080&fit=crop&auto=format&q=80',
    alt: 'Elegant Fashion Boutique'
  },
  {
    url: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1920&h=1080&fit=crop&auto=format&q=80',
    alt: 'Premium Fashion Store'
  },
  {
    url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop&auto=format&q=80',
    alt: 'Designer Fashion Showcase'
  }
]

const startSlideShow = () => {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % heroImages.length
  }, 4000)
}

const stopSlideShow = () => {
  if (slideInterval) {
    clearInterval(slideInterval)
    slideInterval = null
  }
}

onMounted(() => {
  startSlideShow()
})

onUnmounted(() => {
  stopSlideShow()
})
</script>