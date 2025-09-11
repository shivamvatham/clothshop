<template>
  <div>
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-2">{{ label }}</label>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="type"
      :required="required"
      :placeholder="placeholder"
      :rows="rows"
      :is="inputType"
      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: [String, Number],
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  required: Boolean,
  placeholder: String,
  rows: {
    type: Number,
    default: 4
  }
})

defineEmits(['update:modelValue'])

const inputType = computed(() => {
  return props.type === 'textarea' ? 'textarea' : 'input'
})
</script>