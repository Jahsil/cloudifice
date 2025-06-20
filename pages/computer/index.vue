<template>
  <div class="">
    <!-- Create Folder Modal -->
    <Modal size="500px" v-model:modelValue="showModal">
      <!-- Header -->
      <div class="flex justify-between items-center border-b p-4">
        <h3 class="text-lg font-semibold text-gray-800">Create new folder</h3>
        <button
          @click="showModal = false"
          class="text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M19 5L5 19M5 5l14 14"
              color="currentColor"
            />
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="p-6">
        <label class="text-sm" for="full-name-2">Folder Name</label>
        <input
          v-model="folderPayload.name"
          id="name"
          type="text"
          placeholder="Enter folder name"
          :class="{
            'w-full pl-4 py-2  rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            'border-[2px] border-red-500': folderError.name,
            'border border-neutral-300': !folderError.name,
          }"
        />
        <span v-if="folderError.name" class="text-sm text-red-500 mt-1">
          {{ folderError.name }}
        </span>
      </div>

      <!-- Footer -->
      <div class="flex justify-end items-center border-t p-4 space-x-2">
        <button
          @click="showModal = false"
          class="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
        >
          Cancel
        </button>
        <!-- <button
          @click="createFolder"
          class="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none"
        >
          Confirm
        </button> -->

        <button
          @click="handleCreateFolder"
          class="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none"
        >
          <span v-if="loadingCreateFolder" class="mr-2">
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
          <span>Confirm</span>
        </button>
      </div>
    </Modal>

    <!-- Upload File Modal -->
    <Modal size="500px" v-model:modelValue="uploadFileModal">
      <!-- Header -->
      <div class="flex justify-between items-center border-b p-4">
        <h3 class="text-lg font-semibold text-gray-800">Upload file</h3>
        <button
          @click="uploadFileModal = false"
          class="text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M19 5L5 19M5 5l14 14"
              color="currentColor"
            />
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="p-6">
        <div
          class="relative px-4 h-40 outline-dashed outline-2 outline-gray-400"
        >
          <div class="flex flex-col items-center justify-center py-8">
            <div>
              <svg
                class="text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M12 4.5v10m0-10c-.7 0-2.008 1.994-2.5 2.5M12 4.5c.7 0 2.008 1.994 2.5 2.5m5.5 9.5c0 2.482-.518 3-3 3H7c-2.482 0-3-.518-3-3"
                  color="currentColor"
                />
              </svg>
            </div>
            <p class="pt-3 text-sm tracking-wider font-medium">
              Drag & Drop or
              <span
                @click="triggerFileUpload"
                class="text-blue-500 cursor-pointer"
                >Choose file</span
              >
              to upload
            </p>
            <p class="text-gray-500 text-sm">CVS or TXT</p>
            <!-- hidden file input  -->
            <input
              type="file"
              ref="fileInput"
              class="hidden"
              @change="handleFileChange"
              @click="resetFileInput"
            />
          </div>
        </div>
        <!-- see uploaded file  -->
        <div
          v-if="file"
          class="mt-6 mb-2 p-4 rounded-lg bg-[#f1f3f4] overflow-hidden"
        >
          <div class="flex justify-between gap-4">
            <!-- File Info Section -->
            <div class="flex gap-3 min-w-0">
              <!-- File Icon -->
              <div class="flex-shrink-0">
                <svg
                  class="text-orange-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="44"
                  height="44"
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
                      d="M21 11v-1c0-3.771 0-5.657-1.24-6.828C18.519 2 16.522 2 12.53 2h-1.06C7.479 2 5.482 2 4.24 3.172C3 4.343 3 6.229 3 10v4c0 3.771 0 5.657 1.24 6.828C5.481 22 7.478 22 11.47 22H12M8 7h8m-8 5h5"
                    />
                    <path
                      d="M21 20.647V17c0-1.43-1.343-3-3-3s-3 1.57-3 3v3.5c0 .78.733 1.5 1.636 1.5c.904 0 1.637-.72 1.637-1.5v-2.735"
                    />
                  </g>
                </svg>
              </div>

              <!-- File Details -->
              <div class="min-w-0">
                <p class="font-medium truncate">{{ inputFileName }}</p>
                <p class="text-sm text-gray-500 truncate">
                  {{ formatBytes(inputFileSize) }}
                  <span v-if="progress">
                    • {{ timeRemaining }} seconds left</span
                  >
                </p>
              </div>
            </div>

            <!-- Actions & Progress -->
            <div class="flex flex-col items-end gap-1 flex-shrink-0">
              <button
                @click="removeFile"
                class="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M19 5L5 19M5 5l14 14"
                    color="currentColor"
                  />
                </svg>
              </button>
              <p
                v-if="progress"
                class="text-sm text-gray-500 whitespace-nowrap"
              >
                {{ progress }}%
              </p>
            </div>
          </div>

          <!-- Progress Bar -->
          <div v-if="progress" class="mt-3">
            <ProgressBar :amount="progress" />
          </div>
        </div>
        <!-- ------------------ OR ------------------- -->
        <div class="border border-gray-300"></div>

        <!-- import from URL  -->
        <div class="pt-8">
          <label
            class="text-base font-medium tracking-wide text-gray-600"
            for="full-name-2"
            >Import from URL</label
          >
          <input
            id="name"
            type="text"
            placeholder="Add the URL"
            :class="{
              'w-full pl-4 py-2 mt-2 rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
              'border border-neutral-300': true,
            }"
          />
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end items-center border-t p-4 space-x-2">
        <button
          @click="uploadFileModal = false"
          class="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
        >
          Cancel
        </button>
        <button
          :disabled="loadingCreateFile"
          @click="uploadFile"
          class="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none"
        >
          Upload
        </button>
      </div>
    </Modal>
    <div class="px-4 sm:px-6 lg:px-8 pt-6 pb-4">
      <!-- Header -->
      <div class="pb-4">
        <h1
          class="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight"
        >
          Computer
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

          <!-- New Folder -->
          <button
            @click="showModal = true"
            class="p-2 rounded-md hover:bg-gray-100"
            aria-label="New folder"
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
                d="M18 13.5v8m4-4h-8m-7-11h9.75c2.107 0 3.16 0 3.917.506a3 3 0 0 1 .827.827c.465.695.502 1.851.505 3.667M12 6.5l-.633-1.267c-.525-1.05-1.005-2.106-2.168-2.542C8.69 2.5 8.108 2.5 6.944 2.5c-1.816 0-2.724 0-3.406.38A3 3 0 0 0 2.38 4.038C2 4.72 2 5.628 2 7.444V10.5c0 4.714 0 7.071 1.464 8.535C4.822 20.394 6.944 20.493 11 20.5"
              />
            </svg>
          </button>

          <!-- Upload -->
          <button
            @click="uploadFileModal = true"
            class="p-2 rounded-md hover:bg-gray-100"
            aria-label="Upload file"
          >
            <svg
              class="h-5 w-5 text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
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
                  d="M13 2h.273c3.26 0 4.892 0 6.024.798c.324.228.612.5.855.805c.848 1.066.848 2.6.848 5.67v2.545c0 2.963 0 4.445-.469 5.628c-.754 1.903-2.348 3.403-4.37 4.113c-1.257.441-2.83.441-5.98.441c-1.798 0-2.698 0-3.416-.252c-1.155-.406-2.066-1.263-2.497-2.35C4 18.722 4 17.875 4 16.182V12"
                />
                <path
                  d="M21 12a3.333 3.333 0 0 1-3.333 3.333c-.666 0-1.451-.116-2.098.057a1.67 1.67 0 0 0-1.179 1.179c-.173.647-.057 1.432-.057 2.098A3.333 3.333 0 0 1 11 22m0-16H3m4-4v8"
                />
              </g>
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
              @input="searchFolders($event)"
              v-model="searchFolder"
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
          :folders="searchFolder ? filteredFolders : folderDetails"
        />
      </div>
    </div>

    <!-- Loading State -->
    <!-- <div v-else class="flex h-[60vh] items-center justify-center">
      <div
        class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"
      ></div>
    </div> -->
    <!-- <div v-if="!loading" class="flex flex-wrap gap-8 px-8 pt-8">
      <Folder
        @folder="handleFolderClickFromChild"
        @file="handleFileClickFromChild"
        :size="slider"
        :folders="folderDetails"
      />
    </div> -->
    <div v-else class="flex h-[80svh] justify-center items-center">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Modal from '~/components/Modal.vue';
