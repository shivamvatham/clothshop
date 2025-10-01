export const useAdminAuth = () => {
  const admin = useState('admin.user', () => null)
  const token = useState('admin.token', () => null)
  const { request } = useRequest()

  // Auto-initialize from cookies
  if (!admin.value && !token.value) {
    const adminCookie = useCookie('admin_user')
    const tokenCookie = useCookie('admin_token')

    if (adminCookie.value && tokenCookie.value) {
      admin.value = adminCookie.value
      token.value = tokenCookie.value
    }
  }

  // Check for expired cookies and auto-logout
  if (process.client && (admin.value || token.value)) {
    const adminCookie = useCookie('admin_user')
    const tokenCookie = useCookie('admin_token')

    if (!adminCookie.value || !tokenCookie.value) {
      admin.value = null
      token.value = null
      navigateTo('/admin/login')
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

        // Store in session cookies
        const adminCookie = useCookie('admin_user', {
          maxAge: response.timeout || 3600,
          httpOnly: false,
          secure: true,
          sameSite: 'strict'
        })
        const tokenCookie = useCookie('admin_token', {
          maxAge: response.timeout || 3600,
          httpOnly: false,
          secure: true,
          sameSite: 'strict'
        })

        adminCookie.value = response.admin
        tokenCookie.value = response.token

        // Set timeout to check cookie expiry
        if (response.timeout) {
          setTimeout(() => {
            if (!adminCookie.value || !tokenCookie.value) {
              logout()
            }
          }, (response.timeout * 1000) + 1000)
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

    // Clear cookies
    const adminCookie = useCookie('admin_user')
    const tokenCookie = useCookie('admin_token')
    adminCookie.value = null
    tokenCookie.value = null

    // Redirect to admin login
    navigateTo('/admin/login')
  }

  // Initialize admin auth from cookies
  const initAuth = () => {
    const adminCookie = useCookie('admin_user')
    const tokenCookie = useCookie('admin_token')

    if (adminCookie.value && tokenCookie.value) {
      admin.value = adminCookie.value
      token.value = tokenCookie.value
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