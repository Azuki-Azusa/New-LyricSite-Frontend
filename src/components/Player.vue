<template>
  <div class="row">
    <div class="col">
      <div id="player"></div>
    </div>

    <div class="col">
      {{ currentTime }}
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from "vue";
import YouTube from "vue3-youtube";

const youtube = ref(null);
const currentTime = ref(0);
const player_width = ref(640);
const player_height = ref(360);
let timeInterval;
const onReady = () => {
  // youtube.value.playVideo();
  timeInterval = setInterval(() => {
    currentTime.value = youtube.value.getCurrentTime();
  }, 100);
};
onBeforeUnmount(() => {
  clearInterval(timeInterval);
});
</script>

<style scoped>
iframe {
  width: 100%;
  max-width: 650px; /* Also helpful. Optional. */
}
</style>
