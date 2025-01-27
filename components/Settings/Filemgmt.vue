<template>
  <div class="px-20">
    <div class="px-6 py-4">
      <!-- Chunk Size & Maximum Upload Size -->
      <div class="flex gap-10 pt-4">
        <!-- Chunk Size -->
        <div class="w-1/2 flex flex-col">
          <p class="text-xl tracking-wide font-medium">Chunk Size</p>
          <p class="text-sm tracking-wide text-neutral-500 pb-1">
            Set the size of file chunks during upload (in MB)
          </p>
          <input
            type="number"
            placeholder="Enter chunk size (e.g., 10)"
            :class="{
              'w-full pl-4 py-2 rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          />
        </div>

        <!-- Maximum Upload Size -->
        <div class="w-1/2 flex flex-col">
          <p class="text-xl tracking-wide font-medium">Maximum Upload Size</p>
          <p class="text-sm tracking-wide text-neutral-500 pb-1">
            Define the maximum file size allowed for uploads (in MB)
          </p>
          <input
            type="number"
            placeholder="Enter max upload size (e.g., 100)"
            :class="{
              'w-full pl-4 py-2 rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          />
        </div>
      </div>

      <!-- File Retention Policy & Default Storage Location -->
      <div class="flex gap-10 pt-6">
        <!-- File Retention Policy -->
        <div class="w-1/2 flex flex-col">
          <p class="text-xl tracking-wide font-medium">File Retention Policy</p>
          <p class="text-sm tracking-wide text-neutral-500 pb-1">
            Specify how long archived or trashed files are kept before deletion
          </p>
          <input
            type="number"
            placeholder="Enter retention period (e.g., 30)"
            :class="{
              'w-full pl-4 py-2 rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          />
        </div>

        <!-- Default Storage Location -->
        <div class="w-1/2 flex flex-col">
          <p class="text-xl tracking-wide font-medium">
            Default Storage Location
          </p>
          <p class="text-sm tracking-wide text-neutral-500 pb-1">
            Select the default location where uploaded files are stored
          </p>
          <select
            :class="{
              'w-full pl-4 py-2 rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          >
            <option value="local">Local Storage</option>
            <option value="s3">Amazon S3</option>
            <option value="gcs">Google Cloud Storage</option>
          </select>
        </div>
      </div>

      <!-- File Naming Convention -->
      <div class="flex gap-10 pt-6">
        <div class="w-1/2 flex flex-col">
          <p class="text-xl tracking-wide font-medium">
            File Naming Convention
          </p>
          <p class="text-sm tracking-wide text-neutral-500 pb-1">
            Define the format for naming uploaded files
          </p>
          <select
            :class="{
              'w-full pl-4 py-2 rounded-md text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          >
            <option value="original">Keep Original Name</option>
            <option value="uuid">Use UUID</option>
            <option value="timestamp">Add Timestamp</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Add any reactive states or methods here if needed
</script>
