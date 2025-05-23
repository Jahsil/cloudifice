<template>
  <div>
    <div
      class="fixed top-[50%] left-[50%] p-4 border-[3px] w-8 border-sky-400 rounded-lg box"
    ></div>
  </div>
</template>

<script setup></script>

<style scoped>
.box {
  animation-duration: 3s;
  animation-name: spin;
  animation-iteration-count: 5;
  animation-timing-function: ease-in;
}

@keyframes spin {
  0% {
    transform: rotateX(0) rotateY(0) rotateZ(0);
  }
  33% {
    transform: rotateX(180deg) rotateY(0) rotateZ(0);
  }
  67% {
    transform: rotateX(180deg) rotateY(180deg) rotateZ(0);
  }
  100% {
    transform: rotateX(180deg) rotateY(180deg) rotateZ(180deg);
  }
}
</style>
