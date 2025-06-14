<template>
  <div
    class="h-[calc(100vh-6rem)] overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50"
  >
    <!-- Mobile View -->
    <div class="lg:hidden h-full">
      <!-- People List View (Mobile) -->
      <div
        v-if="!selectedUser || showPeopleList"
        class="h-full flex flex-col bg-white"
      >
        <!-- Mobile Header -->
        <div
          class="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-6 py-8 text-white shadow-lg"
        >
          <!-- Decorative elements -->
          <div
            class="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full mix-blend-screen opacity-20 transform translate-x-12 -translate-y-12"
          ></div>
          <div
            class="absolute bottom-0 left-0 w-40 h-40 bg-indigo-600 rounded-full mix-blend-screen opacity-20 transform -translate-x-16 translate-y-16"
          ></div>

          <!-- Content -->
          <div class="relative z-10">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-3xl font-bold tracking-tight">Messages</h1>
                <p class="text-blue-100/90 text-sm mt-2 font-medium">
                  Stay connected with your team
                </p>
              </div>

              <!-- Notification badge -->
              <div class="relative">
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
                  class="w-6 h-6 text-blue-200"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                <span
                  class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse"
                  >3</span
                >
              </div>
            </div>

            <!-- Search bar -->
            <div class="mt-6 relative">
              <input
                type="text"
                placeholder="Search messages..."
                class="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 placeholder-blue-200/80 transition-all duration-200"
              />
              <div class="absolute left-3 top-3.5 text-blue-200/80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
          </div>

          <!-- Subtle wave effect at bottom -->
          <div
            class="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-white/10 to-transparent"
          ></div>
        </div>

        <!-- Search -->
        <div class="p-4 bg-white shadow-sm">
          <div class="relative">
            <svg
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
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
            <input
              type="text"
              placeholder="Search conversations..."
              class="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
            />
          </div>
        </div>

        <!-- People List -->
        <div class="flex-1 overflow-y-auto">
          <div
            v-for="(message, index) in messages"
            :key="index"
            @click="selectUserMobile(index, message)"
            class="px-4 py-4 border-b border-gray-100 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-150 cursor-pointer"
          >
            <div class="flex items-center space-x-3">
              <div class="relative flex-shrink-0">
                <AccountImg
                  :account-img="message.profile_image_url"
                  :first-name="message.first_name"
                  height="48px"
                  width="48px"
                  :show-status="message.show_status"
                />
                <!-- <div
                  class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"
                ></div> -->
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex justify-between items-start">
                  <h3 class="font-semibold text-gray-900 truncate">
                    {{ message.first_name }} {{ message.last_name }}
                  </h3>
                  <span class="text-xs text-gray-500 whitespace-nowrap ml-2">
                    {{ formatDate(message.lastMessageTime) }}
                  </span>
                </div>
                <p class="text-sm text-gray-600 truncate mt-1">
                  {{ message.lastMessage }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat View (Mobile) -->
      <div
        v-if="selectedUser && !showPeopleList"
        class="h-full flex flex-col bg-white"
      >
        <!-- Chat Header with Back Button -->
        <div
          class="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-4 text-white shadow-lg"
        >
          <div class="flex items-center space-x-3">
            <button
              @click="showPeopleList = true"
              class="p-2 hover:bg-blue-600 rounded-full transition-colors duration-150"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>
            <div class="flex items-center space-x-3 flex-1 min-w-0">
              <AccountImg
                :account-img="selectedUser.profile_image_url"
                :first-name="selectedUser.first_name"
                :show-status="false"
                height="40px"
                width="40px"
              />
              <div class="min-w-0">
                <h2 class="font-semibold truncate">
                  {{ selectedUser.first_name }} {{ selectedUser.last_name }}
                </h2>

                <p v-if="isUserOnline" class="text-blue-100 text-sm">Online</p>

                <p v-else class="text-blue-100 text-sm">
                  <span v-if="selectedUser.last_active_time">Last seen at</span>
                  {{
                    formatDate(selectedUser.last_active_time) ??
                    formatDate(selectedUser.created_at)
                  }}
                </p>
              </div>
            </div>
            <button
              class="p-2 hover:bg-blue-600 rounded-full transition-colors duration-150"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Messages -->
        <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-4">
          <div
            v-for="chat in chats"
            :key="chat.id"
            class="flex items-end space-x-2"
            :class="
              chat.sender_id === auth.user.id ? 'justify-end' : 'justify-start'
            "
          >
            <div v-if="chat.sender_id !== auth.user.id" class="flex-shrink-0">
              <AccountImg
                :account-img="selectedUser.profile_image_url"
                :first-name="selectedUser.first_name"
                :show-status="false"
                height="32px"
                width="32px"
              />
            </div>

            <div class="max-w-xs lg:max-w-md">
              <div
                class="px-4 py-3 rounded-2xl shadow-sm"
                :class="{
                  'bg-blue-500 text-white rounded-br-md':
                    chat.sender_id === auth.user.id,
                  'bg-white text-gray-800 border rounded-bl-md':
                    chat.sender_id !== auth.user.id,
                }"
              >
                <p class="text-sm">{{ chat.message }}</p>
              </div>
              <p class="text-xs text-gray-500 mt-1 px-2">
                {{ formatDate(chat.created_at) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Message Input -->
        <div class="p-4 bg-white border-t border-gray-200">
          <div class="flex items-center space-x-3">
            <button
              class="p-2 text-gray-400 hover:text-blue-500 transition-colors duration-150"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                ></path>
              </svg>
            </button>
            <div class="flex-1 relative">
              <input
                v-model="inputMessage"
                @keyup.enter="sendMessage"
                type="text"
                placeholder="Type a message..."
                class="w-full px-4 py-3 rounded-full bg-gray-100 border-0 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
              />
            </div>
            <button
              @click="sendMessage"
              class="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-150 shadow-lg"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop View -->
    <div class="hidden lg:flex h-full">
      <!-- People Sidebar -->
      <div
        class="w-80 xl:w-96 bg-white border-r border-gray-200 flex flex-col shadow-sm"
      >
        <!-- Header -->
        <div
          class="p-6 border-b border-gray-200 bg-gradient-to-br from-blue-600 to-blue-500 text-white"
        >
          <h1 class="text-xl font-bold">Messages</h1>
          <p class="text-blue-100 text-sm mt-1">
            {{ messages.length }} conversations
          </p>
        </div>

        <!-- Search -->
        <div class="p-4">
          <div class="relative">
            <svg
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
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
            <input
              type="text"
              placeholder="Search conversations..."
              class="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
            />
          </div>
        </div>

        <!-- People List -->
        <div class="flex-1 overflow-y-auto">
          <div
            v-for="(message, index) in messages"
            :key="index"
            @click="viewMessage(index, message)"
            class="px-4 py-4 border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-all duration-150 group"
            :class="{
              'bg-blue-50 border-r-4 border-blue-500':
                selectedMessage === index,
            }"
          >
            <div class="flex items-center space-x-3">
              <div class="relative flex-shrink-0">
                <AccountImg
                  :account-img="message.profile_image_url"
                  :first-name="message.first_name"
                  height="48px"
                  width="48px"
                  :show-status="message.show_status"
                />
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex justify-between items-start">
                  <h3 class="font-semibold text-gray-900 truncate">
                    {{ message.first_name }} {{ message.last_name }}
                  </h3>
                  <div class="flex items-center">
                    <span class="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {{ formatDate(message.lastMessageTime) }}
                    </span>
                    <!-- Awesome notification badge -->
                    <transition name="fade-scale">
                      <span
                        v-if="message.unread"
                        class="ml-1.5 bg-gradient-to-br text-black text-xs font-bold rounded-full h-5 min-w-5 px-1 flex items-center justify-center transform group-hover:scale-110 transition-all duration-200 shadow-sm"
                      >
                        {{ message.unread }}
                      </span>
                    </transition>
                  </div>
                </div>
                <p :class="[`text-sm text-gray-600 truncate mt-1`]">
                  {{ message.lastMessage }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Chat Area -->
      <div
        v-if="selectedUser"
        class="flex-1 flex flex-col bg-white"
        :class="{
          'lg:flex-1': !accountInfo,
          'lg:flex-1 xl:flex-1': accountInfo,
        }"
      >
        <!-- Chat Header -->
        <div class="px-6 py-4 border-b border-gray-200 bg-white shadow-sm">
          <div class="flex items-center justify-between">
            <div
              @click="toogleAccountInfo"
              class="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors duration-150"
            >
              <AccountImg
                :account-img="selectedUser.profile_image_url"
                :first-name="selectedUser.first_name"
                :show-status="false"
                height="44px"
                width="44px"
              />
              <div>
                <h2 class="font-semibold text-gray-900">
                  {{ selectedUser.first_name }} {{ selectedUser.last_name }}
                </h2>
                <p v-if="isUserOnline" class="text-sm text-green-600">Online</p>
                <p v-else class="text-sm text-gray-400">
                  <span v-if="selectedUser.last_active_time">Last seen at</span>
                  {{
                    formatDate(selectedUser.last_active_time) ??
                    formatDate(selectedUser.created_at)
                  }}
                </p>
              </div>
            </div>

            <div class="flex items-center space-x-2">
              <button
                class="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-150"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
              </button>
              <button
                class="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-150"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Messages Area -->
        <div
          ref="chatContainer"
          class="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50"
        >
          <div
            v-for="chat in chats"
            :key="chat.id"
            class="flex items-end space-x-3"
            :class="
              chat.sender_id === auth.user.id ? 'justify-end' : 'justify-start'
            "
          >
            <div v-if="chat.sender_id !== auth.user.id" class="flex-shrink-0">
              <AccountImg
                :account-img="selectedUser.profile_image_url"
                :first-name="selectedUser.first_name"
                :show-status="false"
                height="36px"
                width="36px"
              />
            </div>

            <div class="max-w-md">
              <div
                class="px-4 py-3 rounded-2xl shadow-sm break-words"
                :class="{
                  'bg-blue-500 text-white rounded-br-md':
                    chat.sender_id === auth.user.id,
                  'bg-white text-gray-800 border rounded-bl-md':
                    chat.sender_id !== auth.user.id,
                }"
              >
                <p>{{ chat.message }}</p>
              </div>
              <p class="text-xs text-gray-500 mt-1 px-2">
                {{ formatDate(chat.created_at) }}
              </p>
            </div>

            <div v-if="chat.sender_id === auth.user.id" class="flex-shrink-0">
              <AccountImg
                :first-name="auth.user.first_name"
                :show-status="false"
                height="36px"
                width="36px"
              />
            </div>
          </div>
        </div>

        <!-- Message Input -->
        <div class="p-6 bg-white border-t border-gray-200">
          <div class="flex items-center space-x-4">
            <button
              class="p-2 text-gray-400 hover:text-blue-500 transition-colors duration-150"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                ></path>
              </svg>
            </button>

            <div class="flex-1 relative">
              <input
                v-model="inputMessage"
                @keyup.enter="sendMessage"
                type="text"
                placeholder="Type your message..."
                class="w-full px-6 py-4 rounded-full bg-gray-100 border-0 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 text-base"
              />
            </div>

            <button
              class="p-2 text-gray-400 hover:text-blue-500 transition-colors duration-150"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                ></path>
              </svg>
            </button>

            <button
              @click="sendMessage"
              class="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      <!-- Account Info Panel (Desktop Only) -->
      <div
        v-if="accountInfo && selectedUser"
        class="w-80 bg-white border-l border-gray-200 flex flex-col"
      >
        <!-- Panel Header -->
        <div
          class="p-[22px] border-b border-gray-200 flex justify-between items-center"
        >
          <h3 class="font-semibold text-gray-900">Contact Info</h3>
          <button
            @click="toogleAccountInfo"
            class="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-150"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto">
          <!-- User Profile -->
          <div class="p-6 text-center border-b border-gray-200">
            <div class="flex justify-center">
              <AccountImg
                :account-img="selectedUser.profile_image_url"
                :first-name="selectedUser.first_name"
                font-size="48px"
                line-height="1"
                :show-status="false"
                height="120px"
                width="120px"
              />
            </div>
            <h3 class="text-xl font-semibold mt-4 text-gray-900">
              {{ selectedUser.first_name }} {{ selectedUser.last_name }}
            </h3>
            <p class="text-gray-500 mt-1">@{{ selectedUser.username }}</p>
          </div>

          <!-- Attachments -->
          <div class="p-6 border-b border-gray-200">
            <h4 class="font-medium text-gray-900 mb-4">Recent Files</h4>
            <div class="space-y-3">
              <div
                v-for="(attachment, index) in attachments"
                :key="index"
                class="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-150"
              >
                <div
                  class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0"
                >
                  <svg
                    class="w-5 h-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-medium text-gray-900 truncate">
                    {{ attachment.name }}
                  </p>
                  <p class="text-sm text-gray-500">{{ attachment.size }}</p>
                </div>
              </div>
            </div>
            <button
              class="text-blue-600 text-sm font-medium mt-3 hover:text-blue-700"
            >
              View all files
            </button>
          </div>

          <!-- Members -->
          <div class="p-6">
            <h4 class="font-medium text-gray-900 mb-4">Group Members</h4>
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <AccountImg :show-status="false" height="40px" width="40px" />
                <div>
                  <p class="font-medium text-gray-900">Eyouel Haile</p>
                  <p class="text-sm text-green-600">Online</p>
                </div>
              </div>
            </div>
            <button
              class="text-blue-600 text-sm font-medium mt-3 hover:text-blue-700"
            >
              View all members
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, nextTick } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useNuxtApp } from '#app';
import AccountImg from '~/components/AccountImg.vue';

