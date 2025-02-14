<template>
  <div>
    <div class="px-4 mt-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-1">
        <div class="col-span-1">
          <input
            id="search"
            type="text"
            placeholder="People, chat, keywords"
            :class="{
              'w-64 pl-4 py-2  rounded-md  text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 border border-neutral-300 focus:outline-none shadow-sm transition-all duration-200': true,
            }"
          />

          <div class="mt-8 h-[85vh] overflow-y-scroll scrollbar-hidden">
            <div
              v-for="(message, index) in messages"
              :key="index"
              @click="viewMessage(index, message)"
              class="p-2 flex justify-between items-center"
              :class="{
                'border-r-[3px] border-blue-500': selectedMessage === index,
              }"
            >
              <div class="flex justify-start items-center gap-2">
                <AccountImg
                  :account-img="
                    message.profile_image_url ? message.profile_image_url : null
                  "
                  :first-name="message.first_name"
                />
                <div class="flex-col gap-4 overflow-clip">
                  <p>{{ message.first_name }} {{ message.last_name }}</p>
                  <p class="text-sm text-neutral-400 h-10">
                    {{ message.lastMessage }}
                  </p>
                </div>
              </div>
              <div>
                <p class="text-sm text-neutral-400">
                  {{ formatDate(message.lastMessageTime) }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="selectedUser"
          class="relative border h-[80vh]"
          :class="{ 'col-span-2': accountInfo, 'col-span-3': !accountInfo }"
        >
          <div
            class="sticky top-0 bg-white flex justify-between items-center border-b border-neutral-300 pb-2 px-2"
          >
            <div
              @click="toogleAccountInfo"
              class="flex justify-start items-center gap-2"
            >
              <AccountImg
                :account-img="
                  selectedUser.profile_image_url
                    ? selectedUser.profile_image_url
                    : null
                "
                :first-name="selectedUser.first_name"
                :show-status="false"
              />
              <div class="flex-col gap-4">
                <p>
                  {{ selectedUser.first_name }} {{ selectedUser.last_name }}
                </p>
                <p class="text-sm text-green-600">online</p>
              </div>
            </div>
            <div>
              <svg
                class="text-blue-600"
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
                  d="M3.778 11.942C2.83 10.29 2.372 8.94 2.096 7.572c-.408-2.024.526-4.001 2.073-5.263c.654-.533 1.404-.35 1.791.343l.873 1.567c.692 1.242 1.038 1.862.97 2.52c-.069.659-.536 1.195-1.469 2.267zm0 0c1.919 3.346 4.93 6.36 8.28 8.28m0 0c1.653.948 3.002 1.406 4.37 1.682c2.024.408 4.001-.526 5.262-2.073c.534-.654.351-1.404-.342-1.791l-1.567-.873c-1.242-.692-1.862-1.038-2.52-.97c-.659.069-1.195.536-2.267 1.469z"
                  color="currentColor"
                />
              </svg>
            </div>
          </div>

          <div
            ref="chatContainer"
            class="h-[100%] px-4 overflow-y-scroll custom-scrollbar"
          >
            <div
              v-for="(chat, index) in chats"
              :key="chat.id"
              class="flex items-end mb-2"
              :class="{
                'justify-end': chat.sender_id === auth.user.id,
                'justify-start': chat.sender_id !== auth.user.id,
              }"
            >
              <!-- Avatar for received messages -->
              <div class="mr-2">
                <AccountImg
                  :account-img="
                    selectedUser.profile_image_url
                      ? selectedUser.profile_image_url
                      : null
                  "
                  v-if="chat.sender_id !== auth.user.id"
                  font-size="14px"
                  line-height="1.43"
                  height="32px"
                  width="32px"
                  :first-name="selectedUser.first_name"
                  :show-status="false"
                />
              </div>
              <!-- <img
                v-if="chat.sender_id !== auth.user.id"
                src="/public/account.jpg"
                alt="User Avatar"
                class="w-8 h-8 rounded-full mr-2"
              /> -->

              <div class="max-w-[75%] my-2">
                <div class="flex justify-between">
                  <p class="text-sm font-medium">
                    <span v-if="chat.sender_id === auth.user.id"
                      >{{ auth.user.first_name }}
                      {{ auth.user.last_name }}</span
                    >
                    <span v-if="chat.sender_id !== auth.user.id"
                      >{{ selectedUser.first_name }}
                      {{ selectedUser.last_name }}</span
                    >
                  </p>
                  <p
                    class="text-xs mt-1 text-right"
                    :class="{
                      'text-black': chat.sender_id === auth.user.id,
                      'text-black': chat.sender_id !== auth.user.id,
                    }"
                  >
                    {{ formatDate(chat.created_at) }}
                  </p>
                </div>

                <p
                  class="text-base p-3 rounded-lg shadow-sm"
                  :class="{
                    'bg-blue-500 text-white self-end':
                      chat.sender_id === auth.user.id,
                    'bg-[#f7f7f7] text-gray-900 self-start':
                      chat.sender_id !== auth.user.id,
                  }"
                >
                  {{ chat.message }}
                </p>
              </div>

              <!-- Avatar for sent messages -->
              <div class="ml-2">
                <AccountImg
                  v-if="chat.sender_id === auth.user.id"
                  font-size="14px"
                  line-height="1.43"
                  height="32px"
                  width="32px"
                  :first-name="auth.user.first_name"
                  :show-status="false"
                />
              </div>

              <!-- <img
                v-if="chat.sender_id === auth.user.id"
                src="/public/office.jpg"
                alt="My Avatar"
                class="w-8 h-8 rounded-full ml-2"
              /> -->
            </div>
          </div>
          <!-- text input area  -->
          <div
            class="sticky flex justify-center items-center gap-2 pb-0 h-20 bg-white/30 backdrop-blur-md w-full"
          >
            <input
              id="search"
              type="text"
              @keyup.enter="sendMessage"
              v-model="inputMessage"
              placeholder="People, chat, keywords"
              :class="{
                'w-96 pl-4 py-2 h-1/2 rounded-3xl  text-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 border border-neutral-500 focus:outline-none shadow-sm transition-all duration-200': true,
              }"
            />
            <!-- <svg
              class="text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
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
                  d="M22 12.5c0-.491-.005-1.483-.016-1.976c-.065-3.065-.098-4.598-1.229-5.733c-1.131-1.136-2.705-1.175-5.854-1.254a115 115 0 0 0-5.802 0c-3.149.079-4.723.118-5.854 1.254c-1.131 1.135-1.164 2.668-1.23 5.733a69 69 0 0 0 0 2.952c.066 3.065.099 4.598 1.23 5.733c1.131 1.136 2.705 1.175 5.854 1.254q1.204.03 2.401.036"
                />
                <path
                  d="m2 6l6.913 3.925c2.526 1.433 3.648 1.433 6.174 0L22 6m0 11.5h-8m8 0c0-.7-1.994-2.008-2.5-2.5m2.5 2.5c0 .7-1.994 2.009-2.5 2.5"
                />
              </g>
            </svg> -->
            <svg
              class="text-blue-600"
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
                d="M19.5 12v1.5a7.5 7.5 0 0 1-15 0V8a5 5 0 0 1 10 0v5.5a2.5 2.5 0 0 1-5 0v-4"
                color="currentColor"
              />
            </svg>
            <svg
              class="text-blue-600"
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
                d="M17 7v4a5 5 0 0 1-10 0V7a5 5 0 0 1 10 0m0 0h-3m3 4h-3m6 0a8 8 0 0 1-8 8m0 0a8 8 0 0 1-8-8m8 8v3m0 0h3m-3 0H9"
                color="currentColor"
              />
            </svg>
          </div>
        </div>
        <div v-if="accountInfo" :class="{ 'col-span-1': !accountInfo }">
          <div class="flex justify-end">
            <button @click="toogleAccountInfo">
              <svg
                class="text-blue-600"
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
                  d="M19 5L5 19M5 5l14 14"
                  color="currentColor"
                />
              </svg>
            </button>
          </div>
          <div class="mt-8 flex flex-col items-center">
            <AccountImg
              :account-img="
                selectedUser.profile_image_url
                  ? selectedUser.profile_image_url
                  : null
              "
              font-size="48px"
              line-height="1"
              :show-status="false"
              height="120px"
              width="120px"
            />
            <p class="text-xl font-medium mt-4">
              {{ selectedUser.first_name }} {{ selectedUser.last_name }}
            </p>
            <p class="text-neutral-500">@{{ selectedUser.username }}</p>
          </div>
          <div class="px-4 mt-8">
            <p class="text-neutral-700 text-lg py-2">Attachements</p>

            <div
              v-for="(attachment, index) in attachments"
              :key="index"
              class="flex gap-2 py-[6px]"
            >
              <div>
                <svg
                  :class="attachment.style"
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  viewBox="0 0 24 24"
                  v-html="attachment.img"
                ></svg>
              </div>
              <div class="flex flex-col">
                <p>{{ attachment.name }}</p>
                <p class="text-neutral-500 text-sm">
                  {{ attachment.size }} - {{ attachment.created_at }}
                </p>
              </div>
            </div>
            <p class="text-neutral-700 text-sm px-1">View all</p>

            <p class="text-neutral-700 text-lg py-2">Members</p>

            <div
              v-for="(attachment, index) in attachments"
              :key="index"
              class="flex gap-2 py-[6px]"
            >
              <div>
                <AccountImg :show-status="false" height="40px" width="40px" />
              </div>
              <div class="flex flex-col justify-center">
                <p>Eyouel Haile</p>
              </div>
            </div>
            <p class="text-neutral-700 text-sm px-1">View all</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useNuxtApp } from "#app";
