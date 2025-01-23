<template>
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
</template>

<script setup>
defineProps({
  amount: {
    default: 0,
  },
  progressBarBg: {
    default: "#bcd2ea",
  },
  progressBarFg: {
    default: "#0079ff",
  },
});
</script>

<style lang="scss" scoped></style>
