<template>
  <div
    class="flex-col"
    :style="{ width: size }"
    v-for="(folder, index) in props.folders"
    :key="index"
  >
    <!-- Wrapper for context menu -->
    <div
      class="relative"
      @contextmenu.prevent="openContextMenu($event, folder)"
    >
      <!-- Directory -->
      <div v-if="folder.type === 'directory'">
        <img
          @dblclick="handleFolderClick(folder)"
          :style="{ width: size, height: size }"
          src="/public/directory.svg"
          alt="directory-image"
        />
      </div>

      <!-- Image File -->
      <img
        v-else-if="
          folder.type === 'file' &&
          imageFileTypes.includes(folder.name.split('.').at(-1))
        "
        @click="handleFileClick(folder, 'image')"
        :style="{ width: size, height: size }"
        src="/public/image2.png"
        alt="directory-image"
      />

      <!-- Video File -->
      <img
        v-else-if="
          folder.type === 'file' &&
          videoFileTypes.includes(folder.name.split('.').at(-1))
        "
        @click="handleFileClick(folder, 'video')"
        :style="{ width: size, height: size }"
        src="/public/multimedia.png"
        alt="directory-image"
      />

      <!-- Document File -->
      <img
        v-else-if="
          folder.type === 'file' &&
          documentFileTypes.includes(folder.name.split('.').at(-1))
        "
        @click="handleFileClick(folder, 'document')"
        :style="{ width: size, height: size }"
        src="/public/google-docs.png"
        alt="directory-image"
      />

      <!-- Other File Types -->
      <img
        v-else
        @click="handleFileClick(folder, 'other')"
        :style="{ width: size, height: size }"
        src="/public/unknown.png"
        alt="directory-image"
      />

      <!-- File/Folder Name -->
      <p class="text-center font-medium text-base w-full overflow-clip">
        {{ folder.name }}
      </p>

      <!-- Context Menu (Shared for all items) -->
      <div
        v-if="showMenu && selectedItem === folder"
        class="fixed bg-white border shadow-lg rounded-md w-40 z-50"
        :style="{ top: `${menuY}px`, left: `${menuX}px` }"
        @click="showMenu = false"
      >
        <a
          class="block w-full text-left px-4 py-2 hover:bg-gray-200"
          @click="download"
        >
          📥 Download
        </a>
        <a
          class="block w-full text-left px-4 py-2 hover:bg-gray-200"
          @click="view"
        >
          👀 View
        </a>
        <p
          class="block w-full text-left px-4 py-2 hover:bg-gray-200"
          @click="deleteItem"
        >
          🗑️ Delete
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const { $axios } = useNuxtApp();

const emit = defineEmits(['folder', 'file', 'deleteFolder']);

const handleFolderClick = (folder) => {
  emit('folder', folder);
};
const handleFileClick = (file, type) => {
  emit('file', file, type);
};
const props = defineProps({
  folders: {
    type: Array,
    required: true,
  },
  size: {
    default: 80,
  },
});

const imageFileTypes = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'bmp',
  'tiff',
  'tif',
  'webp',
  'heif',
  'heic',
  'ico',
  'psd',
  'cr2',
  'cr3',
  'nef',
  'arw',
  'raf',
  'orf',
  'rw2',
  'dng',
  'svg',
  'ai',
  'eps',
  'wmf',
  'stl',
  'obj',
  'ply',
];

const videoFileTypes = [
  'mp4',
  'mov',
  'avi',
  'wmv',
  'mkv',
  'flv',
  'webm',
  'm4v',
  '3gp',
  '3g2',
  'mxf',
  'mpg',
  'mpeg',
  'ts',
  'mts',
  'rm',
  'rmvb',
  'asf',
  'vob',
  'gifv',
  'f4v',
  'f4p',
  'f4a',
  'f4b',
];

const documentFileTypes = [
  'txt',
  'doc',
  'docx',
  'rtf',
  'odt',
  'xls',
  'xlsx',
  'ods',
  'csv',
  'ppt',
  'pptx',
  'odp',
  'pdf',
  'epub',
  'mobi',
  'azw',
  'azw3',
  'html',
  'htm',
  'xml',
  'md',
  'wps',
  'wpd',
  'tex',
  'xps',
];

const showMenu = ref(false);
const menuX = ref(0);
const menuY = ref(0);
const selectedItem = ref(null);

const openContextMenu = (event, item) => {
  event.preventDefault();
  selectedItem.value = item;
  showMenu.value = true;
  menuX.value = event.clientX;
  menuY.value = event.clientY;
};

const download = () => {
  console.log('Download:', selectedItem.value);
  showMenu.value = false;
  emit('file', selectedItem.value, 'download');

  const baseUrl = 'http://localhost:8000/view-file';
  const encodedPath = encodeURIComponent(file.path);

  downloadFileUrl.value = `${baseUrl}?path=${encodedPath}&action=download`;

  // Implement download logic
};

const view = () => {
  console.log('View:', selectedItem.value);
  showMenu.value = false;
  emit('file', selectedItem.value, 'view');

  // Implement view logic
};

const deleteItem = async () => {
  emit('deleteFolder', selectedItem.value);
};

// Close menu when clicking outside
const closeMenu = (event) => {
  if (!event.target.closest('.fixed')) {
    showMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', closeMenu);
});

onUnmounted(() => {
  document.removeEventListener('click', closeMenu);
});
</script>

<style scoped></style>
