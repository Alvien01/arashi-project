<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="confirmState.show" class="confirm-overlay" @click.self="closeConfirm(false)">
        <div :class="['confirm-card', confirmState.type]">
          <div class="confirm-header">
            <h3 class="confirm-title">{{ confirmState.title }}</h3>
            <button class="close-btn" @click="closeConfirm(false)">&times;</button>
          </div>
          <div class="confirm-body">
            <span class="confirm-icon">{{ getIcon(confirmState.type) }}</span>
            <p class="confirm-message">{{ confirmState.message }}</p>
          </div>
          <div class="confirm-actions">
            <button class="btn-cancel" @click="closeConfirm(false)">
              {{ confirmState.cancelText }}
            </button>
            <button class="btn-confirm" @click="closeConfirm(true)">
              {{ confirmState.confirmText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useNotification } from '~/composables/useNotification'

const { confirmState, closeConfirm } = useNotification()

const getIcon = (type) => {
  switch (type) {
    case 'danger': return '💀'
    case 'warning': return '⚠️'
    case 'info': return '❓'
    default: return '❓'
  }
}
</script>

<style scoped>
.confirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
}

.confirm-card {
  background: white;
  border: 6px solid var(--black-outline);
  border-radius: 24px;
  width: 100%;
  max-width: 450px;
  padding: 40px;
  box-shadow: 20px 20px 0 var(--black-outline);
  position: relative;
  overflow: hidden;
  animation: pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes pop-in {
  0% { transform: scale(0.5); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

.confirm-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.confirm-title {
  font-family: 'Bangers';
  font-size: 2.2rem;
  margin: 0;
  color: #1e293b;
  letter-spacing: 1px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2.5rem;
  cursor: pointer;
  color: #94a3b8;
}

.confirm-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
  margin-bottom: 35px;
}

.confirm-icon {
  font-size: 4rem;
  background: #f1f5f9;
  width: 100px;
  height: 100px;
  border: 4px solid var(--black-outline);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 6px 6px 0 var(--black-outline);
}

.confirm-message {
  font-size: 1.1rem;
  font-weight: bold;
  color: #475569;
  line-height: 1.6;
}

.confirm-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.btn-cancel,
.btn-confirm {
  padding: 18px;
  font-family: 'Bangers';
  font-size: 1.3rem;
  letter-spacing: 1.5px;
  border: 4px solid var(--black-outline);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 6px 6px 0 var(--black-outline);
}

.btn-cancel {
  background: #f1f5f9;
  color: #475569;
}

.btn-confirm {
  background: #ef4444; /* Danger color by default */
  color: white;
}

.confirm-card.danger .btn-confirm { background: #ef4444; }
.confirm-card.warning .btn-confirm { background: #f59e0b; }
.confirm-card.info .btn-confirm { background: #3b82f6; }

.btn-cancel:hover,
.btn-confirm:hover {
  transform: translate(-3px, -3px);
  box-shadow: 9px 9px 0 var(--black-outline);
}

.btn-cancel:active,
.btn-confirm:active {
  transform: translate(3px, 3px);
  box-shadow: 2px 2px 0 var(--black-outline);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
