import { useNuxtApp } from "#app";

// Define the Auth module
const Auth = {
  /**
   * Login method
   * @param path - API endpoint path
   * @param data - Request payload
   * @param token - Authorization token
   * @returns Promise with the response
   */
  async login(path: string, data: Record<string, unknown>): Promise<any> {
    const { $axios } = useNuxtApp();

    return await $axios.post(path, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};

export default Auth;
