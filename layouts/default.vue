<template>
  <div class="flex h-screen max-w-[100vw]">
    <!-- Drawer Overlay (mobile only) -->
    <div
      v-if="isMobile && isMobileDrawerOpen"
      class="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
      @click="isMobileDrawerOpen = false"
    >
      click me
    </div>

    <!-- Navigation Drawer -->
    <aside
      :class="[
        'fixed md:relative top-0 left-0 z-50 h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out overflow-y-auto scrollbar-hidden',
        'shadow-lg md:shadow-none',
        {
          'translate-x-0': isMobileDrawerOpen || !isMobile,
          '-translate-x-full': !isMobileDrawerOpen && isMobile,
          'w-72': !miniVariant,
          'w-20': miniVariant,
        },
      ]"
    >
      <!-- Drawer Header -->
      <div
        class="flex justify-between items-center gap-1 py-3 px-4 sticky top-0 bg-white z-10"
      >
        <div class="flex items-center gap-2">
          <img
            class="w-12 h-12"
            src="/public/cloudifice_icon.png"
            alt="cloudifice-logo"
          />
          <transition name="fade">
            <p
              v-if="!miniVariant"
              class="text-xl font-semibold tracking-wider text-[#788bf8] whitespace-nowrap"
            >
              Cloudifice
            </p>
          </transition>
        </div>
        <transition name="fade">
          <div v-if="!miniVariant">
            <button
              @click="toggleDrawer"
              class="text-[#788bf8] hover:bg-gray-100 p-1 rounded-full transition-colors"
            >
              <svg
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
                >
                  <path
                    d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12"
                  />
                  <path d="M14 7s-4 3.682-4 5s4 5 4 5" />
                </g>
              </svg>
            </button>
          </div>
        </transition>
      </div>

      <!-- Mini Variant Toggle -->
      <div v-if="miniVariant" class="flex justify-center mb-2">
        <button
          @click="toggleDrawer"
          class="text-[#788bf8] hover:bg-gray-100 p-1 rounded-full transition-colors"
        >
          <svg
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
            >
              <path
                d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12"
              />
              <path d="M10 7s4 3.682 4 5s-4 5-4 5" />
            </g>
          </svg>
        </button>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-200 mx-4"></div>

      <!-- User Profile -->
      <transition name="fade">
        <div
          v-if="!miniVariant"
          class="flex space-x-3 border border-gray-200 mt-4 rounded-lg p-3 mx-3 hover:bg-gray-50 transition-colors"
        >
          <div>
            <AccountImg
              v-if="auth.profile_image"
              :account-img="
                auth.user.profile_image_url ? auth.user.profile_image_url : null
              "
              :show-status="false"
              height="60px"
              width="60px"
            />
            <svg
              v-else
              class="text-[#788bf8]"
              xmlns="http://www.w3.org/2000/svg"
              width="55"
              height="55"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M6.578 15.482c-1.415.842-5.125 2.562-2.865 4.715C4.816 21.248 6.045 22 7.59 22h8.818c1.546 0 2.775-.752 3.878-1.803c2.26-2.153-1.45-3.873-2.865-4.715a10.66 10.66 0 0 0-10.844 0M16.5 6.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0"
              />
            </svg>
          </div>
          <div v-if="auth" class="flex-col overflow-hidden">
            <p class="text-gray-800 tracking-wide text-lg font-medium truncate">
              {{ auth?.user['first_name'] }} {{ auth?.user['last_name'] }}
            </p>
            <p class="text-sm text-gray-500 truncate">
              {{ auth?.user['email'] }}
            </p>
          </div>
        </div>
      </transition>

      <!-- New Folder Button -->
      <div class="flex justify-center mx-3 mt-3">
        <button
          class="py-2 flex justify-center items-center gap-2 border border-gray-200 w-full rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span>
            <svg
              class="text-[#788bf8]"
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
                d="M18 13.5v8m4-4h-8m-7-11h9.75c2.107 0 3.16 0 3.917.506a3 3 0 0 1 .827.827c.465.695.502 1.851.505 3.667M12 6.5l-.633-1.267c-.525-1.05-1.005-2.106-2.168-2.542C8.69 2.5 8.108 2.5 6.944 2.5c-1.816 0-2.724 0-3.406.38A3 3 0 0 0 2.38 4.038C2 4.72 2 5.628 2 7.444V10.5c0 4.714 0 7.071 1.464 8.535C4.822 20.394 6.944 20.493 11 20.5"
              />
            </svg>
          </span>
          <transition name="fade">
            <span v-if="!miniVariant" class="whitespace-nowrap"
              >New Folder</span
            >
          </transition>
        </button>
      </div>

      <!-- Main Links -->
      <div class="flex-col mx-3">
        <nav>
          <ul class="py-4">
            <li
              v-for="(item, index) in mainLinks"
              :key="index"
              @click.stop="
                selectLink(item);
                navigateToRoute(item);
              "
              :class="{
                'flex items-center space-x-3 py-2 px-3 rounded-lg transition-colors': true,
                'bg-[#f7f7f7]': selectedItem === item.id,
                'hover:bg-gray-100': selectedItem !== item.id,
              }"
            >
              <svg
                class="text-[#788bf8] min-w-[24px]"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                v-html="item.image"
              ></svg>
              <transition name="fade">
                <span
                  v-if="!miniVariant"
                  class="text-gray-700 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {{ item.name }}
                </span>
              </transition>
            </li>
          </ul>
        </nav>
        <div class="border-t border-gray-200 mx-2"></div>
      </div>

      <!-- Chat Hub Section -->
      <div class="flex justify-between pt-4 mx-3">
        <transition name="fade">
          <p
            v-if="!miniVariant"
            class="text-gray-800 text-base font-semibold whitespace-nowrap"
          >
            Chat Hub
          </p>
        </transition>
      </div>

      <!-- Personal Links -->
      <div class="flex-col mx-3">
        <nav>
          <ul class="py-3">
            <li
              v-for="(item, index) in personalLinks"
              :key="index"
              @click.stop="
                selectLink(item);
                navigateToRoute(item);
              "
              :class="{
                'flex items-center space-x-3 py-2 px-3 rounded-lg transition-colors': true,
                'bg-[#f7f7f7]': selectedItem === item.id,
                'hover:bg-gray-100': selectedItem !== item.id,
              }"
            >
              <svg
                class="text-[#788bf8] min-w-[24px]"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                v-html="item.image"
              ></svg>
              <transition name="fade">
                <span
                  v-if="!miniVariant"
                  class="text-gray-700 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {{ item.name }}
                </span>
              </transition>
            </li>
          </ul>
        </nav>
        <div class="border-t border-gray-200 mx-2"></div>
      </div>

      <!-- Help Links -->
      <div class="mt-4">
        <div class="flex-col mx-3">
          <nav>
            <ul class="py-3">
              <li
                v-for="(item, index) in helpLinks"
                :key="index"
                @click.stop="
                  selectLink(item);
                  navigateToRoute(item);
                "
                :class="{
                  'flex items-center space-x-3 py-2 px-3 rounded-lg transition-colors': true,
                  'bg-[#f7f7f7]': selectedItem === item.id,
                  'hover:bg-gray-100': selectedItem !== item.id,
                }"
              >
                <svg
                  class="text-[#788bf8] min-w-[24px]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  v-html="item.image"
                ></svg>
                <transition name="fade">
                  <span
                    v-if="!miniVariant"
                    class="text-gray-700 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    {{ item.name }}
                  </span>
                </transition>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex flex-col flex-1 overflow-hidden">
      <AppBar @toggle-drawer="isMobileDrawerOpen = !isMobileDrawerOpen" />

      <main class="flex-1 overflow-auto p-4 bg-gray-50">
        <slot />
      </main>

      <Toast />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Toast from '~/components/Toast.vue';

