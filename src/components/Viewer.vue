<template>
    <ul>
        <li>{{showLyrics[0]}}</li>
        <li>{{showLyrics[1]}}</li>
        <li>{{showLyrics[2]}}</li>
        <li>{{showLyrics[3]}}</li>
        <li>{{showLyrics[4]}}</li>
    </ul>
</template>

<script setup>
import { defineProps, ref, watch, onBeforeUnmount } from "vue";
import { covertLyrics } from "@/utils/convert";

const props = defineProps({lyrics});
const htmlLyrics = covertLyrics(lyrics);

const showLyrics = ref([])

const resetShowLyric = (currentTime) => {
    showLyrics.value = [' ', ' ', ' ', ' ',  ' ']
    var idxMid
    for (var i = 0; i < htmlLyrics.length; i ++) {
        if (htmlLyrics[i].time > currentTime) {
            idxMid = i
            break;
        }
    }
    for (var i = idxMid; i >= 0 && i + 4 - idxMid >= 0; i --) {
        showLyrics[i + 4 - idxMid] = htmlLyrics[i]
    }
    for (var i = idxMid + 1; i < htmlLyrics.length && i + 4 - idxMid < 5; i ++) {
        showLyrics[i + 4 - idxMid] = htmlLyrics[i]
    }
}

</script>

<style scoped>
iframe {
  max-width: 100%;
}
.lyric-textarea {
  max-height: calc(100vh - 50px);
  overflow: auto;
}
</style>
