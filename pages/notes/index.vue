<template>
  <div>
    <form @submit.prevent="uploadFile">
      <input type="file" @change="handleFileChange" />
      <button type="submit" :disabled="isUploading">Upload</button>
    </form>

    <div class="progress-container w-[400px]">
      <p>{{ progress.toFixed(0) }}% Uploaded</p>
      <div class="progress-bar">
        <div
          class="progress-bar-inner"
          :style="{
            width: `${progress}%`,
            backgroundColor: progressColor,
            transition: 'width 0.3s ease',
          }"
        ></div>
      </div>
      <p v-if="fileSize">File Size: {{ fileSize }} MB</p>
      <p v-if="timeRemaining">Time Remaining: {{ timeRemaining }} seconds</p>
    </div>

    <!-- Hidden file input -->
    <input
      type="file"
      ref="fileInput"
      class="hidden"
      @change="handleFileChange"
    />

    <div class="mt-20 h-20 border border-red-600">
      <ProgressBar />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import ProgressBar from "~/components/ProgressBar.vue";

const { $axios } = useNuxtApp();

let paths = ref(["eyouel"]);

const file = ref(null);
const progress = ref(0);
const isUploading = ref(false);
const uploadStartTime = ref(0);
const uploadedBytes = ref(0);

function triggerFileUpload() {
  fileInput.value.click();
}

// File size in MB
const fileSize = computed(() =>
  file.value ? (file.value.size / 1024 / 1024).toFixed(2) : 0
);

// Estimate time remaining based on upload speed
const timeRemaining = computed(() => {
  if (progress.value > 0 && uploadedBytes.value > 0) {
    const elapsedTime = (Date.now() - uploadStartTime.value) / 1000; // Time in seconds
    const speed = uploadedBytes.value / elapsedTime; // Bytes per second
    const remainingBytes = file.value.size - uploadedBytes.value;
    return Math.ceil(remainingBytes / speed);
  }
  return null;
});

// Dynamic progress color
const progressColor = computed(() => {
  if (progress.value < 50) return "#f39c12"; // Orange
  if (progress.value < 80) return "#3498db"; // Blue
  return "#2ecc71"; // Green
});

const handleFileChange = (event) => {
  console.log("🚀 ~ handleFileChange ~ event:", event);
  file.value = event.target.files[0];
};

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
    alert("File uploaded successfully!");
  } catch (error) {
    console.error("Upload failed:", error);
    alert("Failed to upload file.");
  } finally {
    isUploading.value = false;
    progress.value = 0; // Reset progress bar after upload
  }
};
</script>

<style scoped>
.progress-container {
  margin-top: 20px;
  text-align: center;
}

.progress-bar {
  position: relative;
  width: 100%;
  height: 20px;
  background: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin: 10px 0;
}

.progress-bar-inner {
  height: 100%;
  width: 0;
  background-color: #3498db; /* Default color */
  border-radius: 10px;
  transition: width 0.3s ease, background-color 0.3s ease;
}

/* button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
} */
</style>
