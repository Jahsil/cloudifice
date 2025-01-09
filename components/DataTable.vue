<template>
  <div class="overflow-x-auto px-4 pt-8">
    <div class="border border-neutral-200 rounded-xl overflow-hidden">
      <table class="min-w-full bg-white">
        <thead>
          <tr class="bg-[#fafbfd]">
            <th class="p-2 text-left">
              <input
                type="checkbox"
                @change="selectAllRows"
                :checked="allSelected"
                class="form-checkbox rounded"
              />
            </th>
            <th
              v-for="header in headers"
              :key="header.key"
              class="text-left text-[#515b73] font-medium text-md"
            >
              {{ header.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in paginatedRows"
            :key="row.id"
            class="hover:bg-gray-100"
          >
            {{
              row[index]
            }}
            <td class="p-2">
              <input
                type="checkbox"
                v-model="selectedRows"
                :value="row.id"
                class="form-checkbox rounded"
              />
            </td>
            <td
              v-for="header in headers"
              :key="header.key"
              :class="[
                'py-3 text-left text-md',
                header.key === 'fileName'
                  ? 'text-[#29292b] font-medium'
                  : 'text-[#626d82]',
              ]"
            >
              <div class="flex items-center gap-2">
                <span v-if="header.key === 'fileName'">
                  <svg
                    v-if="row.type === 'image'"
                    class="text-red-600"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      color="currentColor"
                    >
                      <path
                        d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12"
                      />
                      <circle cx="16.5" cy="7.5" r="1.5" />
                      <path
                        d="M16 22c-.62-2.225-2.065-4.218-4.123-5.666c-2.22-1.561-5.005-2.387-7.861-2.331q-.51-.001-1.016.032"
                      />
                      <path
                        d="M13 18c1.701-1.327 3.535-2.007 5.386-2a7.8 7.8 0 0 1 3.114.662"
                      />
                    </g>
                  </svg>

                  <!-- video  -->
                  <svg
                    v-if="row.type === 'video'"
                    class="text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      color="currentColor"
                    >
                      <path
                        d="M17.7 21.335c-1.172.165-2.7.165-4.75.165h-1.9c-4.03 0-6.046 0-7.298-1.252S2.5 16.98 2.5 12.95v-1.9c0-4.03 0-6.046 1.252-7.298S7.02 2.5 11.05 2.5h1.9c4.03 0 6.046 0 7.298 1.252S21.5 7.019 21.5 11.05v1.9c0 1.208 0 2.235-.034 3.115c-.027.705-.04 1.057-.307 1.19c-.267.13-.566-.08-1.163-.503L18.65 15.8"
                      />
                      <path
                        d="M14.945 12.395c-.176.627-1.012 1.07-2.682 1.955c-1.615.856-2.422 1.285-3.073 1.113a1.66 1.66 0 0 1-.712-.393C8 14.62 8 13.746 8 12s0-2.62.478-3.07c.198-.186.443-.321.712-.392c.65-.173 1.458.256 3.073 1.112c1.67.886 2.506 1.329 2.682 1.955c.073.259.073.531 0 .79"
                      />
                    </g>
                  </svg>

                  <!-- documents  -->
                  <svg
                    v-if="row.type === 'document'"
                    class="text-orange-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      color="currentColor"
                    >
                      <path
                        d="M21 11v-1c0-3.771 0-5.657-1.24-6.828C18.519 2 16.522 2 12.53 2h-1.06C7.479 2 5.482 2 4.24 3.172C3 4.343 3 6.229 3 10v4c0 3.771 0 5.657 1.24 6.828C5.481 22 7.478 22 11.47 22H12M8 7h8m-8 5h5"
                      />
                      <path
                        d="M21 20.647V17c0-1.43-1.343-3-3-3s-3 1.57-3 3v3.5c0 .78.733 1.5 1.636 1.5c.904 0 1.637-.72 1.637-1.5v-2.735"
                      />
                    </g>
                  </svg>

                  <!-- other  -->
                  <svg
                    v-if="row.type === 'other'"
                    class="text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      color="currentColor"
                    >
                      <path
                        d="M3.5 3.978A1.99 1.99 0 0 1 5.5 2c1.105 0 2 .886 2 1.978c0 .394-.116.76-.317 1.069C6.585 5.966 5.5 6.842 5.5 7.934v.495M5.5 11h.012M10.5 2h2.273c3.26 0 4.892 0 6.024.798c.324.228.612.5.855.805c.848 1.066.848 2.6.848 5.67v2.545c0 2.963 0 4.445-.469 5.628c-.754 1.903-2.348 3.403-4.37 4.113c-1.257.441-2.83.441-5.98.441c-1.798 0-2.698 0-3.416-.252c-1.155-.406-2.066-1.263-2.497-2.35c-.268-.676-.268-1.523-.268-3.216V14"
                      />
                      <path
                        d="M20.5 12a3.333 3.333 0 0 1-3.333 3.333c-.666 0-1.451-.116-2.098.057a1.67 1.67 0 0 0-1.179 1.179c-.173.647-.057 1.432-.057 2.098A3.333 3.333 0 0 1 10.5 22"
                      />
                    </g>
                  </svg>
                </span>
                <span>{{ row[header.key] }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex items-center justify-between space-x-4 mt-4 px-4">
      <div class="text-sm text-gray-600">
        <span class="font-semibold">Showing </span>
        <span class="text-indigo-600 font-bold">
          {{ startIndex + 1 }} - {{ endIndex }}
        </span>
        <span class="pl-2">of </span>
        <span class="text-indigo-600 font-bold">{{ rows.length }}</span>
        <span class="pl-1">entries</span>
      </div>
      <!-- items per page  -->
      <div class="flex gap-4">
        <div>
          <label for="itemsPerPage" class="mr-2">Items per page:</label>
          <select
            id="itemsPerPage"
            v-model="itemsPerPage"
            @change="onItemsPerPageChange"
            class="px-3 py-1 border rounded"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option :value="rows.length">All</option>
          </select>
        </div>
        <div class="flex items-center gap-2">
          <button
            class="px-4 py-2 text-gray-700 rounded-full disabled:opacity-50"
            @click="prevPage"
            :disabled="currentPage === 1"
          >
            <span
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M15 6s-6 4.419-6 6s6 6 6 6"
                  color="currentColor"
                />
              </svg>
            </span>
          </button>
          <span class="text-sm font-semibold">
            Page
            <span class="text-indigo-600 font-bold">{{ currentPage }}</span>
            of
            <span class="text-indigo-600 font-bold">{{ totalPages }}</span>
          </span>
          <button
            class="px-4 py-2 text-gray-700 rounded-full disabled:opacity-50"
            @click="nextPage"
            :disabled="currentPage === totalPages"
          >
            <span
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M9 6s6 4.419 6 6s-6 6-6 6"
                  color="currentColor"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

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
});

// State variables
const currentPage = ref(1);
const itemsPerPage = ref(5);
const selectedRows = ref([]);

// Computed properties
const totalPages = computed(() =>
  Math.ceil(props.rows.length / itemsPerPage.value)
);
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value);
const endIndex = computed(() =>
  Math.min(startIndex.value + itemsPerPage.value, props.rows.length)
);
const paginatedRows = computed(() =>
  props.rows.slice(startIndex.value, endIndex.value)
);
const allSelected = computed(
  () =>
    paginatedRows.value.length > 0 &&
    paginatedRows.value.every((row) => selectedRows.value.includes(row.id))
);

// Methods
const selectAllRows = (event) => {
  if (event.target.checked) {
    const rowIds = paginatedRows.value.map((row) => row.id);
    selectedRows.value = [...new Set([...selectedRows.value, ...rowIds])];
  } else {
    selectedRows.value = selectedRows.value.filter(
      (id) => !paginatedRows.value.some((row) => row.id === id)
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

const onItemsPerPageChange = () => {
  currentPage.value = 1;
};
</script>

<style scoped></style>
