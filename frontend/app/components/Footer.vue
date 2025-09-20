<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
      <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div>
          <div class="flex-shrink-0 mb-5">
          <div class="flex items-center">
            <img src="/shreeFashion.png" alt="Shree Fashion" class="h-15 w-auto">
            <span class="p-1 text-2xl font-bold bg-gradient-to-r from-orange-700 to-red-800  bg-clip-text text-transparent">
              श्री Fashion
            </span>
          </div>
        </div>
          <p class="text-gray-300 mb-6 max-w-md">
            Discover timeless elegance with our curated collection of women's fashion. From traditional kurtis to
            contemporary dresses, we celebrate every woman's unique style.
          </p>
        </div>

        <div class="space-y-4">
          <!-- Heading -->
          <h3 class="text-lg font-semibold text-white">Get in touch</h3>

          <!-- Contact info -->
          <div class="space-y-1">
            <p class="text-gray-300">manthanaagal067@gmail.com.com</p>
            <p class="text-gray-400">+91 1234567890</p>
          </div>

          <!-- Social icons -->
          <div class="flex space-x-4">
            <a href="#" class="p-3 rounded-lg bg-gray-800 text-gray-400 hover:text-orange-600 transition-colors">
              <Facebook class="w-5 h-5" />
            </a>
            <a href="#" class="p-3 rounded-lg bg-gray-800 text-gray-400 hover:text-orange-600 transition-colors">
              <Linkedin class="w-5 h-5" />
            </a>
            <a href="#" class="p-3 rounded-lg bg-gray-800 text-gray-400 hover:text-orange-600 transition-colors">
              <Instagram class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-gray-800 mt-8 pt-8 text-center">
        <p class="text-gray-400">© {{ new Date().getFullYear() }} Shree Fashion. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
<script setup>
import { Facebook, Linkedin, Instagram } from 'lucide-vue-next'
</script>