<template>
  <div v-if="message" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
    <div class="flex items-center">
      <AlertCircle class="w-5 h-5 text-red-400 mr-3" />
      <p class="text-red-800 text-sm">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { AlertCircle } from 'lucide-vue-next'

defineProps({
  message: {
    type: String,
    default: ''
  }
})
</script>