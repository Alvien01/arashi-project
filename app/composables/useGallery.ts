export const useGallery = () => {
  const config = useRuntimeConfig()

  // 1. Ambil semua gallery fotos/items
  const fetchGalleries = () => {
    return useApi('/gallery', {
      method: 'GET'
    })
  }

  // 2. Ambil detail gallery tunggal
  const getGallery = (id: string | number) => {
    return useApi(`/gallery/${id}`, {
      method: 'GET'
    })
  }

  // 3. Upload Gallery Baru (Admin - menggunakan FormData untuk upload image)
  const uploadGallery = (formData: FormData) => {
    return $fetch('/gallery', {
      method: 'POST',
      body: formData,
      baseURL: config.public.apiBase
      // Browser akan otomatis handle Boundary untuk FormData
    })
  }

  // 4. Update data Gallery
  const updateGallery = (id: string | number, data: any) => {
    return $fetch(`/gallery/${id}`, {
      method: 'PUT',
      body: data,
      baseURL: config.public.apiBase
    })
  }

  // 5. Hapus Item Gallery
  const deleteGallery = (id: string | number) => {
    return $fetch(`/gallery/${id}`, {
      method: 'DELETE',
      baseURL: config.public.apiBase
    })
  }

  return {
    fetchGalleries,
    getGallery,
    uploadGallery,
    updateGallery,
    deleteGallery
  }
}
