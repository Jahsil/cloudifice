import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    isLoading: (state) => state.loading,
    isError: (state) => state.error,
  },

  actions: {
    async ensureCsrfToken() {
      const csrfToken = useCookie('XSRF-TOKEN');
      if (!csrfToken.value) {
        const config = useRuntimeConfig();
        await axios.get(
          `${config.public.brodcastApiBase}/sanctum/csrf-cookie`,
          {
            withCredentials: true,
          },
        );
      }
    },

    async login(email, password) {
      const config = useRuntimeConfig();
      this.loading = true;
      this.error = null;

      try {
        // Ensure CSRF token is set before login
        await this.ensureCsrfToken();

        const response = await axios.post(
          `${config.public.apiBase}/auth/login`,
          { email, password },
          {
            withCredentials: true,
            headers: {
              'X-XSRF-TOKEN': decodeURIComponent(
                useCookie('XSRF-TOKEN').value || '',
              ),
            },
          },
        );

        await this.getUser();
        return response.data;
      } catch (err) {
        this.error = err.response?.data?.error || 'Login failed';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async getUser() {
      const config = useRuntimeConfig();
      try {
        const response = await axios.get(`${config.public.apiBase}/auth/user`, {
          withCredentials: true,
          headers: {
            'X-XSRF-TOKEN': decodeURIComponent(
              useCookie('XSRF-TOKEN').value || '',
            ),
          },
        });
        this.user = response.data;
        return this.user;
      } catch (error) {
        this.user = null;
        throw error;
      }
    },

    async logout() {
      const config = useRuntimeConfig();
      try {
        const response = await axios.post(
          `${config.public.apiBase}/auth/logout`,
          {},
          {
            withCredentials: true,
            headers: {
              'X-XSRF-TOKEN': decodeURIComponent(
                useCookie('XSRF-TOKEN').value || '',
              ),
            },
          },
        );

        if (response.data.status === 'OK') {
          this.user = null;
          // Clear auth token cookie
          const authToken = useCookie('auth_token');
          authToken.value = null;
        }
        return response.data;
      } catch (error) {
        console.error('Logout error:', error);
        throw error;
      }
    },
  },
});
