import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)
app.component('fa-icon', FontAwesomeIcon);

app.use(router)

app.mount('#app')
