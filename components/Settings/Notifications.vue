<template>
  <div class="px-20">
    <div class="px-6 py-4">
      <!-- Email Notifications & Push Notifications -->
      <div class="flex gap-10 pt-4">
        <!-- Email Notifications -->
        <div class="w-1/2 flex flex-col">
          <p class="text-xl tracking-wide font-medium">Email Notifications</p>
          <p class="text-sm tracking-wide text-neutral-500">
            Enable or disable email notifications for system updates, file
            changes, and more
          </p>
          <select
            :class="{
              'w-full pl-4 py-2 rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          >
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>

        <!-- Push Notifications -->
        <div class="w-1/2 flex flex-col">
          <p class="text-xl tracking-wide font-medium">Push Notifications</p>
          <p class="text-sm tracking-wide text-neutral-500">
            Turn on/off push notifications for file uploads, downloads, or
            system warnings
          </p>
          <select
            :class="{
              'w-full pl-4 py-2 rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          >
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>
      </div>

      <!-- File Activity Notifications & Daily Summary Emails -->
      <div class="flex gap-10 pt-6">
        <!-- File Activity Notifications -->
        <div class="w-1/2 flex flex-col">
          <p class="text-xl tracking-wide font-medium">
            File Activity Notifications
          </p>
          <p class="text-sm tracking-wide text-neutral-500">
            Notify about file uploads, deletions, or changes
          </p>
          <select
            :class="{
              'w-full pl-4 py-2 rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          >
            <option value="all">All Activity</option>
            <option value="important">Important Only</option>
            <option value="none">None</option>
          </select>
        </div>

        <!-- Daily Summary Emails -->
        <div class="w-1/2 flex flex-col">
          <p class="text-xl tracking-wide font-medium">Daily Summary Emails</p>
          <p class="text-sm tracking-wide text-neutral-500">
            Receive a daily email summarizing recent activity in your account
          </p>
          <select
            :class="{
              'w-full pl-4 py-2 rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          >
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>
      </div>

      <!-- Alerts & Custom Notification Preferences -->
      <div class="flex gap-10 pt-6">
        <!-- Alerts -->
        <div class="w-1/2 flex flex-col">
          <p class="text-xl tracking-wide font-medium">Alerts</p>
          <p class="text-sm tracking-wide text-neutral-500">
            Choose which alerts to receive (e.g., system outages, failed
            uploads)
          </p>
          <select
            :class="{
              'w-full pl-4 py-2 rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          >
            <option value="all">All Alerts</option>
            <option value="critical">Critical Only</option>
            <option value="none">None</option>
          </select>
        </div>

        <!-- Custom Notification Preferences -->
        <div class="w-1/2 flex flex-col">
          <p class="text-xl tracking-wide font-medium">
            Custom Notification Preferences
          </p>
          <p class="text-sm tracking-wide text-neutral-500">
            Set custom preferences for specific events or actions
          </p>
          <textarea
            rows="3"
            placeholder="Specify your preferences, e.g., 'Notify for large file uploads'"
            :class="{
              'w-full pl-4 py-2 rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Add any reactive states or methods if needed here
</script>
