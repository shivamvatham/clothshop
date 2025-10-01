<template>
  <div class="mx-auto px-4">
    <div class="mb-4">
      <h1 class="text-xl font-bold text-gray-900">Edit Product</h1>
    </div>

    <div v-if="pending" class="text-center py-8">
      <p class="text-gray-500">Loading product...</p>
    </div>

    <div v-else-if="fetchError" class="text-center py-8">
      <ErrorAlert message="Failed to load product" />
    </div>

    <div v-else class="bg-white rounded-lg shadow-sm border">
      <div class="p-4">
        <ErrorAlert :message="error" />

        <div v-if="success" class="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <div class="flex items-center">
            <svg class="w-4 h-4 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <p class="text-green-800 text-sm">{{ success }}</p>
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
              <input v-model="form.name" type="text" required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product name" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Sale Price *</label>
              <input v-model="form.salePrice" type="number" required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Sale Price" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Actual Price *</label>
              <input v-model="form.actualPrice" type="number" required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Actual Price" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Higher Price</label>
              <input v-model="form.higherPrice" type="number"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Higher Price" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select v-model="form.category" required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option value="">Select Category</option>
                <option value="featured">Featured</option>
                <option value="sale">Sale</option>
                <option value="collection">Collection</option>
                <option value="new-arrival">New Arrival</option>
                <option value="all">All</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Available Sizes</label>
              <form-element-size-selector v-model="form.sizes" />
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ImageUploader v-model="form.images" :existing-images="existingImages" label="Product Images" />
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea v-model="form.description" rows="6"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Product description (optional)"></textarea>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <input v-model="form.inStock" type="checkbox" id="inStock"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
            <label for="inStock" class="text-sm font-medium text-gray-700">Product is in stock</label>
          </div>

          <!-- Actions -->
          <div class="flex justify-end space-x-3 pt-4 border-t">
            <NuxtLink to="/admin/products"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm">
              Cancel
            </NuxtLink>
            <button type="submit" :disabled="loading"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm">
              {{ loading ? 'Updating...' : 'Update Product' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const route = useRoute()
const { request } = useRequest()

// Fetch product data
const { data: productData, pending, error: fetchError } = await useAsyncData(`product-${route.params.id}`, () =>
  request(`/products/${route.params.id}`)
)

const form = ref({
  name: '',
  salePrice: '',
  actualPrice: '',
  higherPrice: '',
  category: '',
  images: [],
  sizes: [],
  description: '',
  inStock: true
})

const loading = ref(false)
const error = ref('')
const success = ref('')
const existingImages = ref([])



// Initialize form when product data is available
if (productData.value?.success && productData.value?.data) {
  const product = productData.value.data
  form.value = {
    name: product.name || '',
    salePrice: product.salePrice || '',
    actualPrice: product.actualPrice || '',
    higherPrice: product.higherPrice || '',
    category: product.category || '',
    images: [], // Reset for new uploads
    sizes: product.sizes || [],
    description: product.description || '',
    inStock: product.inStock ?? true
  }

  // Store existing images separately
  existingImages.value = product.images || []
}

const handleSubmit = async () => {
  if (Number(form.value.salePrice) > Number(form.value.actualPrice)) {
    error.value = 'Sale price cannot be higher than actual price'
    return
  }

  loading.value = true
  error.value = ''
  success.value = ''

  try {
    // Use FormData for file uploads
    const formData = new FormData()
    formData.append('name', form.value.name)
    formData.append('salePrice', form.value.salePrice)
    formData.append('actualPrice', form.value.actualPrice)
    if (form.value.higherPrice) formData.append('higherPrice', form.value.higherPrice)
    formData.append('category', form.value.category)
    formData.append('inStock', form.value.inStock)
    formData.append('description', form.value.description || '')
    formData.append('sizes', JSON.stringify(form.value.sizes))

    // Handle images from ImageUploader component
    const existingImagePaths = []
    const newImageFiles = []

    if (form.value.images && form.value.images.length > 0) {
      form.value.images.forEach(image => {
        if (image.isExisting && image.originalPath) {
          // Keep existing images
          existingImagePaths.push(image.originalPath)
        } else if (image.file instanceof File) {
          // Add new uploaded files
          newImageFiles.push(image.file)
        }
      })
    }

    // Send existing images that weren't removed
    formData.append('existingImages', JSON.stringify(existingImagePaths))

    // Add new image files
    newImageFiles.forEach(file => {
      formData.append('images', file)
    })

    const response = await request(`/admin/products/${route.params.id}`, 'PUT', formData)

    if (response.success) {
      success.value = 'Product updated successfully!'
        navigateTo('/admin/products')
    } else {
      error.value = response.message || 'Failed to update product'
    }
  } catch (err) {
    error.value = 'Failed to update product. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>