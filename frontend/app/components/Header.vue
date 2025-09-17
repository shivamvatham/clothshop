<template>
  <header class="bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="flex items-center">
            <img src="/shreeFashion.png" alt="Shree Fashion" class="h-15 w-auto">
            <span class="p-1 text-2xl font-bold bg-gradient-to-r from-orange-700 to-red-800  bg-clip-text text-transparent">
              श्री Fashion
            </span>
          </NuxtLink>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-1">
          <NuxtLink to="/" class="relative px-4 py-2 text-sm font-medium bg-gradient-to-r from-orange-700 to-red-800 bg-clip-text text-transparent rounded-lg transition-all duration-200 hover:from-orange-800 hover:to-red-900 router-link-active:from-orange-800 router-link-active:to-red-900">
            Home
          </NuxtLink>
          <NuxtLink to="/products" class="relative px-4 py-2 text-sm font-medium bg-gradient-to-r from-orange-700 to-red-800 bg-clip-text text-transparent rounded-lg transition-all duration-200 hover:from-orange-800 hover:to-red-900 router-link-active:from-orange-800 router-link-active:to-red-900">
            Shop
          </NuxtLink>
          <NuxtLink to="/new-arrivals" class="relative px-4 py-2 text-sm font-medium bg-gradient-to-r from-orange-700 to-red-800 bg-clip-text text-transparent rounded-lg transition-all duration-200 hover:from-orange-800 hover:to-red-900 router-link-active:from-orange-800 router-link-active:to-red-900">
            New Arrivals
          </NuxtLink>
          <NuxtLink to="/sale" class="relative px-4 py-2 text-sm font-medium bg-gradient-to-r from-orange-700 to-red-800 bg-clip-text text-transparent rounded-lg transition-all duration-200 hover:from-orange-800 hover:to-red-900 router-link-active:from-orange-800 router-link-active:to-red-900">
            Sale
            <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full text-[10px] font-bold">HOT</span>
          </NuxtLink>
          <NuxtLink to="/contact" class="relative px-4 py-2 text-sm font-medium bg-gradient-to-r from-orange-700 to-red-800 bg-clip-text text-transparent rounded-lg transition-all duration-200 hover:from-orange-800 hover:to-red-900 router-link-active:from-orange-800 router-link-active:to-red-900">
            Contact
          </NuxtLink>
        </nav>

        <!-- Cart & Actions -->
        <div class="flex items-center space-x-3">
          <NuxtLink to="/admin/login" class="hidden md:flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50/80 rounded-xl hover:text-indigo-600 hover:bg-indigo-50/80 hover:scale-105 transition-all duration-200">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            Admin
          </NuxtLink>
          
          <NuxtLink to="/cart" class="relative p-2.5 text-gray-700 bg-gray-50/80 rounded-xl hover:text-indigo-600 hover:bg-indigo-50/80 hover:scale-105 transition-all duration-200 border-none cursor-pointer">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
            <span v-if="cart.length > 0" class="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg">{{ cart.length }}</span>
          </NuxtLink>
          
          <!-- Mobile menu button -->
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden p-2 text-gray-700 bg-gray-50/80 rounded-xl hover:text-indigo-600 hover:bg-indigo-50/80 transition-all duration-200 border-none cursor-pointer">
            <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <Transition 
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-300 ease-in"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="mobileMenuOpen" class="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200/50">
          <div class="px-4 py-3 space-y-2">
            <NuxtLink to="/" class="block px-4 py-3 text-base font-medium text-gray-700 rounded-lg transition-all duration-200 hover:text-indigo-600 hover:bg-indigo-50/80 router-link-active:text-indigo-600 router-link-active:bg-indigo-50/80 no-underline" @click="mobileMenuOpen = false">
              Home
            </NuxtLink>
            <NuxtLink to="/products" class="block px-4 py-3 text-base font-medium text-gray-700 rounded-lg transition-all duration-200 hover:text-indigo-600 hover:bg-indigo-50/80 router-link-active:text-indigo-600 router-link-active:bg-indigo-50/80 no-underline" @click="mobileMenuOpen = false">
              Shop
            </NuxtLink>
            <NuxtLink to="/new-arrivals" class="block px-4 py-3 text-base font-medium text-gray-700 rounded-lg transition-all duration-200 hover:text-indigo-600 hover:bg-indigo-50/80 router-link-active:text-indigo-600 router-link-active:bg-indigo-50/80 no-underline" @click="mobileMenuOpen = false">
              New Arrivals
            </NuxtLink>
            <NuxtLink to="/sale" class="block px-4 py-3 text-base font-medium text-gray-700 rounded-lg transition-all duration-200 hover:text-indigo-600 hover:bg-indigo-50/80 router-link-active:text-indigo-600 router-link-active:bg-indigo-50/80 no-underline relative" @click="mobileMenuOpen = false">
              Sale
              <span class="absolute top-1 right-4 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full text-[10px] font-bold">HOT</span>
            </NuxtLink>
            <NuxtLink to="/contact" class="block px-4 py-3 text-base font-medium text-gray-700 rounded-lg transition-all duration-200 hover:text-indigo-600 hover:bg-indigo-50/80 router-link-active:text-indigo-600 router-link-active:bg-indigo-50/80 no-underline" @click="mobileMenuOpen = false">
              Contact
            </NuxtLink>
            <NuxtLink to="/admin" class="block px-4 py-3 text-base font-medium text-gray-700 rounded-lg transition-all duration-200 hover:text-indigo-600 hover:bg-indigo-50/80 router-link-active:text-indigo-600 router-link-active:bg-indigo-50/80 no-underline" @click="mobileMenuOpen = false">
              Admin Login
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup>
const cart = inject('cart')
const mobileMenuOpen = ref(false)
</script>