const { $echo } = useNuxtApp();

const auth = useAuthStore();
let chats = ref([]);

const { $axios } = useNuxtApp();

const chatContainer = ref(null);
const token = ref('');
const inputMessage = ref('');
const attachments = ref([]);
const accountInfo = ref(false);
const selectedMessage = ref(null);
const selectedUser = ref(null);

let pageNumber = 1;

const fetchOlderMessages = async () => {
  if (!chatContainer.value) return;

  // 1. Store current scroll height & position
  const previousScrollHeight = chatContainer.value.scrollHeight;
  const previousScrollTop = chatContainer.value.scrollTop;

  // 2. Simulate fetching older messages
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulated API call delay
  const olderMessages = [
    { id: 3, sender_id: 2, message: 'How are you?', created_at: '2024-02-12' },
    {
      id: 4,
      sender_id: 1,
      message: "I'm good, you?",
      created_at: '2024-02-12',
    },
  ];

  // 3. Prepend new messages at the top
  chats.value.unshift(...olderMessages);

  // 4. Wait for Vue to update DOM, then restore scroll position
  await nextTick(() => {
    chatContainer.value.scrollTop =
      chatContainer.value.scrollHeight -
      previousScrollHeight +
      previousScrollTop;
  });
};

const handleScroll = async () => {
  if (chatContainer.value && chatContainer.value.scrollTop === 0) {
    const previousScrollHeight = chatContainer.value.scrollHeight;
    const previousScrollTop = chatContainer.value.scrollTop;

    await getHistory(++pageNumber);

    await nextTick(() => {
      chatContainer.value.scrollTop =
        chatContainer.value.scrollHeight -
        previousScrollHeight +
        previousScrollTop;
    });
  }
};

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

