import Vue from 'vue'

import './styles/quasar.scss'
import lang from 'quasar/lang/pt-br.js'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import { Quasar, Notify, Dark } from 'quasar'
Vue.use(Quasar, {
  config: {},
  components: { /* not needed if importStrategy is not 'manual' */ },
  directives: { /* not needed if importStrategy is not 'manual' */ },
  plugins: {
    Notify,
    Dark
  },
  lang: lang
})
