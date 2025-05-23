<template>
  <div class="">
    <div class="px-4 sm:px-6 lg:px-8 pt-6 pb-4">
      <!-- Header -->
      <div class="pb-4">
        <h1
          class="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight"
        >
          Trash
        </h1>
      </div>

      <!-- Breadcrumbs -->
      <div class="flex items-center overflow-x-auto pb-4 scrollbar-hide">
        <nav class="flex items-center space-x-2 text-sm">
          <span
            class="font-medium text-gray-900 truncate max-w-[120px] sm:max-w-none"
          >
            {{ auth.user.username }}
          </span>
          <span
            v-for="(item, index) in paths"
            :key="index"
            class="flex items-center"
          >
            <svg
              class="flex-shrink-0 h-4 w-4 text-gray-400 mx-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M9 6s6 4.419 6 6s-6 6-6 6"
              />
            </svg>
            <span
              class="truncate max-w-[120px] sm:max-w-none"
              :class="{
                'text-gray-500': index < paths.length - 1,
                'text-gray-900 font-medium': index === paths.length - 1,
              }"
            >
              {{ item }}
            </span>
          </span>
        </nav>
      </div>

      <!-- Navigation Controls -->
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-200"
      >
        <!-- Left Controls -->
        <div class="flex items-center space-x-4">
          <button
            :disabled="paths.length === 0"
            @click="goBack"
            class="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Go back"
          >
            <svg
              class="h-5 w-5 text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M4 12h16M9 17s-5-3.682-5-5s5-5 5-5"
              />
            </svg>
          </button>
          <button
            class="p-2 rounded-md hover:bg-gray-100"
            aria-label="Go forward"
          >
            <svg
              class="h-5 w-5 text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M20 12H4m11 5s5-3.682 5-5s-5-5-5-5"
              />
            </svg>
          </button>

          <!-- View Controls -->
          <div class="flex items-center space-x-3 ml-2">
            <button
              class="p-2 rounded-md hover:bg-gray-100"
              aria-label="Grid view"
            >
              <svg
                class="h-5 w-5 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M2 18c0-1.54 0-2.31.347-2.876c.194-.317.46-.583.777-.777C3.689 14 4.46 14 6 14s2.31 0 2.876.347c.317.194.583.46.777.777C10 15.689 10 16.46 10 18s0 2.31-.347 2.877c-.194.316-.46.582-.777.776C8.311 22 7.54 22 6 22s-2.31 0-2.876-.347a2.35 2.35 0 0 1-.777-.776C2 20.31 2 19.54 2 18m12 0c0-1.54 0-2.31.347-2.876c.194-.317.46-.583.777-.777C15.689 14 16.46 14 18 14s2.31 0 2.877.347c.316.194.582.46.776.777C22 15.689 22 16.46 22 18s0 2.31-.347 2.877a2.36 2.36 0 0 1-.776.776C20.31 22 19.54 22 18 22s-2.31 0-2.876-.347a2.35 2.35 0 0 1-.777-.776C14 20.31 14 19.54 14 18M2 6c0-1.54 0-2.31.347-2.876c.194-.317.46-.583.777-.777C3.689 2 4.46 2 6 2s2.31 0 2.876.347c.317.194.583.46.777.777C10 3.689 10 4.46 10 6s0 2.31-.347 2.876c-.194.317-.46.583-.777.777C8.311 10 7.54 10 6 10s-2.31 0-2.876-.347a2.35 2.35 0 0 1-.777-.777C2 8.311 2 7.54 2 6m12 0c0-1.54 0-2.31.347-2.876c.194-.317.46-.583.777-.777C15.689 2 16.46 2 18 2s2.31 0 2.877.347c.316.194.582.46.776.777C22 3.689 22 4.46 22 6s0 2.31-.347 2.876c-.194.317-.46.583-.776.777C20.31 10 19.54 10 18 10s-2.31 0-2.876-.347a2.35 2.35 0 0 1-.777-.777C14 8.311 14 7.54 14 6"
                />
              </svg>
            </button>

            <!-- Size Slider -->
            <div class="flex items-center space-x-2 w-24 sm:w-32">
              <input
                type="range"
                v-model="sliderValue"
                min="0"
                max="100"
                class="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        </div>

        <!-- Right Controls -->
        <div class="flex items-center space-x-4">
          <!-- Sort -->
          <button class="p-2 rounded-md hover:bg-gray-100" aria-label="Sort">
            <svg
              class="h-5 w-5 text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M4 14h4.421c.93 0 1.395 0 1.52.28c.123.28-.193.616-.826 1.288l-3.638 3.864c-.633.672-.95 1.008-.826 1.288s.59.28 1.52.28H10M4 9l2.106-4.695C6.496 3.435 6.69 3 7 3s.504.435.894 1.305L10 9m7.5 11V4m0 16c-.7 0-2.008-1.994-2.5-2.5m2.5 2.5c.7 0 2.009-1.994 2.5-2.5"
              />
            </svg>
          </button>

          <!-- Refresh -->
          <button
            @click="refresh"
            class="p-2 rounded-md hover:bg-gray-100"
            aria-label="Refresh"
          >
            <svg
              class="h-5 w-5 text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="m15.167 1l.598 1.118c.404.755.606 1.133.472 1.295c-.133.162-.573.031-1.454-.23A9.8 9.8 0 0 0 12 2.78c-5.247 0-9.5 4.128-9.5 9.22a8.97 8.97 0 0 0 1.27 4.61M8.834 23l-.598-1.118c-.404-.756-.606-1.134-.472-1.295c.133-.162.573-.032 1.454.23c.88.261 1.815.402 2.783.402c5.247 0 9.5-4.128 9.5-9.22a8.97 8.97 0 0 0-1.27-4.609"
              />
            </svg>
          </button>

          <!-- Search -->
          <div class="relative">
            <input
              type="text"
              placeholder="Search..."
              class="pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-32 sm:w-40"
            />
            <svg
              class="absolute left-2.5 top-2 h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M17.5 17.5L22 22m-2-11a9 9 0 1 0-18 0a9 9 0 0 0 18 0"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Area -->
    <div v-if="!loading" class="px-4 sm:px-6 lg:px-8 pt-4 pb-8">
      <div class="flex flex-wrap gap-8 px-8 pt-8">
        <Folder
          @folder="handleFolderClickFromChild"
          @file="handleFileClickFromChild"
          @deleteFolder="handleDeleteRequestFromChild"
          :size="slider"
          :folders="folderDetails"
        />
      </div>
    </div>

    <div v-else class="flex h-[80svh] justify-center items-center">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Modal from '~/components/Modal.vue';
