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
        <button
          @click="createFolder"
          class="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none"
        >
          Confirm
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
            />
          </div>
        </div>
        <!-- see uploaded file  -->
        <div v-if="file" class="mt-6 mb-2 py-4 px-3 rounded-lg bg-[#f1f3f4]">
          <div class="flex justify-between">
            <div class="flex gap-2">
              <div>
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
              <div class="flex-col">
                <p class="font-medium">{{ inputFileName }}</p>
                <p class="text-sm text-gray-500">
                  {{ (inputFileSize / 1024).toFixed(2) }}KB .
                  <span v-if="progress">
                    {{ timeRemaining }} seconds left
                  </span>
                </p>
              </div>
            </div>
            <div class="flex-col space-y-1">
              <div>
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
              </div>
              <p v-if="progress" class="text-sm text-gray-500">
                {{ progress }} %
              </p>
            </div>
          </div>
          <!-- progress bar  -->
          <div v-if="progress" class="mt-4">
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
          @click="uploadFile"
          class="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none"
        >
          Upload
        </button>
      </div>
    </Modal>
    <div class="pl-8 pt-8">
      <!-- header  -->
      <div class="pb-4">
        <p class="text-3xl tracking-wider text-neutral-800 font-semibold">
          Computer
        </p>
      </div>
      <!-- breadcrums  -->
      <div class="flex justify-start items-center">
        <span
          v-for="(item, index) in paths"
          :key="index"
          class="flex items-center space-x-2"
        >
          <span
            :class="{
              'text-xl tracking-tight font-medium': true,
              'text-[#a0a0a0]': index < paths.length - 1,
              'text-[#282828]': index == paths.length - 1,
            }"
            >{{ item }}</span
          >
          <span v-if="index < paths.length - 1"
            ><svg
              class="text-[#a0a0a0]"
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
                d="M9 6s6 4.419 6 6s-6 6-6 6"
                color="currentColor"
              />
            </svg>
          </span>
        </span>
      </div>
      <!-- navigation  -->
      <div class="xxs:flex-col md:flex md:flex-row space-x-10 pt-6">
        <div class="flex space-x-6">
          <button :disabled="paths.length === 1" @click="goBack">
            <svg
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
                d="M4 12h16M9 17s-5-3.682-5-5s5-5 5-5"
                color="currentColor"
              />
            </svg>
          </button>
          <svg
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
              d="M20 12H4m11 5s5-3.682 5-5s-5-5-5-5"
              color="currentColor"
            />
          </svg>
        </div>
        <!-- range slider -->

        <div class="flex items-center space-x-4">
          <svg
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
              d="M2 18c0-1.54 0-2.31.347-2.876c.194-.317.46-.583.777-.777C3.689 14 4.46 14 6 14s2.31 0 2.876.347c.317.194.583.46.777.777C10 15.689 10 16.46 10 18s0 2.31-.347 2.877c-.194.316-.46.582-.777.776C8.311 22 7.54 22 6 22s-2.31 0-2.876-.347a2.35 2.35 0 0 1-.777-.776C2 20.31 2 19.54 2 18m12 0c0-1.54 0-2.31.347-2.876c.194-.317.46-.583.777-.777C15.689 14 16.46 14 18 14s2.31 0 2.877.347c.316.194.582.46.776.777C22 15.689 22 16.46 22 18s0 2.31-.347 2.877a2.36 2.36 0 0 1-.776.776C20.31 22 19.54 22 18 22s-2.31 0-2.876-.347a2.35 2.35 0 0 1-.777-.776C14 20.31 14 19.54 14 18M2 6c0-1.54 0-2.31.347-2.876c.194-.317.46-.583.777-.777C3.689 2 4.46 2 6 2s2.31 0 2.876.347c.317.194.583.46.777.777C10 3.689 10 4.46 10 6s0 2.31-.347 2.876c-.194.317-.46.583-.777.777C8.311 10 7.54 10 6 10s-2.31 0-2.876-.347a2.35 2.35 0 0 1-.777-.777C2 8.311 2 7.54 2 6m12 0c0-1.54 0-2.31.347-2.876c.194-.317.46-.583.777-.777C15.689 2 16.46 2 18 2s2.31 0 2.877.347c.316.194.582.46.776.777C22 3.689 22 4.46 22 6s0 2.31-.347 2.876c-.194.317-.46.583-.776.777C20.31 10 19.54 10 18 10s-2.31 0-2.876-.347a2.35 2.35 0 0 1-.777-.777C14 8.311 14 7.54 14 6"
              color="currentColor"
            />
          </svg>

          <input
            type="range"
            v-model="sliderValue"
            class="h-1 bg-indigo-300 rounded-lg outline-none cursor-pointer accent-indigo-600"
          />

          <svg
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
              d="M7 7h9.75c2.107 0 3.16 0 3.917.506a3 3 0 0 1 .827.827C22 9.09 22 10.143 22 12.25c0 3.511 0 5.267-.843 6.528a5 5 0 0 1-1.38 1.38C18.518 21 16.762 21 13.25 21H12c-4.714 0-7.071 0-8.536-1.465C2 18.072 2 15.715 2 11V7.944c0-1.816 0-2.724.38-3.406A3 3 0 0 1 3.538 3.38C4.22 3 5.128 3 6.944 3C8.108 3 8.69 3 9.2 3.191c1.163.436 1.643 1.493 2.168 2.542L12 7"
              color="currentColor"
            />
          </svg>
        </div>
        <!-- middle ones  -->
        <div class="flex space-x-6">
          <!-- sort  -->
          <svg
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
              d="M4 14h4.421c.93 0 1.395 0 1.52.28c.123.28-.193.616-.826 1.288l-3.638 3.864c-.633.672-.95 1.008-.826 1.288s.59.28 1.52.28H10M4 9l2.106-4.695C6.496 3.435 6.69 3 7 3s.504.435.894 1.305L10 9m7.5 11V4m0 16c-.7 0-2.008-1.994-2.5-2.5m2.5 2.5c.7 0 2.009-1.994 2.5-2.5"
              color="currentColor"
            />
          </svg>
          <!-- add new folder  -->
          <button @click="showModal = true">
            <svg
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
                d="M18 13.5v8m4-4h-8m-7-11h9.75c2.107 0 3.16 0 3.917.506a3 3 0 0 1 .827.827c.465.695.502 1.851.505 3.667M12 6.5l-.633-1.267c-.525-1.05-1.005-2.106-2.168-2.542C8.69 2.5 8.108 2.5 6.944 2.5c-1.816 0-2.724 0-3.406.38A3 3 0 0 0 2.38 4.038C2 4.72 2 5.628 2 7.444V10.5c0 4.714 0 7.071 1.464 8.535C4.822 20.394 6.944 20.493 11 20.5"
                color="currentColor"
              />
            </svg>
          </button>
          <!-- upload a file  -->
          <button @click="uploadFileModal = true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
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
                  d="M13 2h.273c3.26 0 4.892 0 6.024.798c.324.228.612.5.855.805c.848 1.066.848 2.6.848 5.67v2.545c0 2.963 0 4.445-.469 5.628c-.754 1.903-2.348 3.403-4.37 4.113c-1.257.441-2.83.441-5.98.441c-1.798 0-2.698 0-3.416-.252c-1.155-.406-2.066-1.263-2.497-2.35C4 18.722 4 17.875 4 16.182V12"
                />
                <path
                  d="M21 12a3.333 3.333 0 0 1-3.333 3.333c-.666 0-1.451-.116-2.098.057a1.67 1.67 0 0 0-1.179 1.179c-.173.647-.057 1.432-.057 2.098A3.333 3.333 0 0 1 11 22m0-16H3m4-4v8"
                />
              </g>
            </svg>
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
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
              <path d="m8 12.5l2.5 2.5L16 9" />
            </g>
          </svg>
          <svg
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
              d="M17.5 17.5L22 22m-2-11a9 9 0 1 0-18 0a9 9 0 0 0 18 0M8 14l6-6M8 8l6 6"
              color="currentColor"
            />
          </svg>
        </div>
        <div class="flex space-x-6">
          <!-- refresh  -->
          <button @click="refresh">
            <svg
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
                d="m15.167 1l.598 1.118c.404.755.606 1.133.472 1.295c-.133.162-.573.031-1.454-.23A9.8 9.8 0 0 0 12 2.78c-5.247 0-9.5 4.128-9.5 9.22a8.97 8.97 0 0 0 1.27 4.61M8.834 23l-.598-1.118c-.404-.756-.606-1.134-.472-1.295c.133-.162.573-.032 1.454.23c.88.261 1.815.402 2.783.402c5.247 0 9.5-4.128 9.5-9.22a8.97 8.97 0 0 0-1.27-4.609"
                color="currentColor"
              />
            </svg>
          </button>
          <svg
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
              d="M17.5 17.5L22 22m-2-11a9 9 0 1 0-18 0a9 9 0 0 0 18 0"
              color="currentColor"
            />
          </svg>
        </div>
      </div>
    </div>
    <div v-if="!loading" class="flex flex-wrap gap-8 px-8 pt-8">
      <Folder
        @folder="handleFolderClickFromChild"
        :size="slider"
        :folders="folderDetails"
      />
    </div>
    <div v-else class="flex h-[80svh] justify-center items-center">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Modal from "~/components/Modal.vue";

