import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

// Font Awesome
import '@fortawesome/fontawesome-free/js/brands'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/fontawesome'
// Custom
import './style.css'

const app = createApp(App)
app.use(router)
app.mount('#app')