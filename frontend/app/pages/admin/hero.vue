<template>
  <div class="mx-auto">
    <div class="mb-4">
      <h1 class="text-xl font-bold text-gray-900">Manage Hero Section</h1>
    </div>

    <Snackbar :message="snackbar.message" :type="snackbar.type" :show="snackbar.show" />

    <!-- Existing Hero Items -->
    <div v-for="hero in heros" :key="hero._id" class="bg-white rounded-lg shadow-sm border mb-4">
      <div class="p-4">
        <div class="flex justify-between items-start">
          <div class="flex space-x-4">
            <img :src="`${config.public.apiBaseUrl.replace('/api', '')}/${hero.image}`" alt="Hero"
              class="w-20 h-20 object-cover rounded" />
            <div>
              <p class="text-gray-800">{{ hero.description }}</p>
            </div>
          </div>
          <button @click="deleteHero(hero._id)" class="text-red-600 hover:text-red-800">
            <Trash />
          </button>
        </div>
      </div>
    </div>

    <!-- Add New Hero Item -->
    <div class="bg-white rounded-lg shadow-sm border">
      <div class="p-4">
        <h2 class="text-lg font-medium mb-4">Add New Hero Item ({{ heros.length }}/5)</h2>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Hero Image *</label>
              <input @change="handleImageChange" type="file" accept="image/*" required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea v-model="form.description" rows="4" required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter hero description"></textarea>
            </div>
          </div>

          <div class="flex justify-end">
            <button type="submit" :disabled="loading || heros.length >= 5"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm">
              {{ loading ? 'Adding...' : heros.length >= 5 ? 'Limit Reached' : 'Add Hero Item' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Trash, CheckCheck } from 'lucide-vue-next'
definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const { request } = useRequest()
const config = useRuntimeConfig()

const form = ref({
  image: null,
  description: ''
})

const loading = ref(false)
const heros = ref([])
const snackbar = ref({ show: false, message: '', type: 'success' })

const { data } = await useAsyncData('heros', () => request('/hero'))
if (data.value?.success) {
  heros.value = data.value.data
}

const handleImageChange = (event) => {
  form.value.image = event.target.files[0]
}

const showSnackbar = (message, type = 'success') => {
  snackbar.value = { show: true, message, type }
  setTimeout(() => snackbar.value.show = false, 3000)
}

const handleSubmit = async () => {
  if (heros.value.length >= 5) {
    showSnackbar('Maximum 5 hero items allowed', 'error')
    return
  }

  loading.value = true

  try {
    const formData = new FormData()
    formData.append('description', form.value.description)
    formData.append('image', form.value.image)

    const response = await request('/admin/hero', 'POST', formData)

    if (response.success) {
      showSnackbar(response.message)
      heros.value.unshift(response.data)
      form.value = { image: null, description: '' }
      document.querySelector('input[type="file"]').value = ''
    } else {
      showSnackbar(response.message || 'Failed to add hero item', 'error')
    }
  } catch (err) {
    showSnackbar('Failed to add hero item. Please try again.', 'error')
  } finally {
    loading.value = false
  }
}

const deleteHero = async (id) => {
  try {
    const response = await request(`/admin/hero/${id}`, 'DELETE')
    if (response.success) {
      heros.value = heros.value.filter(h => h._id !== id)
      showSnackbar(response.message)
    }
  } catch (err) {
    showSnackbar('Failed to delete hero item', 'error')
  }
}
</script>