const { $axios } = useNuxtApp();

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
const inputFileName = ref("");
const inputFileSize = ref("");

function triggerFileUpload() {
  fileInput.value.click();
}

function handleFileChange(event) {
  file.value = event.target.files[0];
  if (file.value) {
    inputFileName.value = file.value.name;
    inputFileSize.value = file.value.size;

    // Add file processing logic here
  }
}

function removeFile() {
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

const uploadFile = async () => {
  if (!file.value) {
    alert("Please select a file.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file.value);
  formData.append("path", "/home/eyouel/Desktop");

  isUploading.value = true;
  uploadStartTime.value = Date.now();

  try {
    await $axios.post("file/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        // Calculate upload percentage
        uploadedBytes.value = progressEvent.loaded;
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        progress.value = percentCompleted; // Update progress dynamically
      },
    });
    // alert("File uploaded successfully!");
  } catch (error) {
    console.error("Upload failed:", error);
    // alert("Failed to upload file.");
  } finally {
    isUploading.value = false;
    progress.value = 0; // Reset progress bar after upload
  }
};

// const handleFileChange = (event) => {
//   file.value = event.target.files[0];
// };

const folderError = ref({
  name: "",
});

const folderPayload = ref({
  name: "",
});

function validateForm() {
  let isValid = true;

  // Name Validation
  if (!folderPayload.value.name) {
    folderError.value.name = "Folder name is required.";
    isValid = false;
  } else if (!/^[A-Za-z]{1,50}$/.test(folderPayload.value.name)) {
    folderError.value.name =
      "First name must be up to 50 characters, letters only (A-Z or a-z).";
    isValid = false;
  } else {
    folderError.value.name = "";
  }
  return isValid;
}

async function createFolder() {
  try {
    let newPath = [...paths.value];
    let path = newPath.shift();
    // console.log("CREATE :::", newPath.join("/"), ":::", folderPayload.value);
    if (validateForm()) {
      const response = await $axios.post(
        "file/create-folder",
        {},
        {
          params: {
            path: newPath.join("/"),
            name: folderPayload.value.name,
          },
        }
      );
      console.log("🚀 ~ createFolder ~ response:", response);
      if (response.data.status === "OK") {
      }
      showModal.value = false;
    }
  } catch (error) {
    console.log("🚀 ~ createFolder ~ error:", error);
    showModal.value = false;
  }
}

async function refresh() {
  try {
    loading.value = true;
    await fetchFiles(paths.value.join("/"));
    loading.value = false;
  } catch (error) {
    console.log("🚀 ~ refresh ~ error:", error);
    loading.value = false;
  }
}

const sliderValue = ref(35);
const slider = computed(() => {
  return (sliderValue.value * 2.4).toString() + "px";
});

onMounted(async () => {
  loading.value = true;
  if (route.query.path) {
    paths.value = route.query.path.split("/");
    await fetchFiles(paths.value.join("/"));
    loading.value = false;
  } else {
    const query = { path: "eyouel" };
    router.push({ query: query });

    await fetchFiles("eyouel");
    loading.value = false;
  }
});

const goBack = async () => {
  loading.value = true;

  paths.value.pop();
  const newQuery = { path: paths.value.join("/") };
  router.push({ query: newQuery });
  await fetchFiles(paths.value.join("/"));
  loading.value = false;
};

const fetchFiles = async (folder) => {
  try {
    const response = await $fetch("http://localhost:8000/api/file/list", {
      method: "GET",
      query: {
        path: encodeURIComponent(folder),
      },
      onResponse({ response }) {
        console.log("Status Code:", response.status);
      },
    });

    if (response.status === "OK") {
      folders.value = response.result.map((item) => {
        return item.name;
      });

      folderDetails.value = response.result;
    }
  } catch (error) {
    console.log("🚀 ~ fetchFiles= ~ error:", error);
    if (error.response) {
      // console.error("Error Status Code:", error.response.status);
      // console.error("Error Headers:", error.response.headers);
      // console.error("Error Data:", error.response._data);
    } else {
      console.error("Unexpected Error:", error);
    }
  }
};

const handleFolderClickFromChild = async (folder) => {
  loading.value = true;

  paths.value.push(folder.name);

  const query = { path: paths.value.join("/") };
  router.push({ query: query });

  await fetchFiles(paths.value.join("/"));
  loading.value = false;
};
let folders = ref([]);

let folderDetails = ref([]);

let paths = ref(["eyouel"]);
</script>

<style scoped>
.loader {
  height: 4px;
  width: 130px;
  --c: no-repeat linear-gradient(#6100ee 0 0);
  background: var(--c), var(--c), #d7b8fc;
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
