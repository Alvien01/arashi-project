<template>
  <nav class="nav-container">
    <div class="nav-logo">
      <NuxtLink to="/">
        <img src="/logo-aratu.png" alt="Aratsu Logo">
      </NuxtLink>
    </div>
    
    <!-- Desktop Links -->
    <div class="nav-links desktop-only">
      <NuxtLink to="/" class="nav-link">HOME</NuxtLink>
      <NuxtLink to="/event" class="nav-link">EVENT</NuxtLink>
      <NuxtLink to="/about" class="nav-link">ABOUT</NuxtLink>
      <NuxtLink to="/merch" class="nav-link">MERCH</NuxtLink>
    </div>

    <div class="nav-actions">
       <a href="#tickets" class="nav-cta desktop-only">GET TICKETS</a>
       
       <!-- Hamburger Button (Mobile Only) -->
       <button 
         v-if="isMobile"
         :class="['hamburger-btn', 'mobile-only', { 'is-active': isSidebarOpen }]" 
         @click="isSidebarOpen = !isSidebarOpen" 
         aria-label="Toggle Menu"
       >
         <span class="bar top"></span>
         <span class="bar mid"></span>
         <span class="bar bot"></span>
       </button>
    </div>

    <!-- Mobile Sidebar Overlay -->
    <Transition name="fade">
      <div v-if="isSidebarOpen && isMobile" class="sidebar-overlay" @click="isSidebarOpen = false"></div>
    </Transition>

    <!-- Mobile Sidebar Content -->
    <Transition name="slide">
      <div v-if="isSidebarOpen && isMobile" class="nav-sidebar">
        <div class="sidebar-inner">
          <div class="sidebar-header">
            <img src="/logo-aratu.png" alt="Aratsu Logo" class="sidebar-logo">
            <button class="close-btn-round" @click="isSidebarOpen = false">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div class="sidebar-links">
            <NuxtLink to="/" class="sidebar-link" @click="isSidebarOpen = false">
              <span class="link-text">HOME</span>
            </NuxtLink>
            <NuxtLink to="/event" class="sidebar-link" @click="isSidebarOpen = false">
              <span class="link-text">EVENT</span>
            </NuxtLink>
            <NuxtLink to="/#schedule" class="sidebar-link" @click="isSidebarOpen = false">
              <span class="link-text">SCHEDULE</span>
            </NuxtLink>
            <NuxtLink to="/about" class="sidebar-link" @click="isSidebarOpen = false">
              <span class="link-text">ABOUT</span>
            </NuxtLink>
            <NuxtLink to="/merch" class="sidebar-link" @click="isSidebarOpen = false">
              <span class="link-text">MERCH</span>
            </NuxtLink>
          </div>

          <div class="sidebar-footer">
            <a href="#tickets" class="nav-cta sidebar-cta-full" @click="isSidebarOpen = false">GET TICKETS</a>
            <div class="sidebar-socials">
              <p>FOLLOW US</p>
              <div class="social-icons">
                <a href="#" class="social-mini"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                <a href="#" class="social-mini"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const isSidebarOpen = ref(false)
const isMobile = ref(false)

const checkMobile = () => {
  if (process.client) {
    isMobile.value = window.innerWidth <= 768
    if (!isMobile.value) isSidebarOpen.value = false
  }
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

// Prevent scroll when sidebar is open
watch(isSidebarOpen, (val) => {
  if (process.client) {
    document.body.style.overflow = (val && isMobile.value) ? 'hidden' : ''
  }
})
</script>

<style scoped>
.desktop-only { display: flex; }
.mobile-only { display: none; }

/* Hamburger Button */
.hamburger-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  background: var(--yellow-matsuri);
  border: 3px solid var(--black-outline);
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 3px 3px 0 var(--black-outline);
  z-index: 1100;
  padding: 0;
  transition: all 0.2s ease;
}

.hamburger-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0 var(--black-outline);
}

.bar {
  width: 24px;
  height: 3px;
  background-color: var(--black-outline);
  border-radius: 10px;
  transition: all 0.3s ease;
  position: absolute;
}

.bar.top { transform: translateY(-8px); }
.bar.bot { transform: translateY(8px); }

.hamburger-btn.is-active .bar.top { transform: rotate(45deg); }
.hamburger-btn.is-active .bar.mid { opacity: 0; }
.hamburger-btn.is-active .bar.bot { transform: rotate(-45deg); }

/* Sidebar Background Overlay */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  z-index: 1000;
}

/* Sidebar Container */
.nav-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 85%;
  max-width: 350px;
  height: 100vh;
  background: white;
  z-index: 1001;
  border-left: 5px solid var(--black-outline);
  box-shadow: -10px 0 30px rgba(0,0,0,0.2);
}

.sidebar-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 25px;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.sidebar-logo {
  height: 50px;
  filter: drop-shadow(2px 2px 0 white);
}

.close-btn-round {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--black-outline);
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--black-outline);
  transition: all 0.2s;
}

.close-btn-round:hover {
  background: var(--red-no);
  color: white;
}

.sidebar-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
}

.sidebar-link {
  text-decoration: none;
  font-family: 'Bangers', cursive;
  font-size: 2.2rem;
  color: var(--black-outline);
  padding: 15px 20px;
  border: 3px solid transparent;
  border-radius: 12px;
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  letter-spacing: 1.5px;
  -webkit-text-stroke: 1px white;
  text-shadow: 2px 2px 0 var(--black-outline);
}

.sidebar-link:active, .sidebar-link.router-link-active {
  background: var(--blue-aratsu);
  color: white;
  border-color: var(--black-outline);
  transform: translateX(10px);
  -webkit-text-stroke: 1px var(--black-outline);
}

.sidebar-footer {
  margin-top: auto;
  padding-top: 20px;
  border-top: 2px dashed #ddd;
}

.sidebar-cta-full {
  display: block;
  text-align: center;
  font-size: 1.8rem;
  padding: 15px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 25px;
}

.sidebar-socials {
  text-align: center;
}

.sidebar-socials p {
  font-family: 'Bangers';
  font-size: 1.2rem;
  color: #999;
  margin-bottom: 10px;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.social-mini {
  width: 40px;
  height: 40px;
  background: var(--black-outline);
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.social-mini:active {
  transform: scale(0.9);
}

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-enter-active, .slide-leave-active { transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }

@media (max-width: 768px) {
  .desktop-only { display: none !important; }
  .mobile-only { display: flex; }
}
</style>
