<template>
  <div>
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-2">{{ label }}</label>
    <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        @change="handleFileSelect"
        class="hidden"
        multiple
      />
      <div v-if="!selectedImages.length" @click="$refs.fileInput.click()" class="cursor-pointer">
        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <p class="mt-2 text-sm text-gray-600">Click to upload images</p>
        <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
      </div>
      <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div v-for="(image, index) in selectedImages" :key="index" class="relative">
          <img :src="image.url" :alt="image.name" class="w-full h-24 object-cover rounded-lg">
          <button @click="removeImage(index)" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600">
            ×
          </button>
        </div>
        <div @click="$refs.fileInput.click()" class="border-2 border-dashed border-gray-300 rounded-lg h-24 flex items-center justify-center cursor-pointer hover:border-gray-400">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: Array,
  label: String,
  existingImages: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const selectedImages = ref([])
const config = useRuntimeConfig()

// Helper function to get full image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return ''
  if (imagePath.startsWith('http')) return imagePath
  return `${config.public.apiBaseUrl.replace('/api', '')}${imagePath}`
}

// Initialize with existing images
if (props.existingImages && props.existingImages.length > 0) {
  selectedImages.value = props.existingImages.map((imagePath, index) => ({
    url: getImageUrl(imagePath),
    name: `Existing image ${index + 1}`,
    isExisting: true,
    originalPath: imagePath
  }))
  emit('update:modelValue', selectedImages.value)
}

const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  files.forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      selectedImages.value.push({
        file,
        url: e.target.result,
        name: file.name,
        isExisting: false
      })
      emit('update:modelValue', selectedImages.value)
    }
    reader.readAsDataURL(file)
  })
}

const removeImage = (index) => {
  selectedImages.value.splice(index, 1)
  emit('update:modelValue', selectedImages.value)
}
</script>