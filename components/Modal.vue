<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center"
  >
    <!-- Background overlay -->
    <div
      @click="close"
      class="absolute inset-0 bg-gray-900 backdrop-blur-none transition-all duration-300"
      :class="{
        'bg-opacity-60 opacity-100': isVisible,
        'bg-opacity-0 opacity-0': !isVisible,
      }"
    ></div>

    <!-- Dialog -->
    <div
      ref="modal"
      :style="{ width: size }"
      class="relative bg-white rounded-lg shadow-xl min-w-sm xxs:mx-4 transform transition-all duration-300"
      :class="{
        'scale-100 opacity-100': isVisible,
        'scale-90 opacity-0': !isVisible,
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  size: {
    type: String,
    default: "700px",
  },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const isVisible = ref(false);

const close = () => {
  isVisible.value = false;
  setTimeout(() => {
    isOpen.value = false;
    emit("update:modelValue", false);
  }, 300); // Matches the duration of the transition
};

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      isOpen.value = true;
      setTimeout(() => {
        isVisible.value = true;
      }, 0);
    } else {
      close();
    }
  }
);

// Close modal on escape key
const handleKeydown = (event) => {
  if (event.key === "Escape") {
    close();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>
