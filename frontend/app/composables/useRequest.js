export const useRequest = () => {
  const config = useRuntimeConfig()
  
  const request = async (endpoint, options = {}) => {
    const { method = 'GET', body, headers = {}, ...fetchOptions } = options
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...headers
    }
    
    if (config.public.apiToken) {
      defaultHeaders.Authorization = `Bearer ${config.public.apiToken}`
    }
    
    try {
      const response = await $fetch(endpoint, {
        baseURL: config.public.apiBaseUrl,
        method,
        headers: defaultHeaders,
        body: body ? JSON.stringify(body) : undefined,
        ...fetchOptions
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