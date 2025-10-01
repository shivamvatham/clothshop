<template>
  <div class="mx-auto">
    <div class="mb-4">
      <h1 class="text-xl font-bold text-gray-900">Add New Product</h1>
    </div>

    <div class="bg-white rounded-lg shadow-sm border">
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
              <input v-model="form.name" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Enter product name" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Sale Price *</label>
              <input v-model="form.salePrice" type="number" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Enter Sale Price" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Actual Price *</label>
              <input v-model="form.actualPrice" type="number" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Enter Actual Price" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Higher Price</label>
              <input v-model="form.higherPrice" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Enter Higher Price" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select v-model="form.category" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
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
            <ImageUploader v-model="form.images" label="Product Images" />
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea v-model="form.description" rows="6" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Product description (optional)"></textarea>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <input v-model="form.inStock" type="checkbox" id="inStock" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
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
              {{ loading ? 'Creating...' : 'Create Product' }}
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

const { request } = useRequest()

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



const handleSubmit = async () => {
  if (Number(form.value.salePrice) > Number(form.value.actualPrice)) {
    error.value = 'Sale price cannot be higher than actual price'
    return
  }

  loading.value = true
  error.value = ''
  success.value = ''

  try {
    // Always use FormData (multipart)
    const formData = new FormData()
    formData.append('name', form.value.name)
    formData.append('salePrice', form.value.salePrice)
    formData.append('actualPrice', form.value.actualPrice)
    if (form.value.higherPrice) formData.append('higherPrice', form.value.higherPrice)
    formData.append('category', form.value.category)
    formData.append('inStock', form.value.inStock)
    formData.append('description', form.value.description || '')
    formData.append('sizes', JSON.stringify(form.value.sizes))

    // Add images if they exist
    if (form.value.images && form.value.images.length > 0) {
      form.value.images.forEach(image => {
        const file = image.file || image
        if (file instanceof File) {
          formData.append('images', file)
        }
      })
    }

    const response = await request('/admin/products', 'POST', formData)

    if (response.success) {
      success.value = 'Product created successfully!'
    } else {
      error.value = response.message || 'Failed to create product'
      return
    }

    // Navigate to products list
    navigateTo('/admin/products')
  } catch (err) {
    error.value = 'Failed to create product. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>