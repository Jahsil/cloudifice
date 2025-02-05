<template>
  <div class="">
    <div class="pl-8 pt-8">
      <!-- header  -->
      <div class="pb-4">
        <p class="text-3xl tracking-wide text-neutral-900 font-medium">
          Archive
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
            class="h-1 bg-indigo-300 rounded-lg outline-none cursor-pointer accent-blue-600"
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
        @file="handleFileClickFromChild"
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

const chunkSize = 1024 * 1024 * 50;

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

const uploadFile = async () => {
  if (!file.value) {
    alert("Please select a file.");
    return;
  }

  const totalChunks = Math.ceil(file.value.size / chunkSize);
  let uploadedBytesTotal = 0; // Track total uploaded bytes

  isUploading.value = true;
  uploadStartTime.value = Date.now();
  let fileChunkIndex = 0;

  // check if there is already a chunk
  try {
    const response = await $axios.post("file/check_chunk", {
      fileName: file.value.name,
    });
    console.log("🚀 ~ uploadFile ~ response:", response);
    fileChunkIndex = response.data.data;
  } catch (error) {
    console.log("🚀 ~ uploadFile ~ error:", error);
  }

  for (let index = fileChunkIndex; index < totalChunks; index++) {
    const start = index * chunkSize;
    const end = Math.min(start + chunkSize, file.value.size);
    const chunk = file.value.slice(start, end);

    const formData = new FormData();
    formData.append("file", chunk);
    formData.append("fileName", file.value.name);
    formData.append("chunkIndex", index);
    formData.append("totalChunks", totalChunks);
    formData.append("path", paths.value.join("/"));

    try {
      await $axios.post("file/upload_file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          uploadedBytesTotal += progressEvent.loaded; // Accumulate bytes uploaded
          const percentCompleted = Math.round(
            (uploadedBytesTotal / file.value.size) * 100
          );
          progress.value = percentCompleted; // Update progress dynamically
        },
      });
    } catch (error) {
      console.error("Upload failed:", error);
      isUploading.value = false;
      return;
    }
  }

  isUploading.value = false;
  alert("File uploaded successfully!");
};

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
    const query = { path: "/" };
    router.push({ query: query });

    await fetchFiles("/");
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
  let folderPath = "";
  if (folder && folder[0] === "/") {
    folderPath = folder.slice(1, folder.length);
  }
  console.log("🚀 ~ fetchFiles ~ folderPath:", folderPath);
  try {
    const response = await $axios.get("/file/list-trash", {
      params: {
        path: encodeURIComponent(folderPath),
      },
    });
    console.log("🚀 ~ fetchFiles ~ response:", response);
    // const response = await $fetch("http://localhost:8000/api/file/list", {
    //   method: "GET",
    //   query: {
    //     path: encodeURIComponent(folder),
    //   },
    //   onResponse({ response }) {
    //     console.log("Status Code:", response.status);
    //   },
    // });

    if (response.data.status === "OK") {
      folders.value = response.data.result.map((item) => {
        return item.name;
      });

      folderDetails.value = response.data.result;
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
const handleFileClickFromChild = (file, type) => {
  console.log("🚀 ~ handleFileClickFromChild ~ file:", file, "::::::", type);
};
let folders = ref([]);

let folderDetails = ref([]);

let paths = ref(["Trash"]);
</script>

<style scoped>
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
