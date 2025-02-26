<template>
  <div
    class="flex justify-center items-center min-h-screen bg-gradient-to-r from-customGradientStart via-customGradientMid1 via-customGradientMid2 via-customGradientMid3 to-customGradientEnd bg-[300%] animate-gradientAnimation"
  >
    <div
      class="w-[90vw] md:w-[60vw] lg:w-[30vw] flex flex-col items-center rounded-lg shadow-lg overflow-hidden bg-white"
    >
      <img
        class="px-12 pt-6 pb-2"
        src="/public/cloudificeLogo.png"
        alt="cloudifice-logo"
      />
      <h3 class="tracking-wide text-2xl">Welcome Back!</h3>
      <div class="pt-3 text-center">
        <p class="text-xs text-[#607181]">Glad to see you again</p>
        <p class="text-xs text-[#607181]">Login to your account below</p>
      </div>

      <div class="w-full mx-8 pt-4">
        <!-- Continue with google  -->
        <div
          class="mx-8 border-[1px] border-neutral-300 rounded-lg py-2 text-center flex justify-center items-center gap-2"
        >
          <img class="h-4 w-4" src="/public/google.png" alt="google-logo" />
          <p>Continue with Google</p>
        </div>
        <form @submit.prevent="handleLoginClick">
          <!-- Email  -->
          <div class="mx-8 flex flex-col pt-7">
            <label class="text-sm" for="email">Email</label>

            <input
              v-model="signInForm.email"
              id="email"
              type="text"
              placeholder="Enter  email"
              :class="{
                'w-full pl-4 py-2  rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
                'border-[2px] border-red-500': errors.email,
                'border border-neutral-300': !errors.email,
              }"
            />
            <span v-if="errors.email" class="text-sm text-red-500 mt-1">
              {{ errors.email }}
            </span>
          </div>
          <!-- Password  -->
          <div class="mx-8 flex flex-col pt-7">
            <label class="text-sm" for="email">Password</label>

            <input
              v-model="signInForm.password"
              id="password"
              type="text"
              placeholder="Enter password"
              :class="{
                'w-full pl-4 py-2  rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
                'border-[2px] border-red-500': errors.email,
                'border border-neutral-300': !errors.email,
              }"
            />
            <span v-if="errors.password" class="text-sm text-red-500 mt-1">
              {{ errors.password }}
            </span>
          </div>
          <div
            v-if="auth.isError && auth.isError.message"
            class="mx-8 pt-4 flex justify-center text-red-500"
          >
            {{ auth.isError.message ? auth.isError.message[0] : auth.isError }}
          </div>

          <!-- Submit Button  -->
          <div class="mx-8 flex flex-col pt-2">
            <button
              class="w-full flex justify-center gap-2 px-4 bg-[#4A68F5] py-2 rounded-md"
            >
              <span v-if="auth.isLoading">
                <svg
                  aria-hidden="true"
                  class="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </span>
              <span class="text-neutral-50 font-semibold font">Login</span>
            </button>
          </div>
        </form>
        <!-- Don't have an account  -->
        <div class="mx-8 pb-8 flex flex-col pt-7 items-center justify-center">
          <p class="text-sm text-[#607181]">
            Dont have an account?
            <NuxtLink to="/signup">
              <span class="text-[#5670ff] font-semibold"
                >Sign up for Free
              </span>
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useNuxtApp } from "#app";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const { $axios } = useNuxtApp();
const auth = useAuthStore();
const router = useRouter();

definePageMeta({
  layout: false,
});

// Throttle function
function throttle(func, limit) {
  let inThrottle = false;
  return async (...args) => {
    if (!inThrottle) {
      inThrottle = true;
      await func(...args);
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Login function
const handleLoginClick = throttle(handleSubmit, 3000);

// interface FormData {
//   email: string;
//   password: string;
// }

// interface FormError {
//   email: string;
//   password: string;
// }

const signInForm = ref({
  email: "",
  password: "",
});

const errors = ref({
  email: "",
  password: "",
});

function validateForm() {
  let isValid = true;

  // Email Validation
  if (!signInForm.value.email) {
    errors.value.email = "Email is required.";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signInForm.value.email)) {
    errors.value.email = "Email format is invalid.";
    isValid = false;
  } else {
    errors.value.email = "";
  }

  // Password Validation
  if (!signInForm.value.password) {
    errors.value.password = "Password is required.";
    isValid = false;
  } else if (signInForm.value.password.length < 6) {
    errors.value.password = "Password must be at least 6 characters.";
    isValid = false;
  } else {
    errors.value.password = "";
  }

  return isValid;
}

async function handleSubmit() {
  if (validateForm()) {
    try {
      await auth.login(signInForm.value.email, signInForm.value.password);
      if (auth.user) {
        router.push("/home");
      }
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      errors.value.email = auth.isError || "";
      errors.value.password = auth.isError || "";
    }
  }
}
</script>

<style scoped></style>
