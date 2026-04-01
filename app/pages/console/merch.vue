<template>
  <NuxtLayout name="console">
    <div class="console-page">
      <header class="page-header">
        <div class="header-content">
          <h1 class="page-title">PRODUCT MANAGEMENT</h1>
          <p class="page-subtitle">Track and update your official Aratu merchandise.</p>
        </div>
        <button class="btn-create" @click="openModal('create')">
          <span class="btn-icon">+</span> ADD PRODUCT
        </button>
      </header>

      <!-- Toolbar -->
      <div class="table-toolbar">
        <div class="search-wrap">
          <span class="search-icon">🔍</span>
          <input type="text" placeholder="Search products..." v-model="searchQuery">
        </div>
        <div class="filter-wrap">
          <select v-model="categoryFilter">
            <option value="all">ALL CATEGORIES</option>
            <option value="T-SHIRT">T-SHIRT</option>
            <option value="KEYCHAIN">KEYCHAIN</option>
            <option value="POSTER">POSTER</option>
            <option value="OTHERS">OTHERS</option>
          </select>
        </div>
      </div>

      <!-- Modern Table -->
      <div class="modern-card no-padding">
        <div class="table-overflow">
          <table class="modern-table">
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th>STOCK</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredMerch" :key="item.id">
                <td class="td-product">
                  <div class="product-wrap">
                    <div class="product-img-box">
                      <img :src="item.foto || item.image || '/placeholder.png'" :alt="item.nama_produk">
                    </div>
                    <div class="product-name-info">
                      <span class="main-name">{{ item.nama_produk }}</span>
                      <span v-if="item.isNew" class="new-badge">NEW</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="cat-label">{{ item.kategori }}</span>
                </td>
                <td>
                  <span class="price-label">Rp {{ (Number(item.harga) || 0).toLocaleString() }}</span>
                </td>
                <td>
                  <div :class="['stock-display', { 'low-stock': (item.stok || 0) < 10 }]">
                    <span class="stock-num">{{ item.stok || 0 }}</span>
                    <span class="stock-unit">PCS</span>
                  </div>
                </td>
                <td>
                  <div class="action-wrap">
                    <button class="btn-icon edit" @click="openModal('edit', item)">✏️</button>
                    <button class="btn-icon delete" @click="handleDelete(item.id)">🗑️</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Merch Modal -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">{{ modalMode === 'create' ? 'NEW PRODUCT' : 'EDIT PRODUCT' }}</h2>
            <button class="close-btn" @click="showModal = false">&times;</button>
          </div>
          <form @submit.prevent="saveMerch" class="modal-form">
            <div class="form-group">
              <label>PRODUCT NAME</label>
              <input type="text" v-model="form.nama_produk" required placeholder="Nama Produk">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>CATEGORY</label>
                <select v-model="form.kategori">
                  <option value="T-SHIRT">T-SHIRT</option>
                  <option value="KEYCHAIN">KEYCHAIN</option>
                  <option value="POSTER">POSTER</option>
                  <option value="OTHERS">OTHERS</option>
                </select>
              </div>
              <div class="form-group">
                <label>PRICE (Rp)</label>
                <input type="number" v-model="form.harga" required placeholder="Harga">
              </div>
            </div>
            <div class="form-group">
              <label>STOCK QUANTITY</label>
              <input type="number" v-model="form.stok" required placeholder="Stok">
            </div>
            <button type="submit" class="btn-save">SAVE PRODUCT</button>
          </form>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

const searchQuery = ref('')
const categoryFilter = ref('all')
const showModal = ref(false)
const modalMode = ref('create')

const { getAllMerch, addMerchItem, updateMerchItem, deleteMerchItem } = useMerch()
const { success, error, confirm } = useNotification()

const merchItems = ref([])
const fetchMerch = async () => {
    try {
        const { data: res } = await getAllMerch()
        if (res.value?.data) {
            merchItems.value = res.value.data
        }
    } catch (error) {
        console.error('Failed to fetch merchandise:', error)
    }
}

onMounted(() => {
    fetchMerch()
})

const form = reactive({ id: null, nama_produk: '', kategori: 'T-SHIRT', harga: 0, stok: 0 })

const filteredMerch = computed(() => {
    if (!merchItems.value) return []
    return merchItems.value.filter(item => {
        const matchesSearch = (item.nama_produk || '').toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesCat = categoryFilter.value === 'all' || item.kategori === categoryFilter.value
        return matchesSearch && matchesCat
    })
})

const openModal = (mode, item = null) => {
    modalMode.value = mode
    if (item) Object.assign(form, item)
    else Object.assign(form, { id: null, name: '', category: 'T-SHIRT', price: 0, stock: 0 })
    showModal.value = true
}

const saveMerch = async () => {
    try {
        if (modalMode.value === 'create') {
            // Note: If the backend strictly requires FormData, this might need adjustment
            // But for a simple CRUD, JSON is often accepted.
            await addMerchItem(form) 
        } else {
            await updateMerchItem(form.id, form)
        }
        await fetchMerch()
        showModal.value = false
        success(`Product "${form.nama_produk}" successfully ${modalMode.value === 'create' ? 'added' : 'updated'}!`)
    } catch (err) {
        error('Failed to save product information.')
    }
}

