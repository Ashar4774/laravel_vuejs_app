import { createRouter, createWebHistory } from 'vue-router';
import About from '../components/About.vue';
import Home from '../components/Home.vue';
import Login from '../components/auth/Login.vue';
import Register from '../components/auth/Register.vue';
import Dashboard from '../components/Dashboard.vue';
import Notfound from '../components/errors/404.vue';

const routes = [
    {
        path: '/:any',
        name: 'notfound',
        component: Notfound
    }
    ,{
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
