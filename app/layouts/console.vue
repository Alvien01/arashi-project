<template>
  <div class="console-layout">
    <!-- Sidebar -->
    <aside :class="['console-sidebar', { 'is-collapsed': isCollapsed }]">
      <div class="sidebar-header">
        <div class="brand-box">
          <img src="/logo-aratu.png" alt="Aratu Logo" class="brand-img">
          <span v-if="!isCollapsed" class="brand-name">
            <span class="t-aratsu">ARATU</span>
            <span class="t-console">CONSOLE</span>
          </span>
        </div>
        <button class="collapse-toggle" @click="isCollapsed = !isCollapsed">
          {{ isCollapsed ? '→' : '←' }}
        </button>
      </div>
      
      <nav class="sidebar-nav">
        <div class="nav-section" v-if="!isCollapsed">MAIN MENU</div>
        <NuxtLink to="/console/dashboard" class="nav-item" title="Dashboard">
          <div class="nav-icon">📊</div>
          <span v-if="!isCollapsed" class="nav-text">DASHBOARD</span>
        </NuxtLink>
        <NuxtLink to="/console/event" class="nav-item" title="Events">
          <div class="nav-icon">📅</div>
          <span v-if="!isCollapsed" class="nav-text">EVENTS</span>
        </NuxtLink>
        <NuxtLink to="/console/user" class="nav-item" title="Users">
          <div class="nav-icon">👤</div>
          <span v-if="!isCollapsed" class="nav-text">USERS</span>
        </NuxtLink>
        <NuxtLink to="/console/merch" class="nav-item" title="Merchandise">
          <div class="nav-icon">🛍️</div>
          <span v-if="!isCollapsed" class="nav-text">MERCHANDISE</span>
        </NuxtLink>
        <NuxtLink to="/console/ticket" class="nav-item" title="Tickets">
          <div class="nav-icon">🎟️</div>
          <span v-if="!isCollapsed" class="nav-text">TICKETS</span>
        </NuxtLink>
      </nav>

      <div class="sidebar-footer">
        <NuxtLink to="/" class="nav-item logout" title="Exit to Site">
          <div class="nav-icon">🚪</div>
          <span v-if="!isCollapsed" class="nav-text">EXIT TO SITE</span>
        </NuxtLink>
        <div v-if="!isCollapsed" class="admin-profile">
          <div class="avatar">AD</div>
          <div class="admin-info">
            <span class="name">ADMIN ARATU</span>
            <span class="role">SUPER USER</span>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main :class="['console-main', { 'expanded': isCollapsed }]">
      <header class="console-topbar">
        <div class="breadcrumb">
          ADMIN / <span class="active-crumb">{{ currentPage }}</span>
        </div>
        <div class="topbar-right">
          <div class="search-mini">
            🔍 <span>Search...</span>
          </div>
          <div class="notifications">🔔</div>
        </div>
      </header>

      <div class="content-wrapper">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const isCollapsed = ref(false)
const route = useRoute()

const currentPage = computed(() => {
  const path = route.path.split('/')
  return path[path.length - 1].toUpperCase()
})
</script>

<style scoped>
.console-layout {
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
}

/* Sidebar Styling - Modern Dark Glass */
.console-sidebar {
  width: 280px;
  background: #0f172a; /* Slate 900 */
  color: #94a3b8;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.console-sidebar.is-collapsed {
  width: 80px;
}

.sidebar-header {
  padding: 25px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.brand-box {
  display: flex;
  align-items: center;
  gap: 12px;
  overflow: hidden;
}

.brand-img {
  height: 35px;
  width: auto;
}

.brand-name {
  font-family: 'Bangers';
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.t-aratsu { color: white; }
.t-console { color: var(--yellow-matsuri); font-size: 0.9rem; letter-spacing: 2px; }

.collapse-toggle {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  border-radius: 8px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 1rem;
}

.sidebar-nav {
  padding: 30px 15px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-section {
  font-size: 0.7rem;
  font-weight: 800;
  color: #475569;
  letter-spacing: 2px;
  margin-bottom: 8px;
  padding-left: 10px;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  color: #94a3b8;
  text-decoration: none;
  font-family: 'Bangers';
  font-size: 1.1rem;
  letter-spacing: 1.5px;
  border-radius: 12px;
  transition: all 0.3s;
  white-space: nowrap;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: white;
}

.nav-item.router-link-active {
  background: var(--blue-aratsu);
  color: white;
  box-shadow: 0 10px 15px -3px rgba(46, 134, 193, 0.3);
}

.nav-icon {
  width: 30px;
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
}

.sidebar-footer {
  padding: 20px;
  background: rgba(0,0,0,0.2);
}

.logout {
  color: #ef4444;
  margin-bottom: 20px;
}

.admin-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  background: rgba(255,255,255,0.03);
  border-radius: 15px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--yellow-matsuri);
  color: var(--black-outline);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  flex-shrink: 0;
}

.admin-info {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.admin-info .name {
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
}

.admin-info .role {
  font-size: 0.7rem;
  color: #64748b;
}

/* Main Content Styling */
.console-main {
  flex-grow: 1;
  margin-left: 280px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.console-main.expanded {
  margin-left: 80px;
}

.console-topbar {
  height: 80px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 90;
}

.breadcrumb {
  font-weight: 800;
  color: #cbd5e1;
  font-size: 0.8rem;
  letter-spacing: 1px;
}

.active-crumb {
  color: #1e293b;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 25px;
}

.search-mini {
  background: #f1f5f9;
  padding: 10px 20px;
  border-radius: 10px;
  color: #94a3b8;
  font-size: 0.9rem;
  min-width: 200px;
  cursor: pointer;
}

.content-wrapper {
  padding: 40px;
  max-width: 1400px;
  margin: 0 auto;
}

@media (max-width: 1024px) {
  .console-sidebar {
    width: 80px;
  }
  .console-main {
    margin-left: 80px;
  }
}
</style>
