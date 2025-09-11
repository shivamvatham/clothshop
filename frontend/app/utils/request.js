import { api } from './api.js'

// Generic API request function
export const apiRequest = (endpoint, method = 'GET', data = null) => {
  return api.request(endpoint, {
    method,
    body: data
  })
}