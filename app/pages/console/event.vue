<template>
  <NuxtLayout name="console">
    <div class="console-page">
      <!-- Page Header -->
      <header class="page-header">
        <div class="header-content">
          <h1 class="page-title">EVENT MANAGEMENT</h1>
          <p class="page-subtitle">Create, monitor, and manage your Aratu events.</p>
        </div>
        <button class="btn-create" @click="openModal('create')">
          <span class="btn-icon">+</span> CREATE EVENT
        </button>
      </header>

      <!-- Search & Filters -->
      <div class="table-toolbar">
        <div class="search-wrap">
          <span class="search-icon">🔍</span>
          <input type="text" placeholder="Search events..." v-model="searchQuery">
        </div>
        <div class="filter-wrap">
          <select v-model="statusFilter">
            <option value="all">ALL STATUS</option>
            <option value="active">ACTIVE</option>
            <option value="finished">FINISHED</option>
          </select>
        </div>
      </div>

      <!-- Table Body -->
      <div class="modern-card no-padding">
        <div class="table-overflow">
          <table class="modern-table">
            <thead>
              <tr>
                <th>EVENT NAME</th>
                <th>LOCATION</th>
                <th>CREATED AT</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="event in filteredEvents" :key="event.id">
                <td class="td-name">
                  <div class="name-wrap">
                    <span class="main-name">{{ event.nama_event }}</span>
                    <span class="sub-name">{{ event.lokasi }}</span>
                  </div>
                </td>
                <td>
                   <span class="date">{{ event.created_at ? new Date(event.created_at).toLocaleDateString() : '-' }}</span>
                </td>
                <td>
                  <div class="badge active">{{ (event.status || 'ACTIVE').toUpperCase() }}</div>
                </td>
                <td>
                  <div class="action-wrap">
                    <button class="btn-icon edit" @click="openModal('edit', event)">✏️</button>
                    <button class="btn-icon delete" @click="handleDelete(event.id)">🗑️</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Quick Add/Edit Modal (Simplified) -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">{{ modalMode === 'create' ? 'NEW EVENT' : 'EDIT EVENT' }}</h2>
            <button class="close-btn" @click="showModal = false">&times;</button>
          </div>
          <form @submit.prevent="saveEvent" class="modal-form">
            <div class="form-row">
              <div class="form-group">
                <label>EVENT NAME</label>
                <input type="text" v-model="form.nama_event" required placeholder="Event Name">
              </div>
              <div class="form-group">
                <label>LOCATION</label>
                <input type="text" v-model="form.lokasi" required placeholder="Location">
              </div>
            </div>
            <div class="form-group">
              <label>DESCRIPTION</label>
              <textarea v-model="form.deskripsi" rows="3" placeholder="Description"></textarea>
            </div>
            <button type="submit" class="btn-save">SAVE EVENT</button>
          </form>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

const searchQuery = ref('')
const statusFilter = ref('all')
const showModal = ref(false)
const modalMode = ref('create')

const { getAllEvents, createEvent, updateEvent, deleteEvent } = useEvents()
const { success, error, confirm } = useNotification()

const events = ref([])
const fetchEvents = async () => {
    try {
        const { data: res } = await getAllEvents()
        if (res.value?.data) {
            events.value = res.value.data
        }
    } catch (error) {
        console.error('Failed to fetch events:', error)
    }
}

onMounted(() => {
    fetchEvents()
})

const form = reactive({ 
  id: null, 
  nama_event: '', 
  lokasi: '', 
  deskripsi: '', 
  poster: null 
})

const filteredEvents = computed(() => {
    if (!events.value) return []
    return events.value.filter(e => {
        const matchesSearch = (e.nama_event || '').toLowerCase().includes(searchQuery.value.toLowerCase())
        return matchesSearch
    })
})

const openModal = (mode, event = null) => {
    modalMode.value = mode
    if (event) {
        Object.assign(form, event)
    } else {
        Object.assign(form, { 
          id: null, 
          nama_event: '', 
          lokasi: '', 
          deskripsi: '', 
          poster: null 
        })
    }
    showModal.value = true
}

const saveEvent = async () => {
    try {
        if (modalMode.value === 'create') {
            await createEvent({ ...form })
        } else {
            await updateEvent(form.id, { ...form })
        }
        await fetchEvents()
        showModal.value = false
        success(`Event successfully ${modalMode.value === 'create' ? 'created' : 'updated'}!`)
    } catch (err) {
        error('Failed to save event. Please check your data.')
    }
}

