<template>
  <div
    class="pb-10 flex justify-center items-center min-h-screen bg-gradient-to-r from-customGradientStart via-customGradientMid1 via-customGradientMid2 via-customGradientMid3 to-customGradientEnd bg-[300%]"
  >
    <div
      class="p-8 mt-12 w-[90vw] md:w-[80vw] lg:w-[50vw] flex-col items-start rounded-lg shadow-lg overflow-hidden bg-white"
    >
      <div v-if="!userAdded">
        <img
          class="ml-0"
          style="width: 15rem"
          src="/public/cloudifice_sm.png"
          alt="cloudifice-logo"
        />
        <div class="pt-4">
          <h3 class="tracking-wide text-2xl">Sign up</h3>

          <div class="pt-1">
            <p class="text-sm text-[#607181]">
              Enter your details below to create your account and get started
            </p>
          </div>
        </div>
        <!-- sigin up form  -->
        <form @submit.prevent="handleSignupClick">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-7">
            <!-- First Input Field -->
            <div class="flex flex-col">
              <label class="text-sm" for="full-name-1">First name</label>
              <input
                v-model="signUpForm.firstName"
                id="first-name"
                type="text"
                placeholder="Enter first name"
                :class="{
                  'w-full pl-4 py-2  rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
                  'border-[2px] border-red-500': errors.firstName,
                  'border border-neutral-300': !errors.firstName,
                }"
              />
              <span v-if="errors.firstName" class="text-sm text-red-500 mt-1">
                {{ errors.firstName }}
              </span>
            </div>
            <div class="flex flex-col">
              <label class="text-sm" for="full-name-1">Last name</label>
              <input
                v-model="signUpForm.lastName"
                id="last-name"
                type="text"
                placeholder="Enter family name"
                :class="{
                  'w-full pl-4 py-2  rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
                  'border-[2px] border-red-500': errors.lastName,
                  'border border-neutral-300': !errors.lastName,
                }"
              />
              <span v-if="errors.lastName" class="text-sm text-red-500 mt-1">
                {{ errors.lastName }}
              </span>
            </div>
            <!-- Second Input Field -->
            <div class="flex flex-col">
              <label class="text-sm" for="full-name-2">Email</label>
              <input
                v-model="signUpForm.email"
                id="email"
                type="text"
                placeholder="Enter email"
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
            <div class="flex flex-col">
              <label class="text-sm" for="date-of-birth">Date of Birth</label>
              <input
                v-model="signUpForm.dob"
                id="date-of-birth"
                type="date"
                placeholder="Select your date of birth"
                :class="{
                  'w-full pl-4 py-2  rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
                  'border-[2px] border-red-500': errors.dob,
                  'border border-neutral-300': !errors.dob,
                }"
              />
              <span v-if="errors.dob" class="text-sm text-red-500 mt-1">
                {{ errors.dob }}
              </span>
            </div>
            <div class="flex flex-col">
              <label class="text-sm text-gray-700" for="phone-number"
                >Phone Number</label
              >
              <input
                v-model="signUpForm.phone"
                id="phone-number"
                type="tel"
                placeholder="Enter phone number"
                :class="{
                  'w-full pl-4 py-2  rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
                  'border-[2px] border-red-500': errors.phone,
                  'border border-neutral-300': !errors.phone,
                }"
              />
              <span v-if="errors.phone" class="text-sm text-red-500 mt-1">
                {{ errors.phone }}
              </span>
            </div>
            <div class="flex flex-col">
              <label class="text-sm text-gray-700" for="nationality"
                >Nationality</label
              >
              <select
                v-model="signUpForm.nationality"
                id="nationality"
                :class="{
                  'w-full pl-4 py-2  rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
                  'border-[2px] border-red-500': errors.nationality,
                  'border border-neutral-300': !errors.nationality,
                }"
              >
                <option value="" disabled selected>Select your country</option>
                <option value="ET">Ethiopia</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="IN">India</option>
                <option value="CN">China</option>
                <option value="JP">Japan</option>
                <option value="BR">Brazil</option>
                <option value="ZA">South Africa</option>
                <option value="AU">Australia</option>
                <!-- Add more countries as needed -->
              </select>
              <span v-if="errors.nationality" class="text-sm text-red-500 mt-1">
                {{ errors.nationality }}
              </span>
            </div>
            <div class="flex flex-col">
              <label class="text-sm text-gray-700" for="password"
                >Password</label
              >
              <input
                v-model="signUpForm.password"
                id="password"
                type="password"
                placeholder="Enter your password"
                :class="{
                  'w-full pl-4 py-2  rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
                  'border-[2px] border-red-500': errors.password,
                  'border border-neutral-300': !errors.password,
                }"
              />
              <span v-if="errors.password" class="text-sm text-red-500 mt-1">
                {{ errors.password }}
              </span>
            </div>

            <div class="flex flex-col">
              <label class="text-sm text-gray-700" for="password"
                >Confirm password</label
              >
              <input
                v-model="signUpForm.confirmPassword"
                id="confirm-password"
                type="password"
                placeholder="Enter your password"
                :class="{
                  'w-full pl-4 py-2  rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
                  'border-[2px] border-red-500': errors.confirmPassword,
                  'border border-neutral-300': !errors.confirmPassword,
                }"
              />
              <span
                v-if="errors.confirmPassword"
                class="text-sm text-red-500 mt-1"
              >
                {{ errors.confirmPassword }}
              </span>
            </div>
            <!-- buttons  -->
            <div class="pt-4">
              <NuxtLink to="/login">
                <button
                  class="w-full px-4 py-2 rounded-md border border-neutral-300"
                >
                  Cancel
                </button>
              </NuxtLink>
            </div>
            <div class="pt-4">
              <button
                type="submit"
                class="w-full px-4 bg-[#4A68F5] py-2 rounded-md"
              >
                <span v-if="loading" class="mr-2">
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
                <span class="text-neutral-50 font-semibold font">Signup</span>
              </button>
            </div>
          </div>
        </form>

        <div class="text-center pt-8">
          <p class="text-sm text-[#607181]">
            Already have an account?
            <NuxtLink to="/login">
              <span class="text-[#5670ff] font-semibold">Login</span>
            </NuxtLink>
          </p>
        </div>
      </div>

      <!-- pick username screen  -->
      <div v-if="userAdded">
        <!-- username  -->
        <div class="mx-8 flex flex-col">
          <p class="text-xl tracking-wide font-medium pt-4">Username</p>
          <p class="text-sm tracking-wide text-neutral-500 pt-1 pb-2">
            Choose a unique username—this will be your identity on our platform.
            It should be a single word, using only letters, numbers, dashes, or
            underscores.
            <span class="font-semibold">Once set, it cannot be changed!</span>
          </p>

          <form @submit.prevent="handleUsernameClick">
            <div class="flex flex-col">
              <input
                v-model="username"
                id="username"
                type="text"
                placeholder="Enter username"
                :class="{
                  'w-full pl-4 py-2  rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
                  'border-[2px] border-red-500': usernameError,
                  'border border-neutral-300': !usernameError,
                }"
              />
              <span v-if="usernameError" class="text-sm text-red-500 mt-1">
                {{ usernameError }}
              </span>
              <button
                type="submit"
                class="w-1/4 px-4 mt-4 bg-[#4A68F5] py-2 rounded-md"
              >
                <span v-if="loading" class="mr-2">
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
                <span class="text-neutral-50 font-semibold font">Apply</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useNuxtApp } from "#app";
