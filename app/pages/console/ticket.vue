<template>
  <NuxtLayout name="console">
    <div class="console-page">
      <div class="header-actions">
        <h1 class="page-title">TICKET MANAGEMENT</h1>
        <div class="search-box">
          <input type="text" placeholder="Search by Order ID or Name..." v-model="searchQuery">
        </div>
      </div>

      <div class="section-card">
        <div class="table-container">
          <table class="console-table">
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>BUYER NAME</th>
                <th>TICKET TYPE</th>
                <th>ORDER DATE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#ORD-1001</td>
                <td>Alvien Arashi</td>
                <td><span class="ticket-type vip">VIP PASS</span></td>
                <td>Mar 30, 2026</td>
                <td><span class="badge success">PAID</span></td>
                <td>
                  <button class="action-btn-outline">VIEW DETAILS</button>
                </td>
              </tr>
              <tr>
                <td>#ORD-1002</td>
                <td>Budi Doremi</td>
                <td><span class="ticket-type active">REGULAR</span></td>
                <td>Mar 30, 2026</td>
                <td><span class="badge warning">PENDING</span></td>
                <td>
                  <button class="action-btn-outline">VIEW DETAILS</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref } from 'vue'
const searchQuery = ref('')
</script>

<style scoped>
/* Page Styles */
.console-page { animation: fadeIn 0.4s ease-out; }
.header-actions { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; gap: 20px; flex-wrap: wrap; }
.page-title { font-family: 'Bangers'; font-size: 2.5rem; margin: 0; }
.section-card { background: white; padding: 30px; border-radius: 15px; border: 4px solid var(--black-outline); box-shadow: 8px 8px 0 var(--black-outline); }

/* Search Box */
.search-box input { padding: 12px 20px; border: 3px solid var(--black-outline); border-radius: 10px; width: 300px; font-size: 1rem; outline: none; }
.search-box input:focus { border-color: var(--blue-aratsu); box-shadow: 4px 4px 0 var(--black-outline); }

/* Table Elements */
.table-container { overflow-x: auto; }
.console-table { width: 100%; border-collapse: collapse; }
.console-table th { text-align: left; padding: 15px; border-bottom: 2px solid #333; font-family: 'Bangers'; font-size: 1.2rem; }
.console-table td { padding: 15px; border-bottom: 1px solid #eee; }

/* Ticket Styles */
.ticket-type { font-weight: bold; font-family: 'Bangers'; letter-spacing: 1px; font-size: 0.9rem; }
.ticket-type.vip { color: #8b5cf6; }
.ticket-type.active { color: var(--blue-aratsu); }

/* Badges */
.badge { padding: 5px 12px; border-radius: 50px; font-size: 0.8rem; font-weight: bold; border: 2px solid var(--black-outline); }
.badge.success { background: #dcfce7; color: #166534; }
.badge.warning { background: #fef9c3; color: #854d0e; }

/* Action Button */
.action-btn-outline { font-family: 'Bangers'; padding: 8px 15px; border: 3px solid var(--black-outline); background: transparent; border-radius: 8px; cursor: pointer; transition: all 0.2s; letter-spacing: 1px; }
.action-btn-outline:hover { background: var(--black-outline); color: white; }

@keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
</style>
