import { createRouter, createWebHistory } from "vue-router";
import LoginPage from './components/LoginPage.vue';
import RegisterPage from './components/RegisterPage.vue';
import HomePage from './components/HomePage.vue';

const routes = [
    {
        path: "/",
        alias: ['/login'],
        name: "Login",
        component: LoginPage
    },
    {
        path: "/register",
        name: "Register",
        component: RegisterPage
    },
    {
        path: "/home",
        name: "HomePage",
        component: HomePage
    }
];

const router = createRouter(
    {
        history: createWebHistory(),
        mode: history,
        routes
    }
);

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('token');

    if (authRequired && !loggedIn) next('/login');
    else next();
});

export default router;