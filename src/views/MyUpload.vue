<template>
  <div class="q-pa-md">
    <q-btn color="white" text-color="black" class="float-right" :to="{ name: 'Upload'}">New</q-btn>
  </div>
  <div class="q-pa-md row">
    <template v-for="song in songs" :key="song.id">
      <q-card class="my-card text-white">
        <song-card :song="song"></song-card>
        <q-separator dark />
        <q-card-actions class="row justify-between">
          <q-btn @click="clickEditButton(song.id)" flat>Edit</q-btn>
          <q-btn @click="clickDeleteButton(song.id)" flat>Delete</q-btn>
        </q-card-actions>
      </q-card>
    </template>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import SongCard from "../components/SongCard.vue";
import { onAuthStateChanged, getAuth, Dialog } from "firebase/auth";
import { useRouter } from "vue-router";

const songs = ref([]);
const axios = require("axios").default;
const host = inject("host");
const auth = getAuth();
var user = null;

onAuthStateChanged(auth, (userPara) => {
  if (userPara) {
    user = userPara;
    axios({
      method: "get",
      url:
        host + "/api/lyrics/myUpload/" + user.stsTokenManager.accessToken,
    })
      .then(function (response) {
        var data = response.data
        if(data.state) {
          songs.value = data.data;
        }
        else {
          Dialog.create({
            title: 'Error',
            message: data.errMsg
          })
        }
      })
      .catch(function (e) {
        console.log(e);
      });
  } else {
    if (!user) {
      confirm("Please Login");
    }
  }
});

const clickDeleteButton = (id) => {
  if (confirm('Sure to delete')) {
    axios({
      method: "delete",
      url:
        host + "/api/lyrics/" + user.stsTokenManager.accessToken + "/" + id,
    })
      .then(function (response) {
        var data = response.data
        if(data.state) {
          songs.value = data.data;
        }
        else {
          Dialog.create({
            title: 'Error',
            message: data.errMsg
          })
        }
      })
      .catch(function (e) {
        console.log(e);
      });
  }
}

const router = useRouter();
const clickEditButton = (id) => {
  router.push({ name: "Edit", params: { id: id } });
};

</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 224px;
}

</style>
