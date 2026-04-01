import { useAuth } from './useAuth'

export const useApi = (url: string, options: any = {}) => {
  const config = useRuntimeConfig()
  const token = useCookie('auth_token')
  
  return useFetch(url, {
    baseURL: config.public.apiBase,
    headers: {
      ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}),
      ...options.headers
    },
    ...options,
    // Add common behavior like auto-refreshing tokens if needed
    onResponse({ response }) {
      // console.log('[useApi] Response:', response)
    },
    onResponseError({ response }) {
      // Handle global errors here
      if (response.status === 401) {
        // Automatically logout on unauthorized
        const { logout } = useAuth()
        logout()
      }
      console.error('[useApi] Error:', response)
    },
  })
}
