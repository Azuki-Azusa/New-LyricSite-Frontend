
import './styles/quasar.sass'
import iconSet from 'quasar/icon-set/mdi-v4.js'
import '@quasar/extras/mdi-v4/mdi-v4.css'
import { Dialog } from 'quasar'

// To be used on app.use(Quasar, { ... })
export default {
  config: {},
  plugins: {
    Dialog
  },
  iconSet: iconSet
}