<template>
  <div class="q-pa-md">
    <q-btn
      color="white"
      text-color="black"
      class="float-right"
      :to="{ name: 'Upload' }"
      >New</q-btn
    >
  </div>
  <div class="q-pa-md row">
    <template v-for="song in songs" :key="song.id">
      <q-card class="my-card text-white q-ma-md q-qa-md">
        <song-card :song="song"></song-card>
        <q-separator dark />
        <q-card-actions class="row justify-between">
          <q-btn @click="clickEditButton(song.id)" flat>Edit</q-btn>
          <q-btn @click="clickDeleteButton(song.title, song.id)" flat
            >Delete</q-btn
          >
        </q-card-actions>
      </q-card>
    </template>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import SongCard from "../components/SongCard.vue";
import { useRouter } from "vue-router";
import Firebase from "../utils/firebase.js";
import { req } from "../utils/httpClient.js";
import { Dialog } from "quasar";

const songs = ref([]);

onBeforeMount(async () => {
  const token = await Firebase.getToken();
  songs.value = await req("get", "/lyrics/myUpload/" + token);
});

const clickDeleteButton = (title, id) => {
  Dialog.create({
    dark: true,
    title: "Confirm",
    message: "Would you like to delete " + title + "?",
    cancel: true,
  }).onOk(async() => {
    const token = await Firebase.getToken();
    songs.value = await req("delete", "/lyrics/" + token + "/" + id);
  });
};

const router = useRouter();
const clickEditButton = (id) => {
  router.push({ name: "Edit", params: { id: id } });
};
</script>

<style scoped>
.my-card {
}
</style>
