<template>
  <div class="px-20">
    <div class="px-6 py-4">
      <!-- Backend IPs & Cluster Nodes -->
      <div class="flex gap-10 pt-4">
        <!-- Backend IP -->
        <div class="w-1/2 flex flex-col">
          <p class="text-xl tracking-wide font-medium">Backend IP</p>
          <p class="text-sm tracking-wide text-neutral-500">
            Configure the IP address for backend services.
          </p>
          <input
            type="text"
            placeholder="Enter backend IP (e.g., 192.168.1.10)"
            :class="{
              'w-full pl-4 py-2 rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          />
        </div>

        <!-- Cluster Nodes -->
        <div class="w-1/2 flex flex-col">
          <p class="text-xl tracking-wide font-medium">Cluster Nodes</p>
          <p class="text-sm tracking-wide text-neutral-500">
            Add IPs of other nodes in the cluster for distributed operations.
          </p>
          <textarea
            rows="3"
            placeholder="Enter node IPs, one per line (e.g., 192.168.1.11)"
            :class="{
              'w-full pl-4 py-2 rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          ></textarea>
        </div>
      </div>

      <!-- Log Level & Database Configuration -->
      <div class="flex gap-10 pt-6">
        <!-- Log Level -->
        <div class="w-1/2 flex flex-col">
          <p class="text-xl tracking-wide font-medium">Log Level</p>
          <p class="text-sm tracking-wide text-neutral-500">
            Set the logging verbosity level (e.g., Debug, Info, Warning).
          </p>
          <select
            :class="{
              'w-full pl-4 py-2 rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          >
            <option value="debug">Debug</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
        </div>

        <!-- Database Configuration -->
        <div class="w-1/2 flex flex-col">
          <p class="text-xl tracking-wide font-medium">
            Database Configuration
          </p>
          <p class="text-sm tracking-wide text-neutral-500">
            Set the connection string for the database.
          </p>
          <input
            type="text"
            placeholder="Enter database connection string"
            :class="{
              'w-full pl-4 py-2 rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          />
        </div>
      </div>

      <!-- Timeout Settings & Retry Attempts -->
      <div class="flex gap-10 pt-6">
        <!-- Request Timeout -->
        <div class="w-1/2 flex flex-col">
          <p class="text-xl tracking-wide font-medium">Request Timeout (ms)</p>
          <p class="text-sm tracking-wide text-neutral-500">
            Define the timeout for API requests in milliseconds.
          </p>
          <input
            type="number"
            placeholder="Enter timeout (e.g., 3000)"
            :class="{
              'w-full pl-4 py-2 rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          />
        </div>

        <!-- Retry Attempts -->
        <div class="w-1/2 flex flex-col">
          <p class="text-xl tracking-wide font-medium">Retry Attempts</p>
          <p class="text-sm tracking-wide text-neutral-500">
            Number of retry attempts for failed requests.
          </p>
          <input
            type="number"
            placeholder="Enter retry attempts (e.g., 3)"
            :class="{
              'w-full pl-4 py-2 rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          />
        </div>
      </div>

      <!-- Cache Configuration & API Rate Limit -->
      <div class="flex gap-10 pt-6">
        <!-- Cache Configuration -->
        <div class="w-1/2 flex flex-col">
          <p class="text-xl tracking-wide font-medium">Cache Configuration</p>
          <p class="text-sm tracking-wide text-neutral-500">
            Configure cache size and type (e.g., Redis, Memcached).
          </p>
          <input
            type="text"
            placeholder="Enter cache configuration"
            :class="{
              'w-full pl-4 py-2 rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          />
        </div>

        <!-- API Rate Limit -->
        <div class="w-1/2 flex flex-col">
          <p class="text-xl tracking-wide font-medium">API Rate Limit</p>
          <p class="text-sm tracking-wide text-neutral-500">
            Limit the number of API requests per minute (e.g., 1000
            requests/min).
          </p>
          <input
            type="number"
            placeholder="Enter rate limit (e.g., 1000)"
            :class="{
              'w-full pl-4 py-2 rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Add any reactive states or methods if needed here
</script>
