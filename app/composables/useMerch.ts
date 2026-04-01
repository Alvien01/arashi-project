import { useApi } from './useApi'

export const useMerch = () => {
  const config = useRuntimeConfig()

  // 1. Ambil semua Merchandise (mendukung filter kategori)
  const getAllMerch = (category?: string) => {
    return useApi('/merch', {
      method: 'GET',
      params: category ? { category } : {}
    })
  }

  // 2. Ambil detail Merchandise tunggal
  const getMerchItem = (id: string | number) => {
    return useApi(`/merch/${id}`, {
      method: 'GET'
    })
  }

  // 3. Tambah Merchandise Baru (Admin - biasanya pakai FormData untuk upload foto produk)
  const addMerchItem = (formData: FormData) => {
    const token = useCookie<string | null>('auth_token')
    return $fetch('/merch', {
      method: 'POST',
      body: formData,
      baseURL: config.public.apiBase as string,
      headers: {
        ...(token.value ? { Authorization: `Bearer ${token.value}` } : {})
      }
    })
  }

  // 4. Update data Merchandise
  const updateMerchItem = (id: string | number, data: any) => {
    const token = useCookie<string | null>('auth_token')
    return $fetch(`/merch/${id}`, {
      method: 'PUT',
      body: data,
      baseURL: config.public.apiBase as string,
      headers: {
        ...(token.value ? { Authorization: `Bearer ${token.value}` } : {})
      }
    })
  }

  // 5. Hapus Merchandise
  const deleteMerchItem = (id: string | number) => {
    const token = useCookie<string | null>('auth_token')
    return $fetch(`/merch/${id}`, {
      method: 'DELETE',
      baseURL: config.public.apiBase as string,
      headers: {
        ...(token.value ? { Authorization: `Bearer ${token.value}` } : {})
      }
    })
  }

  return {
    getAllMerch,
    getMerchItem,
    addMerchItem,
    updateMerchItem,
    deleteMerchItem
  }
}
