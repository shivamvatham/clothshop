<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-25 text-center">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <p class="text-gray-600 max-w-2xl mx-auto">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <!-- Contact Form -->
        <div class="bg-white rounded-2xl p-8 shadow-sm">
          <h2 class="text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h2>
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input 
                  v-model="form.firstName"
                  type="text" 
                  required
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-pink-400 transition-colors"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input 
                  v-model="form.lastName"
                  type="text" 
                  required
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-pink-400 transition-colors"
                >
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                v-model="form.email"
                type="email" 
                required
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-pink-400 transition-colors"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input 
                v-model="form.subject"
                type="text" 
                required
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-pink-400 transition-colors"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea 
                v-model="form.message"
                rows="5" 
                required
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-pink-400 transition-colors resize-none"
              ></textarea>
            </div>
            
            <button 
              type="submit"
              class="w-full bg-pink-400 text-white py-3 rounded-lg font-medium hover:bg-pink-500 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        <!-- Contact Information -->
        <div class="space-y-8">
          <div class="bg-white rounded-2xl p-8 shadow-sm">
            <h3 class="text-xl font-semibold text-gray-800 mb-6">Get in Touch</h3>
            <div class="space-y-4">
              <div class="flex items-start space-x-4">
                <div class="bg-pink-100 p-3 rounded-lg">
                  <svg class="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium text-gray-800">Address</h4>
                  <p class="text-gray-600">123 Fashion Street<br>Mumbai, Maharashtra 400001<br>India</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="bg-pink-100 p-3 rounded-lg">
                  <svg class="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium text-gray-800">Phone</h4>
                  <p class="text-gray-600">+91 98765 43210</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="bg-pink-100 p-3 rounded-lg">
                  <svg class="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-medium text-gray-800">Email</h4>
                  <p class="text-gray-600">hello@elegance.com</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-8 shadow-sm">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Store Hours</h3>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-600">Monday - Friday</span>
                <span class="text-gray-800">10:00 AM - 8:00 PM</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Saturday</span>
                <span class="text-gray-800">10:00 AM - 6:00 PM</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Sunday</span>
                <span class="text-gray-800">12:00 PM - 5:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: ''
})

const submitForm = () => {
  // Handle form submission
  alert('Thank you for your message! We will get back to you soon.')
  
  // Reset form
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  }
}
</script>