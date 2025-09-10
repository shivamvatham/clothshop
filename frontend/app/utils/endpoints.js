export const ENDPOINTS = {
  // Products
  PRODUCTS: '/products',
  PRODUCT_CREATE: '/products',
  PRODUCT_UPDATE: (id) => `/products/${id}`,
  PRODUCT_DELETE: (id) => `/products/${id}`,
  
  // Orders
  ORDERS: '/orders',
  ORDER_DETAILS: (id) => `/orders/${id}`,
  
  // Auth
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout'
}