import { set } from "@vueuse/core";
import { defineStore } from "pinia";

export const useUIStore = defineStore("ui", {
  state: () => ({
    navMode: 1,
  }),

  getters: {
    navWidth: (state) => state.navMode,
  },

  actions: {
    setNavMode(mode) {
      this.navMode = mode;
    },
  },
});
