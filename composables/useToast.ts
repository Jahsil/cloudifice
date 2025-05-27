import { ref } from 'vue';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
  timeout?: number;
}

const toasts = ref<Toast[]>([]);

export const useToast = () => {
  const showToast = (
    message: string,
    type: ToastType = 'info',
    timeout: number = 5000,
  ) => {
    const id = Date.now();

    const toast: Toast = {
      id,
      message,
      type,
      timeout,
    };

    toasts.value.push(toast);

    if (timeout > 0) {
      setTimeout(() => {
        removeToast(id);
      }, timeout);
    }

    return id;
  };

  const removeToast = (id: number) => {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index !== -1) {
      toasts.value.splice(index, 1);
    }
  };

  return {
    toasts,
    showToast,
    removeToast,
    success: (message: string, timeout?: number) =>
      showToast(message, 'success', timeout),
    error: (message: string, timeout?: number) =>
      showToast(message, 'error', timeout),
    warning: (message: string, timeout?: number) =>
      showToast(message, 'warning', timeout),
    info: (message: string, timeout?: number) =>
      showToast(message, 'info', timeout),
  };
};
