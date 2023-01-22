
import Game from '@/views/Game.vue'
import Login from '@/views/Login.vue'
import { createRouter, createWebHashHistory } from "vue-router"

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        { name: "login", path: '/', component: Login },
        { name: "game", path: '/game', component: Game },
    ],
})