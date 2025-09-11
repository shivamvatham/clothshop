<template>
  <div>
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-2">{{ label }}</label>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="size in availableSizes"
        :key="size"
        type="button"
        @click="toggleSize(size)"
        :class="[
          'px-3 py-2 border rounded-lg text-sm font-medium transition-colors',
          selectedSizes.includes(size)
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
        ]"
      >
        {{ size }}
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: Array,
  label: String,
  availableSizes: {
    type: Array,
    default: () => ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size']
  }
})

const emit = defineEmits(['update:modelValue'])

const selectedSizes = ref(props.modelValue || [])

const toggleSize = (size) => {
  const index = selectedSizes.value.indexOf(size)
  if (index > -1) {
    selectedSizes.value.splice(index, 1)
  } else {
    selectedSizes.value.push(size)
  }
  emit('update:modelValue', selectedSizes.value)
}

watch(() => props.modelValue, (newValue) => {
  selectedSizes.value = newValue || []
})
</script>