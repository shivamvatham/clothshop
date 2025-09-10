const API_BASE_URL = 'http://localhost:3001/api'

export const api = {
  baseURL: API_BASE_URL,
  
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    }

    try {
      const response = await $fetch(url, config)
      return response
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }
}