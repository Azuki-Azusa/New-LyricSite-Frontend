import { createApp } from 'vue'
import App from './App.vue'
import quasarUserOptions from './quasar-user-options'
import { Quasar } from 'quasar'
import VueClipboard from 'vue3-clipboard'

createApp(App).use(Quasar, quasarUserOptions).use(VueClipboard).mount('#app')
