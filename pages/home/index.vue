<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header with Date Picker and Upload -->
    <div
      class="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 shadow-sm"
    >
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <!-- Mobile Menu Button (hidden on desktop) -->
        <!-- <button
          @click="toggleSidebar"
          class="sm:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button> -->

        <!-- Date Picker with Search -->
        <div class="relative flex-1 sm:w-64">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <svg
              class="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
              />
            </svg>
          </div>
          <input
            id="datepicker-format"
            datepicker
            datepicker-format="mm-dd-yyyy"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="Select date"
          />
        </div>

        <!-- Upload Button with Dropzone -->
        <button
          @click="openFileUpload"
          class="flex items-center gap-2 text-sm bg-[#4A68F5] hover:bg-[#3a58e5] rounded-md text-white px-4 py-2 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <span class="font-semibold">Upload Files</span>
        </button>

        <!-- Hidden file input for drag and drop -->
        <input
          type="file"
          ref="fileInput"
          @change="handleFileUpload"
          class="hidden"
          multiple
        />
      </div>
    </div>

    <!-- Dropzone Overlay -->
    <div
      v-if="isDropzoneActive"
      @dragenter.prevent="setDropzoneActive"
      @dragover.prevent="setDropzoneActive"
      @dragleave.prevent="setDropzoneInactive"
      @drop.prevent="handleDrop"
      class="fixed inset-0 z-50 bg-blue-500 bg-opacity-20 flex items-center justify-center border-4 border-dashed border-blue-400"
    >
      <div class="text-center p-8 bg-white rounded-lg shadow-xl">
        <svg
          class="w-16 h-16 mx-auto text-blue-500 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          ></path>
        </svg>
        <h3 class="text-xl font-bold text-gray-800 mb-2">
          Drop files to upload
        </h3>
        <p class="text-gray-600">
          Drag and drop your files anywhere on this page
        </p>
      </div>
    </div>

    <!-- Storage Overview Cards -->
    <div
      v-if="generalStats && generalStats.breakdown"
      class="bg-[#fafbfd] py-6 px-4"
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <FileCard
          name="Image Files"
          :amount="
            (
              (generalStats.breakdown.images.size /
                generalStats.storage_size?.[0]) *
              100
            ).toFixed(2)
          "
          :end-amount="formatFileSize(generalStats.storage_size?.[0])"
          :start-amount="generalStats.breakdown.images.size_human"
          :count="`${generalStats.breakdown.images.count} Items`"
          styles="text-red-600"
          :trend="{ value: 12, direction: 'up' }"
          icon='<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
            <path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12"/>
            <circle cx="16.5" cy="7.5" r="1.5"/>
            <path d="M16 22c-.62-2.225-2.065-4.218-4.123-5.666c-2.22-1.561-5.005-2.387-7.861-2.331q-.51-.001-1.016.032"/>
            <path d="M13 18c1.701-1.327 3.535-2.007 5.386-2a7.8 7.8 0 0 1 3.114.662"/>
          </g>'
        />

        <FileCard
          name="Video Files"
          :amount="
            (
              (generalStats.breakdown.videos.size /
                generalStats.storage_size?.[0]) *
              100
            ).toFixed(2)
          "
          :end-amount="formatFileSize(generalStats.storage_size?.[0])"
          :start-amount="generalStats.breakdown.videos.size_human"
          :count="`${generalStats.breakdown.videos.count} Items`"
          styles="text-green-500"
          progress-bar-bg="#c5f3d1"
          progress-bar-fg="#35c75a"
          :trend="{ value: 8, direction: 'up' }"
          icon='<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
            <path d="M17.7 21.335c-1.172.165-2.7.165-4.75.165h-1.9c-4.03 0-6.046 0-7.298-1.252S2.5 16.98 2.5 12.95v-1.9c0-4.03 0-6.046 1.252-7.298S7.02 2.5 11.05 2.5h1.9c4.03 0 6.046 0 7.298 1.252S21.5 7.019 21.5 11.05v1.9c0 1.208 0 2.235-.034 3.115c-.027.705-.04 1.057-.307 1.19c-.267.13-.566-.08-1.163-.503L18.65 15.8"/>
            <path d="M14.945 12.395c-.176.627-1.012 1.07-2.682 1.955c-1.615.856-2.422 1.285-3.073 1.113a1.66 1.66 0 0 1-.712-.393C8 14.62 8 13.746 8 12s0-2.62.478-3.07c.198-.186.443-.321.712-.392c.65-.173 1.458.256 3.073 1.112c1.67.886 2.506 1.329 2.682 1.955c.073.259.073.531 0 .79"/>
          </g>'
        />

        <FileCard
          name="Document Files"
          :amount="
            (
              (generalStats.breakdown.documents.size /
                generalStats.storage_size?.[0]) *
              100
            ).toFixed(2)
          "
          :end-amount="formatFileSize(generalStats.storage_size?.[0])"
          :start-amount="generalStats.breakdown.documents.size_human"
          :count="`${generalStats.breakdown.documents.count} Items`"
          styles="text-orange-400"
          progress-bar-bg="#ead7ba"
          progress-bar-fg="#ff9401"
          :trend="{ value: 5, direction: 'down' }"
          icon='<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
            <path d="M21 11v-1c0-3.771 0-5.657-1.24-6.828C18.519 2 16.522 2 12.53 2h-1.06C7.479 2 5.482 2 4.24 3.172C3 4.343 3 6.229 3 10v4c0 3.771 0 5.657 1.24 6.828C5.481 22 7.478 22 11.47 22H12M8 7h8m-8 5h5"/>
            <path d="M21 20.647V17c0-1.43-1.343-3-3-3s-3 1.57-3 3v3.5c0 .78.733 1.5 1.636 1.5c.904 0 1.637-.72 1.637-1.5v-2.735"/>
          </g>'
        />

        <FileCard
          name="Other Files"
          :amount="
            (
              (generalStats.breakdown.others.size /
                generalStats.storage_size?.[0]) *
              100
            ).toFixed(2)
          "
          :end-amount="formatFileSize(generalStats.storage_size?.[0])"
          :start-amount="generalStats.breakdown.others.size_human"
          :count="`${generalStats.breakdown.others.count} Items`"
          styles="text-blue-600"
          progress-bar-bg="#bcd2ea"
          progress-bar-fg="#0079ff"
          :trend="{ value: 3, direction: 'up' }"
          icon='<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
            <path d="M3.5 3.978A1.99 1.99 0 0 1 5.5 2c1.105 0 2 .886 2 1.978c0 .394-.116.76-.317 1.069C6.585 5.966 5.5 6.842 5.5 7.934v.495M5.5 11h.012M10.5 2h2.273c3.26 0 4.892 0 6.024.798c.324.228.612.5.855.805c.848 1.066.848 2.6.848 5.67v2.545c0 2.963 0 4.445-.469 5.628c-.754 1.903-2.348 3.403-4.37 4.113c-1.257.441-2.83.441-5.98.441c-1.798 0-2.698 0-3.416-.252c-1.155-.406-2.066-1.263-2.497-2.35c-.268-.676-.268-1.523-.268-3.216V14"/>
            <path d="M20.5 12a3.333 3.333 0 0 1-3.333 3.333c-.666 0-1.451-.116-2.098.057a1.67 1.67 0 0 0-1.179 1.179c-.173.647-.057 1.432-.057 2.098A3.333 3.333 0 0 1 10.5 22"/>
          </g>'
        />
      </div>

      <!-- Premium Upgrade Banner -->
      <div
        class="mt-6 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl p-4 shadow-lg"
      >
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div class="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-white"
            >
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              />
            </svg>
            <div>
              <h3 class="text-white font-bold text-lg">
                Upgrade to Cloudifice+
              </h3>
              <p class="text-blue-100">Get more storage and premium features</p>
            </div>
          </div>
          <button
            class="bg-white text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            Try Premium Now
          </button>
        </div>
      </div>
    </div>

    <!-- Recent Files Section -->
    <div class="px-4 py-6">
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
      >
        <div>
          <h2 class="text-xl font-bold text-gray-800">Overview Storage</h2>
          <p class="text-gray-500">
            Documents that you've saved on our storage
          </p>
        </div>

        <div class="flex gap-3">
          <!-- Search Input -->
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search files..."
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
            />
            <div class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                class="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Files Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <FileCard
          v-for="file in filteredRecentFiles"
          :key="file.id"
          :name="file.file_name"
          :end-amount="formatFileSize(generalStats.storage_size?.[0])"
          :start-amount="generalStats.breakdown.others.size_human"
          :count="formatFileSize(file.file_size)"
          :styles="getFileTypeColor(file.file_type).text"
          :progress-bar-bg="getFileTypeColor(file.file_type).bg"
          :progress-bar-fg="getFileTypeColor(file.file_type).fg"
          :icon="getFileTypeIcon(file.file_type)"
          @click="openFilePreview(file)"
          class="cursor-pointer hover:shadow-md transition-shadow duration-200"
        />
      </div>

      <DataTable
        :headers="headers"
        :rows="rows"
        @view-item="handleView"
        @edit-item="handleEdit"
        @delete-item="handleDelete"
        @bulk-download="handleBulkDownload"
        @bulk-share="handleBulkShare"
        @bulk-move="handleBulkMove"
        @bulk-delete="handleBulkDelete"
        @refresh-data="refreshData"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import FileCard from '~/components/FileCard.vue';
