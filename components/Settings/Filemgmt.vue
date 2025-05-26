<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <!-- Upload Settings -->
    <div class="space-y-6">
      <div>
        <h2 class="text-lg font-medium text-gray-900">Upload Settings</h2>
        <p class="mt-1 text-sm text-gray-500">
          Configure how files are uploaded to your system
        </p>
      </div>
      <div class="border-t border-gray-200"></div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label for="chunkSize" class="block text-sm font-medium text-gray-700"
            >Chunk Size (MB)</label
          >
          <p class="mt-1 text-sm text-gray-500">
            Size of file chunks during upload
          </p>
          <input
            type="number"
            id="chunkSize"
            placeholder="e.g. 10"
            class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          />
        </div>
        <div>
          <label
            for="maxUploadSize"
            class="block text-sm font-medium text-gray-700"
            >Maximum Upload Size (MB)</label
          >
          <p class="mt-1 text-sm text-gray-500">Largest file size allowed</p>
          <input
            type="number"
            id="maxUploadSize"
            placeholder="e.g. 100"
            class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          />
        </div>
      </div>
    </div>

    <!-- Storage Settings -->
    <div class="mt-10 space-y-6">
      <div>
        <h2 class="text-lg font-medium text-gray-900">Storage Settings</h2>
        <p class="mt-1 text-sm text-gray-500">
          Configure where and how files are stored
        </p>
      </div>
      <div class="border-t border-gray-200"></div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            for="retentionPolicy"
            class="block text-sm font-medium text-gray-700"
            >File Retention (days)</label
          >
          <p class="mt-1 text-sm text-gray-500">
            How long trashed files are kept
          </p>
          <input
            type="number"
            id="retentionPolicy"
            placeholder="e.g. 30"
            class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          />
        </div>
        <div>
          <label
            for="storageLocation"
            class="block text-sm font-medium text-gray-700"
            >Default Storage Location</label
          >
          <p class="mt-1 text-sm text-gray-500">
            Where uploaded files are stored
          </p>
          <select
            id="storageLocation"
            class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          >
            <option value="local">Local Storage</option>
            <option value="s3">Amazon S3</option>
            <option value="gcs">Google Cloud Storage</option>
            <option value="azure">Microsoft Azure Blob Storage</option>
          </select>
        </div>
      </div>
    </div>

    <!-- File Handling -->
    <div class="mt-10 space-y-6">
      <div>
        <h2 class="text-lg font-medium text-gray-900">File Handling</h2>
        <p class="mt-1 text-sm text-gray-500">
          Configure how files are named and processed
        </p>
      </div>
      <div class="border-t border-gray-200"></div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            for="namingConvention"
            class="block text-sm font-medium text-gray-700"
            >File Naming Convention</label
          >
          <p class="mt-1 text-sm text-gray-500">
            Format for naming uploaded files
          </p>
          <select
            id="namingConvention"
            class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
          >
            <option value="original">Keep Original Name</option>
            <option value="uuid">Use UUID (random identifier)</option>
            <option value="timestamp">Original Name + Timestamp</option>
            <option value="hash">Content Hash + Original Name</option>
          </select>
        </div>
        <div>
          <label
            for="autoCompression"
            class="block text-sm font-medium text-gray-700"
            >Auto Compression</label
          >
          <p class="mt-1 text-sm text-gray-500">Compress files larger than</p>
          <div class="mt-2 flex rounded-md shadow-sm">
            <input
              type="number"
              id="autoCompression"
              placeholder="e.g. 5"
              class="block w-full rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 border"
            />
            <span
              class="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm"
            >
              MB
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="mt-10 flex justify-end">
      <button
        type="button"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Save Changes
      </button>
    </div>
  </div>
</template>

<script setup>
// Add any reactive states or methods here if needed
</script>
