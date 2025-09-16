<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Product List</h1>
      <NuxtLink to="/admin/products/add" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Add Product
      </NuxtLink>
    </div>
    
    <div v-if="loading" class="text-center py-8">
      <p class="text-gray-500">Loading products...</p>
    </div>
    
    <div v-else-if="error" class="text-center py-8">
      <ErrorAlert :message="error" />
    </div>
    
    <div v-else-if="products.length === 0" class="text-center py-8">
      <p class="text-gray-500">No products found. <NuxtLink to="/admin/products/add" class="text-blue-600 hover:text-blue-800">Add your first product</NuxtLink></p>
    </div>
    
    <DataTable 
      v-else
      :columns="productColumns"
      :data="formattedProducts"
      :actions="productActions"
    />
    
    <!-- Delete Confirmation Dialog -->
    <ConfirmDialog
      :show="showDeleteDialog"
      :title="'Delete Product'"
      :message="`Are you sure you want to delete ${productToDelete?.name}? This action cannot be undone.`"
      :loading="deleteLoading"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const { request } = useRequest()

// Use useAsyncData for better performance
const { data: productsData, pending: loading, error: fetchError, refresh } = await useAsyncData('admin-products', () => 
  request('/products')
)

const showDeleteDialog = ref(false)
const productToDelete = ref(null)
const deleteLoading = ref(false)
const error = ref('')

// Extract products from API response
const products = computed(() => {
  if (!productsData.value?.success || !productsData.value?.data) return []
  return productsData.value.data
})

const productColumns = [
  { key: 'name', label: 'Product Name' },
  { key: 'salePrice', label: 'Sale Price' },
  { key: 'actualPrice', label: 'Actual Price' },
  { key: 'category', label: 'Category' },
  { key: 'inStock', label: 'Stock Status' },
  { key: 'createdAt', label: 'Created' }
]

// Format products for display
const formattedProducts = computed(() => {
  return products.value.map(product => ({
    ...product,
    salePrice: `₹${product.salePrice}`,
    actualPrice: `₹${product.actualPrice}`,
    inStock: product.inStock ? 'In Stock' : 'Out of Stock',
    createdAt: new Date(product.createdAt).toLocaleDateString('en-IN')
  }))
})

// Handle fetch errors
watchEffect(() => {
  if (fetchError.value) {
    error.value = 'Failed to load products'
  }
})

// Show delete confirmation dialog
const showDeleteConfirmation = (product) => {
  productToDelete.value = product
  showDeleteDialog.value = true
}

// Confirm delete
const confirmDelete = async () => {
  if (!productToDelete.value) return
  
  try {
    deleteLoading.value = true
    const response = await request(`/admin/products/${productToDelete.value._id}`, 'DELETE')
    
    if (response.success) {
      // Refresh the products list after successful deletion
      await refresh()
      showDeleteDialog.value = false
      productToDelete.value = null
    } else {
      error.value = 'Failed to delete product'
    }
  } catch (err) {
    error.value = 'Failed to delete product'
  } finally {
    deleteLoading.value = false
  }
}

// Cancel delete
const cancelDelete = () => {
  showDeleteDialog.value = false
  productToDelete.value = null
  deleteLoading.value = false
}

const productActions = [
  { 
    label: 'Edit', 
    handler: (item) => navigateTo(`/admin/products/edit/${item._id}`),
    class: 'text-blue-600 hover:text-blue-900 mr-3'
  },
  { 
    label: 'Delete', 
    handler: showDeleteConfirmation,
    class: 'text-red-600 hover:text-red-900'
  }
]

// Products are automatically loaded via useAsyncData
</script>