import axios from 'axios';
import Cookies from 'js-cookie';

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;
  const broadcastApiBase = config.public.brodcastApiBase;

  // Ensure CSRF cookie is set before creating axios instances
  await ensureCsrfToken();

  const axiosInstance = createAxiosInstance(apiBase);
  const axiosTest = createAxiosInstance(broadcastApiBase);

  return {
    provide: {
      axios: axiosInstance,
      axiosTest,
    },
  };
});

async function ensureCsrfToken() {
  // Only fetch CSRF cookie if it doesn't exist
  if (!Cookies.get('XSRF-TOKEN')) {
    try {
      await axios.get('/sanctum/csrf-cookie', {
        baseURL: useRuntimeConfig().public.apiBase,
        withCredentials: true,
      });
    } catch (error) {
      console.error('Failed to set CSRF token:', error);
    }
  }
}

function createAxiosInstance(baseURL) {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  });

  instance.interceptors.request.use((config) => {
    // Only add XSRF token for mutating requests
    if (
      ['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase())
    ) {
      const token = Cookies.get('XSRF-TOKEN');
      console.log('🚀 ~ instance.interceptors.request.use ~ token:', token);
      if (token) {
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
      } else {
        console.warn('XSRF token missing for mutating request');
      }
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 419) {
        // CSRF token mismatch
        // Optionally: Refresh CSRF token and retry
        console.warn('CSRF token mismatch, consider refreshing token');
      }
      return Promise.reject(error);
    },
  );

  return instance;
}
