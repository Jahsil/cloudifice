<template>
  <div
    class="fixed inset-x-0 top-0 z-[1000] flex justify-center pt-4 pointer-events-none"
  >
    <TransitionGroup
      name="toast"
      tag="div"
      class="w-full max-w-md space-y-2 flex flex-col items-center"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto w-full"
      >
        <div
          :class="[
            'flex items-center w-full rounded-xl p-4 shadow-xl backdrop-blur-sm',
            'border border-opacity-20',
            {
              'bg-emerald-50/90 border-emerald-200 text-emerald-800':
                toast.type === 'success',
              'bg-red-50/90 border-red-200 text-red-800':
                toast.type === 'error',
              'bg-amber-50/90 border-amber-200 text-amber-800':
                toast.type === 'warning',
              'bg-blue-50/90 border-blue-200 text-blue-800':
                toast.type === 'info',
            },
          ]"
        >
          <!-- Icon and content remain the same as previous version -->
          <div
            :class="[
              'flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full',
              {
                'bg-emerald-100 text-emerald-600': toast.type === 'success',
                'bg-red-100 text-red-600': toast.type === 'error',
                'bg-amber-100 text-amber-600': toast.type === 'warning',
                'bg-blue-100 text-blue-600': toast.type === 'info',
              },
            ]"
          >
            <svg
              v-if="toast.type === 'success'"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            <!-- Other icons remain the same -->
          </div>

          <div class="ml-3 flex-1">
            <h3 class="text-sm font-semibold">
              {{ toastTitle(toast.type) }}
            </h3>
            <p class="mt-1 text-sm">
              {{ toast.message }}
            </p>
          </div>

          <button
            type="button"
            :class="[
              'ml-4 flex-shrink-0 rounded-full p-1 transition-colors',
              'hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-current',
              {
                'text-emerald-600': toast.type === 'success',
                'text-red-600': toast.type === 'error',
                'text-amber-600': toast.type === 'warning',
                'text-blue-600': toast.type === 'info',
              },
            ]"
            @click="removeToast(toast.id)"
            aria-label="Close"
          >
            <span class="sr-only">Close</span>
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '../composables/useToast';

const { toasts, removeToast } = useToast();

const toastTitle = (type: string) => {
  return {
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Information',
  }[type];
};
</script>

<style scoped>
/* Enter transitions */
.toast-enter-active {
  transition: all 0.5s cubic-bezier(0.21, 1.02, 0.73, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

/* Leave transitions */
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.87, 0.03, 0.82, 0.96);
  /* position: absolute; */
  width: 100%;
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}

/* Move transition for reordering */
.toast-move {
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>
