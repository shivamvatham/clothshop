<template>
    <div>
      <div class="rounded-md text-left -mb-3">
        <!-- Label -->
        <label for="inpfield" class="block text-[12px]">
          {{ label }}
        </label>
  
        <!-- Input -->
        <input v-model="value" id="inpfield"
          class="w-full bg-[#f7f0f0] h-8 rounded-sm text-[12px] text-black p-1 border-gray-100 focus:outline-none" 
          :class="error ? 'border-red-500 border focus:border-red-500 focus:ring-red-500 focus:ring-1'
            : 'border focus:ring-1 border-gray-500 focus:border-gray-500 focus:ring-gray-500'" :placeholder="placeholder"
          :type="type" @blur="validate" />
  
        <!-- Error -->
        <span class="block text-red-500 text-[11px] transition-all duration-300 overflow-hidden min-h-[14px]"
          :class="error ? 'max-h-10 opacity-100' : 'max-h-10 opacity-0'">
          {{ error }}
        </span>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { ref, watch } from 'vue'
  
  const props = defineProps({
    modelValue: [String, Number],
    rules: Array,
    type: { type: String, default: 'text' },
    label: String,
    placeholder: String,
  })
  
  const emit = defineEmits(["update:modelValue"])
  
  const value = ref(props.modelValue)
  const error = ref(null)
  
  watch(value, (newVal) => {
    validate()
    emit("update:modelValue", newVal)
  })
  
  function validate() {
    error.value = null;
    if (props.rules && props.rules.length > 0) {
      for (const rule of props.rules) {
        const result = rule(value.value);
        if (result !== true) {
          error.value = result;
          break;
        }
      }
    }
  }
  </script>
  