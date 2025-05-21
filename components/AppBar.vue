<template>
  <header
    class="sticky top-0 z-40 h-16 w-full bg-white border-b border-gray-200 shadow-sm"
  >
    <div class="flex items-center justify-between h-full px-4">
      <!-- Left Section -->
      <div class="flex items-center gap-4">
        <!-- Mobile Menu Button (only visible on mobile) -->
        <button
          @click="$emit('toggle-drawer')"
          class="p-1 text-gray-600 rounded-md md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <!-- Search Bar -->
        <div class="relative hidden md:block">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <svg
              class="w-5 h-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search for documents & files"
            class="w-64 pl-10 pr-4 py-2 text-sm text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200"
          />
        </div>
      </div>

      <!-- Right Section -->
      <div class="flex items-center gap-4">
        <!-- Icons (hidden on mobile) -->
        <div class="hidden md:flex items-center gap-4">
          <button class="p-1 text-gray-600 rounded-full hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </button>

          <button class="p-1 text-gray-600 rounded-full hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>

          <div class="w-px h-6 bg-gray-300"></div>
        </div>

        <!-- User Profile Dropdown -->
        <div class="relative">
          <button
            @click="toggleDropdown"
            class="flex items-center gap-2 focus:outline-none"
            ref="dropdownTrigger"
          >
            <div
              class="flex items-center justify-center w-8 h-8 rounded-full bg-[#788bf8] text-white font-medium"
            >
              {{ auth?.user['first_name']?.[0] || 'U' }}
            </div>
            <span
              class="hidden text-sm font-medium text-gray-700 md:inline-block"
            >
              {{ auth?.user['first_name'] }} {{ auth?.user['last_name'] }}
            </span>
          </button>

          <!-- Dropdown Menu -->
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <div
              v-if="isDropdownVisible"
              class="absolute right-0 z-50 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              ref="dropdownMenu"
            >
              <div class="py-1">
                <a
                  href="#"
                  @click.prevent="logout"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </a>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

const isDropdownVisible = ref(false);
const dropdownTrigger = ref(null);
const dropdownMenu = ref(null);

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
};

const handleClickOutside = (event) => {
  if (
    dropdownTrigger.value &&
    dropdownMenu.value &&
    !dropdownTrigger.value.contains(event.target) &&
    !dropdownMenu.value.contains(event.target)
  ) {
    isDropdownVisible.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const logout = async () => {
  try {
    await auth.logout();
    router.push('/login');
  } catch (error) {
    console.error('Logout error:', error);
  }
};
</script>

<style scoped>
/* Smooth transitions for dropdown */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
