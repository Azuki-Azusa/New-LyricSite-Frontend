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
          <q-btn v-if="user" round @click="profile = true">
            <q-avatar size="42px">
              <img :src="user.photoURL" />
            </q-avatar>
          </q-btn>
          <q-btn v-else round @click="signIn" icon="mdi-account"></q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-dialog v-model="profile">
      <q-card dark bordered class="bg-grey-9 my-card">
        <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img :src="user.photoURL">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.displayName }}</q-item-label>
          <q-item-label caption>{{ user.email }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator dark inset />
      <q-card-section>
        This is the Google account you have logged in.<br>
        Site gets this information from Google Firebase Auth.<br>
        Site doesn't store them.<br>
        Site only store your Firebase uid of this site.<br>
        uid: {{ user.uid }}<br>
      </q-card-section>
      
      <q-card-actions align="right">
        <q-btn flat @click="signOut">signOut</q-btn>
      </q-card-actions>
    </q-card>
    </q-dialog>

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
import { ref, onBeforeMount } from "vue";
import { Dark } from "quasar";
import Firebase from "./utils/firebase.js"

const user = ref(null);
const profile = ref(false);

onBeforeMount(async() => {
  await Firebase.onAuth().then((result) => {
    user.value = result
  }).catch(() => {
    user.value = null
  })
})

const signIn = async () => {
  const result = await Firebase.signIn()
  user.value = result.user
};

const signOut = async () => {
  await Firebase.signOut().then(() => {
    profile.value = false;
    user.value = null;
  })
}


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