import { useAuthStore } from '@/stores/auth';
const { showToast } = useToast();

const config = useRuntimeConfig();
const apiBase = config.public.apiBase;
const brodcastApiBase = config.public.brodcastApiBase;

const { $axios } = useNuxtApp();
const auth = useAuthStore();

const route = useRoute();
const router = useRouter();

const loading = ref(false);
const showModal = ref(false);
const uploadFileModal = ref(false);

// utility functions
function formatBytes(bytes, precision = 2) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  bytes = Math.max(bytes, 0);
  const power = bytes > 0 ? Math.floor(Math.log(bytes) / Math.log(1024)) : 0;
  const size = bytes / Math.pow(1024, power);
  return `${size.toFixed(precision)} ${units[power]}`;
}

// loadings
const loadingCreateFolder = ref(false);
const loadingCreateFile = ref(false);

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

// throttle all buttons
const handleCreateFolder = throttle(createFolder, 3000);

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

function triggerFileUpload() {
  fileInput.value.click();
}
function resetFileInput() {
  fileInput.value.value = '';
}
function handleFileChange(event) {
  file.value = event.target.files[0];
  if (file.value) {
    inputFileName.value = file.value.name;
    inputFileSize.value = file.value.size;

    // Add file processing logic here
  }
}

const abortController = ref(null);

