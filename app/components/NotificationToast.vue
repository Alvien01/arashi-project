<template>
  <Teleport to="body">
    <div class="toast-container">
      <TransitionGroup name="toast">
        <div 
          v-for="toast in toasts" 
          :key="toast.id" 
          :class="['toast-item', toast.type]"
          @click="removeToast(toast.id)"
        >
          <span class="toast-icon">{{ getIcon(toast.type) }}</span>
          <span class="toast-message">{{ toast.message }}</span>
          <button class="toast-close">&times;</button>
          <div v-if="toast.duration" class="toast-progress" :style="{ animationDuration: toast.duration + 'ms' }"></div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { useNotification } from '~/composables/useNotification'

const { toasts, removeToast } = useNotification()

const getIcon = (type) => {
  switch (type) {
    case 'success': return '✅'
    case 'error': return '❌'
    case 'warning': return '⚠️'
    case 'info': return 'ℹ️'
    default: return '🔔'
  }
}
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 9999;
  pointer-events: none;
}

.toast-item {
  pointer-events: auto;
  min-width: 300px;
  padding: 16px 24px;
  border-radius: 16px;
  background: white;
  border: 4px solid var(--black-outline);
  box-shadow: 6px 6px 0 var(--black-outline);
  display: flex;
  align-items: center;
  gap: 15px;
  font-family: 'Bangers';
  font-size: 1.2rem;
  letter-spacing: 1px;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
  position: relative;
  overflow: hidden;
}

.toast-item:hover {
  transform: translate(-3px, -3px);
  box-shadow: 9px 9px 0 var(--black-outline);
}

.toast-item.success {
  background: #dcfce7;
  color: #166534;
}

.toast-item.error {
  background: #fee2e2;
  color: #991b1b;
}

.toast-item.warning {
  background: #fef9c3;
  color: #854d0e;
}

.toast-item.info {
  background: #e0f2fe;
  color: #075985;
}

.toast-icon {
  font-size: 1.5rem;
}

.toast-message {
  flex: 1;
}

.toast-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0.5;
}

.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 6px;
  background: rgba(0, 0, 0, 0.15);
  animation: progress linear forwards;
}

@keyframes progress {
  from { width: 100%; }
  to { width: 0%; }
}

/* Transition Animations */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.5);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.5);
}
</style>
