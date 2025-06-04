<template>
  <div>
    <div v-if="accountImg" class="relative rounded-full bg-slate-200">
      <img
        :style="{
          width: width,
          height: height,
          backgroundImage: `url(/${accountImg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }"
        :src="accountImg"
        alt="Profile Image"
        class="w-24 h-24 rounded-full object-cover"
      />

      <div
        v-if="showStatus"
        class="absolute flex justify-center items-center left-9 m-2 top-10 rounded-full bg-white w-4 h-4"
      >
        <div class="w-3 h-3 bg-green-700 rounded-full"></div>
      </div>
    </div>

    <div
      v-else
      :style="{
        width: width,
        height: height,
        backgroundImage: `url(/${accountImg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }"
      class="relative rounded-full bg-slate-200"
    >
      <div class="absolute inset-0 flex items-center justify-center">
        <p
          :style="{
            fontSize: fontSize,
            lineHeight: lineHeight,
          }"
          class="text-2xl text-slate-500"
        >
          {{ firstName[0] }}
        </p>
      </div>

      <div
        v-if="showStatus"
        class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"
      ></div>
      <!-- <div
        v-if="showStatus"
        class="absolute flex justify-center items-center left-9 m-2 top-10 rounded-full bg-white w-4 h-4"
      >
        <div class="w-3 h-3 bg-green-700 rounded-full"></div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  width: {
    default: '68px',
  },
  height: {
    default: '68px',
  },
  status: {
    default: 0,
  },
  accountImg: {
    // default: "office.jpg",
  },
  showStatus: {
    default: false,
  },
  firstName: {
    default: 'Cloudifice',
  },
  fontSize: {
    deafult: '',
  },
  lineHeight: {
    deafult: '',
  },
});

console.log('Account Image :::', props.accountImg);

onMounted(() => {});
</script>

<style scoped></style>
