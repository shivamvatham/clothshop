<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 class="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
      
      <div v-if="cart.length === 0" class="text-center py-16">
        <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z"></path>
        </svg>
        <h2 class="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h2>
        <p class="text-gray-500 mb-6">Add some products to get started</p>
        <NuxtLink to="/products" class="bg-pink-400 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-500 transition-colors">
          Continue Shopping
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          <div v-for="item in cart" :key="`${item.id}-${item.selectedSize || 'default'}`" class="bg-white rounded-lg p-6 shadow-sm">
            <div class="flex items-center space-x-4">
              <ProductImage 
                :src="item.image" 
                :alt="item.name" 
                image-class="w-20 h-20 object-cover rounded-lg"
              />
              <div class="flex-1">
                <h3 class="font-semibold text-gray-800">{{ item.name }}</h3>
                <p class="text-sm text-gray-500 capitalize">{{ item.category }}</p>
                <p v-if="item.selectedSize" class="text-sm text-gray-500">Size: {{ item.selectedSize }}</p>
                <p class="text-lg font-bold text-pink-400">₹{{ item.price }}</p>
              </div>
              <div class="flex items-center space-x-3">
                <button 
                  @click="updateQuantity(item, item.quantity - 1)"
                  class="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center hover:border-pink-400 transition-colors"
                >
                  -
                </button>
                <span class="w-8 text-center font-medium">{{ item.quantity }}</span>
                <button 
                  @click="updateQuantity(item, item.quantity + 1)"
                  class="w-8 h-8 border border-gray-200 rounded-lg flex items-center justify-center hover:border-pink-400 transition-colors"
                >
                  +
                </button>
              </div>
              <button 
                @click="removeItem(item)"
                class="text-red-500 hover:text-red-700 p-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="bg-white rounded-lg p-6 shadow-sm h-fit">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600">Subtotal ({{ totalItems }} items)</span>
              <span class="font-medium">₹{{ subtotal }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Shipping</span>
              <span class="font-medium">₹{{ shipping }}</span>
            </div>
            <div class="border-t pt-3">
              <div class="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span class="text-pink-400">₹{{ total }}</span>
              </div>
            </div>
          </div>
          <button class="w-full bg-pink-400 text-white py-3 rounded-lg font-medium mt-6 hover:bg-pink-500 transition-colors">
            Proceed to Checkout
          </button>
          <NuxtLink to="/products" class="block text-center text-pink-400 hover:text-pink-500 mt-4 text-sm">
            Continue Shopping
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const cart = inject('cart')

const updateQuantity = (item, newQuantity) => {
  if (newQuantity <= 0) {
    removeItem(item)
  } else {
    item.quantity = newQuantity
  }
}

const removeItem = (itemToRemove) => {
  const index = cart.value.findIndex(item => 
    item.id === itemToRemove.id && 
    (item.selectedSize || 'default') === (itemToRemove.selectedSize || 'default')
  )
  if (index > -1) {
    cart.value.splice(index, 1)
  }
}

const totalItems = computed(() => {
  return cart.value.reduce((total, item) => total + item.quantity, 0)
})

const subtotal = computed(() => {
  return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

const shipping = computed(() => {
  return subtotal.value > 1000 ? 0 : 100
})

const total = computed(() => {
  return subtotal.value + shipping.value
})
</script>