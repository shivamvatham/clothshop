<template>
  <header class="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Elegance
          </NuxtLink>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex space-x-10">
          <NuxtLink to="/" class="text-gray-700 hover:text-pink-400 px-3 py-2 text-sm font-medium transition-colors">
            Home
          </NuxtLink>
          <NuxtLink to="/products" class="text-gray-700 hover:text-pink-400 px-3 py-2 text-sm font-medium transition-colors">
            Shop
          </NuxtLink>
          <NuxtLink to="/new-arrivals" class="text-gray-700 hover:text-pink-400 px-3 py-2 text-sm font-medium transition-colors">
            New Arrivals
          </NuxtLink>
          <NuxtLink to="/sale" class="text-gray-700 hover:text-pink-400 px-3 py-2 text-sm font-medium transition-colors">
            Sale
          </NuxtLink>
          <NuxtLink to="/contact" class="text-gray-700 hover:text-pink-400 px-3 py-2 text-sm font-medium transition-colors">
            Contact
          </NuxtLink>
        </nav>

        <!-- Cart -->
        <div class="flex items-center space-x-4">
          <button class="text-gray-700 hover:text-pink-400 p-2 relative transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
            <span v-if="cart.length > 0" class="absolute -top-1 -right-1 bg-pink-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{{ cart.length }}</span>
          </button>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-gray-700 hover:text-pink-400 p-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="md:hidden bg-white border-t">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <NuxtLink to="/" class="text-gray-700 hover:text-pink-400 block px-3 py-2 text-base font-medium">
            Home
          </NuxtLink>
          <NuxtLink to="/products" class="text-gray-700 hover:text-pink-400 block px-3 py-2 text-base font-medium">
            Shop
          </NuxtLink>
          <NuxtLink to="/new-arrivals" class="text-gray-700 hover:text-pink-400 block px-3 py-2 text-base font-medium">
            New Arrivals
          </NuxtLink>
          <NuxtLink to="/sale" class="text-gray-700 hover:text-pink-400 block px-3 py-2 text-base font-medium">
            Sale
          </NuxtLink>
          <NuxtLink to="/contact" class="text-gray-700 hover:text-pink-400 block px-3 py-2 text-base font-medium">
            Contact
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const cart = inject('cart')
const mobileMenuOpen = ref(false)
</script>