function removeFile() {
  if (abortController.value && !abortController.value.signal.aborted) {
    abortController.value.abort(); // Triggers cancellation
  }
  fileInput.value = null;
  file.value = null;
}
const timeRemaining = computed(() => {
  if (progress.value > 0 && uploadedBytes.value > 0) {
    const elapsedTime = (Date.now() - uploadStartTime.value) / 1000; // Time in seconds
    const speed = uploadedBytes.value / elapsedTime; // Bytes per second
    const remainingBytes = file.value.size - uploadedBytes.value;
    return Math.ceil(remainingBytes / speed);
  }
  return null;
});

const searchFolder = ref('');
const filteredFolders = ref([]);
const searchFolders = (event) => {
  let search = searchFolder.value.toLowerCase();

  if (searchFolder.value.length > 0) {
    filteredFolders.value = folderDetails.value.filter((folder) => {
      const folderName = (folder.name || '').toLowerCase();
      return folderName.includes(search);
    });
  }
};

const uploadFile = async () => {
  if (!file.value) {
    alert('Please select a file.');
    return;
  }
  loadingCreateFile.value = true;

  abortController.value = new AbortController();

  const totalChunks = Math.ceil(file.value.size / chunkSize);
  let uploadedBytesTotal = 0; // Track total uploaded bytes
  let uploadedChunksSize = 0;

  isUploading.value = true;
  uploadStartTime.value = Date.now();
  let fileChunkIndex = 0;

  // check if there is already a chunk
  try {
    const response = await $axios.post('file/check_chunk', {
      fileName: file.value.name,
    });
    fileChunkIndex = response.data.data;
    uploadedChunksSize = fileChunkIndex * chunkSize;
  } catch (error) {
    console.log('🚀 ~ uploadFile ~ error:', error);
  }
  let response = null;

  for (let index = fileChunkIndex; index < totalChunks; index++) {
    // Exit loop if cancellation was requested
    if (abortController.value.signal.aborted) break;

    const start = index * chunkSize;
    const end = Math.min(start + chunkSize, file.value.size);
    const chunk = file.value.slice(start, end);
    const chunkSizeActual = end - start; // Actual size of this chunk (last chunk might be smaller)

    const formData = new FormData();
    formData.append('file', chunk);
    formData.append('fileName', file.value.name);
    formData.append('chunkIndex', index);
    formData.append('totalChunks', totalChunks);
    formData.append(
      'path',
      paths.value.length > 0 ? paths.value.join('/') : 'root',
    );

    try {
      response = await $axios.post('file/upload_file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        signal: abortController.value.signal,
        onUploadProgress: (progressEvent) => {
          if (progressEvent.loaded && progressEvent.total) {
            // Calculate progress for current chunk only
            const chunkProgress = Math.min(
              progressEvent.loaded,
              chunkSizeActual,
            );
            // Calculate total progress including previously uploaded chunks
            const totalUploaded = uploadedChunksSize + chunkProgress;
            const percentCompleted = Math.min(
              Math.round((totalUploaded / file.value.size) * 100),
              100, // Ensure we don't exceed 100%
            );
            progress.value = percentCompleted;
          }
        },
      });

      uploadedChunksSize += chunkSizeActual;
    } catch (error) {
      if (error.code === 'ERR_CANCELED') {
        showToast('Upload cancelled', 'warning', 5000);
      } else {
        showToast(error.response?.data?.message || 'Upload failed', 'error');
        console.error('Upload error:', error);
      }

      loadingCreateFile.value = false;

      isUploading.value = false;
      progress.value = 0;
      file.value = null;
      return;
    }
  }

  isUploading.value = false;
  progress.value = 0;
  file.value = null;
  loadingCreateFile.value = false;
  abortController.value = null;

  showToast('File upload successful', 'success', 5000);
  folderDetails.value.push(response?.data?.data);
};

