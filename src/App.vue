<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="mdi-menu"
        />

        <q-toolbar-title> ボカシ </q-toolbar-title>

        <div>
          <q-btn v-if="user" round>
            <q-avatar size="42px">
              <img :src="user.photoURL" />
            </q-avatar>
          </q-btn>
          <q-btn v-else round @click="signIn" icon="mdi-account"></q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      :class="Dark.isActive ? 'bg-dark' : 'bg-grey-2'"
    >
      <q-list>
        <q-item-label header>Menu</q-item-label>
        <q-item v-for="(item, index) in sider" :key="index" clickable :to="item.route">
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.name }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable target="_blank" href="https://twitter.com/c980129">
          <q-item-section avatar>
            <q-icon name="mdi-twitter" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Azu機</q-item-label>
            <q-item-label caption>@c980129</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { Dark } from "quasar";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

const provider = new GoogleAuthProvider();
const auth = getAuth();
const user = ref();

onAuthStateChanged(auth, (userPara) => {
  if (userPara) {
    user.value = userPara;
    // ...
  } else {
    user.value = null;
  }
});

const signIn = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      user.value = result.user;
    })
    .catch((error) => {
      console.log(error);
    });
};

Dark.set(true);
const leftDrawerOpen = ref(false);

const sider = [
  {
    route: { name: 'Home' },
    icon: 'mdi-music-note-eighth',
    name: 'Songs'
  },
  {
    route: { name: 'MyUpload'},
    icon: 'mdi-pencil',
    name: 'MyUpload'
  },
  {
    route: { name: 'About'},
    icon: 'mdi-information',
    name: 'About'
  }
]


</script>

<style scoped>
.q-header {
  background-color: black;
}
</style>