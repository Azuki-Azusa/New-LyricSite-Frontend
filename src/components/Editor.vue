<template>
  <div class="row">
    <div class="col-auto">
      <q-input square outlined label="Title" v-model="title" />
      <div id="player"></div>
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
          @click="clickAddButton"
        />
        <q-btn
          class="col-2"
          color="white"
          text-color="black"
          label="Ruby"
          @click="clickCopyRuby"
        />
      </div>
    </div>
    <div class="col">
      <div class="lyric-editor">
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
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from "vue";
import { QInput, copyToClipboard } from "quasar";
import { convert } from "@/utils/convert";

const title = ref("Orangestar - Surges (feat. IA & 初音ミク) Official Video");
const text = ref("");
const preview = ref("");
const lyrics = ref([
  {
    time: 0.0,
    text: '流れ続く空と日々の狭間に'
  },
  {
    time: 3.9,
    text: '形のない今日をそれでも進む'
  },
  {
    time: 7.3,
    text: '何も知らぬ朝と清かな風に'
  },
  {
    time: 10.8,
    text: '息を繋ぐ僕らの声は何を望む？'
  },
  {
    time: 14.2,
    text: '迷っていた君に届かない'
  },
  {
    time: 16.0,
    text: '言葉はいつだって単純で'
  },
  {
    time: 17.8,
    text: '目指していた明日に届かない'
  },
  {
    time: 19.5,
    text: '心が僕らには最高で'
  },
  {
    time: 21.1,
    text: 'わかっていたって諦め切れない'
  },
  {
    time: 23.0,
    text: '心の奥がまだ燃えていて'
  },
  {
    time: 24.7,
    text: '何もないなんて謂えない僕ら'
  },
  {
    time: 26.5,
    text: '大人になる前の延長戦'
  },
  {
    time: 28.3,
    text: '足を踏み出したその先の空を'
  },
  {
    time: 29.9,
    text: '駆け上がる僕らの日常が'
  },
  {
    time: 31.7,
    text: '願った未来を越える未来まで'
  },
  {
    time: 33.7,
    text: '止まらぬ僕たちの最高を目指して征く'
  },
]);
const isPreview = ref(false);

watch(text, (newValue) => {
  preview.value = convert(newValue);
  console.log(preview.value);
});

watch(lyrics.value, (newValue) => {
  newValue.forEach(element => {
    if (element.time != '') element.time = Number(element.time.toFixed(1));
  });
})

var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
let timeInterval;
const currentTime = ref(0);
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "360",
    width: "640",
    videoId: "rkaNKAvksDE",
    events: {
      onReady: onPlayerReady,
    },
  });
}
window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

const clickAddButton = () => {
  lyrics.value.push({
    time: '',
    text: '',
  });
};

const clickRemoveButton = (index) => {
  lyrics.value.splice(index, 1);
};

const clickPreviewButton = () => {
  console.log(lyrics.value)
}

const clickCopyRuby = () => {
  copyToClipboard("｜《》")
  .then(() => {
    // 成功!
  })
  .catch(() => {
    // 失败
  })
}

const clickCopyTime = () => {
  copyToClipboard(currentTime.value)
  .then(() => {
    // 成功!
  })
  .catch(() => {
    // 失败
  })
}


const onPlayerReady = () => {
  timeInterval = setInterval(() => {
    currentTime.value = player.getCurrentTime().toFixed(1);
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
</style>
