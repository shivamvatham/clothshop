<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Our Collection</h1>
        <p class="text-gray-600">Discover our complete range of elegant fashion wear</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters Sidebar -->
        <div class="lg:w-64 flex-shrink-0">
          <div class="bg-white rounded-2xl p-6 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Filters</h3>
            
            <!-- Category Filter -->
            <div class="mb-6">
              <h4 class="font-medium text-gray-700 mb-3">Category</h4>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="radio" v-model="selectedCategory" value="" class="text-pink-400 focus:ring-pink-400">
                  <span class="ml-2 text-sm text-gray-600">All</span>
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="selectedCategory" value="kurtis" class="text-pink-400 focus:ring-pink-400">
                  <span class="ml-2 text-sm text-gray-600">Kurtis</span>
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="selectedCategory" value="sarees" class="text-pink-400 focus:ring-pink-400">
                  <span class="ml-2 text-sm text-gray-600">Sarees</span>
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="selectedCategory" value="dresses" class="text-pink-400 focus:ring-pink-400">
                  <span class="ml-2 text-sm text-gray-600">Dresses</span>
                </label>
              </div>
            </div>

            <!-- Price Filter -->
            <div class="mb-6">
              <h4 class="font-medium text-gray-700 mb-3">Price Range</h4>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="radio" v-model="priceRange" value="" class="text-pink-400 focus:ring-pink-400">
                  <span class="ml-2 text-sm text-gray-600">All</span>
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="priceRange" value="0-1000" class="text-pink-400 focus:ring-pink-400">
                  <span class="ml-2 text-sm text-gray-600">Under ₹1,000</span>
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="priceRange" value="1000-2000" class="text-pink-400 focus:ring-pink-400">
                  <span class="ml-2 text-sm text-gray-600">₹1,000 - ₹2,000</span>
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="priceRange" value="2000-5000" class="text-pink-400 focus:ring-pink-400">
                  <span class="ml-2 text-sm text-gray-600">₹2,000 - ₹5,000</span>
                </label>
                <label class="flex items-center">
                  <input type="radio" v-model="priceRange" value="5000+" class="text-pink-400 focus:ring-pink-400">
                  <span class="ml-2 text-sm text-gray-600">Above ₹5,000</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="flex-1">
          <div class="flex justify-between items-center mb-6">
            <p class="text-gray-600">{{ filteredProducts.length }} products found</p>
            <select v-model="sortBy" class="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-pink-400">
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="product in sortedProducts" :key="product.id" class="card-hover bg-white rounded-2xl overflow-hidden shadow-sm">
              <div class="relative group">
                <ProductImage 
                  :src="product.image" 
                  :alt="product.name" 
                  image-class="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <button 
                    @click="addToCart(product)"
                    class="bg-white text-gray-800 px-6 py-3 rounded-full font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-pink-400 hover:text-white"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ product.name }}</h3>
                <p class="text-sm text-gray-500 mb-3 capitalize">{{ product.category }}</p>
                <div class="flex justify-between items-center">
                  <p class="text-2xl font-bold text-pink-400">₹{{ product.price }}</p>
                  <NuxtLink :to="`/products/${product.id}`" class="text-pink-400 hover:text-pink-500 text-sm font-medium">
                    View Details
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const products = inject('products')
const cart = inject('cart')

const selectedCategory = ref('')
const priceRange = ref('')
const sortBy = ref('name')

const filteredProducts = computed(() => {
  let filtered = products

  if (selectedCategory.value) {
    filtered = filtered.filter(product => product.category === selectedCategory.value)
  }

  if (priceRange.value) {
    const [min, max] = priceRange.value.split('-').map(Number)
    if (max) {
      filtered = filtered.filter(product => product.price >= min && product.price <= max)
    } else {
      filtered = filtered.filter(product => product.price >= min)
    }
  }

  return filtered
})

const sortedProducts = computed(() => {
  const sorted = [...filteredProducts.value]
  
  switch (sortBy.value) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price)
    default:
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
  }
})

const addToCart = (product) => {
  const existingItem = cart.value.find(item => item.id === product.id)
  if (existingItem) {
    existingItem.quantity++
  } else {
    cart.value.push({ ...product, quantity: 1 })
  }
}
</script>