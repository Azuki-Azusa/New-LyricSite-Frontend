<template>
  <div class="row">
    <div class="col-12 col-md-auto">
      <div class="title">{{ song.title }}</div>
      <div class="creater">{{ song.creater }}</div>
      <div class="favorite"><q-toggle v-model="favorite" label="Favorite" /></div>
      <iframe
        id="player"
        type="text/html"
        width="640"
        height="360"
        :src="
          'https://www.youtube.com/embed/' + song.video_id + '?enablejsapi=1'
        "
        frameborder="0"
      ></iframe>
    </div>
    <div class="col-12 col-md">
      <viewer :lyrics="song.lyric" ref="viewerCom" />
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted,  onBeforeUnmount, watch } from "vue";
import viewer from "../components/Viewer.vue";
import { getAnalytics, logEvent } from "firebase/analytics";
import { req } from "../utils/httpClient.js";
import Firebase from "../utils/firebase.js"
const analytics = getAnalytics();

const viewerCom = ref();
const props = defineProps({ id: Number });
const id = ref(Number(props.id));
const song = ref({
  title: "",
  video_id: "",
  lyric: [],
  creater: "",
});
const favorite = ref();

onMounted(async () => {
  song.value = await req("get", "/lyrics/" + id.value);
  song.value.lyric = JSON.parse(song.value.lyric);
  document.title = song.value.title;
  logEvent(analytics, "open_song", {
    id: song.value.id,
    title: song.value.title,
  });
  await Firebase.onAuth().then( async () => {
    const token = await Firebase.getToken();
    favorite.value = await req("get", "/favorites/" + token + "/" + id.value);
    watch(favorite, async () => { 
      const token = await Firebase.getToken();
      await req("post", "/favorites", { token: token, lyric_id: id.value});
    });
  })
});



var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
let timeInterval;
const currentTime = ref(0);
var checkYT = setInterval(function () {
  if (YT.loaded) {
    player = new YT.Player("player", {
      events: {
        onReady: onPlayerReady,
      },
    });
    clearInterval(checkYT);
  }
}, 100);

const onPlayerReady = () => {
  clearInterval(timeInterval);
  timeInterval = setInterval(() => {
    currentTime.value = player.getCurrentTime().toFixed(1);
    viewerCom.value.resetShowLyric(currentTime.value);
  }, 100);
};

onBeforeUnmount(() => {
  clearInterval(timeInterval);
});
</script>

<style scoped>
iframe {
  max-width: 100%;
}
.lyric-textarea {
  max-height: calc(100vh - 50px);
  overflow: auto;
}
.title,
.creater {
  text-align: center;
  font-size: 24px;
}
.favorite {
  text-align: center;
}
</style>
