<template>
  <div class="relative overflow-hidden bg-gray-100">
    <img 
      :src="src" 
      :alt="alt"
      :class="imageClass"
      @error="handleImageError"
      @load="handleImageLoad"
    />
    <div 
      v-if="showError"
      :class="imageClass"
      class="flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50"
    >
      <div class="text-center">
        <svg class="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z"></path>
        </svg>
        <p class="text-xs text-gray-400">{{ alt }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
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

const showError = ref(false)

const handleImageLoad = () => {
  console.log('Image loaded successfully:', props.src)
  showError.value = false
}

const handleImageError = (event) => {
  console.log('Image failed to load:', props.src, event)
  showError.value = true
}
</script>