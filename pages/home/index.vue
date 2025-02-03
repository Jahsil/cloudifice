<template>
  <div class="overflow-x-auto">
    <div class="flex justify-between items-center h-[85px]">
      <div class="relative left-4 max-w-sm">
        <div
          class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
        >
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
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
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Select date"
        />
        <div
          class="absolute inset-y-0 start-48 flex items-center ps-3 pointer-events-none"
        >
          <svg
            class="text-gray-500 dark:text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M18 9s-4.419 6-6 6s-6-6-6-6"
              color="currentColor"
            />
          </svg>
        </div>
      </div>
      <div class="pr-3">
        <button
          class="flex gap-2 text-sm bg-[#4A68F5] rounded-md text-neutral-50 px-4 py-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M12 4.5v10m0-10c-.7 0-2.008 1.994-2.5 2.5M12 4.5c.7 0 2.008 1.994 2.5 2.5m5.5 9.5c0 2.482-.518 3-3 3H7c-2.482 0-3-.518-3-3"
              color="currentColor"
            />
          </svg>
          <span class="font-semibold">Upload Files</span>
        </button>
      </div>
    </div>
    <!-- show storages for images, videos, images etc...  -->
    <div class="bg-[#fafbfd] py-6 px-4">
      <div class="flex xxs:flex-wrap xl:flex-nowrap justify-center gap-4">
        <FileCard
          name="Image Files"
          amount="20"
          end-amount="120"
          start-amount="10"
          count="1200 Items"
          styles="text-red-600"
          icon='<g
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
        /> </g
      >'
        />
        <FileCard
          name="Video Files"
          amount="50"
          end-amount="120"
          start-amount="50"
          count="700 Items"
          styles="text-green-500"
          progress-bar-bg="#c5f3d1"
          progress-bar-fg="#35c75a"
          icon='<g
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
                </g>'
        />
        <FileCard
          name="Document Files"
          amount="40"
          end-amount="120"
          start-amount="30"
          count="800 Items"
          styles="text-orange-400"
          progress-bar-bg="#ead7ba"
          progress-bar-fg="#ff9401"
          icon='<g
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
                </g>'
        />
        <FileCard
          name="Other Files"
          amount="90"
          end-amount="120"
          start-amount="70"
          count="200 Items"
          styles="text-blue-600"
          progress-bar-bg="#bcd2ea"
          progress-bar-fg="#0079ff"
          icon='  <g
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
                </g>'
        />
      </div>

      <!-- try premium  -->
      <div class="w-full bg-white py-2 mt-4 px-2">
        <div class="flex items-center gap-2">
          <svg
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
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10s10-4.477 10-10"
              />
              <path
                d="M12.242 17v-5c0-.471 0-.707-.146-.854c-.147-.146-.382-.146-.854-.146m.75-3h.009"
              />
            </g>
          </svg>
          <p class="text-md text-neutral-400 font-medium">
            Optimize and expand your storage with Cloudifice+
          </p>
          <span class="underline font-medium">Try permium now</span>
        </div>
      </div>
    </div>
    <div class="flex justify-between items-center px-6">
      <div class="flex flex-col">
        <p class="text-lg font-semibold">Overview Storage</p>
        <p class="text-md text-neutral-400 font-medium">
          Document that you save on our storage
        </p>
      </div>
      <div>
        <button
          class="flex gap-2 text-sm text-neutral-600 border border-neutral-300 shadow-sm rounded-md px-4 py-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M8.857 12.506C6.37 10.646 4.596 8.6 3.627 7.45c-.3-.356-.398-.617-.457-1.076c-.202-1.572-.303-2.358.158-2.866S4.604 3 6.234 3h11.532c1.63 0 2.445 0 2.906.507c.461.508.36 1.294.158 2.866c-.06.459-.158.72-.457 1.076c-.97 1.152-2.747 3.202-5.24 5.065a1.05 1.05 0 0 0-.402.747c-.247 2.731-.475 4.227-.617 4.983c-.229 1.222-1.96 1.957-2.888 2.612c-.552.39-1.222-.074-1.293-.678a196 196 0 0 1-.674-6.917a1.05 1.05 0 0 0-.402-.755"
              color="currentColor"
            />
          </svg>
          <span class="font-semibold">Filter</span>
        </button>
      </div>
    </div>

    <!-- recents  -->
    <div
      class="flex xxs:flex-wrap xl:flex-nowrap justify-center px-4 pt-4 gap-4 overflow-x-clip"
    >
      <FileCard
        name="holiday-01.jpeg"
        end-amount="120"
        start-amount="30"
        count="11.56 MB"
        styles="text-red-600"
        progress-bar-bg="#ead7ba"
        progress-bar-fg="#ff9401"
        icon='<g
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
        /> </g
      >'
      />
      <FileCard
        name="sem-report.docx"
        end-amount="120"
        start-amount="30"
        count="115.8 KB"
        styles="text-orange-400"
        progress-bar-bg="#ead7ba"
        progress-bar-fg="#ff9401"
        icon='<g
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
                </g>'
      />
      <FileCard
        name="prototype-vid.mp4"
        end-amount="120"
        start-amount="30"
        count="1.56 GB"
        styles="text-green-400"
        progress-bar-bg="#ead7ba"
        progress-bar-fg="#ff9401"
        icon='<g
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
                </g>'
      />
      <FileCard
        name="supermarket.pdf"
        end-amount="120"
        start-amount="30"
        count="1.5 MB"
        styles="text-orange-400"
        progress-bar-bg="#ead7ba"
        progress-bar-fg="#ff9401"
        icon='<g
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
                </g>'
      />
    </div>

    <DataTable :headers="headers" :rows="rows" :rowsPerPage="5" />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useFlowbite } from "~/composables/useFlowbite";
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
} from "flowbite";
import FileCard from "~/components/FileCard.vue";
import DataTable from "~/components/DataTable.vue";

