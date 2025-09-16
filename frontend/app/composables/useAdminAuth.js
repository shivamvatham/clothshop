export const useAdminAuth = () => {
  const admin = useState('admin.user', () => null)
  const token = useState('admin.token', () => null)
  const { request } = useRequest()
  
  // Auto-initialize on client side
  if (process.client && !admin.value && !token.value) {
    const storedToken = localStorage.getItem('admin_token')
    const storedAdmin = localStorage.getItem('admin_user')
    
    if (storedToken && storedAdmin) {
      token.value = storedToken
      admin.value = JSON.parse(storedAdmin)
    }
  }

  // Admin login function
  const login = async (identifier, password) => {
    try {
      const response = await request('/admin/auth/login', 'POST', {
        identifier,
        password
      })

      if (response.success) {
        admin.value = response.admin
        token.value = response.token
        
        // Store in localStorage for persistence
        if (process.client) {
          localStorage.setItem('admin_token', response.token)
          localStorage.setItem('admin_user', JSON.stringify(response.admin))
        }
        
        return { success: true, admin: response.admin }
      } else {
        return { success: false, message: response.message }
      }
    } catch (error) {
      return { success: false, message: 'Login failed' }
    }
  }

  // Admin logout function
  const logout = () => {
    admin.value = null
    token.value = null
    
    if (process.client) {
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_user')
    }
    
    // Redirect to admin login
    navigateTo('/admin/login')
  }

  // Initialize admin auth from localStorage
  const initAuth = () => {
    if (process.client) {
      const storedToken = localStorage.getItem('admin_token')
      const storedAdmin = localStorage.getItem('admin_user')
      
      if (storedToken && storedAdmin) {
        token.value = storedToken
        admin.value = JSON.parse(storedAdmin)
      }
    }
  }

  // Check if admin is authenticated
  const isAuthenticated = computed(() => {
    return !!admin.value && !!token.value
  })

  return {
    admin: readonly(admin),
    token: readonly(token),
    login,
    logout,
    initAuth,
    isAuthenticated
  }
}