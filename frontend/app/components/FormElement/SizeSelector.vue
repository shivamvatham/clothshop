<template>
  <div>
    <div class="rounded-md text-left -mb-3">
      <!-- Label -->
      <label v-if="label" for="sizefield" class="block labelFont text-gray-700">
        {{ label }}
      </label>

      <!-- Size Buttons Container -->
      <div class="flex flex-wrap gap-1">
        <button v-for="size in availableSizes" :key="size" type="button" @click="toggleSize(size)"
          class="textFieldbg h-8 rounded-sm inputText text-black px-2 py-1 border border-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-500 hover:bg-gray-100 transition-colors"
          :class="selectedSizes.includes(size) ? 'border-blue-500 bg-blue-50 text-blue-600' : ''">
          {{ size }}
        </button>
      </div>

      <!-- Error -->
      <span class="block text-red-500 text-[11px] transition-all duration-300 overflow-hidden min-h-[14px]"
        :class="error ? 'max-h-10 opacity-100' : 'max-h-10 opacity-0'">
        {{ error }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  label: String,
  availableSizes: {
    type: Array,
    default: () => ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'],
  },
  rules: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue']);

const selectedSizes = ref(props.modelValue || []);
const error = ref(null);

// Validate on selection change
watch(selectedSizes, () => {
  validate();
  emit('update:modelValue', selectedSizes.value);
}, { deep: true });

// Watch external modelValue changes
watch(() => props.modelValue, (newValue) => {
  selectedSizes.value = newValue || [];
  validate();
});

const toggleSize = (size) => {
  const index = selectedSizes.value.indexOf(size);
  if (index > -1) {
    selectedSizes.value.splice(index, 1);
  } else {
    selectedSizes.value.push(size);
  }
};

function validate() {
  error.value = null;
  if (props.rules && props.rules.length > 0) {
    for (const rule of props.rules) {
      const result = rule(selectedSizes.value);
      if (result !== true) {
        error.value = result;
        break;
      }
    }
  }
}
</script>