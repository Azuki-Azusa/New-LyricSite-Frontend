<template>
  <q-item :to="route">
    <q-card class="song-card q-ma-md" >
    <q-img :src="src" basic>
      <div class="absolute-bottom">
        <div class="text-subtitle2">{{ title }}</div>
        <div class="row justify-between">
          <div class="text-subtitle2">By {{ creater }}</div>
          <div v-if="has_furigana" class="furigana">ふりがな</div>
        </div>
      </div>
    </q-img>
  </q-card>
  </q-item>
  
</template>

<script setup>
import { defineProps, ref } from "vue";

const props = defineProps({ song: {
    id: Number,
    title: String,
    video_id: String,
    creater: String,
    has_furigana: Number
} });
const id = ref(props.song.id);
const title = ref(props.song.title);
const src = ref("https://i.ytimg.com/vi/" + props.song.video_id + "/0.jpg");
const creater = ref(props.song.creater);
const has_furigana = ref(props.song.has_furigana != 0 ? true : false);

const route = { name: "Song", params: { id: id.value } }
</script>

<style scoped>
.furigana {
  border:1px solid grey;
}
.song-card {
    width: 300px;
}
.song-card:hover {
    cursor:pointer;
}
  
</style>
