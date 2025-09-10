<template>
  <div class="relative overflow-hidden bg-gray-100">
    <img 
      v-if="!imageError"
      ref="imgRef"
      :src="src" 
      :alt="alt"
      :class="imageClass"
      @error="handleImageError"
      @load="imageLoaded = true"
    />
    <div 
      v-if="imageError"
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
    <div 
      v-if="!imageLoaded && !imageError" 
      class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50"
    >
      <div class="text-center">
        <svg class="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <p class="text-xs text-gray-400">Loading...</p>
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

const imageLoaded = ref(false)
const imageError = ref(false)

const imgRef = ref(null)

watch(() => props.src, async () => {
  imageLoaded.value = false
  imageError.value = false
  
  await nextTick()
  
  // Check if image is already loaded (cached)
  if (imgRef.value && imgRef.value.complete && imgRef.value.naturalHeight !== 0) {
    imageLoaded.value = true
  }
}, { immediate: true })

const handleImageError = () => {
  if (!imageError.value) {
    imageError.value = true
    imageLoaded.value = true
  }
}
</script>