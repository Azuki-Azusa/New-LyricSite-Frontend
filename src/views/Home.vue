<template>
  <div class="q-pa-md row">
    <song-card v-for="song in songs" :key="song.id" :song="song" ></song-card>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import SongCard from "../components/SongCard.vue";

const songs = ref([]);
const axios = require("axios").default;
const host = inject("host");

onMounted(() => {
  axios({
    method: "get",
    url: host + "/api/lyrics/all",
  })
    .then(function (response) {
      var data = response.data
        if(data.state) {
          songs.value = data.data;
        }
        else {
          this.$q.dialog({
            title: 'Error',
            message: data.errMsg
          })
        }
    })
    .catch(function (e) {
      console.log(e);
    });
});
</script>

<style scoped>
</style>
