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

router.beforeEach((to, from, next) => {
    // Redirect to home if device ID already defined
    const deviceId = localStorage.getItem('deviceId')
    if (!deviceId && to.name !== 'register') next({ name: 'register' })
    else if (deviceId && to.name === 'register') next({ name: 'home' })
    else next()
})

export default router