import AccountImg from "~/components/AccountImg.vue";

const { $echo } = useNuxtApp();

const auth = useAuthStore();
let chats = ref([]);

const { $axios } = useNuxtApp();

const chatContainer = ref(null);
const token = ref("");
const inputMessage = ref("");
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
    { id: 3, sender_id: 2, message: "How are you?", created_at: "2024-02-12" },
    {
      id: 4,
      sender_id: 1,
      message: "I'm good, you?",
      created_at: "2024-02-12",
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
    console.log("Scrolled to the top", chatContainer.value.scrollTop);

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

const auth_token = useCookie("auth_token", {
  secure: false, // Ensures it only works on HTTPS
  httpOnly: false, // Since we need JavaScript access
  sameSite: "lax",
});

token.value = auth_token.value;

onMounted(async () => {
  await getPeople();
  // await getHistory();
  await nextTick(); // Ensures DOM updates before scrolling
  scrollToBottom();
  if (chatContainer.value) {
    chatContainer.value.addEventListener("scroll", handleScroll);
  }
  console.log("Listening on ", `chat.${auth.user.id}`);

  $echo.private(`chat.${auth.user.id}`).listen("MessageSent", (event) => {
    chats.value = [...chats.value, event.message];

    nextTick(() => {
      scrollToBottom();
    });
  });
});

const messages = ref([]);

const toogleAccountInfo = () => {
  accountInfo.value = !accountInfo.value;
};

attachments.value = [
  {
    name: "Interesting file.doc",
    style: "text-green-500",
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
    size: "10 MB",
    created_at: "12:00 PM",
  },
  {
    name: "Frame to frame.pdf",
    style: "text-orange-500",

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
    size: "56 MB",
    created_at: "11:40 AM",
  },
  {
    name: "Project of wall.mp4",
    style: "text-blue-500",

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
    size: "150 MB",
    created_at: "09:00 PM",
  },
  {
    name: "Catch you later.xls",
    style: "text-red-500",

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
    size: "5 MB",
    created_at: "02:00 AM",
  },
];

const formatDate = (timestamp) => {
  if (!timestamp) {
    return "";
  }
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const viewMessage = async (index, message) => {
  chats.value = [];
  selectedMessage.value = index;
  selectedUser.value = message;
  await getHistory();
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
    console.log("🚀 ~ getPeople ~ error:", error);
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
      }
    );
    chatHistory = response.data.data.data;
    console.log("🚀 ~ getHistory ~ chatHistory:", chatHistory);

    chats.value = [...chatHistory.sort((a, b) => a.id - b.id), ...chats.value];
  } catch (error) {
    console.log("🚀 ~ getHistory ~ error:", error);
  }
};
const sendMessage = async () => {
  try {
    let formData = {};

    formData["message"] = inputMessage.value;
    formData["group_id"] = null;
    formData["receiver_id"] = 6;

    const response = await $axios.post("chat/send-message", formData, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    if (response.status === 200 && response.data.message) {
      chats.value = [...chats.value, response.data.message];
      inputMessage.value = "";

      nextTick(() => {
        scrollToBottom();
      });
    }
  } catch (error) {
    console.log("🚀 ~ sendMessage ~ error:", error);
  }
};
</script>

<style>
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

.scrollbar-hidden {
  scrollbar-width: none; /* Firefox */
}

::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

::-webkit-scrollbar-thumb {
  background-color: #3f83f8;
  border-radius: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}
</style>
