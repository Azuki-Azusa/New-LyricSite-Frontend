<template>
  <div class="row">
    <div class="col-auto">
      <q-input square outlined label="Title" v-model="title" />
      <div class="row full-width">
        <q-input class="col-6" square outlined label="VideoId" v-model="videoId"></q-input>
        <q-input class="col-6" square outlined label="Creater" v-model="creater"></q-input>
      </div>
      <iframe
        id="player"
        type="text/html"
        width="640"
        height="360"
        :src="
          'http://www.youtube.com/embed/' +
          videoId +
          '?enablejsapi=1'
        "
        frameborder="0"
      ></iframe>
      <div class="q-pa-md q-gutter-sm justify-evenly row">
        <q-btn
          class="col-2"
          color="white"
          text-color="black"
          :label="isPreview ? 'edit' : 'preview'"
          @click="clickPreviewButton"
        />
        <q-btn
          class="col-2"
          color="white"
          text-color="black"
          :label="currentTime"
          @click="clickCopyTime"
        />
        <q-btn
          class="col-2"
          color="white"
          text-color="black"
          label="Add"
          v-if="!isPreview"
          @click="clickAddButton"
        />
        <q-btn
          class="col-2"
          color="white"
          text-color="black"
          label="Ruby"
          v-if="!isPreview"
          @click="clickCopyRuby"
        />
        <q-btn
          class="col-2"
          color="white"
          text-color="black"
          label="Submit"
          v-if="isPreview"
          @click="clickSubmitButton"
        />
      </div>
      <div>
        <p>Click the number button to copy the timestamp.</p>
        <p>Click the RUBY button to copy the format.</p>
        <p>You can submit your lyric when PREVIEW mode.</p>
      </div>
    </div>
    <div class="col">
      <div class="lyric-editor" v-show="!isPreview">
        <div class="lyric-textarea">
          <div class="row" v-for="(lyric, index) in lyrics" :key="index">
            <q-input
              class="col-1 q-pa-sm"
              dense
              type="number"
              v-model.number="lyric.time"
              label="Time"
            />
            <q-input
              class="col-10 q-pa-sm"
              dense
              v-model="lyric.text"
              label="Text"
            />
            <div class="col-1 q-pa-sm">
              <q-btn
                round
                color="white"
                text-color="black"
                icon="mdi-close"
                @click="clickRemoveButton(index)"
              />
            </div>
          </div>
        </div>
      </div>
      <viewer :lyrics="lyrics" ref="viewerCom" v-show="isPreview" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from "vue";
import { QInput, copyToClipboard } from "quasar";
import { useRouter } from 'vue-router'
import viewer from "../components/Viewer.vue";
import { req } from "../utils/httpClient.js";
import Firebase from "../utils/firebase.js";

const title = ref("");
const viewerCom = ref();
const lyrics = ref([]);
const creater = ref("");
const isPreview = ref(false);

watch(lyrics.value, (newValue) => {
  newValue.forEach((element) => {
    if (element.time != "") element.time = Number(element.time.toFixed(1));
  });
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
const videoId = ref("");
var checkYT = setInterval(function () {
    if(YT.loaded){
        player = new YT.Player("player", {
          events: {
            onReady: onPlayerReady,
            onError: OnPlayerError,
          },
        });
        clearInterval(checkYT);
    }
}, 100);

const router = useRouter();

const clickSubmitButton = async () => {
  const token = await Firebase.getToken();
  const data = {
    video_id: videoId.value,
    title: title.value,
    creater: creater.value,
    lyric: JSON.stringify(lyrics.value),
    token: token,
  };
  console.log(data)
  req("post", "/lyrics/", data).then((data) => {
    router.push({ name: "Song", params: { id: data } });
  });
};

const clickAddButton = () => {
  lyrics.value.push({
    time: "",
    text: "",
  });
};

const clickRemoveButton = (index) => {
  lyrics.value.splice(index, 1);
};

const clickPreviewButton = () => {
  isPreview.value = !isPreview.value;
};

const clickCopyRuby = () => {
  copyToClipboard("｜《》")
    .then(() => {
      // 成功!
    })
    .catch(() => {
      // 失败
    });
};

const clickCopyTime = () => {
  copyToClipboard(currentTime.value)
    .then(() => {
      // 成功!
    })
    .catch(() => {
      // 失败
    });
};

const onPlayerReady = () => {
  clearInterval(timeInterval);
  timeInterval = setInterval(() => {
    currentTime.value = player.getCurrentTime().toFixed(1);
    if (isPreview.value) {
      viewerCom.value.resetShowLyric(currentTime.value);
    }
  }, 100);
};

const OnPlayerError = (e) => {
  console.log(e);
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
</style>
