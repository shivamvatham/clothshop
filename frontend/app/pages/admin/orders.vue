<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Orders</h1>
    </div>
    
    <DataTable 
      :columns="orderColumns"
      :data="orders"
      :actions="orderActions"
    >
      <template #status="{ value }">
        <span :class="getStatusClass(value)">{{ value }}</span>
      </template>
    </DataTable>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})

const orderColumns = [
  { key: 'id', label: 'Order ID' },
  { key: 'customer', label: 'Customer' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
  { key: 'date', label: 'Date' }
]

const orders = [
  { id: '#1001', customer: 'John Doe', amount: '₹1,299', status: 'Completed', date: '2024-01-15' },
  { id: '#1002', customer: 'Jane Smith', amount: '₹2,499', status: 'Pending', date: '2024-01-14' }
]

const orderActions = [
  { 
    label: 'View', 
    handler: (item) => console.log('View order', item),
    class: 'text-blue-600 hover:text-blue-900'
  }
]

const getStatusClass = (status) => {
  const classes = {
    'Completed': 'px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800',
    'Pending': 'px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800'
  }
  return classes[status] || 'px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800'
}
</script>