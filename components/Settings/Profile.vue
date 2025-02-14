<template>
  <div class="px-20">
    <div class="pt-4">
      <p class="font-medium tracking-wide">Account</p>

      <p class="text-sm tracking-wide text-neutral-500 pt-1">
        Real-time information and activities
      </p>
      <div class="mt-4 border border-neutral-200"></div>
    </div>

    <!-- Account Image  -->

    <div class="py-8 flex items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <div
          v-if="profileImage"
          class="relative w-24 h-24 rounded-full bg-slate-200"
        >
          <img
            :src="profileImage"
            alt="Profile Image"
            class="w-24 h-24 rounded-full object-cover"
          />
        </div>
        <div
          v-if="auth.user.profile_image_url && !profileImage"
          class="relative w-24 h-24 rounded-full bg-slate-200"
        >
          <img
            :src="auth.user.profile_image"
            alt="Profile Image"
            class="w-24 h-24 rounded-full object-cover"
          />
        </div>

        <div
          v-if="!auth.user.profile_image_url && !profileImage"
          class="relative w-24 h-24 rounded-full bg-slate-200"
        >
          <div class="absolute left-9 top-6">
            <p class="text-5xl text-slate-500">E</p>
          </div>
        </div>

        <div class="flex flex-col gap-0">
          <p class="font-medium">Profile picture</p>
          <p class="text-sm text-[#6e7383]">PNG, JPEG under 15MB</p>
          <div v-if="progress" class="mt-4 w-full">
            <ProgressBar :amount="progress" />
          </div>
        </div>
      </div>

      <input
        type="file"
        ref="fileInput"
        class="hidden"
        @change="handleFileChange"
      />

      <div class="flex gap-2">
        <button
          @click="triggerFileUpload"
          class="border border-neutral-300 px-2 py-2 text-sm rounded-lg shadow-sm shadow-slate-200 font-medium tracking-tight"
        >
          Upload new picture
        </button>
        <button
          class="border border-neutral-300 px-2 py-2 text-sm rounded-lg bg-[#f4f8fb] font-medium tracking-tight"
        >
          Delete
        </button>
      </div>
    </div>

    <!-- Info  -->
    <div>
      <p class="text-xl tracking-wide font-medium">Full name</p>
      <div class="flex gap-10 pt-4">
        <!-- Email  -->
        <div class="w-1/2 flex flex-col">
          <label class="text-sm" for="email">First name</label>

          <input
            type="text"
            placeholder="Enter first name"
            :class="{
              'w-full pl-4 py-2  rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          />
        </div>
        <!-- Password  -->
        <div class="w-1/2 flex flex-col">
          <label class="text-sm" for="email">Last Name</label>

          <input
            type="text"
            placeholder="Enter last name"
            :class="{
              'w-full pl-4 py-2  rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          />
        </div>
      </div>

      <!-- email  -->
      <p class="text-xl tracking-wide font-medium pt-4">Contact email</p>
      <p class="text-sm tracking-wide text-neutral-500 pt-1">
        Manage your accounts email address
      </p>

      <div class="flex gap-10 pt-2">
        <!-- Email  -->

        <div class="w-1/2 flex flex-col">
          <label class="text-sm" for="email">Email</label>

          <input
            type="text"
            placeholder="Enter email"
            :class="{
              'w-full pl-4 py-2  rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          />
        </div>
      </div>

      <!-- password  -->
      <p class="text-xl tracking-wide font-medium pt-4">Password</p>
      <p class="text-sm tracking-wide text-neutral-500 pt-1">
        Modify your current password
      </p>

      <div class="flex gap-10 pt-4">
        <!-- Email  -->
        <div class="w-1/2 flex flex-col">
          <label class="text-sm" for="email">First name</label>

          <input
            type="text"
            placeholder="Enter first name"
            :class="{
              'w-full pl-4 py-2  rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          />
        </div>
        <!-- Password  -->
        <div class="w-1/2 flex flex-col">
          <label class="text-sm" for="email">Last Name</label>

          <input
            type="text"
            placeholder="Enter last name"
            :class="{
              'w-full pl-4 py-2  rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          />
        </div>
      </div>

      <p class="text-xl tracking-wide font-medium pt-4">Integrated Account</p>
      <p class="text-sm tracking-wide text-neutral-500 pt-1">
        Manage your current integrated accounts
      </p>

      <!-- google sign in  -->

      <div
        class="flex justify-between items-center border border-neutral-300 rounded-xl shadow-sm px-4 py-2 mt-2"
      >
        <div class="flex items-center gap-4">
          <img class="h-8 w-8" src="/public/google.png" alt="google-logo" />
          <div class="flex flex-col">
            <p class="text-lg tracking-wide">Google</p>
            <p class="text-sm tracking-wide text-neutral-500">
              Manage you google account
            </p>
          </div>
        </div>
        <div>
          <button
            class="px-2 py-1 border border-[#2f8366] shadow-inner rounded-lg text-[#2f8366]"
          >
            <span class="font-medium">Connected</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const { $axios } = useNuxtApp();
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();

const fileInput = ref(null);
const file = ref(null);
const progress = ref(null);
const token = ref(null);
const profileImage = ref(null);

const auth_token = useCookie("auth_token", {
  secure: false, // Ensures it only works on HTTPS
  httpOnly: false, // Since we need JavaScript access
  sameSite: "lax",
});

token.value = auth_token.value;

const triggerFileUpload = () => {
  fileInput.value.click();
};

function removeFile() {
  fileInput.value = null;
  file.value = null;
}

const handleFileChange = async () => {
  file.value = event.target.files[0];
  console.log("🚀 ~ handleFileChange ~ file.value:", file.value);
  if (file.value) {
    await uploadProfilePhoto();

    // Add file processing logic here
  }
};

const uploadProfilePhoto = async () => {
  if (!file.value) {
    alert("Please select a file.");
    return;
  }

  let uploadedBytesTotal = 0; // Track total uploaded bytes

  try {
    const formData = new FormData();
    formData.append("profile_image", file.value);

    const response = await $axios.post("file/upload-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      onUploadProgress: (progressEvent) => {
        uploadedBytesTotal += progressEvent.loaded; // Accumulate bytes uploaded
        const percentCompleted = Math.round(
          (uploadedBytesTotal / file.value.size) * 100
        );
        progress.value = percentCompleted; // Update progress dynamically
      },
    });

    profileImage.value = response.data.profile_image;
  } catch (error) {
    console.log("🚀 ~ uploadProfilePhoto ~ error:", error);
  } finally {
    progress.value = null;
    fileInput.value = null;
    file.value = null;
  }
};
</script>

<style lang="scss" scoped></style>
