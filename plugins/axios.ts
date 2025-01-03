import axios from "axios";

export default defineNuxtPlugin(() => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api",
    timeout: 10000,
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

  return {
    provide: {
      axios: axiosInstance,
    },
  };
});
