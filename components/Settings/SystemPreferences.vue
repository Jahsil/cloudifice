<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <!-- Language Preferences -->
    <div class="space-y-6">
      <div>
        <h2 class="text-lg font-medium text-gray-900">Language Preferences</h2>
        <p class="mt-1 text-sm text-gray-500">
          Set the language used across the system
        </p>
      </div>
      <div class="border-t border-gray-200"></div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label for="language" class="block text-sm font-medium text-gray-700"
            >Default Language</label
          >
          <select
            id="language"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="ja">Japanese</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Time & Date -->
    <div class="mt-10 space-y-6">
      <div>
        <h2 class="text-lg font-medium text-gray-900">Time & Date</h2>
        <p class="mt-1 text-sm text-gray-500">
          Adjust time zone and formatting preferences
        </p>
      </div>
      <div class="border-t border-gray-200"></div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label for="timezone" class="block text-sm font-medium text-gray-700"
            >Time Zone</label
          >
          <select
            id="timezone"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          >
            <option value="UTC">UTC (Coordinated Universal Time)</option>
            <option value="GMT-5">Eastern Time (ET) GMT-5</option>
            <option value="GMT-6">Central Time (CT) GMT-6</option>
            <option value="GMT-7">Mountain Time (MT) GMT-7</option>
            <option value="GMT-8">Pacific Time (PT) GMT-8</option>
          </select>
        </div>
        <div>
          <label
            for="dateFormat"
            class="block text-sm font-medium text-gray-700"
            >Date Format</label
          >
          <select
            id="dateFormat"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          >
            <option value="MM/DD/YYYY">MM/DD/YYYY (12/31/2023)</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY (31/12/2023)</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD (2023-12-31)</option>
          </select>
        </div>
        <div>
          <label
            for="timeFormat"
            class="block text-sm font-medium text-gray-700"
            >Time Format</label
          >
          <select
            id="timeFormat"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          >
            <option value="12-hour">12-hour clock (2:30 PM)</option>
            <option value="24-hour">24-hour clock (14:30)</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Appearance -->
    <div class="mt-10 space-y-6">
      <div>
        <h2 class="text-lg font-medium text-gray-900">Appearance</h2>
        <p class="mt-1 text-sm text-gray-500">
          Customize how the application looks
        </p>
      </div>
      <div class="border-t border-gray-200"></div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label for="theme" class="block text-sm font-medium text-gray-700"
            >Theme</label
          >
          <select
            id="theme"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System Preference</option>
          </select>
        </div>
        <div>
          <label for="density" class="block text-sm font-medium text-gray-700"
            >Density</label
          >
          <select
            id="density"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          >
            <option value="comfortable">Comfortable</option>
            <option value="compact">Compact</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No script needed for basic functionality
</script>
