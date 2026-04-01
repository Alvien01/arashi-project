import { useApi } from './useApi'

export const useTickets = () => {
  const config = useRuntimeConfig()

  // 1. Dapatkan daftar tiket (Admin-only normally)
  const getAllTickets = () => {
    return useApi('/tickets', {
      method: 'GET'
    })
  }

  // 2. Cek detail tiket berdasarkan ID (misal untuk QR code scanning)
  const getTicket = (id: string | number) => {
    return useApi(`/tickets/${id}`, {
      method: 'GET'
    })
  }

  // 3. Pesan tiket baru (Booking via Form)
  const bookTicket = (data: any) => {
    const token = useCookie<string | null>('auth_token')
    // Gunakan $fetch untuk aksi imperatif (post dari tombol click)
    return $fetch('/tickets', {
      method: 'POST',
      body: data,
      baseURL: config.public.apiBase as string,
      headers: {
        ...(token.value ? { Authorization: `Bearer ${token.value}` } : {})
      }
    })
  }

  // 4. Update status tiket (Lunas/Dibatalkan/Pending)
  const updateTicketStatus = (id: string | number, status: string) => {
    const token = useCookie<string | null>('auth_token')
    return $fetch(`/tickets/${id}/status`, {
      method: 'PATCH',
      body: { status },
      baseURL: config.public.apiBase as string,
      headers: {
        ...(token.value ? { Authorization: `Bearer ${token.value}` } : {})
      }
    })
  }

  // 5. Batalkan pemesanan tiket
  const cancelTicket = (id: string | number) => {
    const token = useCookie<string | null>('auth_token')
    return $fetch(`/tickets/${id}`, {
      method: 'DELETE',
      baseURL: config.public.apiBase as string,
      headers: {
        ...(token.value ? { Authorization: `Bearer ${token.value}` } : {})
      }
    })
  }

  return {
    getAllTickets,
    getTicket,
    bookTicket,
    updateTicketStatus,
    cancelTicket
  }
}
