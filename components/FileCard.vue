<template>
  <div
    class="min-w-72 basis-1/4 rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden"
    :class="{
      'p-5': amount,
      'p-4': !amount,
    }"
  >
    <div class="flex gap-3 items-center">
      <!-- Icon Container -->
      <div
        class="p-3 rounded-xl"
        :style="{ backgroundColor: iconBgColor, color: iconColor }"
      >
        <svg
          :class="styles"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          v-html="icon"
        ></svg>
      </div>

      <!-- Text Content -->
      <div class="flex flex-col">
        <p class="font-semibold text-lg text-neutral-800">{{ name }}</p>
        <p class="text-sm text-neutral-500">{{ count }}</p>
      </div>
    </div>

    <!-- Progress Bar -->
    <div v-if="amount" class="mt-4 space-y-2">
      <div
        class="w-full h-2 rounded-full bg-neutral-100 overflow-hidden progress-bar"
      >
        <div
          class="h-full rounded-full transition-all duration-500 ease-out progress-bar-inner"
          :style="{
            backgroundColor: progressBarFg,
            '--progress-amount': `${amount}%`,
          }"
        ></div>
      </div>

      <!-- Description -->
      <p class="text-sm text-neutral-600">
        <span class="font-medium">{{ startAmount }} GB</span> of
        <span class="font-medium">{{ endAmount }} GB</span> used
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
  count: {
    type: [String, Number],
    required: true,
  },
  startAmount: {
    type: [String, Number],
    required: true,
  },
  endAmount: {
    type: [String, Number],
    required: true,
  },
  amount: {
    type: Number,
    required: false,
  },
  icon: {
    type: String,
    required: true,
  },
  styles: {
    type: String,
    default: '',
  },
  iconBgColor: {
    type: String,
    default: '#f5f5f5',
  },
  iconColor: {
    type: String,
    default: '#3b82f6', // blue-500
  },
  progressBarFg: {
    type: String,
    default: '#3b82f6', // blue-500
  },
});
</script>

<style scoped>
.progress-bar {
}

@keyframes fill-bar {
  from {
    width: 0%;
  }
  to {
    width: var(--progress-amount);
  }
}

.progress-bar-inner {
  animation: fill-bar 1.5s ease-out forwards;
}
</style>
