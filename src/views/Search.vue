<template>
  <div class="q-pa-md row">
    <song-card v-for="song in songs" :key="song.id" :song="song" ></song-card>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch } from "vue";
import SongCard from "../components/SongCard.vue";
import { req } from "../utils/httpClient.js";
import { useRoute } from "vue-router";

const route = useRoute();

const songs = ref([]);

const props = defineProps({ key_word: String });
const key_word = ref(props.key_word);

watch(route, async () => {
  key_word.value = route.params.key_word
  songs.value = await req('get', '/lyrics/search/' + key_word.value);
})

onMounted(async() => {
  songs.value = await req('get', '/lyrics/search/' + key_word.value);
});
</script>

<style scoped>
</style>
