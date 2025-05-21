<template>
  <div
    class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
  >
    <!-- Table Controls -->
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border-b border-gray-200 bg-gray-50"
    >
      <div class="flex items-center space-x-4 w-full">
        <div class="relative flex-grow max-w-md">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
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
              />
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search files..."
            class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
          />
        </div>

        <div v-if="selectedRows.length > 0" class="flex items-center space-x-3">
          <span class="text-sm text-gray-600"
            >{{ selectedRows.length }} selected</span
          >
          <div class="relative">
            <button
              @click="toggleBulkActions"
              class="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span>Actions</span>
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              v-if="showBulkActions"
              class="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div class="py-1">
                <button
                  @click="bulkDownload"
                  class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Download selected
                </button>
                <button
                  @click="bulkShare"
                  class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Share
                </button>
                <button
                  @click="bulkMove"
                  class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Move to folder
                </button>
                <button
                  @click="bulkDelete"
                  class="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center space-x-3 mt-4 sm:mt-0">
        <div class="relative">
          <button
            @click="toggleFilterDropdown"
            class="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
              <path
                d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"
              />
            </svg>
            <span>Filter</span>
          </button>
          <div
            v-if="isFilterDropdownOpen"
            class="absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div class="py-1">
              <div class="px-4 py-2 border-b border-gray-100">
                <h4 class="text-sm font-medium text-gray-700">File Type</h4>
              </div>
              <div class="px-4 py-2 space-y-2">
                <label
                  class="flex items-center gap-3 px-2 py-1.5 rounded hover:bg-gray-50"
                >
                  <input
                    v-model="filters.type"
                    type="checkbox"
                    value="image"
                    class="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span class="text-sm flex items-center">
                    <svg
                      class="w-4 h-4 mr-2 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12"
                      />
                      <circle cx="16.5" cy="7.5" r="1.5" />
                    </svg>
                    Images
                  </span>
                </label>
                <label
                  class="flex items-center gap-3 px-2 py-1.5 rounded hover:bg-gray-50"
                >
                  <input
                    v-model="filters.type"
                    type="checkbox"
                    value="video"
                    class="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span class="text-sm flex items-center">
                    <svg
                      class="w-4 h-4 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M17.7 21.335c-1.172.165-2.7.165-4.75.165h-1.9c-4.03 0-6.046 0-7.298-1.252S2.5 16.98 2.5 12.95v-1.9c0-4.03 0-6.046 1.252-7.298S7.02 2.5 11.05 2.5h1.9c4.03 0 6.046 0 7.298 1.252S21.5 7.019 21.5 11.05v1.9c0 1.208 0 2.235-.034 3.115c-.027.705-.04 1.057-.307 1.19c-.267.13-.566-.08-1.163-.503L18.65 15.8"
                      />
                    </svg>
                    Videos
                  </span>
                </label>
                <label
                  class="flex items-center gap-3 px-2 py-1.5 rounded hover:bg-gray-50"
                >
                  <input
                    v-model="filters.type"
                    type="checkbox"
                    value="document"
                    class="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span class="text-sm flex items-center">
                    <svg
                      class="w-4 h-4 mr-2 text-amber-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M21 11v-1c0-3.771 0-5.657-1.24-6.828C18.519 2 16.522 2 12.53 2h-1.06C7.479 2 5.482 2 4.24 3.172C3 4.343 3 6.229 3 10v4c0 3.771 0 5.657 1.24 6.828C5.481 22 7.478 22 11.47 22H12M8 7h8m-8 5h5"
                      />
                    </svg>
                    Documents
                  </span>
                </label>
                <label
                  class="flex items-center gap-3 px-2 py-1.5 rounded hover:bg-gray-50"
                >
                  <input
                    v-model="filters.type"
                    type="checkbox"
                    value="other"
                    class="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span class="text-sm flex items-center">
                    <svg
                      class="w-4 h-4 mr-2 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M3.5 3.978A1.99 1.99 0 0 1 5.5 2c1.105 0 2 .886 2 1.978c0 .394-.116.76-.317 1.069C6.585 5.966 5.5 6.842 5.5 7.934v.495M5.5 11h.012M10.5 2h2.273c3.26 0 4.892 0 6.024.798c.324.228.612.5.855.805c.848 1.066.848 2.6.848 5.67v2.545c0 2.963 0 4.445-.469 5.628c-.754 1.903-2.348 3.403-4.37 4.113c-1.257.441-2.83.441-5.98.441c-1.798 0-2.698 0-3.416-.252c-1.155-.406-2.066-1.263-2.497-2.35c-.268-.676-.268-1.523-.268-3.216V14"
                      />
                    </svg>
                    Other
                  </span>
                </label>
              </div>
              <div
                class="px-4 py-2 border-t border-gray-100 flex justify-between"
              >
                <button
                  @click="resetFilters"
                  class="text-sm text-blue-600 hover:text-blue-800"
                >
                  Reset Filters
                </button>
                <button
                  @click="toggleFilterDropdown"
                  class="text-sm text-gray-600 hover:text-gray-800"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          @click="refreshData"
          class="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          title="Refresh data"
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
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
            <path d="M16 16h5v5" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10"
            >
              <input
                type="checkbox"
                @change="selectAllRows"
                :checked="allSelected"
                class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </th>
            <th
              v-for="header in headers"
              :key="header.key"
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              :class="{
                'cursor-pointer': header.sortable,
                'hover:bg-gray-100': header.sortable,
              }"
              @click="header.sortable ? sortBy(header.key) : null"
            >
              <div class="flex items-center">
                {{ header.label }}
                <span v-if="sortConfig.key === header.key" class="ml-1">
                  <svg
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      :d="
                        sortConfig.direction === 'asc'
                          ? 'M5 15l7-7 7 7'
                          : 'M19 9l-7 7-7-7'
                      "
                    />
                  </svg>
                </span>
              </div>
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="row in paginatedRows"
            :key="row.id"
            class="hover:bg-gray-50 transition-colors"
            :class="{ 'bg-blue-50': selectedRows.includes(row.id) }"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <input
                type="checkbox"
                v-model="selectedRows"
                :value="row.id"
                class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </td>
            <td
              v-for="header in headers"
              :key="header.key"
              :class="[
                'px-6 py-4 whitespace-nowrap text-sm',
                header.key === 'fileName'
                  ? 'font-medium text-gray-900'
                  : 'text-gray-500',
              ]"
            >
              <div class="flex items-center">
                <span v-if="header.key === 'fileName'" class="mr-3">
                  <svg
                    :class="fileTypeColorClass(row.type)"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    :stroke="getFileTypeColor(row.type).text"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    v-html="getFileTypeIcon(row.type)"
                  ></svg>
                </span>
                <template
                  v-if="
                    header.key === 'dateUpdated' || header.key === 'lastUpdate'
                  "
                >
                  {{ formatDate(row[header.key]) }}
                </template>
                <template v-else-if="header.key === 'fileSize'">
                  {{ formatFileSize(row[header.key]) }}
                </template>
                <template v-else>
                  {{ row[header.key] }}
                </template>
              </div>
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
            >
              <div class="flex items-center space-x-3 justify-end">
                <button
                  @click="viewItem(row)"
                  class="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                  title="View"
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
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
                <button
                  @click="editItem(row)"
                  class="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                  title="Edit"
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
                    <path
                      d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
                    />
                  </svg>
                </button>
                <button
                  @click="deleteItem(row)"
                  class="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                  title="Delete"
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
                    <polyline points="3 6 5 6 21 6" />
                    <path
                      d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="filteredRows.length === 0">
            <td
              :colspan="headers.length + 2"
              class="px-6 py-12 text-center text-sm text-gray-500"
            >
              <div class="flex flex-col items-center justify-center space-y-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-gray-400"
                >
                  <path
                    d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                  />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
                <p class="text-lg font-medium text-gray-600">No files found</p>
                <p class="text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  @click="resetFiltersAndSearch"
                  class="mt-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                >
                  Reset filters
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div
      class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
    >
      <div class="flex-1 flex justify-between sm:hidden">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
          class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          :class="{
            'opacity-50 cursor-not-allowed': currentPage === totalPages,
          }"
          class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing <span class="font-medium">{{ startIndex + 1 }}</span> to
            <span class="font-medium">{{ endIndex }}</span> of
            <span class="font-medium">{{ filteredRows.length }}</span> results
          </p>
        </div>
        <div class="flex items-center space-x-4">
          <div class="flex items-center">
            <label for="rows-per-page" class="text-sm text-gray-700 mr-2"
              >Rows per page:</label
            >
            <select
              id="rows-per-page"
              v-model="itemsPerPage"
              class="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 pr-8"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
          <nav
            class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span class="sr-only">Previous</span>
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            <template v-for="page in visiblePages" :key="page">
              <button
                @click="currentPage = page"
                :class="{
                  'z-10 bg-blue-50 border-blue-500 text-blue-600':
                    currentPage === page,
                  'bg-white border-gray-300 text-gray-500 hover:bg-gray-50':
                    currentPage !== page,
                }"
                class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              >
                {{ page }}
              </button>
            </template>

            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              :class="{
                'opacity-50 cursor-not-allowed': currentPage === totalPages,
              }"
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span class="sr-only">Next</span>
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  headers: {
    type: Array,
    required: true,
    default: () => [],
  },
  rows: {
    type: Array,
    required: true,
    default: () => [],
  },
  rowsPerPage: {
    type: Number,
    default: 10,
  },
});