const auth = useAuthStore();
const ui = useUIStore();

const miniVariant = ref(false);
const isMobileDrawerOpen = ref(false);
const isMobile = ref(window.innerWidth < 768);

const router = useRouter();

let selectedItem = ref(1);

function navigateToRoute(item) {
  router.push(item.path);
}

function selectLink(item) {
  selectedItem.value = item.id;
  if (isMobile.value) {
    isMobileDrawerOpen.value = false;
  }
}

const toggleDrawer = () => {
  if (isMobile.value) {
    isMobileDrawerOpen.value = !isMobileDrawerOpen.value;
  } else {
    miniVariant.value = !miniVariant.value;
  }
};

const handleResize = () => {
  console.log('🚀 ~ handleResize ~ handleResize:', handleResize);
  isMobile.value = window.innerWidth < 768;
  if (!isMobile.value) {
    isMobileDrawerOpen.value = false;
  } else {
    // On mobile, start with drawer closed
    isMobileDrawerOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize(); // Initialize on mount
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
/* Smooth transitions for the drawer */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom scrollbar for the drawer */
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

.scrollbar-hidden {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Better hover effects */
li {
  transition: background-color 0.2s ease;
  cursor: pointer;
}

/* Ensure content doesn't shift when scrollbar appears/disappears */
html {
  overflow-y: scroll;
}
</style>
