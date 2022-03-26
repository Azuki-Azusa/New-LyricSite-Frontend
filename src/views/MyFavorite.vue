<template>
  <div class="q-pa-md row">
    <song-card v-for="song in songs" :key="song.id" :song="song" ></song-card>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import SongCard from "../components/SongCard.vue";
import Firebase from "../utils/firebase.js";
import { req } from "../utils/httpClient.js";

const songs = ref([]);

onBeforeMount(async () => {
  const token = await Firebase.getToken();
  if (token) songs.value = await req("get", "/lyrics/myFavorite/" + token);
});

</script>

<style scoped>
.my-card {
}
</style>
