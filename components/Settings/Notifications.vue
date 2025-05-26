<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <!-- Notification Channels -->
    <div class="space-y-6">
      <div>
        <h2 class="text-lg font-medium text-gray-900">Notification Channels</h2>
        <p class="mt-1 text-sm text-gray-500">
          Configure how you receive notifications from the system
        </p>
      </div>
      <div class="border-t border-gray-200"></div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            for="emailNotifications"
            class="block text-sm font-medium text-gray-700"
            >Email Notifications</label
          >
          <p class="mt-1 text-sm text-gray-500">
            System updates, file changes, etc.
          </p>
          <select
            id="emailNotifications"
            class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          >
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>
        <div>
          <label
            for="pushNotifications"
            class="block text-sm font-medium text-gray-700"
            >Push Notifications</label
          >
          <p class="mt-1 text-sm text-gray-500">
            File uploads, downloads, warnings
          </p>
          <select
            id="pushNotifications"
            class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          >
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Activity Notifications -->
    <div class="mt-10 space-y-6">
      <div>
        <h2 class="text-lg font-medium text-gray-900">
          Activity Notifications
        </h2>
        <p class="mt-1 text-sm text-gray-500">
          Control which file activities trigger notifications
        </p>
      </div>
      <div class="border-t border-gray-200"></div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            for="fileActivity"
            class="block text-sm font-medium text-gray-700"
            >File Activity</label
          >
          <p class="mt-1 text-sm text-gray-500">Uploads, deletions, changes</p>
          <select
            id="fileActivity"
            class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          >
            <option value="all">All Activity</option>
            <option value="important">Important Only</option>
            <option value="none">None</option>
          </select>
        </div>
        <div>
          <label
            for="dailySummary"
            class="block text-sm font-medium text-gray-700"
            >Daily Summary Email</label
          >
          <p class="mt-1 text-sm text-gray-500">Account activity recap</p>
          <select
            id="dailySummary"
            class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          >
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Alert Settings -->
    <div class="mt-10 space-y-6">
      <div>
        <h2 class="text-lg font-medium text-gray-900">Alert Settings</h2>
        <p class="mt-1 text-sm text-gray-500">
          Configure system alerts and custom notifications
        </p>
      </div>
      <div class="border-t border-gray-200"></div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            for="alertLevel"
            class="block text-sm font-medium text-gray-700"
            >Alert Level</label
          >
          <p class="mt-1 text-sm text-gray-500">
            System outages, failed uploads
          </p>
          <select
            id="alertLevel"
            class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          >
            <option value="all">All Alerts</option>
            <option value="critical">Critical Only</option>
            <option value="none">None</option>
          </select>
        </div>
        <div>
          <label
            for="customPreferences"
            class="block text-sm font-medium text-gray-700"
            >Custom Preferences</label
          >
          <p class="mt-1 text-sm text-gray-500">Specific events or actions</p>
          <textarea
            id="customPreferences"
            rows="3"
            placeholder="Example: 'Notify for files larger than 50MB'"
            class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Notification Schedule -->
    <div class="mt-10 space-y-6">
      <div>
        <h2 class="text-lg font-medium text-gray-900">Notification Schedule</h2>
        <p class="mt-1 text-sm text-gray-500">
          Set times when you want to receive notifications
        </p>
      </div>
      <div class="border-t border-gray-200"></div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            for="quietHoursStart"
            class="block text-sm font-medium text-gray-700"
            >Quiet Hours Start</label
          >
          <p class="mt-1 text-sm text-gray-500">When to pause notifications</p>
          <input
            type="time"
            id="quietHoursStart"
            class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          />
        </div>
        <div>
          <label
            for="quietHoursEnd"
            class="block text-sm font-medium text-gray-700"
            >Quiet Hours End</label
          >
          <p class="mt-1 text-sm text-gray-500">When to resume notifications</p>
          <input
            type="time"
            id="quietHoursEnd"
            class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          />
        </div>
      </div>
      <div class="flex items-center">
        <input
          id="weekendsEnabled"
          name="weekendsEnabled"
          type="checkbox"
          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label for="weekendsEnabled" class="ml-2 block text-sm text-gray-700">
          Pause all notifications on weekends
        </label>
      </div>
    </div>

    <!-- Save Button -->
    <div class="mt-10 flex justify-end">
      <button
        type="button"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save Notification Preferences
      </button>
    </div>
  </div>
</template>

<script setup>
// Add any reactive states or methods here if needed
</script>