import DataTable from '~/components/DataTable.vue';
const { $axios } = useNuxtApp();

import { useFlowbite } from '~/composables/useFlowbite';
import {
  initAccordions,
  initCarousels,
  initCollapses,
  initDials,
  initDismisses,
  initDrawers,
  initDropdowns,
  initModals,
  initPopovers,
  initTabs,
  initTooltips,
} from 'flowbite';

// initialize components based on data attribute selectors
onMounted(async () => {
  useFlowbite(() => {
    initFlowbite();
    initAccordions();
    initCarousels();
    initCollapses();
    initDials();
    initDismisses();
    initDrawers();
    initDropdowns();
    initModals();
    initPopovers();
    initTabs();
    initTooltips();
  });
  await fetchGeneralStats();
  await fetchAllFiles();
  await fetchRecentFiles();
});

// Sidebar toggle
const toggleSidebar = () => {
  // Emit event to parent to toggle sidebar
};

// File upload functionality
const fileInput = ref(null);
const isDropzoneActive = ref(false);

const openFileUpload = () => {
  fileInput.value.click();
};

const handleFileUpload = (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    // Handle file upload logic here
  }
};

const setDropzoneActive = () => {
  isDropzoneActive.value = true;
};

const setDropzoneInactive = () => {
  isDropzoneActive.value = false;
};

