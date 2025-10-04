<template>
  <NuxtLink :to="category.link" class="group relative overflow-hidden shadow-md hover:shadow-lg">
    <div class="relative h-64">
      <img 
        :src="category.image" 
        :alt="category.title" 
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
      <div class="absolute bottom-0 left-0 right-0 p-4 text-center">
        <h3 class="text-lg font-bold text-white mb-1">{{ category.title }}</h3>
        <div class="inline-flex items-center text-white/70 text-xs font-medium">
          <span>Explore</span>
          <ArrowRight class="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
import { ArrowRight } from 'lucide-vue-next'

defineProps({
  category: {
    type: Object,
    required: true
  }
})
</script>