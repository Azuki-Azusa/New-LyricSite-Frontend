<template>
  <div class="q-pa-md">
    <q-infinite-scroll @load="onLoad" :offset="250" :disable="alreadyGetAll">
      <div class="row">
        <song-card v-for="song in songs" :key="song.id" :song="song" ></song-card>
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>

<script setup>
import { ref, } from "vue";
import SongCard from "../components/SongCard.vue";
import { req } from "../utils/httpClient.js";

const songs = ref([]);
const num = 12;
const alreadyGetAll = ref(false);

const onLoad = async (index, done) => {
  console.log(index);
  const newLoad = await req('get', '/lyrics/all?page=' + (index-1) + '&num=' + num)
  songs.value.push(...newLoad);
  if (newLoad.length < num) alreadyGetAll.value = true;
  done();
}
</script>

<style scoped>
</style>
