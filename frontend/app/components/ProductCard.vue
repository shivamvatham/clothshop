<template>
  <NuxtLink :to="`/products/${product.id}`" class="group block">
    <div class="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1">
      <div class="relative overflow-hidden">
        <div v-if="salePercentage" class="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
          {{ salePercentage }}% OFF
        </div>
        <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button class="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
            <svg class="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </button>
        </div>
        <ProductImage 
          :src="product.image" 
          :alt="product.name"
          image-class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div class="p-4">
        <h3 class="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">{{ product.name }}</h3>
        
        <div class="flex flex-wrap gap-1 mb-3">
          <span 
            v-for="size in product.sizes?.slice(0, 4)" 
            :key="size"
            class="px-2 py-1 text-xs bg-gray-50 border border-gray-200 rounded-md text-gray-600 font-medium"
          >
            {{ size }}
          </span>
          <span v-if="product.sizes?.length > 4" class="px-2 py-1 text-xs text-gray-500">
            +{{ product.sizes.length - 4 }}
          </span>
        </div>
        
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-lg font-bold text-gray-900">${{ product.salePrice }}</span>
            <span v-if="product.originalPrice > product.salePrice" class="text-sm text-gray-400 line-through">
              ${{ product.originalPrice }}
            </span>
          </div>
          <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button class="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors shadow-lg">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  salePercentage: {
    type: Number,
    default: null
  }
})
</script>