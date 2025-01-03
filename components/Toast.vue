<template>
  <div
    v-if="show"
    class="fixed bottom-5 right-5 z-50 flex items-center px-4 py-3 text-white bg-gray-800 rounded shadow-lg"
    :class="colorClass"
  >
    <span class="mr-3">{{ message }}</span>
    <button
      @click="closeToast"
      class="ml-3 text-sm font-bold text-white hover:text-gray-400"
    >
      ✖
    </button>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "success",
  },
  duration: {
    type: Number,
    default: 3000,
  },
});

onMounted(() => {
  console.log("Toast component Mounted");
});

const show = ref(false);
const colorClass = ref("bg-green-500");

const setColorClass = (type) => {
  switch (type) {
    case "success":
      colorClass.value = "bg-green-500";
      break;
    case "error":
      colorClass.value = "bg-red-500";
      break;
    case "info":
      colorClass.value = "bg-blue-500";
      break;
    default:
      colorClass.value = "bg-gray-800";
  }
};

const closeToast = () => {
  show.value = false;
};

watchEffect(() => {
  setColorClass(props.type);
  show.value = true;

  const timeout = setTimeout(() => {
    show.value = false;
  }, props.duration);

  return () => clearTimeout(timeout);
});
</script>
