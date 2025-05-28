import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;
  const broadcastApiBase = config.public.brodcastApiBase;

  // const auth_token = useCookie("auth_token", {
  //   secure: true, // Ensures it only works on HTTPS
  //   httpOnly: false, // Since we need JavaScript access
  //   sameSite: "lax",
  // });
  // console.log("🚀 ~ defineNuxtPlugin ~ auth_token:", auth_token);

  const axiosInstance = axios.create({
    baseURL: `${apiBase}`,
    withCredentials: true,
    credentials: true,
    // timeout: 10000,
  });

  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      const xsrfToken = Cookies.get('XSRF-TOKEN');
      if (xsrfToken) {
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken);
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle errors
      console.error('Axios error:', error);
      return Promise.reject(error);
    },
  );

  const axiosTest = axios.create({
    baseURL: `${broadcastApiBase}`,
    withCredentials: true,
    credentials: true,
    // timeout: 10000,
  });

  return {
    provide: {
      axios: axiosInstance,
      axiosTest: axiosTest,
    },
  };
});
