<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <!-- System Configuration -->
    <div class="space-y-6">
      <div>
        <h2 class="text-lg font-medium text-gray-900">System Configuration</h2>
        <p class="mt-1 text-sm text-gray-500">
          Advanced network and cluster settings
        </p>
      </div>
      <div class="border-t border-gray-200"></div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label for="backendIP" class="block text-sm font-medium text-gray-700"
            >Backend IP Address</label
          >
          <p class="mt-1 text-sm text-gray-500">Primary service endpoint</p>
          <input
            type="text"
            id="backendIP"
            placeholder="192.168.1.10"
            class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          />
        </div>
        <div>
          <label
            for="clusterNodes"
            class="block text-sm font-medium text-gray-700"
            >Cluster Nodes</label
          >
          <p class="mt-1 text-sm text-gray-500">Distributed operation nodes</p>
          <textarea
            id="clusterNodes"
            rows="3"
            placeholder="One IP per line"
            class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Performance Settings -->
    <div class="mt-10 space-y-6">
      <div>
        <h2 class="text-lg font-medium text-gray-900">Performance Settings</h2>
        <p class="mt-1 text-sm text-gray-500">
          Optimize system responsiveness and reliability
        </p>
      </div>
      <div class="border-t border-gray-200"></div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            for="requestTimeout"
            class="block text-sm font-medium text-gray-700"
            >Request Timeout (ms)</label
          >
          <p class="mt-1 text-sm text-gray-500">API call timeout duration</p>
          <div class="mt-2 flex rounded-md shadow-sm">
            <input
              type="number"
              id="requestTimeout"
              placeholder="3000"
              class="block w-full rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
            />
            <span
              class="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm"
            >
              ms
            </span>
          </div>
        </div>
        <div>
          <label
            for="retryAttempts"
            class="block text-sm font-medium text-gray-700"
            >Retry Attempts</label
          >
          <p class="mt-1 text-sm text-gray-500">For failed requests</p>
          <input
            type="number"
            id="retryAttempts"
            placeholder="3"
            class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          />
        </div>
      </div>
    </div>

    <!-- Database & Logging -->
    <div class="mt-10 space-y-6">
      <div>
        <h2 class="text-lg font-medium text-gray-900">Database & Logging</h2>
        <p class="mt-1 text-sm text-gray-500">
          Configure persistence and monitoring
        </p>
      </div>
      <div class="border-t border-gray-200"></div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            for="dbConnection"
            class="block text-sm font-medium text-gray-700"
            >Database Connection</label
          >
          <p class="mt-1 text-sm text-gray-500">Connection string</p>
          <input
            type="text"
            id="dbConnection"
            placeholder="postgres://user:pass@host:port/db"
            class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          />
        </div>
        <div>
          <label for="logLevel" class="block text-sm font-medium text-gray-700"
            >Log Level</label
          >
          <p class="mt-1 text-sm text-gray-500">System logging verbosity</p>
          <select
            id="logLevel"
            class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          >
            <option value="debug">Debug (Most detailed)</option>
            <option value="info">Info (Standard)</option>
            <option value="warning">Warning</option>
            <option value="error">Error (Critical only)</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Rate Limiting & Caching -->
    <div class="mt-10 space-y-6">
      <div>
        <h2 class="text-lg font-medium text-gray-900">
          Rate Limiting & Caching
        </h2>
        <p class="mt-1 text-sm text-gray-500">
          Control API throughput and caching behavior
        </p>
      </div>
      <div class="border-t border-gray-200"></div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            for="apiRateLimit"
            class="block text-sm font-medium text-gray-700"
            >API Rate Limit</label
          >
          <p class="mt-1 text-sm text-gray-500">Requests per minute</p>
          <div class="mt-2 flex rounded-md shadow-sm">
            <input
              type="number"
              id="apiRateLimit"
              placeholder="1000"
              class="block w-full rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
            />
            <span
              class="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm"
            >
              /min
            </span>
          </div>
        </div>
        <div>
          <label
            for="cacheConfig"
            class="block text-sm font-medium text-gray-700"
            >Cache Configuration</label
          >
          <p class="mt-1 text-sm text-gray-500">Size and type</p>
          <input
            type="text"
            id="cacheConfig"
            placeholder="Redis, 512MB"
            class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          />
        </div>
      </div>
    </div>

    <!-- Danger Zone -->
    <div class="mt-10 border-t border-gray-200 pt-6">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <h3 class="text-base font-medium text-gray-900">Danger Zone</h3>
          <p class="mt-1 text-sm text-gray-500">
            These actions can significantly impact system performance
          </p>
        </div>
        <div class="flex flex-col sm:flex-row sm:justify-end gap-3">
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Flush All Caches
          </button>
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md shadow-sm text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Reset All Settings
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Add any reactive states or methods here if needed
</script>
