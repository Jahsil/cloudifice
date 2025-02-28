<template>
  <!-- <div class="relative"> -->
  <div class="top-0 right-0 h-[66px] w-full border shadow-sm">
    <div class="flex items-center justify-between pl-4 h-full">
      <div class="flex items-center gap-2">
        <!-- menu icon here  -->
        <svg
          class="text-primary"
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M4 4.5h16m-16 10h16m-16-5h16m-16 10h16"
            color="currentColor"
          />
        </svg>
        <input
          id="search"
          type="text"
          placeholder="Search for documents & files"
          :class="{
            'w-64 pl-4 py-2  rounded-md  text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 border border-neutral-300 focus:outline-none shadow-sm transition-all duration-200': true,
          }"
        />
      </div>
      <!-- Menu icon -->
      <div class="md:hidden pr-4">
        <svg
          class="text-primary"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M4 5h16m-2 7H6m2 7h8"
            color="currentColor"
          />
        </svg>
      </div>
      <div class="z-50 flex items-center gap-2 pr-4 xxs:hidden md:flex">
        <div>
          <svg
            class="text-[#788bf8]"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              color="currentColor"
            >
              <circle cx="12" cy="12" r="10" />
              <path
                d="M10 9a2 2 0 1 1 3.683 1.08C13.085 11.01 12 11.896 12 13v.5m-.008 3.5h.009"
              />
            </g>
          </svg>
        </div>
        <div>
          <svg
            class="text-[#788bf8]"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              color="currentColor"
            >
              <path
                d="M5.158 11.491c-.073 1.396.011 2.882-1.236 3.817A2.3 2.3 0 0 0 3 17.153C3 18.15 3.782 19 4.8 19h14.4c1.018 0 1.8-.85 1.8-1.847c0-.726-.342-1.41-.922-1.845c-1.247-.935-1.163-2.421-1.236-3.817a6.851 6.851 0 0 0-13.684 0"
              />
              <path
                d="M10.5 3.125C10.5 3.953 11.172 5 12 5s1.5-1.047 1.5-1.875S12.828 2 12 2s-1.5.297-1.5 1.125M15 19a3 3 0 1 1-6 0"
              />
            </g>
          </svg>
        </div>
        <div class="w-0 h-[40px] border border-neutral-300"></div>
        <div class="relative">
          <!-- Account Icon -->
          <div
            class="relative rounded-full bg-primary w-8 h-8 text-white flex justify-center items-center cursor-pointer"
            @click="toggleDropdown"
            ref="dropdownTrigger"
          >
            <span class="font-semibold text-lg">{{
              auth?.user["first_name"][0]
            }}</span>
          </div>

          <!-- Dropdown Menu -->
          <div
            v-if="isDropdownVisible"
            class="absolute right-0 top-8 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg"
            ref="dropdownMenu"
          >
            <a
              @click="logout"
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >Logout</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

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
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

const logout = async () => {
  try {
    await auth.logout();
    router.push("/login");
  } catch (error) {
    console.log("🚀 ~ logout ~ error:", error);
  }
};
</script>

<style scoped>
.dropdown {
  background: hsla(0, 65%, 57%, 0.779);
  border: 1px solid #ddd;
  padding: 10px;
}
</style>
