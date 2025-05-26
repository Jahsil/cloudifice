<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Main container -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header section -->
      <div class="pb-6 border-b border-gray-200">
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 class="text-3xl font-bold text-gray-900 tracking-tight">
              Settings
            </h1>
            <p class="mt-2 text-sm text-gray-500">
              Manage your account settings and preferences
            </p>
          </div>
          <div class="mt-4 sm:mt-0">
            <button
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <!-- test  -->
      <!-- Main content area -->
      <div class="mt-8 flex flex-col lg:flex-row gap-8">
        <!-- Sidebar navigation - shows on larger screens -->
        <div
          class="lg:w-64 hidden lg:block lg:sticky lg:top-8 lg:h-full lg:overflow-y-auto"
        >
          <nav class="space-y-1">
            <button
              v-for="(item, index) in items"
              :key="index"
              @click="selectedItem = index"
              :class="{
                'bg-indigo-50 border-indigo-500 text-indigo-700':
                  selectedItem === index,
                'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50':
                  selectedItem !== index,
              }"
              class="group w-full flex items-center pl-3 pr-2 py-3 text-left text-sm font-medium rounded-md border-l-4 transition-colors duration-150 ease-in-out"
            >
              <span class="truncate">{{ item }}</span>
              <svg
                v-if="selectedItem === index"
                class="ml-auto h-5 w-5 text-indigo-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>

        <!-- Rest of your content remains the same -->
        <!-- Mobile navigation dropdown - shows on smaller screens -->
        <div class="lg:hidden">
          <div class="relative">
            <select
              v-model="selectedItem"
              class="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white shadow-sm"
            >
              <option
                v-for="(item, index) in items"
                :key="index"
                :value="index"
              >
                {{ item }}
              </option>
            </select>
          </div>
        </div>

        <!-- Content panel -->
        <div class="flex-1">
          <div class="bg-white shadow rounded-lg overflow-hidden">
            <div class="px-6 py-5 border-b border-gray-200">
              <h3 class="text-lg font-medium leading-6 text-gray-900">
                {{ items[selectedItem] }}
              </h3>
            </div>
            <div class="px-6 py-5">
              <div v-if="selectedItem === 0">
                <SettingsProfile />
              </div>
              <div v-if="selectedItem === 1">
                <SettingsSystemPreferences />
              </div>
              <div v-if="selectedItem === 2">
                <SettingsFilemgmt />
              </div>
              <div v-if="selectedItem === 3">
                <SettingsSecurity />
              </div>
              <div v-if="selectedItem === 4">
                <SettingsNotifications />
              </div>
              <div v-if="selectedItem === 5">
                <SettingsAdvanced />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Profile from '~/components/Settings/Profile.vue';
import Advanced from '~/components/Settings/Advanced.vue';
import Filemgmt from '~/components/Settings/Filemgmt.vue';
import Notifications from '~/components/Settings/Notifications.vue';
import Security from '~/components/Settings/Security.vue';
import SystemPreferences from '~/components/Settings/SystemPreferences.vue';

const items = [
  'Profile',
  'System Preferences',
  'File Management',
  'Security',
  'Notifications',
  'Advanced',
];
const selectedItem = ref(0);
</script>
