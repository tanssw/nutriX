import { createRouter, createWebHashHistory } from 'vue-router'

import Home from './pages/home/Home.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/dietary', name: 'dietary', component: Home },
        { path: '/profile', name: 'profile', component: Home },
    ]
})

export default router