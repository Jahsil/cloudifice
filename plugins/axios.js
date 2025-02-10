import axios from "axios";

// axios.defaults.withCredentials = true;

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;

  const axiosInstance = axios.create({
    baseURL: `${apiBase}`,
    withCredentials: true,
    credentials: true,
    // timeout: 10000,
  });

  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      // For example, add authorization token to headers
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle errors
      console.error("Axios error:", error);
      return Promise.reject(error);
    }
  );

  const axiosTest = axios.create({
    baseURL: `http://localhost:8000`,
    // withCredentials: true,
    // credentials: true,
    // timeout: 10000,
  });

  return {
    provide: {
      axios: axiosInstance,
      axiosTest: axiosTest,
    },
  };
});
