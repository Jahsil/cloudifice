<template>
  <div class="px-20">
    <div class="px-6 py-4">
      <!-- Default Language -->
      <p class="text-xl tracking-wide font-medium pt-4">Default Language</p>
      <p class="text-sm tracking-wide text-neutral-500 pt-1">
        Set the language used across the system
      </p>
      <div class="flex gap-10 pt-2">
        <div class="w-1/2 flex flex-col">
          <label class="text-sm" for="language">Language</label>
          <select
            id="language"
            :class="{
              'w-full pl-4 py-2 rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
      </div>

      <!-- Time Zone -->
      <p class="text-xl tracking-wide font-medium pt-4">Time Zone</p>
      <p class="text-sm tracking-wide text-neutral-500 pt-1">
        Adjust the system's time zone
      </p>
      <div class="flex gap-10 pt-2">
        <div class="w-1/2 flex flex-col">
          <label class="text-sm" for="timezone">Time Zone</label>
          <select
            id="timezone"
            :class="{
              'w-full pl-4 py-2 rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          >
            <option value="UTC">UTC</option>
            <option value="GMT-5">GMT-5</option>
            <option value="UTC+3">UTC+3</option>
          </select>
        </div>
      </div>

      <!-- Date Format -->
      <p class="text-xl tracking-wide font-medium pt-4">Date & Time Format</p>
      <p class="text-sm tracking-wide text-neutral-500 pt-1">
        Select how dates and times appear
      </p>
      <div class="flex gap-10 pt-2">
        <div class="w-1/2 flex flex-col">
          <label class="text-sm" for="dateFormat">Date Format</label>
          <select
            id="dateFormat"
            :class="{
              'w-full pl-4 py-2 rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          >
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
          </select>
        </div>
        <div class="w-1/2 flex flex-col">
          <label class="text-sm" for="timeFormat">Time Format</label>
          <select
            id="timeFormat"
            :class="{
              'w-full pl-4 py-2 rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          >
            <option value="12-hour">12-hour clock</option>
            <option value="24-hour">24-hour clock</option>
          </select>
        </div>
      </div>

      <!-- Theme -->
      <p class="text-xl tracking-wide font-medium pt-4">Theme</p>
      <p class="text-sm tracking-wide text-neutral-500 pt-1">
        Switch between light and dark mode
      </p>
      <div class="flex gap-10 pt-2">
        <div class="w-1/2 flex flex-col">
          <label class="text-sm" for="theme">Theme</label>
          <select
            id="theme"
            :class="{
              'w-full pl-4 py-2 rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
