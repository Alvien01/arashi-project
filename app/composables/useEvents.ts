import { useApi } from './useApi'

export const useEvents = () => {
  // GET All Events
  const getAllEvents = () => {
    return useApi('/events', {
      method: 'GET'
    })
  }

  // GET Single Event
  const getEvent = (id: string | number) => {
    return useApi(`/events/${id}`, {
      method: 'GET'
    })
  }

  // CREATE Event (POST)
  const createEvent = (data: any) => {
    const token = useCookie<string | null>('auth_token')
    return $fetch('/events', {
      method: 'POST',
      body: data,
      baseURL: useRuntimeConfig().public.apiBase as string,
      headers: {
        ...(token.value ? { Authorization: `Bearer ${token.value}` } : {})
      }
    })
  }

  // UPDATE Event (PUT/PATCH)
  const updateEvent = (id: string | number, data: any) => {
    const token = useCookie<string | null>('auth_token')
    return $fetch(`/events/${id}`, {
      method: 'PUT',
      body: data,
      baseURL: useRuntimeConfig().public.apiBase as string,
      headers: {
        ...(token.value ? { Authorization: `Bearer ${token.value}` } : {})
      }
    })
  }

  // DELETE Event
  const deleteEvent = (id: string | number) => {
    const token = useCookie<string | null>('auth_token')
    return $fetch(`/events/${id}`, {
      method: 'DELETE',
      baseURL: useRuntimeConfig().public.apiBase as string,
      headers: {
        ...(token.value ? { Authorization: `Bearer ${token.value}` } : {})
      }
    })
  }

  return {
    getAllEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
  }
}