const emit = defineEmits([
  'view-item',
  'edit-item',
  'delete-item',
  'bulk-download',
  'bulk-share',
  'bulk-move',
  'bulk-delete',
  'refresh-data',
]);

// State variables
const currentPage = ref(1);
const itemsPerPage = ref(props.rowsPerPage);
const selectedRows = ref([]);
const searchQuery = ref('');
const showBulkActions = ref(false);
const isFilterDropdownOpen = ref(false);
const sortConfig = ref({
  key: '',
  direction: 'asc',
});

const filters = ref({
  type: [],
});

// Computed properties
const totalPages = computed(() =>
  Math.ceil(filteredRows.value.length / itemsPerPage.value),
);

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
const endIndex = computed(() =>
  Math.min(startIndex.value + itemsPerPage.value, filteredRows.value.length),
);

const paginatedRows = computed(() =>
  filteredRows.value.slice(startIndex.value, endIndex.value),
);

const allSelected = computed(
  () =>
    paginatedRows.value.length > 0 &&
    paginatedRows.value.every((row) => selectedRows.value.includes(row.id)),
);

const filteredRows = computed(() => {
  let result = [...props.rows];

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter((row) =>
      Object.keys(row).some((key) => {
        const value = row[key];
        return typeof value === 'string' && value.toLowerCase().includes(query);
      }),
    );
  }

  // Apply type filters
  if (filters.value.type.length > 0) {
    result = result.filter((row) => filters.value.type.includes(row.type));
  }

  // Apply sorting
  if (sortConfig.value.key) {
    result.sort((a, b) => {
      const aValue = a[sortConfig.value.key];
      const bValue = b[sortConfig.value.key];

      // Handle numeric values
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.value.direction === 'asc'
          ? aValue - bValue
          : bValue - aValue;
      }

      // Handle string values
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.value.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      // Handle date values
      if (aValue instanceof Date && bValue instanceof Date) {
        return sortConfig.value.direction === 'asc'
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }

      return 0;
    });
  }

  return result;
});

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

