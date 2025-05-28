import { defineStore } from 'pinia';
import axios from 'axios';

axios.defaults.withCredentials = true;
// axios.defaults.withXSRFToken = true;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => {
      console.log('Getter isAuthenticated called:', state.user);
      return !!state.user;
    },
    isLoading: (state) => state.loading,
    isError: (state) => state.error,
  },

  actions: {
    async login(email, password) {
      const config = useRuntimeConfig();
      const apiBase = config.public.apiBase;
      const brodcastApiBase = config.public.brodcastApiBase;

      this.loading = true;
      this.error = null;
      try {
        await axios.get(`${brodcastApiBase}/sanctum/csrf-cookie`, {
          withCredentials: true,
          credentials: true,
        });
        const response = await axios.post(
          `${apiBase}/auth/login`,
          {
            email,
            password,
          },
          {
            withCredentials: true,
            credentials: true,
          },
        );
        await this.getUser();
      } catch (err) {
        this.error = err.response?.data?.error || 'Login failed';
      } finally {
        this.loading = false;
      }
    },

    async getUser() {
      const config = useRuntimeConfig();
      const apiBase = config.public.apiBase;

      const token = useCookie('auth_token');
      const decodedToken = decodeURIComponent(token.value);

      try {
        const response = await axios.get(`${apiBase}/auth/user`, {
          withCredentials: true,
          // headers: {
          //   "Content-Type": "application/json",
          //   Authorization: `Bearer ${decodedToken}`,
          // },
        });
        if (response.status !== 200) {
          this.user = null;
        }
        this.user = response.data;
      } catch {
        this.user = null;
      }
    },

    async logout() {
      const config = useRuntimeConfig();
      const apiBase = config.public.apiBase;
      try {
        const response = await axios.post(
          `${apiBase}/auth/logout`,
          {},
          { withCredentials: true, credentials: true },
        );
        console.log('🚀 ~ logout ~ response:', response);
        if (response.data.status === 'OK') {
          this.user = null;
        }
      } catch (error) {
        console.log('🚀 ~ logout ~ error:', error);
      }
    },
  },
});
