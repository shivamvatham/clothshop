<template>
  <Transition name="snackbar">
    <div v-if="show" :class="[
      'fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg text-white text-sm z-50',
      type === 'success' ? 'bg-green-600' : 'bg-red-600'
    ]">
      {{ message }}
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  message: String,
  type: { type: String, default: 'success' },
  show: Boolean
})
</script>

<style scoped>
.snackbar-enter-active,
.snackbar-leave-active {
  transition: all 0.3s ease;
}

.snackbar-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.snackbar-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>