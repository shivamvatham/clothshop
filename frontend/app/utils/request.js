import { api } from './api.js'
import { ENDPOINTS } from './endpoints.js'

export const productAPI = {
  create: (data) => api.request(ENDPOINTS.PRODUCT_CREATE, {
    method: 'POST',
    body: data
  }),
  
  getAll: () => api.request(ENDPOINTS.PRODUCTS),
  
  update: (id, data) => api.request(ENDPOINTS.PRODUCT_UPDATE(id), {
    method: 'PUT',
    body: data
  }),
  
  delete: (id) => api.request(ENDPOINTS.PRODUCT_DELETE(id), {
    method: 'DELETE'
  })
}

export const orderAPI = {
  getAll: () => api.request(ENDPOINTS.ORDERS),
  getById: (id) => api.request(ENDPOINTS.ORDER_DETAILS(id))
}