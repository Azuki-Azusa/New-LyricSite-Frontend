<template>
  <q-card class="song-card q-ma-md" clickabe @click="clickSongCard">
    <q-img :src="src" basic>
      <div class="absolute-bottom text-subtitle2 text-center">
        {{ title }}
      </div>
    </q-img>
  </q-card>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({ song: {
    id: Number,
    title: String,
    video_id: String
} });
const id = ref(props.song.id);
const title = ref(props.song.title);
const src = ref("https://i.ytimg.com/vi/" + props.song.video_id + "/0.jpg");
const router = useRouter();

const clickSongCard = () => {
  router.push({ name: "Song", params: { id: id.value } });
};
</script>

<style scoped>
.song-card {
    width: 300px;
}
.song-card:hover {
    cursor:pointer;
}
  
</style>
