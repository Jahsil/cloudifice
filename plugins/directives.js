import clickOutside from "@/directives/clickOutside";
import highlight from "@/directives/highlight";

export default defineNuxtPlugin((nuxtApp) => {
  console.log("Custom directive plugin loaded");
  nuxtApp.vueApp.directive("highlight", highlight);
  nuxtApp.vueApp.directive("click-outside", clickOutside);
});

// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.vueApp.directive("highlight", {
//     mounted(el, binding) {
//       el.style.backgroundColor = binding.value;
//     },
//   });

//   // Register more directives as needed
// });
