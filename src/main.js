import { createApp } from 'vue'
import 'vuetify/styles' // Import Vuetify styles
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from './App.vue'
import router from './router'
import store from './store'
import { setCookie } from './utils/cookieUtils'

if (process.env.NODE_ENV === 'development') {
  setCookie('user_login', process.env.VUE_APP_USERNAME || '')
  setCookie('user_password', process.env.VUE_APP_PASSWORD || '')
}

const vuetify = createVuetify({
  components,
  directives
})

const app = createApp(App)
app.use(router)
app.use(store)
app.use(vuetify)
app.mount('#app')