import { useRouter } from "vue-router";

const { $axios, $axiosTest } = useNuxtApp();
const router = useRouter();

definePageMeta({
  layout: false,
});

// interface FormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   dob: string;
//   nationality: string;
//   password: string;
//   confirmPassword: string;
// }

// interface FormError {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   dob: string;
//   nationality: string;
//   password: string;
//   confirmPassword: string;
// }

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

// Signup function
const handleSignupClick = throttle(signUp, 3000);
// Create username function
const handleUsernameClick = throttle(createUsername, 3000);

const signUpForm = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dob: "",
  nationality: "",
  password: "",
  confirmPassword: "",
});

const errors = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dob: "",
  nationality: "",
  password: "",
  confirmPassword: "",
});

const usernameError = ref("");
const registredUser = ref(null);
const loading = ref(false);

let userAdded = ref(false);
let username = ref("");

function validateForm() {
  let isValid = true;

  // First Name Validation
  if (!signUpForm.value.firstName) {
    errors.value.firstName = "First name is required.";
    isValid = false;
  } else if (!/^[A-Za-z]{1,50}$/.test(signUpForm.value.firstName)) {
    errors.value.firstName =
      "First name must be up to 50 characters, letters only (A-Z or a-z).";
    isValid = false;
  } else {
    errors.value.firstName = "";
  }

  // Last Name Validation
  if (!signUpForm.value.lastName) {
    errors.value.lastName = "Last name is required.";
    isValid = false;
  } else if (!/^[A-Za-z]{1,50}$/.test(signUpForm.value.lastName)) {
    errors.value.lastName =
      "Last name must be up to 50 characters, letters only (A-Z or a-z).";
    isValid = false;
  } else {
    errors.value.lastName = "";
  }

  // Email Validation
  if (!signUpForm.value.email) {
    errors.value.email = "Email is required.";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpForm.value.email)) {
    errors.value.email = "Email format is invalid.";
    isValid = false;
  } else {
    errors.value.email = "";
  }

  // Phone Validation
  if (!signUpForm.value.phone) {
    errors.value.phone = "Phone number is required.";
    isValid = false;
  } else if (!/^\+\d{1,3}[0-9]{4,14}$/.test(signUpForm.value.phone)) {
    errors.value.phone =
      "Phone number must start with a country code (e.g., +123) followed by digits.";
    isValid = false;
  } else {
    errors.value.phone = "";
  }

  // Date of Birth Validation
  if (!signUpForm.value.dob) {
    errors.value.dob = "Date of birth is required.";
    isValid = false;
  } else {
    errors.value.dob = "";
  }

  // Nationality Validation
  if (!signUpForm.value.nationality) {
    errors.value.nationality = "Nationality is required.";
    isValid = false;
  } else {
    errors.value.nationality = "";
  }

  // Password Validation
  if (!signUpForm.value.password) {
    errors.value.password = "Password is required.";
    isValid = false;
  } else if (signUpForm.value.password.length < 6) {
    errors.value.password = "Password must be at least 6 characters.";
    isValid = false;
  } else {
    errors.value.password = "";
  }

  // Confirm Password Validation
  if (!signUpForm.value.confirmPassword) {
    errors.value.confirmPassword = "Confirm password is required.";
    isValid = false;
  } else if (signUpForm.value.confirmPassword !== signUpForm.value.password) {
    errors.value.confirmPassword = "Passwords do not match.";
    isValid = false;
  } else {
    errors.value.confirmPassword = "";
  }

  return isValid;
}