const handleDrop = (event) => {
  const files = event.dataTransfer.files;
  if (files.length > 0) {
    // Handle file upload logic here
  }
  setDropzoneInactive();
};

// Recent files data
// const recentFiles = [
//   {
//     id: 1,
//     fileName: 'holiday-01.jpeg',
//     type: 'image',
//     fileSize: '11.56 MB',
//   },
//   {
//     id: 2,
//     fileName: 'sem-report.docx',
//     type: 'document',
//     fileSize: '115.8 KB',
//   },
//   {
//     id: 3,
//     fileName: 'prototype-vid.mp4',
//     type: 'video',
//     fileSize: '1.56 GB',
//   },
//   {
//     id: 4,
//     fileName: 'supermarket.pdf',
//     type: 'document',
//     fileSize: '1.5 MB',
//   },
// ];

// File preview
const previewFile = ref(null);

const openFilePreview = (file) => {
  previewFile.value = file;
};
const generalStats = ref([]);
// Data table functionality
const headers = [
  { key: 'file_name', label: 'File Name', sortable: true },
  { key: 'created_at', label: 'Date Updated', sortable: true },
  { key: 'updated_at', label: 'Last Update', sortable: true },
  { key: 'file_size', label: 'File Size', sortable: true },
  { key: 'full_name', label: 'File Owner', sortable: true },
];

// const rows = [
//   {
//     id: 1,
//     fileName: 'Document1.pdf',
//     dateUpdated: '2024-01-01',
//     lastUpdate: '2024-01-01 12:00:00',
//     fileSize: '1.2MB',
//     fileOwner: 'John Doe',
//     type: 'image',
//   },
//   {
//     id: 2,
//     fileName: 'Image1.png',
//     dateUpdated: '2024-01-02',
//     lastUpdate: '2024-01-02 14:30:00',
//     fileSize: '500KB',
//     fileOwner: 'Jane Smith',
//     type: 'video',
//   },
//   {
//     id: 3,
//     fileName: 'Presentation1.pptx',
//     dateUpdated: '2024-01-03',
//     lastUpdate: '2024-01-03 09:15:00',
//     fileSize: '2.5MB',
//     fileOwner: 'Alice Brown',
//     type: 'image',
//   },
//   {
//     id: 4,
//     fileName: 'Spreadsheet1.xlsx',
//     dateUpdated: '2024-01-04',
//     lastUpdate: '2024-01-04 10:45:00',
//     fileSize: '3.1MB',
//     fileOwner: 'Bob Green',
//     type: 'other',
//   },
//   {
//     id: 5,
//     fileName: 'Notes.txt',
//     dateUpdated: '2024-01-05',
//     lastUpdate: '2024-01-05 11:00:00',
//     fileSize: '10KB',
//     fileOwner: 'Charlie Black',
//     type: 'document',
//   },
//   {
//     id: 6,
//     fileName: 'Archive.zip',
//     dateUpdated: '2024-01-06',
//     lastUpdate: '2024-01-06 08:20:00',
//     fileSize: '15MB',
//     fileOwner: 'David White',
//     type: 'video',
//   },
//   {
//     id: 7,
//     fileName: 'Photo.jpg',
//     dateUpdated: '2024-01-07',
//     lastUpdate: '2024-01-07 15:45:00',
//     fileSize: '2.8MB',
//     fileOwner: 'Eva Gray',
//     type: 'image',
//   },
//   {
//     id: 8,
//     fileName: 'Report.docx',
//     dateUpdated: '2024-01-08',
//     lastUpdate: '2024-01-08 13:20:00',
//     fileSize: '1.7MB',
//     fileOwner: 'Frank Blue',
//     type: 'document',
//   },
// ];

