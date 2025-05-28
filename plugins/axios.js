// plugins/api.ts
export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  const csrfToken = useCookie('XSRF-TOKEN');
  console.log('🚀 ~ defineNuxtPlugin ~ csrfToken:', csrfToken);
  const authToken = useCookie('auth_token', {
    secure: true,
    sameSite: 'lax',
    httpOnly: false, // Needed for client-side access
  });

  // Ensure CSRF cookie is set before first API call
  if (!csrfToken.value) {
    await $fetch('/sanctum/csrf-cookie', {
      baseURL: config.public.apiBase,
      credentials: 'include',
    });
    // Refresh the cookie reference after setting it
    csrfToken.value = useCookie('XSRF-TOKEN').value;
  }

  const axiosInstance = axios.create({
    baseURL: config.public.apiBase,
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  });

  // Request interceptor
  axiosInstance.interceptors.request.use((config) => {
    // Only add for mutating requests
    if (
      ['post', 'put', 'patch', 'delete'].includes(
        config.method?.toLowerCase() ?? '',
      )
    ) {
      if (csrfToken.value) {
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(csrfToken.value);
      } else {
        console.warn('CSRF token missing for mutating request');
      }
    }

    // Add auth token if exists
    if (authToken.value) {
      config.headers['Authorization'] = `Bearer ${authToken.value}`;
    }

    return config;
  });

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 419) {
        // CSRF token mismatch
        // Refresh CSRF token
        await $fetch('/sanctum/csrf-cookie', {
          baseURL: config.public.apiBase,
          credentials: 'include',
        });
        csrfToken.value = useCookie('XSRF-TOKEN').value;

        // Retry original request
        if (error.config) {
          if (csrfToken.value) {
            error.config.headers['X-XSRF-TOKEN'] = decodeURIComponent(
              csrfToken.value,
            );
          }
          return axiosInstance.request(error.config);
        }
      }
      return Promise.reject(error);
    },
  );

  return {
    provide: {
      api: axiosInstance,
    },
  };
});
