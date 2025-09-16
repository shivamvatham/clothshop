<template>
  <div>
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <ShoppingBag class="w-6 h-6 text-blue-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Orders</p>
            <p class="text-2xl font-semibold text-gray-900">1,234</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <DollarSign class="w-6 h-6 text-green-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Revenue</p>
            <p class="text-2xl font-semibold text-gray-900">₹2,45,678</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-lg">
            <Package class="w-6 h-6 text-purple-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Products</p>
            <p class="text-2xl font-semibold text-gray-900">156</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <Users class="w-6 h-6 text-yellow-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Customers</p>
            <p class="text-2xl font-semibold text-gray-900">892</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Orders -->
    <DataTable 
      title="Recent Orders"
      :columns="orderColumns"
      :data="recentOrders"
    >
      <template #status="{ value }">
        <span :class="getStatusClass(value)">{{ value }}</span>
      </template>
    </DataTable>
  </div>
</template>

<script setup>
import { ShoppingBag, DollarSign, Package, Users } from 'lucide-vue-next'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const orderColumns = [
  { key: 'id', label: 'Order ID' },
  { key: 'customer', label: 'Customer' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' }
]

const recentOrders = [
  { id: '#1001', customer: 'John Doe', amount: '₹1,299', status: 'Completed' },
  { id: '#1002', customer: 'Jane Smith', amount: '₹2,499', status: 'Pending' }
]

const getStatusClass = (status) => {
  const classes = {
    'Completed': 'px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800',
    'Pending': 'px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800'
  }
  return classes[status] || 'px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800'
}
</script>