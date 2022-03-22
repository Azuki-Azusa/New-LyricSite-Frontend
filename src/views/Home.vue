<template>
  <div class="q-pa-md row">
    <song-card v-for="song in songs" :key="song.id" :song="song" ></song-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import SongCard from "../components/SongCard.vue";
import { req } from "../utils/httpClient.js";

const songs = ref([]);

onMounted( async () => {
  songs.value = await req('get', '/lyrics/all');
});
</script>

<style scoped>
</style>