function validateUsername() {
  let isValid = true;

  // Username Validation
  if (!username.value) {
    usernameError.value = "Username is required.";
    isValid = false;
  } else if (!/^[A-Za-z]{1,50}$/.test(username.value)) {
    usernameError.value =
      "Username must be up to 50 characters, letters only (A-Z or a-z).";
    isValid = false;
  } else {
    usernameError.value = "";
  }

  return isValid;
}

async function signUp() {
  if (validateForm()) {
    try {
      loading.value = true;

      let formData = {};
      formData["first_name"] = signUpForm.value.firstName;
      formData["last_name"] = signUpForm.value.lastName;
      formData["nationality"] = signUpForm.value.nationality;
      formData["phone"] = signUpForm.value.phone;
      formData["email"] = signUpForm.value.email;
      formData["password"] = signUpForm.value.password;

      await $axiosTest.get(`sanctum/csrf-cookie`, {
        withCredentials: true,
        credentials: true,
      });

      const response = await $axios.post("auth/register", formData);
      if (response.status == 201 || response.status == 200) {
        userAdded.value = true;
        username.value = signUpForm.value.firstName;
        registredUser.value = response.data.user;
      }
      loading.value = false;
    } catch (error) {
      console.log("🚀 ~ signUp ~ error:", error);
      loading.value = false;
    }
  }
}

async function createUsername() {
  if (validateUsername()) {
    try {
      loading.value = true;

      let formData = {};
      formData["username"] = username.value;
      formData["user_id"] = registredUser.value.id;

      const response = await $axios.post("auth/finish_registration", formData);
      if (response.data.status === "OK") {
        router.push("/login");
      }
      loading.value = false;
    } catch (error) {
      console.log("🚀 ~ createUsername ~ error:", error);
      loading.value = false;
    }
  }
}
</script>

<style scoped></style>
