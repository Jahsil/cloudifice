<template>
  <div
    class="flex justify-center items-center min-h-screen bg-gradient-to-r from-customGradientStart via-customGradientMid1 via-customGradientMid2 via-customGradientMid3 to-customGradientEnd bg-[300%] animate-gradientAnimation"
  >
    <div
      class="xxs:w-[90vw] xxs:h-[70vh] xs:w-[80vw] sm:h-[70vh] sm:w-[70vw] md:h-[70vh] md:w-[60vw] lg:w-[30vw] lg:h-[63vh] xl:h-[65vh] 2xl:h-[65vh] xxl:h-[70vh] flex flex-col items-center rounded-lg shadow-lg overflow-hidden bg-white"
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
        <form @submit.prevent="handleSubmit">
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
          <!-- Submit Button  -->
          <div class="mx-8 flex flex-col pt-7">
            <button class="w-full px-4 bg-[#4A68F5] py-2 rounded-md">
              <span class="text-neutral-50 font-semibold font">Login</span>
            </button>
          </div>
        </form>
        <!-- Don't have an account  -->
        <div class="mx-8 flex flex-col pt-7 items-center justify-center">
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

<script setup lang="ts">
import { ref } from "vue";

definePageMeta({
  layout: false,
});

interface FormData {
  email: string;
  password: string;
}

interface FormError {
  email: string;
  password: string;
}

const signInForm = ref<FormData>({
  email: "",
  password: "",
});

const errors = ref<FormError>({
  email: "",
  password: "",
});

function validateForm(): boolean {
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

function handleSubmit(): void {
  if (validateForm()) {
    console.log("Clicked");
  }
}
</script>

<style scoped></style>
