<template>
  <div>
    <div class="rounded-md text-left -mb-3">
      <!-- Label -->
      <label v-if="label" for="selectfield" class="block text-[12px] text-gray-700">
        {{ label }}
      </label>

      <!-- Select -->
      <select
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="validate"
        id="selectfield"
        :required="required"
        class="w-full bg-[#f7f0f0] h-8 rounded-sm text-[12px] text-black p-1 border-gray-100 focus:outline-none"
        :class="error ? 'border-red-500 border focus:border-red-500 focus:ring-red-500 focus:ring-1' : 'border focus:ring-1 border-gray-500 focus:border-gray-500 focus:ring-gray-500'"
      >
        <option v-if="placeholder" value="">{{ placeholder }}</option>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>

      <!-- Error -->
      <span
        class="block text-red-500 text-[11px] transition-all duration-300 overflow-hidden min-h-[14px]"
        :class="error ? 'max-h-10 opacity-100' : 'max-h-10 opacity-0'"
      >
        {{ error }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: [String, Number],
  label: String,
  required: Boolean,
  placeholder: String,
  options: {
    type: Array,
    required: true,
  },
  rules: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue']);

const error = ref(null);

// Validate on value change
watch(
  () => props.modelValue,
  (newVal) => {
    validate();
    emit('update:modelValue', newVal);
  },
);

// Validation function
function validate() {
  error.value = null;
  if (props.rules && props.rules.length > 0) {
    for (const rule of props.rules) {
      const result = rule(props.modelValue);
      if (result !== true) {
        error.value = result;
        break;
      }
    }
  }
}
</script>