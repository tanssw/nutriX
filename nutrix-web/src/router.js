import { createRouter, createWebHashHistory } from 'vue-router'

import PlainTemplate from './templates/Plain.vue'
import NavbarTemplate from './templates/Navbar.vue'

import Home from './pages/home/Home.vue'
import Register from './pages/register/Register.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: NavbarTemplate,
            children: [
                { path: '', name: 'home', component: Home },
                { path: 'dietary', name: 'dietary', component: Home },
                { path: 'profile', name: 'profile', component: Home },
            ]
        },
        {
            path: '/',
            component: PlainTemplate,
            children: [
                { path: 'register', name: 'register', component: Register },
            ]
        }
    ]
})

export default router