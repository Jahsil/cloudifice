export default {
  mounted(el, binding) {
    el.addEventListener("mouseover", () => {
      el.style.backgroundColor = binding.value;
    });
    el.addEventListener("mouseout", () => {
      el.style.backgroundColor = "";
    });
  },
};
