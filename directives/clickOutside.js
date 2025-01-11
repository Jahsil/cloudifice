export default {
  mounted(el, binding) {
    console.log("🚀 ~ mounted ~ binding:", binding);

    // Define the clickOutsideHandler
    el.clickOutsideHandler = (event) => {
      // Check if the clicked element is outside the target element
      if (!(el === event.target || el.contains(event.target))) {
        // Execute the provided callback or directly manipulate the element
        if (binding.value) {
          binding.value(event); // Call the provided function if exists
        } else {
          el.classList.remove("hidden"); // Remove the 'hidden' class by default
        }
      }
    };

    // Add a global click event listener
    document.addEventListener("click", el.clickOutsideHandler);
  },
  unmounted(el) {
    // Clean up by removing the event listener
    document.removeEventListener("click", el.clickOutsideHandler);
  },
};
