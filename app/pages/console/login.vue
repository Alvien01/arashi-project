<template>
  <div class="login-page">
    <div class="patterns-bg"></div>
    
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <img src="/logo-aratu.png" alt="Aratsu Logo" class="login-logo">
          <h1 class="login-title">
            <span class="title-aratsu">ARATU</span>
            <span class="title-no">NO</span>
            <span class="title-matsuri">MATSURI</span>
          </h1>
          <p class="login-subtitle">Dashboard Management System</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email">EMAIL</label>
            <div class="input-wrapper">
              <input 
                type="email" 
                id="email" 
                v-model="loginData.email" 
                placeholder="Enter your email"
                required
              >
            </div>
          </div>

          <div class="form-group">
            <label for="password">PASSWORD</label>
            <div class="input-wrapper">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                id="password" 
                v-model="loginData.password" 
                placeholder="Enter your password"
                required
              >
              <button 
                type="button" 
                class="password-toggle" 
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? 'HIDE' : 'SHOW' }}
              </button>
            </div>
          </div>

          <button type="submit" class="login-btn" :disabled="isLoading">
            {{ isLoading ? 'LOGGING IN...' : 'LOGIN TO DASHBOARD' }}
          </button>
        </form>

        <div class="login-footer">
          <NuxtLink to="/" class="back-home">← BACK TO HOME</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

definePageMeta({
  layout: false // Disable usual layout if any, to keep login clean
})

const showPassword = ref(false)
const isLoading = ref(false)
const loginData = reactive({
  email: '',
  password: ''
})

const { login } = useAuth()
const router = useRouter()

const handleLogin = async () => {
  isLoading.value = true
  try {
    const result = await login({
      email: loginData.email,
      password: loginData.password
    })

    if (result.success) {
      router.push('/console/dashboard')
    } else {
      alert(result.message || 'Login failed')
    }
  } catch (error) {
    alert('An error occurred during login')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: radial-gradient(circle, #ffffff 0%, #f0f0f0 100%);
  position: relative;
  overflow: hidden;
}

.login-container {
  width: 100%;
  max-width: 450px;
  position: relative;
  z-index: 10;
}

.login-card {
  background: white;
  border: 4px solid var(--black-outline);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 12px 12px 0 var(--black-outline);
}

.login-header {
  text-align: center;
  margin-bottom: 35px;
}

.login-logo {
  height: 80px;
  margin-bottom: 15px;
}

.login-title {
  display: flex;
  justify-content: center;
  gap: 15px;
  font-size: 3rem;
  margin: 0;
}

.login-subtitle {
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  color: #777;
  font-size: 0.9rem;
  margin-top: 5px;
  letter-spacing: 1px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-family: 'Bangers';
  font-size: 1.4rem;
  color: var(--black-outline);
  letter-spacing: 1px;
}

.input-wrapper {
  position: relative;
}

.form-group input {
  width: 100%;
  padding: 15px 20px;
  box-sizing: border-box;
  border: 3px solid var(--black-outline);
  border-radius: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  outline: none;
  transition: all 0.2s;
}

.form-group input:focus {
  border-color: var(--blue-aratsu);
  box-shadow: 4px 4px 0 var(--black-outline);
}

.password-toggle {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-family: 'Bangers';
  color: var(--blue-aratsu);
  cursor: pointer;
  font-size: 1.1rem;
}

.login-btn {
  margin-top: 10px;
  padding: 15px;
  font-family: 'Bangers';
  font-size: 1.8rem;
  background: var(--yellow-matsuri);
  color: var(--black-outline);
  border: 4px solid var(--black-outline);
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 6px 6px 0 var(--black-outline);
  transition: all 0.2s;
  letter-spacing: 1.5px;
}

.login-btn:hover {
  transform: translateY(-3px);
  box-shadow: 8px 8px 0 var(--black-outline);
  background: var(--red-no);
  color: white;
}

.login-btn:active {
  transform: translate(3px, 3px);
  box-shadow: 2px 2px 0 var(--black-outline);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.login-footer {
  margin-top: 30px;
  text-align: center;
}

.back-home {
  text-decoration: none;
  font-family: 'Bangers';
  color: #999;
  font-size: 1.2rem;
  transition: color 0.2s;
}

.back-home:hover {
  color: var(--blue-aratsu);
}

@media (max-width: 480px) {
  .login-card {
    padding: 30px 20px;
  }
  .login-title {
    font-size: 2.2rem;
  }
}
</style>
