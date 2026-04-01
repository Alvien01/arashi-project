<template>
  <NuxtLayout name="console">
    <div class="dashboard-page">
      <h1 class="page-title">CONSOLE DASHBOARD</h1>
      <p class="page-desc">Overview of your event stats and data</p>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-label">TOTAL TICKET SOLD</div>
          <div class="stat-value">{{ tickets.length }}</div>
          <div class="stat-trend">+12% from last month</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">TOTAL REVENUE (NET)</div>
          <div class="stat-value">Rp {{ totalRevenue.toLocaleString() }}</div>
          <div class="stat-trend">+5% from last month</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">TOTAL USERS</div>
          <div class="stat-value">{{ userCount }}</div>
          <div class="stat-trend">+2 new today</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">ACTIVE EVENTS</div>
          <div class="stat-value">{{ eventCount }}</div>
          <div class="stat-trend">{{ latestEventName }} is running</div>
        </div>
      </div>

      <div class="recent-activity section-card">
        <h2 class="section-title">RECENT TICKET SALES</h2>
        <div class="table-container">
          <table class="console-table">
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>BUYER NAME</th>
                <th>TICKET TYPE</th>
                <th>DATE</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ticket in recentTickets" :key="ticket.id">
                <td>#{{ ticket.id }}</td>
                <td>{{ ticket.nama_pembeli || ticket.user_name || 'N/A' }}</td>
                <td>{{ (ticket.jenis_tiket || ticket.type || '').toUpperCase() }}</td>
                <td>{{ ticket.created_at ? new Date(ticket.created_at).toLocaleDateString() : '-' }}</td>
                <td><span :class="['badge', (ticket.status || 'pending').toLowerCase()]">{{ (ticket.status || 'PENDING').toUpperCase() }}</span></td>
              </tr>
              <tr v-if="recentTickets.length === 0">
                <td colspan="5" style="text-align: center; padding: 30px;">No recent ticket sales found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const { getAllTickets } = useTickets()
const { getAllUsers } = useUsers()
const { getAllEvents } = useEvents()

const tickets = ref([])
const events = ref([])
const userCount = ref(0)
const eventCount = ref(0)

const fetchDashboardData = async () => {
    try {
        // Fetch tickets for table & revenue
        const { data: ticketRes } = await getAllTickets()
        if (ticketRes.value?.data) {
          tickets.value = ticketRes.value.data
        }

        // Fetch users for count
        const { data: userRes } = await getAllUsers()
        if (userRes.value?.data) {
          userCount.value = userRes.value.data.length
        }

        // Fetch events for count
        const { data: eventRes } = await getAllEvents()
        if (eventRes.value?.data) {
          events.value = eventRes.value.data
          eventCount.value = events.value.length
        }
    } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
    }
}

onMounted(() => {
    fetchDashboardData()
})

const recentTickets = computed(() => {
    return Array.isArray(tickets.value) ? tickets.value.slice(0, 5) : []
})

const latestEventName = computed(() => {
  if (!events.value.length) return 'No events'
  // Get the most recent event by created_at if possible, otherwise just the first
  return events.value[0].nama_event || 'General Event'
})

const totalRevenue = computed(() => {
  if (!Array.isArray(tickets.value)) return 0
  return tickets.value.reduce((total, t) => total + (Number(t.price) || 0), 0)
})
</script>

<style scoped>
.dashboard-page {
  animation: fadeIn 0.5s ease-out;
}

.page-title {
  font-family: 'Bangers';
  font-size: 2.5rem;
  margin-bottom: 5px;
}

.page-desc {
  color: #888;
  margin-bottom: 40px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  padding: 25px;
  border-radius: 15px;
  border: 4px solid var(--black-outline);
  box-shadow: 6px 6px 0 var(--black-outline);
}

.stat-label {
  font-family: 'Bangers';
  font-size: 1.1rem;
  color: #888;
  margin-bottom: 15px;
}

.stat-value {
  font-family: 'Bangers';
  font-size: 2.2rem;
  color: var(--blue-aratsu);
  margin-bottom: 10px;
}

.stat-trend {
  font-size: 0.8rem;
  font-weight: bold;
  color: #25D366;
}

.section-card {
  background: white;
  padding: 30px;
  border-radius: 15px;
  border: 4px solid var(--black-outline);
  box-shadow: 8px 8px 0 var(--black-outline);
}

.section-title {
  font-family: 'Bangers';
  font-size: 1.8rem;
  margin-bottom: 25px;
  border-bottom: 2px dashed #eee;
  padding-bottom: 15px;
}

.table-container {
  overflow-x: auto;
}

.console-table {
  width: 100%;
  border-collapse: collapse;
}

.console-table th {
  text-align: left;
  padding: 15px;
  border-bottom: 2px solid #333;
  font-family: 'Bangers';
  font-size: 1.2rem;
  letter-spacing: 1px;
}

.console-table td {
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.badge {
  padding: 5px 12px;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: bold;
  border: 2px solid var(--black-outline);
}

.badge.success { background: #dcfce7; color: #166534; }
.badge.warning { background: #fef9c3; color: #854d0e; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
