export const useAuth = () => {
  const token = useCookie('auth_token', {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/'
  })
  
  const user = useState('user', () => null)
  const config = useRuntimeConfig()

  const login = async (credentials: any) => {
    try {
      const response = await $fetch<{ token: string, user: any }>(`${config.public.apiBase}/auth/login`, {
        method: 'POST',
        body: credentials
      })

      if (response && response.token) {
        token.value = response.token
        user.value = response.user
        return { success: true }
      }
      return { success: false, message: 'Invalid response from server' }
    } catch (error: any) {
      console.error('[useAuth] Login error:', error)
      return { 
        success: false, 
        message: error.data?.message || 'Login failed. Please check your credentials.' 
      }
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    navigateTo('/console/login')
  }

  const isLoggedIn = computed(() => !!token.value)

  return {
    token,
    user,
    login,
    logout,
    isLoggedIn
  }
}