const handleDelete = async (id) => {
    const isConfirmed = await confirm({
        title: 'DELETE PRODUCT?',
        message: 'Are you sure you want to remove this item from the store?',
        confirmText: 'YES, REMOVE IT',
        cancelText: 'KEEP PRODUCT',
        type: 'danger'
    })

    if (isConfirmed) {
        try {
            await deleteMerchItem(id)
            await fetchMerch()
            success('Product has been removed from merchandise list.')
        } catch (err) {
            error('Failed to delete product.')
        }
    }
}
</script>

<style scoped>
/* Page Layout */
.page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; }
.header-content h1 { font-family: 'Bangers'; font-size: 3rem; margin: 0; color: #1e293b; line-height: 1; }
.header-content p { color: #888; font-weight: bold; margin: 10px 0 0 0; }

.btn-create {
  background: var(--blue-aratsu);
  color: white;
  border: 4px solid var(--black-outline);
  padding: 15px 30px;
  border-radius: 15px;
  font-family: 'Bangers';
  font-size: 1.4rem;
  letter-spacing: 2px;
  cursor: pointer;
  box-shadow: 6px 6px 0 var(--black-outline);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-create:hover { transform: translate(-2px, -2px); box-shadow: 8px 8px 0 var(--black-outline); }

/* Toolbar */
.table-toolbar { display: flex; gap: 20px; margin-bottom: 30px; }
.search-wrap { flex: 1; background: white; border: 3px solid var(--black-outline); border-radius: 12px; padding: 12px 20px; display: flex; align-items: center; gap: 15px; box-shadow: 4px 4px 0 var(--black-outline); }
.search-wrap input { border: none; outline: none; background: transparent; width: 100%; font-size: 1rem; font-weight: bold; }
.filter-wrap select { background: white; border: 3px solid var(--black-outline); border-radius: 12px; padding: 12px 20px; font-family: 'Bangers'; font-size: 1.1rem; box-shadow: 4px 4px 0 var(--black-outline); outline: none; }

/* Table Styling */
.modern-card { background: white; border: 5px solid var(--black-outline); border-radius: 20px; box-shadow: 12px 12px 0 var(--black-outline); overflow: hidden; }
.table-overflow { overflow-x: auto; }
.modern-table { width: 100%; border-collapse: collapse; text-align: left; }
.modern-table th { background: #f8fafc; padding: 20px; font-family: 'Bangers'; font-size: 1.2rem; border-bottom: 4px solid var(--black-outline); }
.modern-table td { padding: 20px; border-bottom: 1px solid #e2e8f0; vertical-align: middle; }

/* Product Info */
.product-wrap { display: flex; align-items: center; gap: 15px; }
.product-img-box { width: 60px; height: 60px; background: #f1f5f9; border: 2px solid var(--black-outline); border-radius: 10px; display: flex; align-items: center; justify-content: center; padding: 5px; }
.product-img-box img { max-width: 100%; max-height: 100%; }
.product-name-info { display: flex; flex-direction: column; gap: 4px; }
.main-name { font-family: 'Bangers'; font-size: 1.3rem; color: #1e293b; }
.new-badge { display: inline-block; background: var(--red-no); color: white; font-size: 0.6rem; padding: 2px 6px; border-radius: 4px; width: fit-content; font-weight: 800; font-family: 'Inter', sans-serif; -webkit-text-stroke: 0; }

.cat-label { font-weight: 800; color: var(--blue-aratsu); font-size: 0.8rem; letter-spacing: 1px; }
.price-label { font-family: 'Bangers'; font-size: 1.2rem; }

.stock-display { display: flex; align-items: baseline; gap: 4px; }
.stock-num { font-family: 'Bangers'; font-size: 1.5rem; color: var(--black-outline); }
.stock-unit { font-size: 0.7rem; font-weight: 800; color: #94a3b8; }
.stock-display.low-stock .stock-num { color: var(--red-no); }

.action-wrap { display: flex; gap: 8px; }
.btn-icon { width: 40px; height: 40px; border: 2px solid var(--black-outline); border-radius: 8px; background: white; cursor: pointer; transition: all 0.2s; }
.btn-icon:hover { transform: translateY(-3px); box-shadow: 3px 3px 0 var(--black-outline); }

/* Modal Styling */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); backdrop-filter: blur(5px); display: flex; align-items: center; justify-content: center; z-index: 2000; }
.modal-content { background: white; border: 5px solid var(--black-outline); border-radius: 20px; width: 90%; max-width: 550px; padding: 40px; box-shadow: 15px 15px 0 var(--black-outline); }
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
.modal-title { font-family: 'Bangers'; font-size: 2.5rem; }
.close-btn { background: none; border: none; font-size: 2.5rem; cursor: pointer; }
.modal-form { display: flex; flex-direction: column; gap: 20px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group label { font-family: 'Bangers'; font-size: 1.2rem; }
.form-group input, .form-group select { padding: 12px; border: 3px solid var(--black-outline); border-radius: 10px; font-size: 1rem; font-weight: bold; }
.btn-save { padding: 15px; font-family: 'Bangers'; background: var(--yellow-matsuri); border: 4px solid var(--black-outline); border-radius: 12px; font-size: 1.5rem; cursor: pointer; box-shadow: 5px 5px 0 var(--black-outline); margin-top: 10px; }
</style>
