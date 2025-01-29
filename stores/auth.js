import { defineStore } from "pinia";
import axios from "axios";

axios.defaults.withCredentials = true;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => {
      console.log("Getter isAuthenticated called:", state.user);
      return !!state.user;
    },
    isLoading: (state) => state.loading,
    isError: (state) => state.error,
  },

  actions: {
    async login(email, password) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post(
          "http://localhost:8000/api/auth/login",
          {
            email,
            password,
          }
        );
        console.log("🚀 ~ login ~ response:", response);

        await this.getUser();
      } catch (err) {
        this.error = err.response?.data?.error || "Login failed";
      } finally {
        this.loading = false;
      }
    },

    async getUser() {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/auth/user",
          {
            withCredentials: true,
            credentials: true,
          }
        );

        // const response = await $fetch("http://localhost:8000/api/auth/user", {
        //   method: "GET",
        //   credentials: "include",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // });
        if (response.status !== 200) {
          this.user = null;
        }
        this.user = response.data.message;
      } catch {
        this.user = null;
      }
    },

    async logout() {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/auth/logout",
          {},
          { withCredentials: true, credentials: true }
        );
        console.log("🚀 ~ logout ~ response:", response);
        if (response.data.status === "OK") {
          this.user = null;
        }
      } catch (error) {
        console.log("🚀 ~ logout ~ error:", error);
      }
    },
  },
});
