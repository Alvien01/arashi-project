import { useApi } from './useApi'

export const useUsers = () => {
  const config = useRuntimeConfig()

  // 1. Get all users
  const getAllUsers = () => {
    return useApi('/users', {
      method: 'GET'
    })
  }

  // 2. Get single user
  const getUser = (id: string | number) => {
    return useApi(`/users/${id}`, {
      method: 'GET'
    })
  }

  // 3. Create user
  const createUser = (data: any) => {
    const token = useCookie<string|null>('auth_token')
    return $fetch('/users', {
      method: 'POST',
      body: data,
      baseURL: config.public.apiBase as string,
      headers: {
        ...(token.value ? { Authorization: `Bearer ${token.value}` } : {})
      }
    })
  }

  // 4. Update user
  const updateUser = (id: string | number, data: any) => {
    const token = useCookie<string|null>('auth_token')
    return $fetch(`/users/${id}`, {
      method: 'PUT',
      body: data,
      baseURL: config.public.apiBase as string,
      headers: {
        ...(token.value ? { Authorization: `Bearer ${token.value}` } : {})
      }
    })
  }

  // 5. Delete user
  const deleteUser = (id: string | number) => {
    const token = useCookie<string|null>('auth_token')
    return $fetch(`/users/${id}`, {
      method: 'DELETE',
      baseURL: config.public.apiBase as string,
      headers: {
        ...(token.value ? { Authorization: `Bearer ${token.value}` } : {})
      }
    })
  }

  return {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
  }
}
