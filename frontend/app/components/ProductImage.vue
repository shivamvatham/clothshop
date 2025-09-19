<template>
  <div class="relative overflow-hidden bg-gray-100">
    <img 
      v-show="!showError && imageLoaded"
      :src="src" 
      :alt="alt"
      :class="imageClass"
      @error="handleImageError"
      @load="handleImageLoad"
    />
    <div 
      v-show="showError"
      :class="imageClass"
      class="flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50"
    >
      <div class="text-center">
        <ImageOff class="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p class="text-xs text-gray-400">{{ alt }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ImageOff } from 'lucide-vue-next'
const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'Product Image'
  },
  imageClass: {
    type: String,
    default: 'w-full h-full object-cover'
  }
})

const showError = ref(true)
const imageLoaded = ref(false)

const handleImageLoad = () => {
  showError.value = false
  imageLoaded.value = true
}

const handleImageError = () => {
  showError.value = true
  imageLoaded.value = false
}
</script>