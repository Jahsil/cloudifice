import { ref } from "vue";

const toast = ref({
  message: "",
  type: "success",
  visible: false,
});

let timeoutId: ReturnType<typeof setTimeout> | null = null; // Correctly typed timeout

export const useToast = () => {
  const showToast = (
    message: string,
    type: string = "success",
    duration: number = 3000
  ) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      toast.value.visible = false;
    }

    toast.value = { message, type, visible: true };

    timeoutId = setTimeout(() => {
      toast.value.visible = false;
      timeoutId = null;
    }, duration);
  };

  return {
    toast,
    showToast,
  };
};
