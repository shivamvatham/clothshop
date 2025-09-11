<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Product List</h1>
      <NuxtLink to="/admin/products/add" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Add Product
      </NuxtLink>
    </div>
    
    <DataTable 
      :columns="productColumns"
      :data="products"
      :actions="productActions"
    />
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})

const productColumns = [
  { key: 'name', label: 'Name' },
  { key: 'price', label: 'Price' },
  { key: 'category', label: 'Category' }
]

const products = [
  { name: 'Sample Product', price: '₹1,299', category: 'Kurtis' }
]

const productActions = [
  { 
    label: 'Edit', 
    handler: (item) => console.log('Edit', item),
    class: 'text-blue-600 hover:text-blue-900 mr-3'
  },
  { 
    label: 'Delete', 
    handler: (item) => console.log('Delete', item),
    class: 'text-red-600 hover:text-red-900'
  }
]
</script>