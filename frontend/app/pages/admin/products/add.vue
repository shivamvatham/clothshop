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
          <!-- Basic Info -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <form-element-input v-model="form.name" label="Product Name" type="text" :rules="[required]"
              placeholder="Enter product name" />
            <form-element-input v-model="form.salePrice" :rules="[required, numeric]" label="Sale Price" type="number"
              placeholder="Enter Sale Price" />
            <form-element-input v-model="form.actualPrice" :rules="[required, numeric]" label="Actual Price" type="number"
              placeholder="Enter Actual Price" />

            <form-element-input v-model="form.higherPrice" label="Higher Price" type="number"
              placeholder="Enter Higher Price" />
            <form-element-select v-model="form.category" label="Category" placeholder="Select Category"
              :options="categoryOptions" />
              <form-element-size-selector v-model="form.sizes" label="Available Sizes" />
          </div>

          <!-- Images & Sizes -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <ImageUploader v-model="form.images" label="Product Images" />
            </div>
            <div>
            </div>
          </div>

          <!-- Description & Stock -->
          <div class="space-y-4">
            <FormInput v-model="form.description" label="Description" type="textarea"
              placeholder="Product description (optional)" :rows="3" />

            <div class="flex items-center space-x-3">
              <input v-model="form.inStock" type="checkbox" id="inStock"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
              <label for="inStock" class="text-sm font-medium text-gray-700">
                Product is in stock
              </label>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end space-x-3 pt-4 border-t">
            <NuxtLink to="/admin/products"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm">
              Cancel
            </NuxtLink>
            <button type="submit" :disabled="loading || !isFormValid"
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

const categoryOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'sale', label: 'Sale' },
  { value: 'collection', label: 'Collection' },
  { value: 'new-arrival', label: 'New Arrival' },
  { value: 'all', label: 'All' }
]

// Form validation
const isFormValid = computed(() => {
  return (
    form.value.name.trim() !== '' &&
    Number(form.value.salePrice) > 0 &&
    Number(form.value.actualPrice) > 0 &&
    form.value.category !== '' &&
    Number(form.value.salePrice) <= Number(form.value.actualPrice) // Sale price should be <= actual price
  )
})

// Validate form before submit
const validateForm = () => {
  const errors = []

  if (!form.value.name.trim()) {
    errors.push('Product name is required')
  }

  if (!form.value.salePrice || Number(form.value.salePrice) <= 0) {
    errors.push('Sale price must be greater than 0')
  }

  if (!form.value.actualPrice || Number(form.value.actualPrice) <= 0) {
    errors.push('Actual price must be greater than 0')
  }

  if (Number(form.value.salePrice) > Number(form.value.actualPrice)) {
    errors.push('Sale price cannot be greater than actual price')
  }

  if (form.value.higherPrice && Number(form.value.higherPrice) <= Number(form.value.actualPrice)) {
    errors.push('Higher price should be greater than actual price')
  }

  if (!form.value.category) {
    errors.push('Category is required')
  }

  return errors
}

const handleSubmit = async () => {
  // Validate form
  const validationErrors = validateForm()
  if (validationErrors.length > 0) {
    error.value = validationErrors[0] // Show first error
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

    // Reset form
    form.value = {
      name: '',
      salePrice: '',
      actualPrice: '',
      higherPrice: '',
      category: '',
      images: [],
      sizes: [],
      description: '',
      inStock: true
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