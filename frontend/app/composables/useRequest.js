export const useRequest = () => {
  const config = useRuntimeConfig()
  
  const request = async (endpoint, method = 'GET', body = null, headers = {}) => {
    const defaultHeaders = { ...headers }
    
    // Only set Content-Type for non-FormData requests
    if (!(body instanceof FormData)) {
      defaultHeaders['Content-Type'] = 'application/json'
    }
    
    // Get appropriate token based on route context
    let token = null
    
    if (process.client) {
      const route = useRoute()
      
      if (route.path.startsWith('/admin')) {
        // Use admin token for admin routes
        token = useState('admin.token').value || localStorage.getItem('admin_token')
      } else {
        // Use user token for regular routes
        token = useState('auth.token').value || localStorage.getItem('auth_token')
      }
    }
    
    if (token) {
      defaultHeaders.Authorization = `Bearer ${token}`
    }
    
    try {
      const response = await $fetch(endpoint, {
        baseURL: config.public.apiBaseUrl,
        method,
        headers: defaultHeaders,
        body: body instanceof FormData ? body : (body ? JSON.stringify(body) : undefined)
      })
      
      return response
    } catch (error) {
      console.error('API Request failed:', error)
      return { 
        data: null, 
        error: {
          message: error.message || 'Request failed',
          statusCode: error.statusCode || 500
        }
      }
    }
  }
  
  return { request }
}