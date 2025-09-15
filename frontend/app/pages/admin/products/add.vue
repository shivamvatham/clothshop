<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Add Product</h1>
    </div>

    <div class="bg-white rounded-lg shadow">
      <div class="p-6">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <FormInput v-model="form.name" label="Product Name" type="text" required placeholder="Enter product name" />

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormInput v-model="form.salePrice" label="Sale Price" type="number" required placeholder="Sale price" />
            <FormInput v-model="form.actualPrice" label="Actual Price" type="number" required
              placeholder="Actual price" />
            <FormInput v-model="form.higherPrice" label="Higher Price" type="number" placeholder="Higher price" />
          </div>

          <FormSelect v-model="form.collection" label="Collection" required placeholder="Select Collection"
            :options="collectionOptions" />

          <ImageUploader v-model="form.images" label="Product Images" />

          <SizeSelector v-model="form.sizes" label="Available Sizes" />

          <FormInput v-model="form.description" label="Description" type="textarea" placeholder="Product description"
            :rows="4" />

          <div class="flex justify-end space-x-4">
            <NuxtLink to="/admin/products"
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Cancel
            </NuxtLink>
            <button type="submit" :disabled="loading"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
              {{ loading ? 'Adding...' : 'Add Product' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})

const { request } = useRequest()

const form = ref({
  name: null,
  salePrice: null,
  actualPrice: null,
  higherPrice: null,
  collection: null,
  images: [],
  sizes: [],
  description: null,
})

const loading = ref(false)

const collectionOptions = [
  { value: 'featured', label: 'Featured Product' },
  { value: 'sale', label: 'Sale' },
  { value: 'collection', label: 'Our Collection' },
  { value: 'new-arrival', label: 'New Arrival' },
  { value: 'all', label: 'All' }
]

const handleSubmit = async () => {
  loading.value = true

  try {
    // Always use FormData (multipart)
    const formData = new FormData()
    formData.append('name', form.value.name)
    formData.append('salePrice', form.value.salePrice)
    formData.append('actualPrice', form.value.actualPrice)
    if (form.value.higherPrice) formData.append('higherPrice', form.value.higherPrice)
    formData.append('collection', form.value.collection)
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

    const response = await request('/products', 'POST', formData)

    console.log('Product created:', response)

    // Reset form
    form.value = {
      name: '',
      salePrice: '',
      actualPrice: '',
      higherPrice: '',
      collection: '',
      images: [],
      sizes: [],
      description: ''
    }

    // Navigate to products list
    navigateTo('/admin/products')
  } catch (error) {
    console.error('Error creating product:', error)
  } finally {
    loading.value = false
  }
}
</script>