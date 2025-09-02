<template>
  <NuxtLink :to="`/products/${product.id}`" class="block">
    <div class="bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
    <div class="relative">
      <div v-if="salePercentage" class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium z-10">
        {{ salePercentage }}% OFF
      </div>
      <ProductImage 
        :src="product.image" 
        :alt="product.name"
        image-class="w-full h-48 object-cover"
      />
    </div>
    
    <div class="p-3">
      <h3 class="font-medium text-gray-900 text-sm mb-2 line-clamp-2">{{ product.name }}</h3>
      
      <div class="flex flex-wrap gap-1 mb-2">
        <span 
          v-for="size in product.sizes" 
          :key="size"
          class="px-2 py-1 text-[0.5rem] lg:text-xs border border-gray-300 rounded-sm text-gray-600"
        >
          {{ size }}
        </span>
      </div>
      
      <div class="flex items-center gap-2">
        <span class="text-lg font-semibold text-gray-900">${{ product.salePrice }}</span>
        <span v-if="product.originalPrice > product.salePrice" class="text-sm text-gray-500 line-through">
          ${{ product.originalPrice }}
        </span>
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