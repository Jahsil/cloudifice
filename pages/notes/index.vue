<template>
  <div>
    <p>Insights</p>
  </div>
</template>

<script setup>
// definePageMeta({
//   middleware: "auth",
// });
import { useNuxtApp } from "#app";

const { $axios } = useNuxtApp();

async function getUser() {
  try {
    const response = await $axios.get("auth/user");
  } catch (error) {
    console.log("🚀 ~ getUser ~ error:", error);
  }
}

onMounted(async () => {
  await getUser();
});
</script>

<style lang="scss" scoped></style>
