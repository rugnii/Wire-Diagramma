import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import createvuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()
const vuetify = createVuetify()
createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