// initialize components based on data attribute selectors
onMounted(() => {
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
});

const headers = [
  { key: "fileName", label: "File Name" },
  { key: "dateUpdated", label: "Date Updated" },
  { key: "lastUpdate", label: "Last Update" },
  { key: "fileSize", label: "File Size" },
  { key: "fileOwner", label: "File Owner" },
];

const rows = [
  {
    id: 1,
    fileName: "Document1.pdf",
    dateUpdated: "2024-01-01",
    lastUpdate: "2024-01-01 12:00:00",
    fileSize: "1.2MB",
    fileOwner: "John Doe",
    type: "image",
  },
  {
    id: 2,
    fileName: "Image1.png",
    dateUpdated: "2024-01-02",
    lastUpdate: "2024-01-02 14:30:00",
    fileSize: "500KB",
    fileOwner: "Jane Smith",
    type: "video",
  },
  {
    id: 3,
    fileName: "Presentation1.pptx",
    dateUpdated: "2024-01-03",
    lastUpdate: "2024-01-03 09:15:00",
    fileSize: "2.5MB",
    fileOwner: "Alice Brown",
    type: "image",
  },
  {
    id: 4,
    fileName: "Spreadsheet1.xlsx",
    dateUpdated: "2024-01-04",
    lastUpdate: "2024-01-04 10:45:00",
    fileSize: "3.1MB",
    fileOwner: "Bob Green",
    type: "other",
  },
  {
    id: 5,
    fileName: "Notes.txt",
    dateUpdated: "2024-01-05",
    lastUpdate: "2024-01-05 11:00:00",
    fileSize: "10KB",
    fileOwner: "Charlie Black",
    type: "document",
  },
  {
    id: 6,
    fileName: "Archive.zip",
    dateUpdated: "2024-01-06",
    lastUpdate: "2024-01-06 08:20:00",
    fileSize: "15MB",
    fileOwner: "David White",
    type: "video",
  },
];
</script>
