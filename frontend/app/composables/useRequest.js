export const useRequest = () => {
  const config = useRuntimeConfig()
  
  const request = async (endpoint, method = 'GET', body = null, headers = {}) => {
    const defaultHeaders = { ...headers }
    
    // Only set Content-Type for non-FormData requests
    if (!(body instanceof FormData)) {
      defaultHeaders['Content-Type'] = 'application/json'
    }
    
    if (config.public.apiToken) {
      defaultHeaders.Authorization = `Bearer ${config.public.apiToken}`
    }
    
    try {
      const response = await $fetch(endpoint, {
        baseURL: config.public.apiBaseUrl,
        method,
        headers: defaultHeaders,
        body: body instanceof FormData ? body : (body ? JSON.stringify(body) : undefined)
      })
      
      return { data: response, error: null }
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