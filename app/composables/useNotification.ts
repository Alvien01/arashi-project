import { ref, reactive } from 'vue'

export interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

export interface ConfirmOptions {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  type?: 'danger' | 'warning' | 'info'
}

const toasts = ref<Toast[]>([])
const confirmState = reactive({
  show: false,
  title: '',
  message: '',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  type: 'info' as 'danger' | 'warning' | 'info',
  resolve: null as ((value: boolean) => void) | null
})

let nextId = 0

export const useNotification = () => {
  const addToast = (message: string, type: Toast['type'] = 'info', duration = 3000) => {
    const id = nextId++
    const toast: Toast = { id, message, type, duration }
    toasts.value.push(toast)

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
  }

  const removeToast = (id: number) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index !== -1) {
      toasts.value.splice(index, 1)
    }
  }

  const confirm = (options: ConfirmOptions): Promise<boolean> => {
    confirmState.title = options.title
    confirmState.message = options.message
    confirmState.confirmText = options.confirmText || 'Yes, Delete'
    confirmState.cancelText = options.cancelText || 'Cancel'
    confirmState.type = options.type || 'danger'
    confirmState.show = true

    return new Promise((resolve) => {
      confirmState.resolve = resolve
    })
  }

  const closeConfirm = (result: boolean) => {
    confirmState.show = false
    if (confirmState.resolve) {
      confirmState.resolve(result)
      confirmState.resolve = null
    }
  }

  return {
    toasts,
    addToast,
    removeToast,
    confirmState,
    confirm,
    closeConfirm,
    success: (msg: string) => addToast(msg, 'success'),
    error: (msg: string) => addToast(msg, 'error'),
    info: (msg: string) => addToast(msg, 'info'),
    warning: (msg: string) => addToast(msg, 'warning'),
  }
}
