<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Mobile Overlay -->
    <div v-if="sidebarOpen" @click="sidebarOpen = false" class="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"></div>
    
    <!-- Sidebar -->
    <div :class="['fixed lg:static inset-y-0 left-0 z-30 w-64 bg-slate-800 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0', sidebarOpen ? 'translate-x-0' : '-translate-x-full']">
      <div class="p-6 border-b border-slate-700">
        <h2 class="text-xl font-bold text-white">Admin Portal</h2>
      </div>
      <nav class="mt-4">
        <NuxtLink to="/admin/dashboard" @click="sidebarOpen = false" class="flex items-center px-6 py-3 mx-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200" active-class="bg-blue-600 text-white">
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
          </svg>
          Dashboard
        </NuxtLink>
        
        <div class="mx-2 mt-2">
          <button @click="toggleProducts" class="flex items-center justify-between w-full px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"></path>
              </svg>
              Products
            </div>
            <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': showProducts }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div v-show="showProducts" class="mt-1 ml-4 space-y-1">
            <NuxtLink to="/admin/products/add" @click="sidebarOpen = false" class="flex items-center px-4 py-2 rounded-md text-sm text-slate-400 hover:bg-slate-700 hover:text-white transition-all duration-200" active-class="bg-blue-600 text-white">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add Product
            </NuxtLink>
            <NuxtLink to="/admin/products" @click="sidebarOpen = false" class="flex items-center px-4 py-2 rounded-md text-sm text-slate-400 hover:bg-slate-700 hover:text-white transition-all duration-200" active-class="bg-blue-600 text-white">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
              </svg>
              Product List
            </NuxtLink>
          </div>
        </div>
        
        <NuxtLink to="/admin/orders" @click="sidebarOpen = false" class="flex items-center px-6 py-3 mx-2 mt-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200" active-class="bg-blue-600 text-white">
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          Orders
        </NuxtLink>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col lg:ml-0">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b px-4 lg:px-6 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <button @click="sidebarOpen = !sidebarOpen" class="lg:hidden mr-4 text-gray-600 hover:text-gray-800">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            <h1 class="text-xl lg:text-2xl font-semibold text-gray-800">Dashboard</h1>
          </div>
          <button @click="logout" class="text-gray-600 hover:text-gray-800">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
          </button>
        </div>
      </header>

      <!-- Content -->
      <main class="flex-1 p-4 lg:p-6 overflow-x-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
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