<template>
    <ul class="viewer-ul">
        <li>{{showLyrics[0]}}</li>
        <li>{{showLyrics[1]}}</li>
        <li class="hl">{{showLyrics[2]}}</li>
        <li>{{showLyrics[3]}}</li>
        <li>{{showLyrics[4]}}</li>
    </ul>
</template>

<script setup>
import { defineProps, ref, defineExpose, computed } from "vue";
import { covertLyrics } from "@/utils/convert";

const props = defineProps({lyrics: Array});
const htmlLyrics = computed(() => {
    return covertLyrics(props.lyrics)
})

const showLyrics = ref([])

const resetShowLyric = (currentTime) => {
    if (htmlLyrics.value.length == 0) return
    showLyrics.value = [' ', ' ', ' ', ' ',  ' ']
    var idxMid
    var i
    for (i = 0; i < htmlLyrics.value.length; i ++) {
        if (htmlLyrics.value[i].time > currentTime) {
            break;
        }
    }
    idxMid = i
    for (i = idxMid; i >= 0 && i + 3 - idxMid >= 0; i --) {
        if (i == htmlLyrics.value.length) {
            showLyrics.value[3] == ' ';
            continue;
        }
        showLyrics.value[i + 3 - idxMid] = htmlLyrics.value[i].text
    }
    for (i = idxMid + 1; i < htmlLyrics.value.length && i + 3 - idxMid < 5; i ++) {
        showLyrics.value[i + 3 - idxMid] = htmlLyrics.value[i].text
    }
}

defineExpose({
    resetShowLyric
})
</script>

<style scoped>
.viewer-ul li {
    list-style: none;
    min-height: 48px;
    font-size: 32px;
    margin: 16px 0 16px 0;
    text-align: center;
    color: grey;
}
.viewer-ul .hl {
    font-size: 40px;
    color: white;
}
</style>
