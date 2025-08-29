import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import '@/styles/main.scss'
import 'highlight.js/styles/base16/grayscale-light.css'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
