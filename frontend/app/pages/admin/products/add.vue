<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Add Product</h1>
    </div>
    
    <div class="bg-white rounded-lg shadow">
      <div class="p-6">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input v-model="form.name" type="text" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter product name">
          </div>
          
          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input v-model="form.price" type="number" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="0">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select v-model="form.category" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select Category</option>
                <option value="kurtis">Kurtis</option>
                <option value="sarees">Sarees</option>
                <option value="dresses">Dresses</option>
                <option value="lehengas">Lehengas</option>
              </select>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea v-model="form.description" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Product description"></textarea>
          </div>
          
          <div class="flex justify-end space-x-4">
            <NuxtLink to="/admin/products" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Cancel
            </NuxtLink>
            <button type="submit" :disabled="loading" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
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

import { productAPI } from '~/utils/request.js'

const form = ref({
  name: '',
  price: '',
  category: '',
  description: ''
})

const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  
  try {
    const response = await productAPI.create(form.value)
    console.log('Product created:', response)
    
    // Reset form
    form.value = {
      name: '',
      price: '',
      category: '',
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