const formatFileSize = (size) => {
  if (!size) return '';
  if (typeof size === 'number') {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;
    while (size >= 1024 && i < units.length - 1) {
      size /= 1024;
      i++;
    }
    return `${size.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
  }
  return size;
};

const rows = ref([]);
const recentFiles = ref([]);

// Filtering and sorting
const searchQuery = ref('');
const filters = ref({
  type: [],
});
const sortConfig = ref({
  key: '',
  direction: '',
});

const isFilterDropdownOpen = ref(false);
const toggleFilterDropdown = () => {
  isFilterDropdownOpen.value = !isFilterDropdownOpen.value;
};

const resetFilters = () => {
  filters.value.type = [];
};

const filteredRows = computed(() => {
  let result = [...rows];

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (row) =>
        row.fileName.toLowerCase().includes(query) ||
        row.fileOwner.toLowerCase().includes(query),
    );
  }

  // Apply type filters
  if (filters.value.type.length > 0) {
    result = result.filter((row) => filters.value.type.includes(row.type));
  }

  // Apply sorting
  if (sortConfig.value.key) {
    result.sort((a, b) => {
      if (a[sortConfig.value.key] < b[sortConfig.value.key]) {
        return sortConfig.value.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.value.key] > b[sortConfig.value.key]) {
        return sortConfig.value.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  return result;
});

const filteredRecentFiles = computed(() => {
  return recentFiles.value
    .filter((file) => {
      if (searchQuery.value) {
        return file.file_name
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase());
      }
      return true;
    })
    .sort((a, b) => new Date(b.accessed_at) - new Date(a.accessed_at))
    .slice(0, 4);
});

const handleSort = (key) => {
  if (sortConfig.value.key === key) {
    sortConfig.value.direction =
      sortConfig.value.direction === 'asc' ? 'desc' : 'asc';
  } else {
    sortConfig.value.key = key;
    sortConfig.value.direction = 'asc';
  }
};

// Pagination
const currentPage = ref(1);
const rowsPerPage = ref(5);

const totalPages = computed(() => {
  return Math.ceil(filteredRows.value.length / rowsPerPage.value);
});

const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value;
  const end = start + rowsPerPage.value;
  return filteredRows.value.slice(start, end);
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const handlePageChange = (page) => {
  currentPage.value = page;
};

// Helper functions
const getFileTypeColor = (type) => {
  switch (type) {
    case 'image':
      return { text: 'text-red-600', bg: '#fde8e8', fg: '#ef4444' };
    case 'video':
      return { text: 'text-green-500', bg: '#c5f3d1', fg: '#35c75a' };
    case 'document':
      return { text: 'text-orange-400', bg: '#ead7ba', fg: '#ff9401' };
    default:
      return { text: 'text-blue-600', bg: '#bcd2ea', fg: '#0079ff' };
  }
};

const getFileTypeIcon = (type) => {
  switch (type) {
    case 'image':
      return '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12"/><circle cx="16.5" cy="7.5" r="1.5"/><path d="M16 22c-.62-2.225-2.065-4.218-4.123-5.666c-2.22-1.561-5.005-2.387-7.861-2.331q-.51-.001-1.016.032"/><path d="M13 18c1.701-1.327 3.535-2.007 5.386-2a7.8 7.8 0 0 1 3.114.662"/></g>';
    case 'video':
      return '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M17.7 21.335c-1.172.165-2.7.165-4.75.165h-1.9c-4.03 0-6.046 0-7.298-1.252S2.5 16.98 2.5 12.95v-1.9c0-4.03 0-6.046 1.252-7.298S7.02 2.5 11.05 2.5h1.9c4.03 0 6.046 0 7.298 1.252S21.5 7.019 21.5 11.05v1.9c0 1.208 0 2.235-.034 3.115c-.027.705-.04 1.057-.307 1.19c-.267.13-.566-.08-1.163-.503L18.65 15.8"/><path d="M14.945 12.395c-.176.627-1.012 1.07-2.682 1.955c-1.615.856-2.422 1.285-3.073 1.113a1.66 1.66 0 0 1-.712-.393C8 14.62 8 13.746 8 12s0-2.62.478-3.07c.198-.186.443-.321.712-.392c.65-.173 1.458.256 3.073 1.112c1.67.886 2.506 1.329 2.682 1.955c.073.259.073.531 0 .79"/></g>';
    case 'document':
      return '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M21 11v-1c0-3.771 0-5.657-1.24-6.828C18.519 2 16.522 2 12.53 2h-1.06C7.479 2 5.482 2 4.24 3.172C3 4.343 3 6.229 3 10v4c0 3.771 0 5.657 1.24 6.828C5.481 22 7.478 22 11.47 22H12M8 7h8m-8 5h5"/><path d="M21 20.647V17c0-1.43-1.343-3-3-3s-3 1.57-3 3v3.5c0 .78.733 1.5 1.636 1.5c.904 0 1.637-.72 1.637-1.5v-2.735"/></g>';
    case 'audio':
      return '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0"/><path d="M12 8v8"/><path d="M8 10v4"/><path d="M16 10v4"/></g>';
    case 'archive':
      return '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M21 8v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8"/><path d="M10 12h4"/><path d="M3 5h18v3H3z"/><path d="M7.5 5V3h9v2"/></g>';
    case 'spreadsheet':
      return '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></g>';
    case 'presentation':
      return '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-4"/><path d="M12 14v-1"/><path d="M8 18v-4"/><path d="M16 18v-4"/></g>';
    case 'code':
      return '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="m16 18l6-6l-6-6"/><path d="m8 6l-6 6l6 6"/></g>';
    default:
      return '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M3.5 3.978A1.99 1.99 0 0 1 5.5 2c1.105 0 2 .886 2 1.978c0 .394-.116.76-.317 1.069C6.585 5.966 5.5 6.842 5.5 7.934v.495M5.5 11h.012M10.5 2h2.273c3.26 0 4.892 0 6.024.798c.324.228.612.5.855.805c.848 1.066.848 2.6.848 5.67v2.545c0 2.963 0 4.445-.469 5.628c-.754 1.903-2.348 3.403-4.37 4.113c-1.257.441-2.83.441-5.98.441c-1.798 0-2.698 0-3.416-.252c-1.155-.406-2.066-1.263-2.497-2.35c-.268-.676-.268-1.523-.268-3.216V14"/><path d="M20.5 12a3.333 3.333 0 0 1-3.333 3.333c-.666 0-1.451-.116-2.098.057a1.67 1.67 0 0 0-1.179 1.179c-.173.647-.057 1.432-.057 2.098A3.333 3.333 0 0 1 10.5 22"/></g>';
  }
};

// Date formatting helper
const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const handleView = (row) => {
  // Implement view logic
};

const handleEdit = (row) => {
  // Implement edit logic
};

const handleDelete = (row) => {
  // Implement delete logic
};

const handleBulkDownload = (ids) => {
  // Implement bulk download
};

const handleBulkShare = (ids) => {
  // Implement bulk share
};

const handleBulkMove = (ids) => {
  // Implement bulk move
};

const handleBulkDelete = (ids) => {
  // Implement bulk delete
};

const refreshData = async () => {
  await fetchAllFiles();
};

const fetchGeneralStats = async () => {
  try {
    const response = await $axios.get('dashboard/total-stats');
    generalStats.value = response.data;
  } catch (error) {
    console.log('🚀 ~ fetchGeneralStats ~ error:', error);
  }
};

const fetchAllFiles = async () => {
  try {
    const response = await $axios.get('file/total-files');
    rows.value = response.data.files.data;
  } catch (error) {
    console.log('🚀 ~ fetchGeneralStats ~ error:', error);
  }
};

const fetchRecentFiles = async () => {
  try {
    const response = await $axios.get('file/recent-files');
    recentFiles.value = response.data.recent_files;
  } catch (error) {
    console.log('🚀 ~ fetchGeneralStats ~ error:', error);
  }
};
</script>

<style scoped>
/* Smooth transitions for dropdown and modal */
.dropdown-enter-active,
.dropdown-leave-active,
.modal-enter-active,
.modal-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to,
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Custom scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
