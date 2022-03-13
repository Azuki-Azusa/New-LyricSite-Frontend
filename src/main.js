import { createApp } from 'vue'
import App from './App.vue'
import quasarUserOptions from './quasar-user-options'
import { Quasar } from 'quasar'
import { createRouter, createWebHashHistory } from 'vue-router'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBu5uo0aifEwC5MluPkBft6kIQ5974oeOY",
    authDomain: "bokashi39.firebaseapp.com",
    projectId: "bokashi39",
    storageBucket: "bokashi39.appspot.com",
    messagingSenderId: "1080230961751",
    appId: "1:1080230961751:web:9cec29ad40895e80b07912",
    measurementId: "G-VTT6CLS2Z2"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./views/Home.vue'),
        meta: {
            title: 'ボカシ Songs'
        }
    },
    {
        path: '/upload',
        name: 'Upload',
        component: () => import('./views/Upload.vue'),
        meta: {
            title: 'ボカシ Upload'
        }
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('./views/About.vue'),
        meta: {
            title: 'ボカシ About'
        }
    },
    {
        path: '/myupload',
        name: 'MyUpload',
        component: () => import('./views/MyUpload.vue'),
        meta: {
            title: 'ボカシ MyUpload'
        }
    },
    {
        path: '/edit/:id',
        name: 'Edit',
        props: true,
        component: () => import('./views/Editor.vue'),
    },
    {
        path: '/song/:id',
        name: 'Song',
        props: true,
        component: () => import('./views/Song.vue'),
    },
]

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
})

const host = process.env.VUE_APP_BACKEND_HOST;

const app = createApp(App);
app.use(Quasar, quasarUserOptions);
app.use(router);
app.provide('host', host);
app.mount('#app')