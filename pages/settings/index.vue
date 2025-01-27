<template>
  <div>
    <!-- header  -->
    <div class="px-8 pt-8">
      <p class="text-3xl tracking-wider text-neutral-800 font-semibold">
        Settings
      </p>
    </div>

    <!-- tabs  -->
    <div
      class="mx-6 px-2 py-1 mt-2 border border-neutral-300 rounded-lg shadow-sm"
    >
      <ul class="flex gap-2">
        <button
          @click="selectedItem = index"
          class="font-medium px-2 my-auto"
          :class="{
            'py-2 bg-[#ecf3fe] rounded-lg text-[#4b47a8]':
              selectedItem === index,
            'text-[#6e7383]': selectedItem !== index,
          }"
          v-for="(item, index) in items"
          :key="index"
        >
          {{ item }}
        </button>
      </ul>
    </div>

    <!-- actual content -->
    <div>
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
</template>

<script setup lang="ts">
import { ref } from "vue";
import Profile from "~/components/Settings/Profile.vue";
import Advanced from "~/components/Settings/Advanced.vue";
import Filemgmt from "~/components/Settings/Filemgmt.vue";
import Notifications from "~/components/Settings/Notifications.vue";
import Security from "~/components/Settings/Security.vue";
import SystemPreferences from "~/components/Settings/SystemPreferences.vue";

const items = [
  "Profile ",
  "System Preferences",
  "File Management ",
  "Security",
  "Notifications",
  "Advanced",
];
const selectedItem = ref(0);
</script>

<style scoped></style>