const handleDelete = async (id) => {
    const isConfirmed = await confirm({
        title: 'DELETE EVENT?',
        message: 'Are you sure? This action is irreversible!',
        confirmText: 'YES, DELETE',
        cancelText: 'CANCEL',
        type: 'danger'
    })

    if (isConfirmed) {
        try {
            await deleteEvent(id)
            await fetchEvents()
            success('Event has been deleted successfully.')
        } catch (err) {
            error('Failed to delete event.')
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
.btn-create:active { transform: translate(4px, 4px); box-shadow: 2px 2px 0 var(--black-outline); }

/* Table Toolbar */
.table-toolbar { display: flex; gap: 20px; margin-bottom: 30px; }
.search-wrap { flex: 1; background: white; border: 3px solid var(--black-outline); border-radius: 12px; padding: 12px 20px; display: flex; align-items: center; gap: 15px; box-shadow: 4px 4px 0 var(--black-outline); }
.search-icon { font-size: 1.2rem; }
.search-wrap input { border: none; outline: none; background: transparent; width: 100%; font-size: 1rem; font-weight: bold; }

.filter-wrap select { background: white; border: 3px solid var(--black-outline); border-radius: 12px; padding: 0 20px; font-family: 'Bangers'; font-size: 1.1rem; box-shadow: 4px 4px 0 var(--black-outline); outline: none; }

/* Modern Card Layout */
.modern-card { background: white; border: 5px solid var(--black-outline); border-radius: 20px; box-shadow: 12px 12px 0 var(--black-outline); overflow: hidden; }
.table-overflow { overflow-x: auto; }

.modern-table { width: 100%; border-collapse: collapse; text-align: left; }
.modern-table th { background: #f8fafc; padding: 20px; font-family: 'Bangers'; font-size: 1.2rem; border-bottom: 4px solid var(--black-outline); }
.modern-table td { padding: 20px; border-bottom: 1px solid #e2e8f0; }

.td-name .name-wrap { display: flex; flex-direction: column; }
.main-name { font-family: 'Bangers'; font-size: 1.4rem; color: var(--blue-aratsu); }
.sub-name { font-size: 0.8rem; color: #94a3b8; font-weight: 800; }

.date-wrap { font-weight: 800; line-height: 1.2; }
.date-wrap .time { color: #94a3b8; font-size: 0.8rem; }

.ticket-stat { font-family: 'Bangers'; font-size: 1.2rem; }
.ticket-stat .sold { color: var(--red-no); }

.badge { padding: 8px 15px; border-radius: 50px; font-weight: 800; font-size: 0.7rem; border: 2px solid var(--black-outline); display: inline-block; }
.badge.active { background: #dcfce7; color: #166534; }
.badge.finished { background: #fee2e2; color: #991b1b; }

.action-wrap { display: flex; gap: 8px; }
.btn-icon { width: 40px; height: 40px; border: 2px solid var(--black-outline); border-radius: 8px; background: white; cursor: pointer; transition: all 0.2s; }
.btn-icon:hover { transform: translateY(-3px); box-shadow: 3px 3px 0 var(--black-outline); }

/* Modal Styling */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); backdrop-filter: blur(5px); display: flex; align-items: center; justify-content: center; z-index: 2000; }
.modal-content { background: white; border: 5px solid var(--black-outline); border-radius: 20px; width: 90%; max-width: 600px; padding: 40px; position: relative; box-shadow: 15px 15px 0 var(--black-outline); }
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
.modal-title { font-family: 'Bangers'; font-size: 2.5rem; margin: 0; }
.close-btn { background: none; border: none; font-size: 2.5rem; cursor: pointer; }

.modal-form { display: flex; flex-direction: column; gap: 20px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group label { font-family: 'Bangers'; font-size: 1.2rem; }
.form-group input { padding: 12px; border: 3px solid var(--black-outline); border-radius: 10px; font-size: 1rem; }

.btn-save { padding: 15px; font-family: 'Bangers'; background: var(--yellow-matsuri); border: 4px solid var(--black-outline); border-radius: 12px; font-size: 1.5rem; cursor: pointer; box-shadow: 5px 5px 0 var(--black-outline); transition: all 0.2s; margin-top: 10px; }
.btn-save:active { transform: translate(3px, 3px); box-shadow: 1px 1px 0 var(--black-outline); }
</style>