const folderError = ref({
  name: '',
});

const folderPayload = ref({
  name: '',
});

function validateForm() {
  let isValid = true;

  // Name Validation
  if (!folderPayload.value.name) {
    folderError.value.name = 'Folder name is required.';
    isValid = false;
  } else if (!/^[A-Za-z]{1,50}$/.test(folderPayload.value.name)) {
    folderError.value.name =
      'First name must be up to 50 characters, letters only (A-Z or a-z).';
    isValid = false;
  } else {
    folderError.value.name = '';
  }
  return isValid;
}

async function createFolder() {
  try {
    loadingCreateFolder.value = true;
    let newPath = [...paths.value];
    if (validateForm()) {
      const response = await $axios.post(
        'file/create-folder',
        {},
        {
          params: {
            path: paths.value.length === 0 ? 'root' : newPath.join('/'),
            name: folderPayload.value.name,
          },
        },
      );
      if (response.data.status === 'OK') {
        showToast('Folder creation succesful', 'success', 5000);
        folderDetails.value.push(response?.data?.data);
      }
      showModal.value = false;
    }
    loadingCreateFolder.value = false;
  } catch (error) {
    console.log('🚀 ~ createFolder ~ error:', error);
    let errorMessage = 'Folder creation failed';
    if (error && error.response?.data?.message) {
      errorMessage = error.response?.data?.message;
    }
    showToast(errorMessage, 'error', 5000);

    showModal.value = false;
    loadingCreateFolder.value = false;
  }
}

async function refresh() {
  try {
    loading.value = true;
    await fetchFiles(paths.value.join('/'));
    loading.value = false;
  } catch (error) {
    console.log('🚀 ~ refresh ~ error:', error);
    loading.value = false;
    showToast('Folder creation failed', 'error', 5000);
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
    const response = await $axios.get('/file/list', {
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
      let errorMessage = 'Folder creation failed';
      if (error && error.response?.data?.message) {
        errorMessage = error.response?.data?.message;
      }
      showToast(errorMessage, 'error', 5000);
    } else {
      console.error('Unexpected Error:', error);
      showToast('Unexpected Error', 'error', 5000);
    }
  }
};

const handleFolderClickFromChild = async (folder) => {
  loading.value = true;

  paths.value.push(folder.name);

  await fetchFiles(paths.value.join('/'));
  loading.value = false;
};
const handleFileClickFromChild = (file, type) => {
  let filePath = paths.value.join('/');
  filePath += '/';
  filePath += file.name;

  const baseUrl = `${brodcastApiBase}/view-file`;
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
  try {
    let response = null;
    let newPath = '';
    paths.value.forEach((item) => {
      newPath += item + '/';
    });
    if (folder.type == 'directory') {
      response = await $axios.post(
        'file/delete-folder',
        {},
        {
          params: {
            path:
              paths.value.length === 0
                ? encodeURIComponent(folder.name)
                : encodeURIComponent(newPath + `${folder.name}`),
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
                ? encodeURIComponent(folder.name)
                : encodeURIComponent(newPath + `${folder.name}`),
          },
        },
      );
    }

    if (response.data.status === 'OK') {
      showToast('Folder deletion successful', 'success', 5000);
      let popIndex = folderDetails.value.findIndex((item) => {
        return item.name === folder.name;
      });

      if (popIndex !== -1) {
        folderDetails.value.splice(popIndex, 1);
      }
    }
  } catch (error) {
    console.log('🚀 ~ handleDeleteRequestFromChild ~ error:', error);
    let errorMessage = 'Folder deletion failed';
    if (error && error.response?.data?.message) {
      errorMessage = error.response?.data?.message;
    }
    showToast(errorMessage, 'error', 5000);
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