const auth_token = useCookie('auth_token', {
  secure: false, // Ensures it only works on HTTPS
  httpOnly: false, // Since we need JavaScript access
  sameSite: 'lax',
});

token.value = auth_token.value;

onMounted(async () => {
  await getPeople();
  excludeCurrentUserFromPeoplesList();

  await getUnreadMessages();
  // await getHistory();
  await nextTick(); // Ensures DOM updates before scrolling
  scrollToBottom();
  if (chatContainer.value) {
    chatContainer.value.addEventListener('scroll', handleScroll);
  }
  // console.log('Listening on ', `chat.${auth.user.id}`);

  $echo.private(`chat.${auth.user.id}`).listen('MessageSent', (event) => {
    chats.value = [...chats.value, event.message];

    nextTick(() => {
      scrollToBottom();
    });
  });

  const presenceChannel = $echo.join(`presence.online`);

  presenceChannel
    .here((users) => {
      onlineUserIDs.value = users.map((item) => item.id);
      messages.value.forEach((person) => {
        let onlineUser = users.find((user) => user.id === person.id);
        if (onlineUser) {
          person['show_status'] = true;
        } else {
          person['show_status'] = false;
        }
      });
    })
    .joining((user) => {
      console.log('User joined:', user); // One user joined
      onlineUserIDs.value.push(user.id);
      messages.value.forEach((person) => {
        if (user?.id === person.id) {
          person['show_status'] = true;
        } else {
          person['show_status'] = false;
        }
      });
    })
    .leaving((user) => {
      console.log('User left:', user); // One user left
      let removeIndex = onlineUserIDs.value.indexOf(user.id);
      let newArr = onlineUserIDs.value.filter(
        (_, index) => index !== removeIndex,
      );

      onlineUserIDs.value = [...newArr];
      messages.value.forEach((person) => {
        if (user?.id === person.id) {
          person['show_status'] = false;
        }
      });

      setLastActiveTime(user);
    });
});

