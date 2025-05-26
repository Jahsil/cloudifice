<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <!-- Authentication Settings -->
    <div class="space-y-6">
      <div>
        <h2 class="text-lg font-medium text-gray-900">Authentication</h2>
        <p class="mt-1 text-sm text-gray-500">
          Configure how users authenticate to your system
        </p>
      </div>
      <div class="border-t border-gray-200"></div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            for="passwordPolicy"
            class="block text-sm font-medium text-gray-700"
            >Password Policy</label
          >
          <p class="mt-1 text-sm text-gray-500">
            Minimum password strength requirements
          </p>
          <select
            id="passwordPolicy"
            class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          >
            <option value="weak">Basic (6+ characters)</option>
            <option value="medium">Medium (8+ chars with mix)</option>
            <option value="strong">Strong (12+ chars with complexity)</option>
          </select>
        </div>
        <div>
          <label for="mfa" class="block text-sm font-medium text-gray-700"
            >Multi-Factor Authentication</label
          >
          <p class="mt-1 text-sm text-gray-500">
            Add an extra layer of security
          </p>
          <select
            id="mfa"
            class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          >
            <option value="enabled">Enabled (Recommended)</option>
            <option value="disabled">Disabled</option>
            <option value="required">Required for all users</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Session Settings -->
    <div class="mt-10 space-y-6">
      <div>
        <h2 class="text-lg font-medium text-gray-900">Session Settings</h2>
        <p class="mt-1 text-sm text-gray-500">
          Control how user sessions are managed
        </p>
      </div>
      <div class="border-t border-gray-200"></div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            for="sessionTimeout"
            class="block text-sm font-medium text-gray-700"
            >Session Timeout (minutes)</label
          >
          <p class="mt-1 text-sm text-gray-500">Inactive time before logout</p>
          <input
            type="number"
            id="sessionTimeout"
            placeholder="e.g. 30"
            class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          />
        </div>
        <div>
          <label
            for="failedAttempts"
            class="block text-sm font-medium text-gray-700"
            >Failed Login Attempts</label
          >
          <p class="mt-1 text-sm text-gray-500">Before account is locked</p>
          <input
            type="number"
            id="failedAttempts"
            placeholder="e.g. 5"
            class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          />
        </div>
      </div>
    </div>

    <!-- Advanced Security -->
    <div class="mt-10 space-y-6">
      <div>
        <h2 class="text-lg font-medium text-gray-900">Advanced Security</h2>
        <p class="mt-1 text-sm text-gray-500">
          Additional security measures for your system
        </p>
      </div>
      <div class="border-t border-gray-200"></div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            for="ipWhitelist"
            class="block text-sm font-medium text-gray-700"
            >IP Whitelisting</label
          >
          <p class="mt-1 text-sm text-gray-500">
            Restrict access to specific IPs
          </p>
          <textarea
            id="ipWhitelist"
            rows="3"
            placeholder="Enter one IP per line"
            class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          ></textarea>
        </div>
        <div>
          <label
            for="securityLogs"
            class="block text-sm font-medium text-gray-700"
            >Security Logging</label
          >
          <p class="mt-1 text-sm text-gray-500">
            Record security-related events
          </p>
          <select
            id="securityLogs"
            class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          >
            <option value="enabled">Enabled (Recommended)</option>
            <option value="disabled">Disabled</option>
            <option value="extended">Extended (Detailed logging)</option>
          </select>
          <div class="mt-2 flex items-center">
            <input
              id="logRetention"
              name="logRetention"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label for="logRetention" class="ml-2 block text-sm text-gray-700">
              Keep logs for 90 days
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Security Actions -->
    <div class="mt-10 border-t border-gray-200 pt-6">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <h3 class="text-base font-medium text-gray-900">Danger Zone</h3>
          <p class="mt-1 text-sm text-gray-500">
            These actions are irreversible
          </p>
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md shadow-sm text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Terminate All Active Sessions
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Add any reactive states or methods here if needed
</script>
