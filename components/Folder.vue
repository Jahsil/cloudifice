<template>
  <div
    class="flex-col"
    :style="{ width: size }"
    v-for="(folder, index) in props.folders"
  >
    <img
      v-if="folder.type === 'directory'"
      @dblclick="handleFolderClick(folder)"
      :style="{ width: size, height: size }"
      src="/public/directory.svg"
      alt="directory-image"
      class=""
    />
    <img
      v-else-if="
        folder.type === 'file' &&
        imageFileTypes.includes(folder.name.split('.').at(-1))
      "
      @click="handleFileClick(folder, 'image')"
      :style="{ width: size, height: size }"
      src="/public/image.png"
      alt="directory-image"
      class=""
    />
    <img
      v-else-if="
        folder.type === 'file' &&
        videoFileTypes.includes(folder.name.split('.').at(-1))
      "
      @click="handleFileClick(folder, 'video')"
      :style="{ width: size, height: size }"
      src="/public/video.png"
      alt="directory-image"
      class=""
    />
    <img
      v-else-if="
        folder.type === 'file' &&
        documentFileTypes.includes(folder.name.split('.').at(-1))
      "
      @click="handleFileClick(folder, 'document')"
      :style="{ width: size, height: size }"
      src="/public/file.png"
      alt="directory-image"
      class=""
    />
    <img
      v-else
      @click="handleFileClick(folder, 'other')"
      :style="{ width: size, height: size }"
      src="/public/directory.svg"
      alt="directory-image"
      class=""
    />
    <p class="text-center font-medium text-base w-full overflow-clip">
      {{ folder.name }}
    </p>
  </div>
</template>

<script setup>
const emit = defineEmits(["folder", "file"]);

const handleFolderClick = (folder) => {
  emit("folder", folder);
};
const handleFileClick = (file, type) => {
  emit("file", file, type);
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

onMounted(() => {
  console.log("FOLDer : ", props.size);
});

const imageFileTypes = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "bmp",
  "tiff",
  "tif",
  "webp",
  "heif",
  "heic",
  "ico",
  "psd",
  "cr2",
  "cr3",
  "nef",
  "arw",
  "raf",
  "orf",
  "rw2",
  "dng",
  "svg",
  "ai",
  "eps",
  "wmf",
  "stl",
  "obj",
  "ply",
];

const videoFileTypes = [
  "mp4",
  "mov",
  "avi",
  "wmv",
  "mkv",
  "flv",
  "webm",
  "m4v",
  "3gp",
  "3g2",
  "mxf",
  "mpg",
  "mpeg",
  "ts",
  "mts",
  "rm",
  "rmvb",
  "asf",
  "vob",
  "gifv",
  "f4v",
  "f4p",
  "f4a",
  "f4b",
];

const documentFileTypes = [
  "txt",
  "doc",
  "docx",
  "rtf",
  "odt",
  "xls",
  "xlsx",
  "ods",
  "csv",
  "ppt",
  "pptx",
  "odp",
  "pdf",
  "epub",
  "mobi",
  "azw",
  "azw3",
  "html",
  "htm",
  "xml",
  "md",
  "wps",
  "wpd",
  "tex",
  "xps",
];
</script>

<style scoped></style>
