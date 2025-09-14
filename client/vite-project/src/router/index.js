import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import UserPage from '../views/User.vue'
import ContactPage from '../views/Contact.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import AddContact from '../views/AddContact.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage
    },
    {
        path: '/user',
        name: 'user',
        component: UserPage
    },
    {
        path: '/contact',
        name: 'contact',
        component: ContactPage
    },
    {
        path:'/add',
        name:'addContact',
        component: AddContact
    },
    {
        path:'/login',
        name:'Login',
        component: Login
    },
    {
        path:'/register',
        name:'Register',
        component: Register
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router