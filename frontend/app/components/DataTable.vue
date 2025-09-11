<template>
  <div class="bg-white rounded-lg shadow">
    <div v-if="title" class="px-4 lg:px-6 py-4 border-b">
      <h3 class="text-lg font-medium text-gray-900">{{ title }}</h3>
    </div>
    
    <!-- Desktop Table View -->
    <div class="hidden lg:block overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th v-for="column in columns" :key="column.key" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              {{ column.label }}
            </th>
            <th v-if="actions.length > 0" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(item, index) in data" :key="index">
            <td v-for="column in columns" :key="column.key" class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <slot :name="column.key" :item="item" :value="item[column.key]">
                {{ item[column.key] }}
              </slot>
            </td>
            <td v-if="actions.length > 0" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <button 
                v-for="action in actions" 
                :key="action.label"
                @click="action.handler(item)"
                :class="action.class || 'text-blue-600 hover:text-blue-900 mr-3'"
              >
                {{ action.label }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Mobile Card View -->
    <div class="lg:hidden">
      <div v-for="(item, index) in data" :key="index" class="p-4 border-b border-gray-200 last:border-b-0">
        <div class="space-y-2">
          <div v-for="column in columns" :key="column.key" class="flex justify-between items-start">
            <span class="text-sm font-medium text-gray-500">{{ column.label }}:</span>
            <span class="text-sm text-gray-900 text-right ml-2">
              <slot :name="column.key" :item="item" :value="item[column.key]">
                {{ item[column.key] }}
              </slot>
            </span>
          </div>
          <div v-if="actions.length > 0" class="flex justify-end space-x-2 pt-2 border-t border-gray-100">
            <button 
              v-for="action in actions" 
              :key="action.label"
              @click="action.handler(item)"
              :class="action.class || 'text-blue-600 hover:text-blue-900'"
              class="text-sm px-2 py-1"
            >
              {{ action.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  columns: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  actions: {
    type: Array,
    default: () => []
  }
})
</script>