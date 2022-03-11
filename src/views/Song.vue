<template>
  <div class="row">
    <div class="col-auto">
      <div class="title">{{song.title}}</div>
      <div class="creater">{{song.creater}}</div>
      <iframe
        id="player"
        type="text/html"
        width="640"
        height="360"
        :src="
          'http://www.youtube.com/embed/' + song.video_id + '?enablejsapi=1'
        "
        frameborder="0"
      ></iframe>
    </div>
    <div class="col">
      <viewer :lyrics="song.lyric" ref="viewerCom" />
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  defineProps,
  inject,
  onBeforeUnmount,
} from "vue";
import viewer from "../components/Viewer.vue";
import { getAnalytics, logEvent } from "firebase/analytics";
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
const axios = require("axios").default;
const host = inject("host");

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
    if(YT.loaded){
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
  axios({
    method: "get",
    url: host + "/api/lyrics/" + id.value,
  })
    .then(function (response) {
      var data = response.data
        if(data.state) {
          song.value = data.data;
          song.value.lyric = JSON.parse(song.value.lyric);
          document.title = song.value.title;
          logEvent(analytics, "open_song", {
        id: song.value.id,
        title: song.value.title,
      });
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
};

onBeforeUnmount(() => {
  clearInterval(timeInterval);
})
</script>

<style scoped>
iframe {
  max-width: 100%;
}
.lyric-textarea {
  max-height: calc(100vh - 50px);
  overflow: auto;
}
.title, .creater {
    text-align:center;
    font-size: 24px;
}

</style>