import { useAuthStore } from '@/stores/auth';

const { $axios } = useNuxtApp();
const auth = useAuthStore();

const route = useRoute();
const router = useRouter();

const loading = ref(false);
const showModal = ref(false);
const uploadFileModal = ref(false);

const file = ref(null);
const progress = ref(0);
const isUploading = ref(false);
const uploadStartTime = ref(0);
const uploadedBytes = ref(0);

const fileInput = ref(null);
const inputFileName = ref('');
const inputFileSize = ref('');

const chunkSize = 1024 * 1024 * 50;

const downloadFileUrl = ref('');
const viewFileUrl = ref('');

async function refresh() {
  try {
    loading.value = true;
    await fetchFiles(paths.value.join('/'));
    console.log('🚀 ~ refresh ~ paths.value:', paths.value);
    loading.value = false;
  } catch (error) {
    console.log('🚀 ~ refresh ~ error:', error);
    loading.value = false;
  }
}

const sliderValue = ref(45);
const slider = computed(() => {
  return (sliderValue.value * 2.4).toString() + 'px';
});

onMounted(async () => {
  loading.value = true;
  await fetchFiles(paths.value.join('/'));
  loading.value = false;
});

const goBack = async () => {
  loading.value = true;

  paths.value.pop();
  await fetchFiles(paths.value.join('/'));
  loading.value = false;
};

const fetchFiles = async (folder) => {
  let folderPath = '';
  if (folder && folder[0] === '/') {
    folderPath = folder.slice(1, folder.length);
  } else {
    folderPath = folder;
  }
  try {
    const response = await $axios.get('/file/list-trash', {
      params: {
        path: encodeURIComponent(folderPath),
      },
    });

    if (response.data.status === 'OK') {
      folders.value = response.data.result.map((item) => {
        return item.name;
      });

      folderDetails.value = response.data.result;
    }
  } catch (error) {
    console.log('🚀 ~ fetchFiles= ~ error:', error);
    if (error.response) {
      // console.error("Error Status Code:", error.response.status);
      // console.error("Error Headers:", error.response.headers);
      // console.error("Error Data:", error.response._data);
    } else {
      console.error('Unexpected Error:', error);
    }
  }
};

const handleFolderClickFromChild = async (folder) => {
  loading.value = true;

  paths.value.push(folder.name);
  console.log('🚀 ~ handleFolderClickFromChild ~ paths.value:', paths.value);

  await fetchFiles(paths.value.join('/'));
  loading.value = false;
};
const handleFileClickFromChild = (file, type) => {
  let filePath = paths.value.join('/');
  filePath += '/';
  filePath += file.name;
  console.log('🚀 ~ handleFileClickFromChild ~ filePath:', filePath);

  const baseUrl = 'http://localhost:8000/view-file';
  const encodedPath = encodeURIComponent(filePath);

  if (type === 'view') {
    viewFileUrl.value = `${baseUrl}?path=${encodedPath}&action=view`;
    window.open(viewFileUrl.value, '_blank');
  } else {
    viewFileUrl.value = `${baseUrl}?path=${encodedPath}&action=download`;
    window.open(viewFileUrl.value, '_blank');
  }
};

const handleDeleteRequestFromChild = async (folder) => {
  console.log('🚀 ~ handleDeleteRequestFromChild ~ folder:', folder);

  try {
    let response = null;

    if (folder.type == 'directory') {
      response = await $axios.post(
        'file/delete-folder',
        {},
        {
          params: {
            path:
              paths.value.length === 0
                ? folder.name
                : paths.join('/') + `${folder.name}`,
          },
        },
      );
    } else {
      response = await $axios.post(
        'file/delete-file',
        {},
        {
          params: {
            path:
              paths.value.length === 0
                ? folder.name
                : paths.join('/') + `${folder.name}`,
          },
        },
      );
    }

    if (response.data.status === 'OK') {
    }
  } catch (error) {
    console.log('🚀 ~ handleDeleteRequestFromChild ~ error:', error);
  }
};
let folders = ref([]);

let folderDetails = ref([]);

let paths = ref([]);
</script>

<style>
.loader {
  height: 4px;
  width: 130px;
  --c: no-repeat linear-gradient(#4a68f5 0 0);
  background: var(--c), var(--c), #bfc7e9;
  background-size: 60% 100%;
  animation: l16 3s infinite;
}
@keyframes l16 {
  0% {
    background-position: -150% 0, -150% 0;
  }
  66% {
    background-position: 250% 0, -150% 0;
  }
  100% {
    background-position: 250% 0, 250% 0;
  }
}
</style>
