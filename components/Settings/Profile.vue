<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <!-- Account Section -->
    <div class="space-y-6">
      <div>
        <h2 class="text-lg font-medium text-gray-900">Account</h2>
        <p class="mt-1 text-sm text-gray-500">
          Real-time information and activities
        </p>
      </div>
      <div class="border-t border-gray-200"></div>

      <!-- Profile Picture -->
      <div
        class="flex flex-col sm:flex-row sm:items-center justify-between gap-6"
      >
        <div class="flex items-center gap-4">
          <!-- Profile Image -->
          <div class="relative group">
            <div class="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
              <img
                v-if="profileImage"
                :src="profileImage"
                alt="Profile Image"
                class="w-full h-full object-cover"
              />
              <img
                v-else-if="auth.user.profile_image_url"
                :src="auth.user.profile_image"
                alt="Profile Image"
                class="w-full h-full object-cover"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center"
              >
                <span class="text-4xl font-medium text-gray-500">
                  {{
                    auth.user.name
                      ? auth.user.name.charAt(0).toUpperCase()
                      : 'E'
                  }}
                </span>
              </div>
            </div>
            <div
              class="absolute inset-0 bg-black bg-opacity-30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
            >
              <CameraIcon class="h-6 w-6 text-white" />
            </div>
          </div>

          <div class="space-y-1">
            <h3 class="font-medium text-gray-900">Profile picture</h3>
            <p class="text-sm text-gray-500">PNG, JPEG under 15MB</p>
            <div v-if="progress" class="w-48 mt-2">
              <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  class="h-full bg-indigo-600 rounded-full transition-all duration-300"
                  :style="{ width: progress + '%' }"
                ></div>
              </div>
              <p class="text-xs text-gray-500 mt-1">{{ progress }}% uploaded</p>
            </div>
          </div>
        </div>

        <div class="flex gap-3">
          <input
            type="file"
            ref="fileInput"
            class="hidden"
            accept="image/*"
            @change="handleFileChange"
          />
          <button
            @click="triggerFileUpload"
            class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ArrowUpTrayIcon class="-ml-1 mr-2 h-5 w-5 text-gray-500" />
            Upload new
          </button>
          <button
            @click="removeProfileImage"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <TrashIcon class="-ml-1 mr-2 h-5 w-5 text-gray-500" />
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Personal Information -->
    <div class="mt-10 space-y-6">
      <div>
        <h2 class="text-lg font-medium text-gray-900">Personal Information</h2>
        <p class="mt-1 text-sm text-gray-500">Update your personal details</p>
      </div>
      <div class="border-t border-gray-200"></div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label for="firstName" class="block text-sm font-medium text-gray-700"
            >First name</label
          >
          <input
            type="text"
            id="firstName"
            :value="auth.user.first_name || ''"
            placeholder="Enter first name"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          />
        </div>
        <div>
          <label for="lastName" class="block text-sm font-medium text-gray-700"
            >Last name</label
          >
          <input
            type="text"
            id="lastName"
            :value="auth.user.last_name || ''"
            placeholder="Enter last name"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          />
        </div>
      </div>
    </div>

    <!-- Contact Information -->
    <div class="mt-10 space-y-6">
      <div>
        <h2 class="text-lg font-medium text-gray-900">Contact Information</h2>
        <p class="mt-1 text-sm text-gray-500">
          Manage your account's email address
        </p>
      </div>
      <div class="border-t border-gray-200"></div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div class="sm:col-span-2">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email address</label
          >
          <input
            type="email"
            id="email"
            :value="auth.user.email || ''"
            placeholder="Enter email"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          />
        </div>
      </div>
    </div>

    <!-- Password -->
    <div class="mt-10 space-y-6">
      <div>
        <h2 class="text-lg font-medium text-gray-900">Password</h2>
        <p class="mt-1 text-sm text-gray-500">Modify your current password</p>
      </div>
      <div class="border-t border-gray-200"></div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            for="currentPassword"
            class="block text-sm font-medium text-gray-700"
            >Current password</label
          >
          <div class="relative mt-1">
            <input
              type="password"
              id="currentPassword"
              placeholder="Enter current password"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border pr-10"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <EyeIcon class="h-5 w-5 text-gray-400 hover:text-gray-500" />
            </button>
          </div>
        </div>
        <div>
          <label
            for="newPassword"
            class="block text-sm font-medium text-gray-700"
            >New password</label
          >
          <div class="relative mt-1">
            <input
              type="password"
              id="newPassword"
              placeholder="Enter new password"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border pr-10"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <EyeIcon class="h-5 w-5 text-gray-400 hover:text-gray-500" />
            </button>
          </div>
        </div>
        <div>
          <label
            for="confirmPassword"
            class="block text-sm font-medium text-gray-700"
            >Confirm password</label
          >
          <div class="relative mt-1">
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm new password"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border pr-10"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <EyeIcon class="h-5 w-5 text-gray-400 hover:text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Connected Accounts -->
    <div class="mt-10 space-y-6">
      <div>
        <h2 class="text-lg font-medium text-gray-900">Connected Accounts</h2>
        <p class="mt-1 text-sm text-gray-500">
          Manage your current integrated accounts
        </p>
      </div>
      <div class="border-t border-gray-200"></div>

      <div class="space-y-4">
        <!-- Google Account -->
        <div
          class="flex items-center justify-between rounded-lg border border-gray-200 p-4"
        >
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <img class="h-10 w-10" src="/google.png" alt="Google logo" />
            </div>
            <div>
              <h3 class="text-base font-medium text-gray-900">Google</h3>
              <p class="text-sm text-gray-500">Manage your Google account</p>
            </div>
          </div>
          <div>
            <span
              class="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800"
            >
              Connected
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  CameraIcon,
  ArrowUpTrayIcon,
  TrashIcon,
  EyeIcon,
} from '@heroicons/vue/24/outline';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const fileInput = ref(null);
const file = ref(null);
const progress = ref(null);
const token = ref(null);
const profileImage = ref(null);

const auth_token = useCookie('auth_token', {
  secure: false,
  httpOnly: false,
  sameSite: 'lax',
});

token.value = auth_token.value;

const triggerFileUpload = () => {
  fileInput.value.click();
};

const removeProfileImage = () => {
  profileImage.value = null;
  // Add API call to remove profile image from backend
};

const handleFileChange = async (event) => {
  file.value = event.target.files[0];
  if (file.value) {
    await uploadProfilePhoto();
  }
};

const uploadProfilePhoto = async () => {
  if (!file.value) {
    alert('Please select a file.');
    return;
  }

  let uploadedBytesTotal = 0;

  try {
    const formData = new FormData();
    formData.append('profile_image', file.value);

    const response = await $axios.post('file/upload-profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      onUploadProgress: (progressEvent) => {
        uploadedBytesTotal += progressEvent.loaded;
        const percentCompleted = Math.round(
          (uploadedBytesTotal / file.value.size) * 100,
        );
        progress.value = percentCompleted;
      },
    });

    profileImage.value = response.data.profile_image;
    auth.user.profile_image = response.data.profile_image;
  } catch (error) {
    console.error('Error uploading profile photo:', error);
  } finally {
    progress.value = null;
    fileInput.value = null;
    file.value = null;
  }
};
</script>
