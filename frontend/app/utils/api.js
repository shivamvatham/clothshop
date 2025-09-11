const API_BASE_URL = 'http://localhost:3001/api'

export const api = {
  baseURL: API_BASE_URL,
  
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    
    const config = {
      headers: {},
      ...options
    }
    if (!(options.body instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json'
    }
    
    if (options.headers) {
      config.headers = { ...config.headers, ...options.headers }
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