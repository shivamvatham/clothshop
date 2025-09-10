<template>
  <div v-if="product" class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <!-- Product Image -->
        <div class="space-y-4">
          <div class="bg-white rounded-2xl overflow-hidden shadow-sm">
            <ProductImage 
              :src="product.image" 
              :alt="product.name" 
              image-class="w-full h-96 lg:h-[600px] object-cover"
            />
          </div>
        </div>

        <!-- Product Details -->
        <div class="space-y-8">
          <div>
            <h1 class="text-4xl font-bold text-gray-800 mb-4">{{ product.name }}</h1>
            <p class="text-3xl font-bold text-pink-400 mb-6">₹{{ product.price }}</p>
            <p class="text-gray-600 leading-relaxed">
              Experience the perfect blend of traditional elegance and contemporary style with this beautiful piece from our collection. Crafted with attention to detail and made from premium materials for lasting comfort and style.
            </p>
          </div>

          <!-- Size Selection -->
          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Size</h3>
            <div class="flex flex-wrap gap-3">
              <button 
                v-for="size in product.sizes" 
                :key="size"
                @click="selectedSize = size"
                :class="[
                  'px-4 py-2 border rounded-lg font-medium transition-colors',
                  selectedSize === size 
                    ? 'border-pink-400 bg-pink-400 text-white' 
                    : 'border-gray-200 text-gray-700 hover:border-pink-400'
                ]"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <!-- Quantity -->
          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Quantity</h3>
            <div class="flex items-center space-x-4">
              <button 
                @click="quantity = Math.max(1, quantity - 1)"
                class="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center hover:border-pink-400 transition-colors"
              >
                -
              </button>
              <span class="text-xl font-medium w-12 text-center">{{ quantity }}</span>
              <button 
                @click="quantity++"
                class="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center hover:border-pink-400 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <!-- Add to Cart -->
          <div class="space-y-4">
            <button 
              @click="addToCart"
              class="w-full bg-pink-400 text-white py-4 rounded-lg font-medium text-lg hover:bg-pink-500 transition-colors"
            >
              Add to Cart
            </button>
            <button class="w-full border-2 border-pink-400 text-pink-400 py-4 rounded-lg font-medium text-lg hover:bg-pink-400 hover:text-white transition-colors">
              Buy Now
            </button>
          </div>

          <!-- Product Features -->
          <div class="border-t pt-8">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Product Features</h3>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Premium quality fabric
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Machine washable
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Free shipping on orders over ₹1000
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Easy returns within 30 days
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="min-h-screen bg-gray-50 flex items-center justify-center">
    <p class="text-gray-600">Product not found</p>
  </div>
</template>

<script setup>
const route = useRoute()
const products = inject('products')
const cart = inject('cart')

const product = computed(() => {
  return products.find(p => p.id === parseInt(route.params.id))
})

const selectedSize = ref('')
const quantity = ref(1)

// Set default size when product loads
watch(product, (newProduct) => {
  if (newProduct && newProduct.sizes.length > 0) {
    selectedSize.value = newProduct.sizes[0]
  }
}, { immediate: true })

const addToCart = () => {
  if (!selectedSize.value) {
    alert('Please select a size')
    return
  }

  const existingItem = cart.value.find(item => 
    item.id === product.value.id && item.selectedSize === selectedSize.value
  )
  
  if (existingItem) {
    existingItem.quantity += quantity.value
  } else {
    cart.value.push({ 
      ...product.value, 
      selectedSize: selectedSize.value,
      quantity: quantity.value 
    })
  }
  
  alert('Added to cart!')
}
</script>