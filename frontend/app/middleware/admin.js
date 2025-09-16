export default defineNuxtRouteMiddleware((to) => {
  // Only run on client side
  if (process.server) return
  
  const { isAuthenticated, initAuth } = useAdminAuth()
  
  // Initialize auth from localStorage on client
  initAuth()
  
  // Allow access to login page
  if (to.path === '/admin/login') {
    // If already authenticated, redirect to dashboard
    if (isAuthenticated.value) {
      return navigateTo('/admin/dashboard')
    }
    return
  }
  
  // For all other admin routes, check authentication
  if (!isAuthenticated.value) {
    return navigateTo('/admin/login')
  }
})