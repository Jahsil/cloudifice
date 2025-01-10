<template>
  <div
    :class="{
      'min-w-72 basis-1/4 rounded-md border border-neutral-300 bg-white': true,
      'p-4': amount,
      '': !amount,
    }"
  >
    <div class="flex gap-1 py-4 px-2 items-center">
      <!-- icon  -->
      <div class="border border-neutral-300 shadow-sm rounded-lg p-2">
        <svg
          :class="styles"
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          v-html="icon"
        ></svg>
      </div>
      <div class="flex flex-col">
        <p class="font-medium text-md">{{ name }}</p>
        <p class="text-sm text-neutral-400">{{ count }}</p>
      </div>
    </div>
    <!-- progress bar  -->

    <div
      v-if="amount"
      :style="{ backgroundColor: progressBarBg }"
      class="w-full h-1 rounded-full"
    >
      <div
        :style="{ backgroundColor: progressBarFg, width: `${amount}%` }"
        class="h-full rounded-full"
      ></div>
    </div>
    <!-- description  -->

    <p v-if="amount" class="text-md text-neutral-400 pt-2 font-medium">
      {{ startAmount }} GB of {{ endAmount }} GB
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  name: {
    required: true,
  },
  count: {
    required: true,
  },
  startAmount: {
    required: true,
  },
  endAmount: {
    required: true,
  },
  amount: {
    required: false,
  },
  icon: {
    required: true,
  },
  styles: {
    default: "text-red-100",
  },
  progressBarBg: {
    default: "#efb6b2",
  },
  progressBarFg: {
    default: "#ff3a2f",
  },
});
</script>

<style scoped></style>
