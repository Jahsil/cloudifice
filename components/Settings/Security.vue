<template>
  <div class="px-20">
    <div class="px-6 py-4">
      <!-- Password Policy & Multi-Factor Authentication -->
      <div class="flex gap-10 pt-4">
        <!-- Password Policy -->
        <div class="w-1/2 flex flex-col">
          <p class="text-xl tracking-wide font-medium">Password Policy</p>
          <p class="text-sm tracking-wide text-neutral-500">
            Define the minimum password strength requirements
          </p>
          <select
            :class="{
              'w-full pl-4 py-2 rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          >
            <option value="weak">Weak</option>
            <option value="medium">Medium</option>
            <option value="strong">Strong</option>
          </select>
        </div>

        <!-- Multi-Factor Authentication -->
        <div class="w-1/2 flex flex-col">
          <p class="text-xl tracking-wide font-medium">
            Multi-Factor Authentication
          </p>
          <p class="text-sm tracking-wide text-neutral-500">
            Enable or disable MFA for enhanced account security
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

      <!-- Session Timeout & Failed Login Attempts -->
      <div class="flex gap-10 pt-6">
        <!-- Session Timeout -->
        <div class="w-1/2 flex flex-col">
          <p class="text-xl tracking-wide font-medium">Session Timeout</p>
          <p class="text-sm tracking-wide text-neutral-500">
            Specify the time (in minutes) after which inactive users are logged
            out
          </p>
          <input
            type="number"
            placeholder="Enter timeout duration (e.g., 30)"
            :class="{
              'w-full pl-4 py-2 rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          />
        </div>

        <!-- Failed Login Attempts -->
        <div class="w-1/2 flex flex-col">
          <p class="text-xl tracking-wide font-medium">Failed Login Attempts</p>
          <p class="text-sm tracking-wide text-neutral-500">
            Set the number of failed login attempts before the account is locked
          </p>
          <input
            type="number"
            placeholder="Enter maximum attempts (e.g., 5)"
            :class="{
              'w-full pl-4 py-2 rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          />
        </div>
      </div>

      <!-- IP Whitelisting & Security Logs -->
      <div class="flex gap-10 pt-6">
        <!-- IP Whitelisting -->
        <div class="w-1/2 flex flex-col">
          <p class="text-xl tracking-wide font-medium">IP Whitelisting</p>
          <p class="text-sm tracking-wide text-neutral-500">
            Restrict access to specific IP addresses for additional security
          </p>
          <textarea
            rows="3"
            placeholder="Enter IP addresses, one per line"
            :class="{
              'w-full pl-4 py-2 rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          ></textarea>
        </div>

        <!-- Security Logs -->
        <div class="w-1/2 flex flex-col">
          <p class="text-xl tracking-wide font-medium">Security Logs</p>
          <p class="text-sm tracking-wide text-neutral-500">
            Enable or disable logging for security-related events
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
    </div>
  </div>
</template>

<script setup>
// Add any reactive states or methods if needed here
</script>
