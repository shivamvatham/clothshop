<template>
  <div class="h-screen bg-gray-100 flex overflow-hidden">
    <!-- Mobile Overlay -->
    <div v-if="sidebarOpen" @click="sidebarOpen = false" class="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"></div>
    
    <!-- Sidebar -->
    <div :class="['fixed lg:static inset-y-0 left-0 z-30 w-64 bg-slate-800 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col', sidebarOpen ? 'translate-x-0' : '-translate-x-full']">
      <div class="p-6 border-b border-slate-700 flex-shrink-0">
        <h2 class="text-xl font-bold text-white">Admin Portal</h2>
      </div>
      <nav class="mt-4 flex-1 overflow-y-auto">
        <NuxtLink to="/admin/dashboard" @click="sidebarOpen = false" class="flex items-center px-6 py-3 mx-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200" active-class="bg-blue-600 text-white">
          <LayoutDashboard class="w-5 h-5 mr-3" />
          Dashboard
        </NuxtLink>
        
        <div class="mx-2 mt-2">
          <button @click="toggleProducts" class="flex items-center justify-between w-full px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200">
            <div class="flex items-center">
              <Package class="w-5 h-5 mr-3" />
              Products
            </div>
            <ChevronDown class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': showProducts }" />
          </button>
          <div v-show="showProducts" class="mt-1 ml-4 space-y-1">
            <NuxtLink to="/admin/products/add" @click="sidebarOpen = false" class="flex items-center px-4 py-2 rounded-md text-sm text-slate-400 hover:bg-slate-700 hover:text-white transition-all duration-200" active-class="bg-blue-600 text-white">
              <Plus class="w-4 h-4 mr-2" />
              Add Product
            </NuxtLink>
            <NuxtLink to="/admin/products" @click="sidebarOpen = false" class="flex items-center px-4 py-2 rounded-md text-sm text-slate-400 hover:bg-slate-700 hover:text-white transition-all duration-200" active-class="bg-blue-600 text-white">
              <List class="w-4 h-4 mr-2" />
              Product List
            </NuxtLink>
          </div>
        </div>
        
        <NuxtLink to="/admin/orders" @click="sidebarOpen = false" class="flex items-center px-6 py-3 mx-2 mt-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200" active-class="bg-blue-600 text-white">
          <ShoppingBag class="w-5 h-5 mr-3" />
          Orders
        </NuxtLink>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col lg:ml-0 min-w-0">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b px-4 lg:px-6 py-4 flex-shrink-0">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <button @click="sidebarOpen = !sidebarOpen" class="lg:hidden mr-4 text-gray-600 hover:text-gray-800">
              <Menu class="w-6 h-6" />
            </button>
            <h1 class="text-xl lg:text-2xl font-semibold text-gray-800">Dashboard</h1>
          </div>
          <button @click="logout" class="text-gray-600 hover:text-gray-800">
            <LogOut class="w-6 h-6" />
          </button>
        </div>
      </header>

      <!-- Content -->
      <main class="flex-1 p-4 lg:p-6 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { LayoutDashboard, Package, ChevronDown, Plus, List, ShoppingBag, Menu, LogOut } from 'lucide-vue-next'

const showProducts = ref(false)
const sidebarOpen = ref(false)

const toggleProducts = () => {
  showProducts.value = !showProducts.value
}

const logout = () => {
  navigateTo('/admin/login')
}

// Ensure client-side hydration
if (process.client) {
  sidebarOpen.value = false
}
</script>