const setLastActiveTime = async (user) => {
  const response = await $axios.post(`chat/last-active/${user.id}`, {});
};

const messages = ref([]);
const onlineUserIDs = ref([]);

const isUserOnline = ref(false);

watch(
  onlineUserIDs,
  (newVal) => {
    isUserOnline.value = newVal.includes(selectedUser.value.id);
  },
  { deep: true },
);

const toogleAccountInfo = () => {
  accountInfo.value = !accountInfo.value;
};

attachments.value = [
  {
    name: 'Interesting file.doc',
    style: 'text-green-500',
    img: `  <g
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
                  </g>`,
    size: '10 MB',
    created_at: '12:00 PM',
  },
  {
    name: 'Frame to frame.pdf',
    style: 'text-orange-500',

    img: `  <g
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
                </g>`,
    size: '56 MB',
    created_at: '11:40 AM',
  },
  {
    name: 'Project of wall.mp4',
    style: 'text-blue-500',

    img: `  <g
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
                </g>`,
    size: '150 MB',
    created_at: '09:00 PM',
  },
  {
    name: 'Catch you later.xls',
    style: 'text-red-500',

    img: `  <g
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
      >`,
    size: '5 MB',
    created_at: '02:00 AM',
  },
];

const formatDate = (timestamp) => {
  if (!timestamp) {
    return '';
  }
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const viewMessage = async (index, message) => {
  chats.value = [];
  selectedMessage.value = index;
  selectedUser.value = message;
  isUserOnline.value = onlineUserIDs.value.includes(selectedUser.value.id);
  messages.value.forEach((item) => {
    if (item.id === selectedUser.value.id) {
      item['unread'] = 0;
    }
  });
  await getHistory();
};
const excludeCurrentUserFromPeoplesList = () => {
  let people = [...messages.value];
  let filteredPeople = people.filter((item) => item.id !== auth.user.id);

  messages.value = [...filteredPeople];
};
const getPeople = async () => {
  try {
    const response = await $axios.get(`/auth/users`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    messages.value = response.data.data;
  } catch (error) {
    console.log('🚀 ~ getPeople ~ error:', error);
  }
};

const getHistory = async (page = 1) => {
  try {
    let chatHistory = [];
    const response = await $axios.get(
      `chat/message-history/${selectedUser.value.id}?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      },
    );
    chatHistory = response.data.data.data;

    chats.value = [...chatHistory.sort((a, b) => a.id - b.id), ...chats.value];
  } catch (error) {
    console.log('🚀 ~ getHistory ~ error:', error);
  }
};
const sendMessage = async () => {
  try {
    let formData = {};

    formData['message'] = inputMessage.value;
    formData['group_id'] = null;
    formData['receiver_id'] = selectedUser.value.id;

    const response = await $axios.post('chat/send-message', formData, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    if (response.status === 200 && response.data.message) {
      chats.value = [...chats.value, response.data.message];
      inputMessage.value = '';

      nextTick(() => {
        scrollToBottom();
      });
    }
  } catch (error) {
    console.log('🚀 ~ sendMessage ~ error:', error);
  }
};

const showPeopleList = ref(true);

// Mobile-specific method
const selectUserMobile = (index, message) => {
  viewMessage(index, message);
  showPeopleList.value = false;
};

const getUnreadMessages = async () => {
  try {
    const response = await $axios.get(`chat/new-messages`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    messages.value.forEach((item) => {
      item['unread'] = response.data?.user?.[item.id] ?? 0;
    });
  } catch (error) {
    console.log('🚀 ~ getUnreadMessages ~ error:', error);
  }
};
</script>

<style>
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Hide scrollbar for firefox */
.scrollbar-hidden {
  scrollbar-width: none;
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.2s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