// Methods
const selectAllRows = (event) => {
  if (event.target.checked) {
    const rowIds = paginatedRows.value.map((row) => row.id);
    selectedRows.value = [...new Set([...selectedRows.value, ...rowIds])];
  } else {
    selectedRows.value = selectedRows.value.filter(
      (id) => !paginatedRows.value.some((row) => row.id === id),
    );
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const sortBy = (key) => {
  if (sortConfig.value.key === key) {
    sortConfig.value.direction =
      sortConfig.value.direction === 'asc' ? 'desc' : 'asc';
  } else {
    sortConfig.value.key = key;
    sortConfig.value.direction = 'asc';
  }
  currentPage.value = 1;
};

const resetFilters = () => {
  filters.value.type = [];
};

const resetFiltersAndSearch = () => {
  resetFilters();
  searchQuery.value = '';
};

const toggleBulkActions = () => {
  showBulkActions.value = !showBulkActions.value;
};

const toggleFilterDropdown = () => {
  isFilterDropdownOpen.value = !isFilterDropdownOpen.value;
};

const getFileTypeColor = (type) => {
  console.log('🚀 ~ getFileTypeColor ~ type:', type);
  switch (type) {
    case 'image':
      return { text: '#ef4444', bg: '#fde8e8' };
    case 'video':
      return { text: '#35c75a', bg: '#c5f3d1' };
    case 'document':
      return { text: '#ff9401', bg: '#ead7ba' };
    default:
      return { text: '#0079ff', bg: '#bcd2ea' };
  }
};

const fileTypeColorClass = (type) => {
  const colors = {
    image: 'text-red-500',
    video: 'text-green-500',
    document: 'text-amber-500',
    other: 'text-blue-500',
  };
  return colors[type] || 'text-gray-500';
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

const formatDate = (dateString) => {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...(dateString.includes(':') && {
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
  } catch {
    return dateString;
  }
};

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

const viewItem = (row) => {
  emit('view-item', row);
};

const editItem = (row) => {
  emit('edit-item', row);
};

const deleteItem = (row) => {
  emit('delete-item', row);
};

const bulkDownload = () => {
  emit('bulk-download', selectedRows.value);
  showBulkActions.value = false;
};

const bulkShare = () => {
  emit('bulk-share', selectedRows.value);
  showBulkActions.value = false;
};

const bulkMove = () => {
  emit('bulk-move', selectedRows.value);
  showBulkActions.value = false;
};

const bulkDelete = () => {
  emit('bulk-delete', selectedRows.value);
  showBulkActions.value = false;
  selectedRows.value = [];
};

const refreshData = () => {
  currentPage.value = 1;
  selectedRows.value = [];
  emit('refresh-data');
};

// Close dropdowns when clicking outside
const onClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showBulkActions.value = false;
    isFilterDropdownOpen.value = false;
  }
};

// Watchers
watch(
  () => props.rows,
  () => {
    currentPage.value = 1;
    selectedRows.value = [];
  },
);

watch(
  filters.value,
  () => {
    currentPage.value = 1;
  },
  { deep: true },
);

watch(itemsPerPage, () => {
  currentPage.value = 1;
});

// Initialize
onMounted(() => {
  document.addEventListener('click', onClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside);
});
</script>

<style scoped>
/* Smooth transitions for dropdowns */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
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

/* Highlight selected rows */
tr:hover {
  @apply bg-gray-50;
}

/* Animation for row actions */
button {
  transition: all 0.2s ease;
}

/* Better focus states */
input:focus,
select:focus,
button:focus {
  @apply ring-2 ring-blue-500 ring-opacity-50 outline-none;
}

/* Responsive table */
@media (max-width: 640px) {
  table {
    @apply block;
  }
  thead {
    @apply hidden;
  }
  tbody {
    @apply block;
  }
  tr {
    @apply block mb-4 border border-gray-200 rounded-lg;
  }
  td {
    @apply block px-4 py-2 text-right;
  }
  td:before {
    content: attr(data-label);
    @apply float-left font-medium text-gray-900;
  }
  td:first-child {
    @apply pt-4;
  }
  td:last-child {
    @apply pb-4;
  }
}
</style>
