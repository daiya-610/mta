import { createApp } from 'vue'
import App from './App.vue'
import router from './route/index.js'
import './assets/tailwind.css'

createApp(App).use(router).mount('#app')