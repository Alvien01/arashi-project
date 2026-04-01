<template>
  <NuxtLayout name="console">
    <div class="console-page">
      <header class="page-header">
        <div class="header-content">
          <h1 class="page-title">USER MANAGEMENT</h1>
          <p class="page-subtitle">Manage administrative accounts and permissions.</p>
        </div>
        <button class="btn-create" @click="openModal('create')">
          <span class="btn-icon">+</span> ADD NEW USER
        </button>
      </header>

      <div class="table-toolbar">
        <div class="search-wrap">
          <span class="search-icon">🔍</span>
          <input type="text" placeholder="Search users by name or email..." v-model="searchQuery">
        </div>
        <div class="filter-wrap">
          <select v-model="roleFilter">
            <option value="all">ALL ROLES</option>
            <option value="admin">ADMIN</option>
            <option value="user">USER</option>
          </select>
        </div>
      </div>

      <div class="modern-card no-padding">
        <div class="table-overflow">
          <table class="modern-table">
            <thead>
              <tr>
                <th>USER INFO</th>
                <th>ROLE</th>
                <th>CREATED AT</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredUsers" :key="user.id">
                <td class="td-user">
                  <div class="user-wrap">
                    <div class="user-avatar">{{ (user.name || '').charAt(0) }}</div>
                    <div class="user-details">
                      <span class="user-fullname">{{ user.name }}</span>
                      <span class="user-email">{{ user.email }}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span :class="['badge-role', (user.role || '').toLowerCase()]">{{ (user.role || '').toUpperCase() }}</span>
                </td>
                <td>
                  <span class="last-login">{{ user.created_at ? new Date(user.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-' }}</span>
                </td>
                <td>
                  <div class="action-wrap">
                    <button class="btn-icon edit" @click="openModal('edit', user)">✏️</button>
                    <button class="btn-icon delete" @click="handleDelete(user.id)">🗑️</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- User Modal -->
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">{{ modalMode === 'create' ? 'NEW USER' : 'EDIT USER' }}</h2>
            <button class="close-btn" @click="showModal = false">&times;</button>
          </div>
          <form @submit.prevent="saveUser" class="modal-form">
            <div class="form-group">
              <label>FULL NAME</label>
              <input type="text" v-model="form.name" required maxlength="100" placeholder="Max 100 characters">
            </div>
            <div class="form-group">
              <label>EMAIL ADDRESS</label>
              <input type="email" v-model="form.email" required maxlength="255" placeholder="user@example.com">
            </div>
            <div class="form-group" v-if="modalMode === 'create'">
              <label>PASSWORD</label>
              <input type="password" v-model="form.password" required minlength="6" placeholder="Min 6 characters">
            </div>
            <div class="form-group">
              <label>ROLE</label>
              <select v-model="form.role">
                <option value="admin">ADMIN</option>
                <option value="user">USER</option>
              </select>
            </div>
            <button type="submit" class="btn-save">SAVE USER</button>
          </form>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

const searchQuery = ref('')
const roleFilter = ref('all')
const showModal = ref(false)
const modalMode = ref('create')

const { getAllUsers, createUser, updateUser, deleteUser } = useUsers()
const { success, error, confirm } = useNotification()

const users = ref([])
const fetchUsers = async () => {
    try {
        const { data: res } = await getAllUsers()
        if (res.value?.data) {
            users.value = res.value.data
        }
    } catch (error) {
        console.error('Failed to fetch users:', error)
    }
}

onMounted(() => {
    fetchUsers()
})

const form = reactive({ id: null, name: '', email: '', password: '', role: 'user' })

const filteredUsers = computed(() => {
    if (!users.value) return []
    return users.value.filter(u => {
        const matchesSearch = (u.name || '').toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                              (u.email || '').toLowerCase().includes(searchQuery.value.toLowerCase())
        const matchesRole = roleFilter.value === 'all' || u.role === roleFilter.value
        return matchesSearch && matchesRole
    })
})

const openModal = (mode, user = null) => {
    modalMode.value = mode
    if (user) Object.assign(form, user)
    else Object.assign(form, { id: null, name: '', email: '', password: '', role: 'user' })
    showModal.value = true
}

const saveUser = async () => {
    try {
        if (modalMode.value === 'create') {
            await createUser({ name: form.name, email: form.email, password: form.password, role: form.role })
        } else {
            // Don't send password on update unless changed
            const updateData = { name: form.name, email: form.email, role: form.role }
            await updateUser(form.id, updateData)
        }
        await fetchUsers()
        showModal.value = false
        success(`User successfully ${modalMode.value === 'create' ? 'created' : 'updated'}!`)
    } catch (err) {
        error('Failed to save user info.')
    }
}

const handleDelete = async (id) => {
    const isConfirmed = await confirm({
        title: 'DELETE USER?',
        message: 'Are you sure you want to permanently delete this user account?',
        confirmText: 'DELETE ACCOUNT',
        cancelText: 'KEEP USER',
        type: 'danger'
    })

    if (isConfirmed) {
        try {
            await deleteUser(id)
            await fetchUsers()
            success('User account has been deleted.')
        } catch (err) {
            error('Failed to delete user.')
        }
    }
}
</script>

<style scoped>
/* Page Header */
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

/* Table Toolbar */
.table-toolbar { display: flex; gap: 20px; margin-bottom: 30px; }
.search-wrap { flex: 1; background: white; border: 3px solid var(--black-outline); border-radius: 12px; padding: 12px 20px; display: flex; align-items: center; gap: 15px; box-shadow: 4px 4px 0 var(--black-outline); }
.search-wrap input { border: none; outline: none; background: transparent; width: 100%; font-size: 1rem; font-weight: bold; }
.filter-wrap select { background: white; border: 3px solid var(--black-outline); border-radius: 12px; padding: 12px 12px; font-family: 'Bangers'; font-size: 1.1rem; box-shadow: 4px 4px 0 var(--black-outline); outline: none; }

/* Table Elements */
.modern-card { background: white; border: 5px solid var(--black-outline); border-radius: 20px; box-shadow: 12px 12px 0 var(--black-outline); overflow: hidden; }
.table-overflow { overflow-x: auto; }
.modern-table { width: 100%; border-collapse: collapse; text-align: left; }
.modern-table th { background: #f8fafc; padding: 20px; font-family: 'Bangers'; font-size: 1.2rem; border-bottom: 4px solid var(--black-outline); }
.modern-table td { padding: 20px; border-bottom: 1px solid #e2e8f0; vertical-align: middle; }

/* User Details */
.user-wrap { display: flex; align-items: center; gap: 15px; }
.user-avatar { width: 45px; height: 45px; background: var(--blue-aratsu); color: white; display: flex; align-items: center; justify-content: center; border-radius: 10px; font-family: 'Bangers'; font-size: 1.5rem; border: 2px solid var(--black-outline); }
.user-details { display: flex; flex-direction: column; gap: 2px; }
.user-fullname { font-family: 'Bangers'; font-size: 1.3rem; color: #1e293b; }
.user-email { font-size: 0.8rem; color: #94a3b8; font-weight: 800; }

.badge-role { padding: 6px 12px; border: 2px solid var(--black-outline); border-radius: 50px; font-size: 0.7rem; font-weight: 800; }
.badge-role.admin { background: #fef9c3; color: #854d0e; }
.badge-role.user { background: #f1f5f9; color: #475569; }

.last-login { font-weight: 800; font-size: 0.8rem; color: #94a3b8; }

.action-wrap { display: flex; gap: 8px; }
.btn-icon { width: 40px; height: 40px; border: 2px solid var(--black-outline); border-radius: 8px; background: white; cursor: pointer; transition: all 0.2s; }
.btn-icon:hover { transform: translateY(-3px); box-shadow: 3px 3px 0 var(--black-outline); }

/* Modal Styling */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); backdrop-filter: blur(5px); display: flex; align-items: center; justify-content: center; z-index: 2000; }
.modal-content { background: white; border: 5px solid var(--black-outline); border-radius: 20px; width: 90%; max-width: 500px; padding: 40px; box-shadow: 15px 15px 0 var(--black-outline); }
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
.modal-title { font-family: 'Bangers'; font-size: 2.5rem; }
.close-btn { background: none; border: none; font-size: 2.5rem; cursor: pointer; }
.modal-form { display: flex; flex-direction: column; gap: 20px; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group label { font-family: 'Bangers'; font-size: 1.2rem; }
.form-group input, .form-group select { padding: 12px; border: 3px solid var(--black-outline); border-radius: 10px; font-size: 1rem; font-weight: bold; }
.btn-save { padding: 15px; font-family: 'Bangers'; background: var(--yellow-matsuri); border: 4px solid var(--black-outline); border-radius: 12px; font-size: 1.5rem; cursor: pointer; box-shadow: 5px 5px 0 var(--black-outline); margin-top: 10px; }
</style>
