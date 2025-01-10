<template>
  <div>
    <div
      class="sticky top-0 h-[66px] w-full border border-b-2 shadow-sm border-neutral-300"
    >
      <div class="flex items-center justify-between pl-8 h-full">
        <div>
          <input
            id="search"
            type="text"
            placeholder="Search for documents & files"
            :class="{
              'w-64 pl-4 py-2  rounded-md  text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 border border-neutral-300 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          />
        </div>
        <!-- Menu icon -->
        <div class="md:hidden pr-4">
          <svg
            class="text-primary"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M4 5h16m-2 7H6m2 7h8"
              color="currentColor"
            />
          </svg>
        </div>
        <div class="flex items-center gap-2 pr-4 xxs:hidden md:flex">
          <div>
            <svg
              class="text-[#788bf8]"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
                <circle cx="12" cy="12" r="10" />
                <path
                  d="M10 9a2 2 0 1 1 3.683 1.08C13.085 11.01 12 11.896 12 13v.5m-.008 3.5h.009"
                />
              </g>
            </svg>
          </div>
          <div>
            <svg
              class="text-[#788bf8]"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
                  d="M5.158 11.491c-.073 1.396.011 2.882-1.236 3.817A2.3 2.3 0 0 0 3 17.153C3 18.15 3.782 19 4.8 19h14.4c1.018 0 1.8-.85 1.8-1.847c0-.726-.342-1.41-.922-1.845c-1.247-.935-1.163-2.421-1.236-3.817a6.851 6.851 0 0 0-13.684 0"
                />
                <path
                  d="M10.5 3.125C10.5 3.953 11.172 5 12 5s1.5-1.047 1.5-1.875S12.828 2 12 2s-1.5.297-1.5 1.125M15 19a3 3 0 1 1-6 0"
                />
              </g>
            </svg>
          </div>
          <div class="w-0 h-[40px] border border-neutral-300"></div>
          <div class="rounded-full bg-primary w-8 h-8"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
