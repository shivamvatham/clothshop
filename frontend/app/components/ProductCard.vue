<template>
  <NuxtLink :to="`/products/${product.id}`" class="group block">
    <div class="bg-white shadow-sm hover:shadow-lg overflow-hidden border border-gray-100">
      <div class="relative overflow-hidden">
        <div v-if="salePercentage" class="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
          {{ salePercentage }}% OFF
        </div>
        <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button class="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
            <Heart class="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
          </button>
        </div>
        <ProductImage 
          :src="product.image" 
          :alt="product.name"
          image-class="w-full h-48 object-cover group-hover:scale-103 transition-transform duration-500"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
            <span class="text-lg font-bold text-gray-900"> <span class="font-bold mr-[-2px]" v-html="product.currency"></span> {{ product.salePrice }}</span>
            <span v-if="product.originalPrice > product.salePrice" class="text-sm text-red-400 line-through">
              <span class="font-bold mr-[-2px]" v-html="product.currency"></span> {{ product.originalPrice }}
            </span>
          </div>
          <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button class="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors shadow-lg">
              <Plus class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
import { Heart, Plus } from 'lucide-vue-next'

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  salePercentage: {
    type: Number,
    default: null
  },
})
</script>