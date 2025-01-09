/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./node_modules/flowbite/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      screens: {
        xxs: "375px",
        xs: "530px",
        xxl: "1600px",
      },
      backgroundSize: {
        // "300%": "300% 300%",
      },
      keyframes: {
        // gradientAnimation: {
        //   "0%": { backgroundPosition: "0% 50%" },
        //   "50%": { backgroundPosition: "100% 50%" },
        //   "100%": { backgroundPosition: "0% 50%" },
        // },
      },
      animation: {
        // gradientAnimation: "gradientAnimation 4s ease infinite",
      },
      colors: {
        primary: "#788bf8",
        customGradientStart: "#dcd0ce", // Darker tone for #eee7e5
        customGradientMid1: "#d2cddc", // Darker tone for #e7e4ee
        customGradientMid2: "#c7d4d4", // Darker tone for #e1ecec
        customGradientMid3: "#c8d4d4", // Darker tone for #e2ecec
        customGradientEnd: "#d4d4d4", // Darker tone for #ededed
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
