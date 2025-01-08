<template>
  <div class="flex">
    <div
      :class="{
        ' min-h-screen bg-white border border-neutral-300  overflow-y-hidden overflow-x-clip transition-all duration-300': true,
        'w-[290px]': !miniVariant,
        'min-w-[90px]': miniVariant,
      }"
    >
      <!-- Navigation Drawer -->

      <div class="flex justify-between items-center gap-1 py-2 pr-2 pl-5">
        <div class="flex items-center gap-2">
          <img
            class="ml-0"
            style="width: 3rem; height: 3rem"
            src="/public/cloudifice_icon.png"
            alt="cloudifice-logo"
          />

          <p
            v-if="!miniVariant"
            class="text-xl font-semibold tracking-wider text-[#232326]"
          >
            Cloudifice
          </p>
        </div>
        <div v-if="!miniVariant">
          <button @click="toogleDrawer">
            <svg
              class="text-[#788bf8]"
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="27"
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
                  d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12"
                />
                <path d="M14 7s-4 3.682-4 5s4 5 4 5" />
              </g>
            </svg>
          </button>
        </div>
      </div>
      <div v-if="miniVariant">
        <svg
          @click="toogleDrawer"
          class="text-[#788bf8] mx-auto mb-2"
          xmlns="http://www.w3.org/2000/svg"
          width="27"
          height="27"
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
              d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12"
            />
            <path d="M10 7s4 3.682 4 5s-4 5-4 5" />
          </g>
        </svg>
      </div>

      <!-- border  -->
      <div class="border border-neutral-300"></div>

      <div
        v-if="!miniVariant"
        class="flex space-x-2 border border-neutral-300 mt-4 rounded-lg py-2 mx-4"
      >
        <div>
          <svg
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
              color="currentColor"
            />
          </svg>
        </div>
        <div class="flex-col">
          <p class="text-[#232326] tracking-wide text-lg">Eyouel Haile</p>
          <p>eyouel@eyouel.com</p>
        </div>
      </div>

      <div class="flex justify-center mx-4 mt-3">
        <button
          class="py-2 flex justify-center items-center gap-2 border border-neutral-300 w-full rounded-lg"
        >
          <span>
            <svg
              class="text-[#788bf8]"
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="27"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M18 13.5v8m4-4h-8m-7-11h9.75c2.107 0 3.16 0 3.917.506a3 3 0 0 1 .827.827c.465.695.502 1.851.505 3.667M12 6.5l-.633-1.267c-.525-1.05-1.005-2.106-2.168-2.542C8.69 2.5 8.108 2.5 6.944 2.5c-1.816 0-2.724 0-3.406.38A3 3 0 0 0 2.38 4.038C2 4.72 2 5.628 2 7.444V10.5c0 4.714 0 7.071 1.464 8.535C4.822 20.394 6.944 20.493 11 20.5"
                color="currentColor"
              />
            </svg>
          </span>
          <span v-if="!miniVariant">New Folder</span>
        </button>
      </div>

      <div class="flex-col mx-4">
        <nav>
          <ul
            :class="{
              'py-4 mt-3  ': true,
            }"
          >
            <li
              @click.stop="
                () => {
                  selectLink(item), navigateToRoute(item);
                }
              "
              v-for="(item, index) in mainLinks"
              :key="index"
              :class="{
                'flex items-center space-x-4 py-3': true,
                'bg-[#f7f7f7] rounded-lg': selectedItem === item.id,
              }"
            >
              <svg
                class="text-[#788bf8]"
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                viewBox="0 0 24 24"
                v-html="item.image"
              ></svg>
              <span
                v-if="!miniVariant"
                class="text-lg font-medium text-[#5f5f62]"
                >{{ item.name }}</span
              >
            </li>
          </ul>
        </nav>
        <div class="border border-neutral-200 mx-2"></div>
      </div>

      <!-- personal files  -->
      <div class="flex justify-between pt-4 mx-2">
        <p
          :class="{
            'text-[#2f2f31] text-base font-semibold ': true,
            'hidden [#2f2f31]': miniVariant,
          }"
        >
          Personal Files
        </p>
        <svg
          v-if="!miniVariant"
          class="ml-0 mr-3 text-[#788bf8]"
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="17"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M12 4v16m8-8H4"
            color="currentColor"
          />
        </svg>
      </div>

      <div class="flex-col mx-4">
        <nav>
          <ul class="py-3">
            <li
              @click.stop="
                () => {
                  selectLink(item), navigateToRoute(item);
                }
              "
              v-for="(item, index) in personalLinks"
              :key="index"
              :class="{
                'flex items-center space-x-3 py-2': true,
                'bg-[#f7f7f7] rounded-lg': selectedItem === item.id,
              }"
            >
              <svg
                class="text-[#788bf8]"
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                viewBox="0 0 24 24"
                v-html="item.image"
              ></svg>
              <span
                v-if="!miniVariant"
                class="text-lg font-medium text-[#5f5f62]"
                >{{ item.name }}</span
              >
            </li>
          </ul>
        </nav>
        <div class="border border-neutral-200 mx-2"></div>
      </div>

      <!-- workspace file -->
      <div class="flex justify-between pt-4 mx-2">
        <p v-if="!miniVariant" class="text-[#2f2f31] text-base font-semibold">
          Workspace Files
        </p>
        <svg
          v-if="!miniVariant"
          class="ml-0 mr-3 text-[#788bf8]"
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="17"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M12 4v16m8-8H4"
            color="currentColor"
          />
        </svg>
      </div>
      <!-- workplace  -->
      <div class="flex-col mx-4">
        <nav>
          <ul class="py-3">
            <li
              @click.stop="
                () => {
                  selectLink(item), navigateToRoute(item);
                }
              "
              v-for="(item, index) in workplaceLinks"
              :key="index"
              :class="{
                'flex items-center space-x-3 py-2': true,
                'bg-[#f7f7f7] rounded-lg': selectedItem === item.id,
              }"
            >
              <svg
                class="text-[#788bf8]"
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                viewBox="0 0 24 24"
                v-html="item.image"
              ></svg>
              <span
                v-if="!miniVariant"
                class="text-lg font-medium text-[#5f5f62]"
                >{{ item.name }}</span
              >
            </li>
          </ul>
        </nav>
        <div class="border border-neutral-200 mx-2"></div>
      </div>

      <div class="mt-4">
        <div class="flex-col mx-4">
          <nav>
            <ul class="py-3">
              <li
                @click.stop="
                  () => {
                    selectLink(item), navigateToRoute(item);
                  }
                "
                v-for="(item, index) in helpLinks"
                :key="index"
                :class="{
                  'flex items-center space-x-3 py-2': true,
                  'bg-[#f7f7f7] rounded-lg': selectedItem === item.id,
                }"
              >
                <svg
                  class="text-[#788bf8]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="27"
                  viewBox="0 0 24 24"
                  v-html="item.image"
                ></svg>
                <span
                  v-if="!miniVariant"
                  class="text-lg font-medium text-[#5f5f62]"
                  >{{ item.name }}</span
                >
              </li>
            </ul>
          </nav>
          <div class="border border-neutral-200 mx-2"></div>
        </div>
      </div>
    </div>
    <!-- Main Content -->
    <div class="flex-1">
      <AppBar />
      <main class="">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  helpLinks,
  workplaceLinks,
  personalLinks,
  mainLinks,
} from "@/utils/drawerLinks";
import AppBar from "~/components/AppBar.vue";

const route = useRoute();

const allLinks = [
  ...mainLinks,
  ...personalLinks,
  ...workplaceLinks,
  ...helpLinks,
];

onMounted(() => {
  console.log("🚀 ~ route:", route.path, allLinks);

  const filteredLink = allLinks.find(
    (item): item is { id: number; name: string; path: string; image: string } =>
      !Array.isArray(item) && item.path === route.path
  );

  if (filteredLink) {
    selectedItem.value = filteredLink.id;
  } else {
    console.warn("No matching link found for the current route.");
  }
});

const router = useRouter();

const miniVariant = ref(false);
let selectedItem = ref(1);

function toogleDrawer(): void {
  miniVariant.value = !miniVariant.value;
}

function navigateToRoute(item: { path: string }) {
  router.push(item.path);
}

function selectLink(item: { id: number }) {
  selectedItem.value = item.id;
  console.log("🚀 ~ selectLink ~ selectedItem:", selectedItem.value);
}
</script>

<style>
li {
  padding-left: 16px;
}

li:hover {
  background-color: #f7f7f7;
  border-radius: 8px;
  cursor: pointer;
}
</style>
