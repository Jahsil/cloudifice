// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devServer: {
    host: "0.0.0.0",
    port: 3000,
  },
  runtimeConfig: {
    public: {
      apiBase:
        process.env.NUXT_PUBLIC_API_BASE_URL ||
        process.env.NUXT_LOCAL_API_BASE_URL,
      brodcastApiBase: process.env.NUXT_BROADCAST_API_BASE_URL,

      REVERB_APP_ID:
        process.env.NUXT_PUBLIC_REVERB_APP_ID || process.env.REVERB_APP_ID,
      REVERB_APP_KEY:
        process.env.NUXT_PUBLIC_REVERB_APP_KEY || process.env.REVERB_APP_KEY,
      REVERB_APP_SECRET:
        process.env.NUXT_PUBLIC_REVERB_APP_SECRET ||
        process.env.REVERB_APP_SECRET,
      REVERB_HOST:
        process.env.NUXT_PUBLIC_REVERB_HOST || process.env.REVERB_HOST,
      REVERB_PORT:
        process.env.NUXT_PUBLIC_REVERB_PORT || process.env.REVERB_PORT,
      REVERB_SCHEME:
        process.env.NUXT_PUBLIC_REVERB_SCHEME || process.env.REVERB_SCHEME,
    },
  },

  modules: ["@pinia/nuxt"],
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
